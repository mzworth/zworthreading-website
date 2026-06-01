#!/usr/bin/env node
/**
 * parse-eml.js
 * Parses a Zworth Reading .eml file and upserts the entry into data/archive.json
 *
 * Usage:
 *   node scripts/parse-eml.js path/to/issue.eml
 */

'use strict';

const fs   = require('fs');
const path = require('path');

let parse;
try {
  parse = require('node-html-parser').parse;
} catch {
  console.error('node-html-parser not found. Run: npm install node-html-parser');
  process.exit(1);
}

const ARCHIVE_PATH = path.join(__dirname, '..', 'data', 'archive.json');

// ---------------------------------------------------------------------------
// Quoted-printable decoder
// Reads raw bytes (via latin1-encoded string) and returns a proper UTF-8 string.
// Handles: soft line breaks (=\r\n / =\n) and hex-encoded bytes (=XX).
// ---------------------------------------------------------------------------
function decodeQP(str) {
  // Remove soft line breaks first
  str = str.replace(/=\r?\n/g, '');

  const bytes = [];
  let i = 0;
  while (i < str.length) {
    if (str[i] === '=' && i + 2 < str.length && /^[0-9A-Fa-f]{2}$/.test(str.slice(i + 1, i + 3))) {
      bytes.push(parseInt(str.slice(i + 1, i + 3), 16));
      i += 3;
    } else {
      bytes.push(str.charCodeAt(i) & 0xff);
      i++;
    }
  }
  return Buffer.from(bytes).toString('utf8');
}

// ---------------------------------------------------------------------------
// Extract the HTML part from a MIME email.
// Handles nested multipart structures (e.g. multipart/related wrapping
// multipart/alternative) by trying every declared boundary and checking
// whether a part's *own headers* (not nested content) declare text/html.
// ---------------------------------------------------------------------------
function extractHtml(emlContent) {
  // Collect every MIME boundary declared in the email.
  // Handles both quoted (boundary="abc") and unquoted (boundary=abc) forms.
  const boundaryRegex = /boundary=(?:"([^"]+)"|([^\s;]+))/g;
  let match;
  const boundaries = [];
  while ((match = boundaryRegex.exec(emlContent)) !== null) {
    boundaries.push(match[1] ?? match[2]);
  }
  if (boundaries.length === 0) throw new Error('No MIME boundary found in EML');

  for (const boundary of boundaries) {
    const parts = emlContent.split('--' + boundary);
    for (const part of parts) {
      // Only examine the headers section of this part (before the first blank line)
      const sep = part.search(/\r?\n\r?\n/);
      if (sep === -1) continue;
      const headers = part.slice(0, sep);
      if (/Content-Type:\s*text\/html/i.test(headers)) {
        const body = part.slice(sep).trim().replace(/\s*--\s*$/, '');
        return decodeQP(body);
      }
    }
  }
  throw new Error('No HTML part found in EML');
}

// ---------------------------------------------------------------------------
// Strip inline style= and class= attributes (preserves element structure)
// ---------------------------------------------------------------------------
function cleanHtml(html) {
  return html
    .replace(/\s+style="[^"]*"/g, '')
    .replace(/\s+style='[^']*'/g, '')
    .replace(/\s+class="[^"]*"/g, '')
    .replace(/\s+class='[^']*'/g, '')
    .trim();
}

// ---------------------------------------------------------------------------
// Map a section title to a canonical slug ID
// ---------------------------------------------------------------------------
function titleToId(title) {
  const t = title.toLowerCase();
  if (t.includes('highlight'))   return 'highlight';
  if (t.includes('practice'))    return 'practice-changing';
  if (t.includes('foam'))        return 'foam-radar';
  if (t.includes('adjacent'))    return 'adjacent-specialties';
  if (t.includes('major'))       return 'major-journals';
  if (t.includes('methodolog') || t.includes('flag')) return 'methodology-flag';
  // Fallback: generic slugify
  return t.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// ---------------------------------------------------------------------------
// Walk parent.childNodes to find the next <tr> sibling after a given <tr>
// ---------------------------------------------------------------------------
function nextSiblingTr(tr) {
  const parent = tr.parentNode;
  if (!parent) return null;
  let found = false;
  for (const child of parent.childNodes) {
    if (found && child.rawTagName && child.rawTagName.toLowerCase() === 'tr') {
      return child;
    }
    if (child === tr) found = true;
  }
  return null;
}

// ---------------------------------------------------------------------------
// Split "⭐  Highlight of the Week" into { emoji, title }
// Uses Array.from() for correct Unicode/surrogate-pair handling.
// ---------------------------------------------------------------------------
function splitEmojiTitle(text) {
  const chars = Array.from(text.trim());
  let i = 0;
  // Advance past non-whitespace (the emoji)
  while (i < chars.length && !/\s/.test(chars[i])) i++;
  const emoji = chars.slice(0, i).join('');
  // Skip whitespace
  while (i < chars.length && /\s/.test(chars[i])) i++;
  const title = chars.slice(i).join('').trim();
  return { emoji, title };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function main() {
  const emlPath = process.argv[2];
  if (!emlPath) {
    console.error('Usage: node scripts/parse-eml.js path/to/issue.eml');
    process.exit(1);
  }

  if (!fs.existsSync(emlPath)) {
    console.error(`File not found: ${emlPath}`);
    process.exit(1);
  }

  // Read raw bytes as latin1 so charCodeAt() gives byte values 0–255 for QP decoding
  const emlRaw   = fs.readFileSync(emlPath, 'latin1');
  const html     = extractHtml(emlRaw);
  const root     = parse(html);

  // -------------------------------------------------------------------------
  // 1. Extract issue number and week-of from the red header paragraph
  //    Format: "Issue #7  ·  Week of May 25, 2026"
  // -------------------------------------------------------------------------
  let issueNumber = null;
  let weekOf = '';

  for (const p of root.querySelectorAll('p')) {
    const text = p.text.replace(/\s+/g, ' ').trim();
    const m = text.match(/Issue\s*#(\d+)[^W]*Week of\s+(.+)/i);
    if (m) {
      issueNumber = parseInt(m[1], 10);
      weekOf      = m[2].replace(/\s+/g, ' ').trim();
      break;
    }
  }
  if (!issueNumber) throw new Error('Could not find "Issue #N ... Week of ..." in email HTML');

  const slug = `issue-${issueNumber}`;

  // -------------------------------------------------------------------------
  // 2. Extract sections by finding section <h2> headers
  //    Each h2 is in a <tr><td>, the following <tr><td> holds the content.
  // -------------------------------------------------------------------------
  const sections       = [];
  let highlightTitle   = '';
  let highlightSummary = '';

  for (const h2 of root.querySelectorAll('h2')) {
    const h2Text = h2.text.replace(/\s+/g, ' ').trim();
    if (!h2Text) continue;

    const { emoji, title } = splitEmojiTitle(h2Text);
    if (!emoji || !title) continue;

    // Skip h2s whose first character isn't a Unicode emoji/symbol.
    // Content-wrapper h2s (used in some email clients) start with plain text.
    const firstCp = Array.from(emoji)[0]?.codePointAt(0) ?? 0;
    if (firstCp < 0x2600) continue;

    const id = titleToId(title);

    // Navigate: h2 → td → tr
    const td = h2.parentNode;
    if (!td || !td.rawTagName || td.rawTagName.toLowerCase() !== 'td') continue;
    const headerTr = td.parentNode;
    if (!headerTr || !headerTr.rawTagName || headerTr.rawTagName.toLowerCase() !== 'tr') continue;

    const contentTr = nextSiblingTr(headerTr);
    if (!contentTr) continue;

    const contentTd = contentTr.querySelector('td');
    if (!contentTd) continue;

    // For Highlight: content is wrapped in a special left-bordered div
    let rawHtml;
    if (id === 'highlight') {
      const innerDiv = contentTd.querySelector('div');
      rawHtml = innerDiv ? innerDiv.innerHTML : contentTd.innerHTML;
    } else {
      rawHtml = contentTd.innerHTML;
    }

    // Fallback: some emails nest both the header h2 and a content-wrapping h2
    // inside the same <td> (instead of using a sibling <tr>). Detect this when
    // the resolved content looks like the footer, then search sibling h2 elements
    // in the same td for a table/div with real content.
    if (/reply to this email|unsubscribe|subscribe here/i.test(rawHtml)) {
      const siblingH2s = td.querySelectorAll('h2');
      let fallbackHtml = '';
      for (const sh2 of siblingH2s) {
        if (sh2 === h2) continue;
        // Look for a td with meaningful content inside this sibling h2
        const innerTds = sh2.querySelectorAll('td');
        for (const innerTd of innerTds) {
          if (innerTd.text.trim().length > 80) {
            fallbackHtml = innerTd.innerHTML;
            break;
          }
        }
        if (fallbackHtml) break;
      }
      if (fallbackHtml) rawHtml = fallbackHtml;
    }

    const content = cleanHtml(rawHtml);

    sections.push({ id, emoji, title, content });

    // -----------------------------------------------------------------------
    // 3. Extract highlight metadata from the first section
    // -----------------------------------------------------------------------
    if (id === 'highlight') {
      const secRoot = parse(content);

      // Highlight title = text of the first <a> element
      const firstLink = secRoot.querySelector('a');
      if (firstLink) highlightTitle = firstLink.text.trim();

      // Highlight summary = text after "Bottom line:" in the matching <p>
      for (const p of secRoot.querySelectorAll('p')) {
        if (/bottom\s+line/i.test(p.text)) {
          highlightSummary = p.text
            .replace(/^[\s\S]*?Bottom line:\s*/i, '')
            .replace(/\s+/g, ' ')
            .trim();
          break;
        }
      }
    }
  }

  if (sections.length === 0) {
    throw new Error('No sections extracted — check the HTML structure of the EML');
  }

  // -------------------------------------------------------------------------
  // 4. Build entry and upsert into archive.json
  // -------------------------------------------------------------------------
  const entry = { slug, issueNumber, weekOf, highlightTitle, highlightSummary, sections };

  const archive    = JSON.parse(fs.readFileSync(ARCHIVE_PATH, 'utf8'));
  const existingIdx = archive.findIndex(e => e.slug === slug);

  if (existingIdx !== -1) {
    archive[existingIdx] = entry;
    console.log(`Updated Issue #${issueNumber} — ${highlightTitle}`);
  } else {
    archive.push(entry);
    console.log(`Added Issue #${issueNumber} — ${highlightTitle}`);
  }

  // Always keep archive sorted newest-first by issue number
  archive.sort((a, b) => b.issueNumber - a.issueNumber);

  fs.writeFileSync(ARCHIVE_PATH, JSON.stringify(archive, null, 2) + '\n');

  // Print resulting entry
  console.log('\nResulting JSON entry:\n');
  console.log(JSON.stringify(entry, null, 2));
}

main();

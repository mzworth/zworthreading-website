import Script from 'next/script'

export default function SubscribeForm() {
  return (
    <>
      <Script
        src="https://subscribe-forms.beehiiv.com/v3/loader.js"
        strategy="lazyOnload"
        data-beehiiv-form="b01b848b-2b94-47ba-999f-5878d86b217f"
      />
      <div data-beehiiv-form="b01b848b-2b94-47ba-999f-5878d86b217f" />
    </>
  )
}

import AcknowledgementOfCountryContent from "~/components/acknowledgement-of-country/acknowledgement-of-country-content.mdx"
export default function AcknowledgementOfCountryPage() {
  return (
    <section className={"p-3 flex items-center justify-center h-safe-screen w-full"}>
      <div className="prose prose-sm lg:prose-base">
        <h1>
            Acknowledgement of Country
        </h1>
        <AcknowledgementOfCountryContent />
       </div>
    </section>
  )
}

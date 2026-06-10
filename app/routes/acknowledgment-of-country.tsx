import { LinkIcon } from "lucide-react"
import { Link } from "react-router"
import AcknowledgementOfCountryContent from "~/components/acknowledgement-of-country/acknowledgement-of-country-content.mdx"
import AcknowledgementOfCountryExtraContent from "~/components/acknowledgement-of-country/acknowledgement-of-country-extra-content.mdx"
export default function AcknowledgementOfCountryPage() {
  return (
    <section className={"p-3 flex items-center justify-center h-safe-screen w-full"}>
      <div className="prose">
        <h1>
            Acknowledgement of Country
        </h1>
        <AcknowledgementOfCountryContent />
        <AcknowledgementOfCountryExtraContent />
      </div>
    </section>
  )
}

import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import AcknowledgementOfCountryContent from "./acknowledgement-of-country-content.mdx"
import type { DialogRoot } from "@base-ui/react"

export default function AcknowledgementOfCountryDialog(
  props: Omit<DialogRoot.Props, "children">
) {
  return (
    <Dialog disablePointerDismissal={true} modal={true} {...props}>
      <DialogContent showCloseButton={false} className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Acknowledgment of Country</DialogTitle>
          <DialogDescription className={"prose pt-3"}>
            <AcknowledgementOfCountryContent />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button>Understood</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

import { Button } from "~/components/ui/button"
import { Dialog as BaseDialog } from "@base-ui/react";
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
import React from "react";

export default function AcknowledgementOfCountryDialog(
  props: Omit<DialogRoot.Props, "children">
) {
  const dialogHandle = React.useMemo(() => BaseDialog.createHandle() ?? props.handle, [props.handle]);
  const isDialogOpen = dialogHandle.store.useState("open");
  return (
    <Dialog handle={dialogHandle} disablePointerDismissal={true} modal={true} {...props}>
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

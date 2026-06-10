import { Button } from "~/components/ui/button"
import { Dialog as BaseDialog } from "@base-ui/react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog"
import AcknowledgementOfCountryContent from "./acknowledgement-of-country-content.mdx"
import type { DialogRoot } from "@base-ui/react"
import React from "react"

type AcknowledgementOfCountryDialogProps = Omit<
  DialogRoot.Props,
  "children"
> & {
  defaultReadingSecs?: number
}

export default function AcknowledgementOfCountryDialog({
  handle,
  defaultReadingSecs,
  ...props
}: AcknowledgementOfCountryDialogProps) {
  const dialogHandle = React.useMemo(
    () => BaseDialog.createHandle() ?? handle,
    [handle]
  )

  const isDialogOpen = dialogHandle.store.useState("open")
  const timerRef = React.useRef<number>(undefined)
  const [remainingSecs, setRemainingSecs] = React.useState(0)
  const clearTimerRefCb = React.useCallback(() => {
    if (timerRef == null) {
      return
    }
    window.clearTimeout(timerRef.current)
    timerRef.current = undefined
  }, [timerRef])
  React.useEffect(() => {
    if (isDialogOpen) {
      let remainingSecs_ = defaultReadingSecs ?? 3
      const timeoutCb = () => {
        if (timerRef.current != null) {
          remainingSecs_--
        }
        setRemainingSecs(remainingSecs_)
        if (remainingSecs_ <= 0) {
          timerRef.current = undefined
          return
        }
        timerRef.current = window.setTimeout(timeoutCb, 1000)
      }
      timeoutCb()
    } else {
      clearTimerRefCb()
    }
    return clearTimerRefCb
  }, [isDialogOpen])
  return (
    <Dialog
      handle={dialogHandle}
      disablePointerDismissal={true}
      modal={true}
      {...props}
    >
      <DialogContent showCloseButton={false} className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Acknowledgment of Country</DialogTitle>
          <DialogDescription className={"prose pt-3"}>
            <AcknowledgementOfCountryContent />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose
            disabled={remainingSecs != 0}
            render={
              <Button>
                {["Understood", remainingSecs != 0 ? `(${remainingSecs})` : []]
                  .flatMap((e) => e)
                  .join(" ")}
              </Button>
            }
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

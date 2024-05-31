import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useTransaction } from "@/provider/transactionProvider";
import { X } from "lucide-react";

function ErrorDiaLog() {
  const { isOpenErrorPopUp, handleToggleErrorDialog } = useTransaction();

  return (
    <Dialog open={isOpenErrorPopUp}>
      <DialogContent className="bg-red-400">
        <div
          onClick={handleToggleErrorDialog}
          className="cursor-pointer relative rounded-sm opacity-60 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none  focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="absolute right-[-15px] top-[-15px] h-5 w-5 rounded-md bg-rose-600 p-[2px] text-white " />
        </div>
        <p className="bg-red-800 p-2 rounded-lg text-center text-white">
          Unsufficient Fund!
        </p>
      </DialogContent>
    </Dialog>
  );
}
export default ErrorDiaLog;

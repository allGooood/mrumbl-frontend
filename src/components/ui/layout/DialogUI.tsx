import { Description, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Button from "../Button";

/**
 * Presentational dialog component. All copy (title, description, buttonLabel) should be in English.
 */
export interface DialogUIProps {
  open: boolean;
  onClose: () => void;
  /** Dialog title (English) */
  title: string;
  /** Dialog body text (English) */
  description: string;
  /** Confirm button label (English). Default: "Confirm" */
  buttonLabel?: string;
  onConfirm?: () => void;
}

export const DialogUI = ({
  open,
  onClose,
  title,
  description,
  buttonLabel = "Confirm",
  onConfirm,
}: DialogUIProps) => {
  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="mx-auto w-full max-w-md rounded-2xl bg-white shadow-xl border border-gray-100 overflow-hidden">
          {/* Accent bar (brand-primary) */}
          <div className="h-1 w-full bg-brand-primary" aria-hidden="true" />

          <div className="p-6">
          <DialogTitle className="text-xl font-extrabold text-black">
            {title}
          </DialogTitle>

          <Description className="mt-3 text-base text-gray-600 leading-relaxed">
            {description}
          </Description>

          <div className="mt-6 flex justify-end">
            <Button onClick={handleConfirm} variant="primary" size="medium">
              {buttonLabel}
            </Button>
          </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

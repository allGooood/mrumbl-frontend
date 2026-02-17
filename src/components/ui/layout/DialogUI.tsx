import { Description, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Button from "../Button";

export interface DialogUIProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  subDescription?: string;
  firstButtonLabel?: string;
  secondButtonLabel?: string;
  firstAction?: () => void;
  secondAction?: () => void;
}

export const DialogUI = ({
  open,
  onClose,
  title,
  description,
  subDescription,
  firstButtonLabel = "Confirm",
  secondButtonLabel = "Cancel",
  firstAction,
  secondAction,
}: DialogUIProps) => {
  const handleFirst = () => {
    firstAction?.();
    onClose();
  };

  const handleSecond = () => {
    secondAction?.();
    onClose();
  };

  const hasSecond = secondAction !== undefined;

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-6">
        <DialogPanel className="mx-auto w-full max-w-md rounded-2xl bg-white shadow-xl border border-gray-100 overflow-hidden">
          {/* Accent bar (brand-primary) */}
          <div className="h-1 w-full bg-brand-primary" aria-hidden="true" />

          <div className="p-8">
          <DialogTitle className="text-xl font-extrabold text-black">
            {title}
          </DialogTitle>

          <div className="mt-5">
            <Description className="text-lg text-gray-600 leading-relaxed">
              {description}
            </Description>
            {subDescription && (
              <div className="mt-4 text-base text-gray-400 leading-relaxed">
                {subDescription}
              </div>
            )}
          </div>

          <div className={`mt-6 flex ${hasSecond ? 'justify-between' : 'justify-end'}`}>
            {hasSecond && (
              <Button onClick={handleSecond} variant="secondary" size="medium">
                {secondButtonLabel}
              </Button>
            )}
            <Button onClick={handleFirst} variant="primary" size="medium">
              {firstButtonLabel}
            </Button>
          </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

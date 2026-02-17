import { DialogUI } from "./DialogUI";
import { useAppDialogStore } from "../../../shared/stores/useAppDialogStore";


export const GlobalDialog = () => {
  const { options, hideDialog } = useAppDialogStore();

  return (
    <DialogUI
      open={options !== null}
      onClose={hideDialog}
      title={options?.title ?? ""}
      description={options?.description ?? ""}
      subDescription={options?.subDescription}
      firstButtonLabel={options?.buttonLabel}
      firstAction={options?.onConfirm}
      secondAction={options?.onSecondaryAction}
    />
  );
};

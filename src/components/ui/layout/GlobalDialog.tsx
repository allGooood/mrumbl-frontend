import { DialogUI } from "./DialogUI";
import { useDialog } from "../../../shared/stores/useDialog";


export const GlobalDialog = () => {
  const { options, hideDialog } = useDialog();

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

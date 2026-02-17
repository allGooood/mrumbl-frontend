import { DialogUI } from "./DialogUI";
import { useAppDialogStore } from "../../../shared/stores/useAppDialogStore";


export const GlobalDialog = () => {
  const options = useAppDialogStore((state) => state.options);
  const hideDialog = useAppDialogStore((state) => state.hideDialog);

  return (
    <DialogUI
      open={options !== null}
      onClose={hideDialog}
      title={options?.title ?? ""}
      description={options?.description ?? ""}
      buttonLabel={options?.buttonLabel}
      onConfirm={options?.onConfirm}
    />
  );
};

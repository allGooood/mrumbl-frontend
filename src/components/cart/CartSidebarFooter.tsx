import { formatCentAsDollar } from "../../utils/priceFormatter";
import Button from "../atom/Button";

type CartSidebarFooterProps = {
  subtotal: number;
  canCheckout: boolean;
  onCheckout: () => void;
};

export default function CartSidebarFooter({
  subtotal,
  canCheckout,
  onCheckout,
}: CartSidebarFooterProps) {
  return (
    <>
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex justify-between text-base font-semibold text-black">
          <span>Subtotal</span>
          <span>{formatCentAsDollar(subtotal)}</span>
        </div>
      </div>

      <div className="p-6 pt-0">
        <Button
          type="button"
          className="w-full bg-black text-white py-3 rounded-lg font-semibold"
          disabled={!canCheckout}
          onClick={onCheckout}
        >
          Checkout
        </Button>
      </div>
    </>
  );
}

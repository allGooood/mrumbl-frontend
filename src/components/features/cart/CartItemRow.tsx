import { Link } from "react-router-dom";
import type { Cart, CartOption } from "../../../api/cartService";
import { useCartStore } from "../../../features/cart/stores/useCartStore";
import { formatCentAsDollar } from "../../../utils/priceFormatter";
import QuantitySelector from "../../ui/QuantitySelector";

export function formatCookieOptions(options: CartOption[] | undefined): string[] {
  if (!options || options.length === 0) return [];
  return options.map((opt) => `${opt.quantity}x ${opt.cookieName}`);
}

type CartItemRowProps = {
  item: Cart;
  onUpdateQuantity: (cartId: string, quantity: number) => void;
  onRemove: (cartId: string) => void;
};

export default function CartItemRow({ item, onUpdateQuantity, onRemove }: CartItemRowProps) {
  const { storeId } = useCartStore();
  return (
    <li className="p-5">

      <Link to={`/order/pickup/${storeId}/product/${item.productId}`}>
      <div className="flex gap-4 cursor-pointer">
        <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-gray-100">
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.productName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
              No image
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0 flex flex-col">
          <p className="font-medium text-black truncate">{item.productName}</p>
          {item.options && item.options.length > 0 && (
            <ul className="text-sm text-gray-500">
              {formatCookieOptions(item.options).map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
      </Link>

      <div className="mt-4 flex items-center justify-between gap-2">
        <QuantitySelector
          value={item.quantity}
          onChange={(q) => onUpdateQuantity(item.cartId, q)}
          min={0}
          onRemove={() => onRemove(item.cartId)}
          size="small"
          aria-label={`${item.productName} 수량`}
        />
        <span className="text-black font-medium tabular-nums">
          {formatCentAsDollar(item.productAmount ?? item.unitAmount * item.quantity)}
        </span>
      </div>
    </li>
  );
}

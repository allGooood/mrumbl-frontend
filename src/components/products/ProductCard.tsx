import type { Product } from "../../api/productService";
import { getProductImageUrl } from "../../utils/imageUrl";

export interface ProductCardProps {
  product: Product;
}

const formatPrice = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount / 100);
};

const ProductCard = ({ product }: ProductCardProps): React.ReactElement => {
  const {
    productName,
    unitAmount,
    discountRate,
    imageUrl,
    isSoldOut,
  } = product;

  const showDiscount = discountRate > 0;

  return (
    <article className="flex flex-col cursor-pointer">
      <div className="relative w-full aspect-square rounded-2xl bg-brand-primary overflow-hidden mb-3">
        {imageUrl ? (
          <img
            src={getProductImageUrl(imageUrl)}
            alt={productName}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-black text-sm">
            No image
          </div>
        )}
        {showDiscount && (
          <span className="absolute top-2 right-2 bg-white text-black text-xs font-semibold px-2 py-1 rounded">
            Save {discountRate}%
          </span>
        )}
        {isSoldOut && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-white font-bold rounded-2xl">
            Sold Out
          </span>
        )}
      </div>
      <h3 className="font-bold text-black text-base">{productName}</h3>
      <p className="text-black text-sm mt-0.5">{formatPrice(unitAmount)}</p>
    </article>
  );
};

export default ProductCard;

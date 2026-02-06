import { Link, useLocation } from "react-router-dom";
import type { Product } from "../../api/productService";
import ProductCard from "./ProductCard";

export interface ProductCategorySectionProps {
  category: string;
  products: Product[];
  columns?: 2 | 4;
}

const ProductCategorySection = ({
  category,
  products,
  columns = 4,
}: ProductCategorySectionProps): React.ReactElement => {
  const gridCols =
    columns === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

  const location = useLocation();

  return (
    <section className="w-full mb-18">
      <h2 className="text-2xl md:text-4xl font-extrabold text-black mb-6">
        {category}
      </h2>
      <ul
        className={`grid ${gridCols} gap-6 md:gap-8`}
        role="list"
      >
        {products.map((product) => (
          <li key={product.productId}>
            <Link to={`${location.pathname}/product/${product.productId}`}>
              <ProductCard product={product} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProductCategorySection;

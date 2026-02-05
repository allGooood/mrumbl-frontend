import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductActions, type ProductsByCategory } from "../api/productService";
import {
  useStoreService,
  type getStoreInformationResponse,
} from "../api/storeService";
import ProductCategorySection from "../components/products/ProductCategorySection";
import ProductsStoreBar from "../components/products/ProductsStoreBar";
import LocationPickerPanel from "../components/products/LocationPickerPanel";
import FullPageLoader from "../components/layout/FullPageLoader";

const parseStoreId = (id: string | undefined): number | null => {
  if (id == null) return null;
  const num = Number(id);
  return Number.isInteger(num) ? num : null;
};

type RouteParams = {
  storeId: string;
};

export type OrderType = "PICK_UP" | "DELIVERY";

const Products = (): React.ReactElement => {
  const { storeId: storeIdParam } = useParams<RouteParams>();
  const storeId = parseStoreId(storeIdParam);
  
  // URL 경로가 /order/pickup/:storeId 이므로 항상 PICK_UP
  const orderType: OrderType = "PICK_UP";

  const { getProducts } = useProductActions();
  const { getStoreInformation } = useStoreService();

  const [products, setProducts] = useState<ProductsByCategory[]>([]);
  const [store, setStore] = useState<getStoreInformationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showLocationPanel, setShowLocationPanel] = useState(false);

  useEffect(() => {
    if (storeId === null) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [productsData, storeData] = await Promise.all([
          getProducts(storeId),
          getStoreInformation(storeId),
        ]);

        setProducts(productsData);
        setStore(storeData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "정보를 불러오는데 실패했습니다."
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [storeId]);

  useEffect(() => {
    setShowLocationPanel(false);
  }, [storeId]);

  if (storeId === null) {
    return (
      <div className="p-4 text-gray-600">매장을 선택해 주세요.</div>
    );
  }

  if (loading) {
    return <FullPageLoader message="매장 상품을 불러오는 중이에요..." />;
  }

  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }

  if (!store) {
    return (
      <div className="p-4 text-gray-600">매장 정보를 불러올 수 없습니다.</div>
    );
  }

  return (
    <div className="pb-8">
      <ProductsStoreBar
        store={store}
        orderType={orderType}
        onStoreInfoClick={() => setShowLocationPanel((prev) => !prev)}
        isLocationPanelOpen={showLocationPanel}
      />

      {showLocationPanel && <LocationPickerPanel />}

      <div className="w-full max-w-6xl mx-auto px-4 pt-19">
        {products
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((byCategory) => (
            <ProductCategorySection
              key={byCategory.displayOrder}
              category={byCategory.category}
              products={byCategory.products}
            />
          ))}
      </div>
    </div>
  );
};

export default Products;

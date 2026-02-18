import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductActions, type ProductsByCategory } from "../../../api/productService";
import {
  useStoreService,
  type getStoreInformationResponse,
} from "../../../api/storeService";
import ProductCategorySection from "../../../components/features/product/ProductCategorySection";
import ProductEmpty from "../../../components/features/product/ProductEmpty";
import ProductsStoreBar from "../../../components/features/product/ProductsStoreBar";
import LocationPickerPanel from "../../../components/features/product/LocationPickerPanel";
import { parseId } from "../../../utils/urlManager";
import { useLoading } from "../../../shared/hooks/useLoading";
import { useDialog } from "../../../shared/stores/useDialog";
import { getErrorMessage } from "../../../utils/errorHandler";
import { useNavigate } from "react-router-dom";

type RouteParams = {
  storeId: string;
};

export type OrderType = "PICK_UP" | "DELIVERY";

const Products = (): React.ReactElement | null => {
  const { storeId: storeIdParam } = useParams<RouteParams>();
  const storeId = parseId(storeIdParam);

  const orderType: OrderType = "PICK_UP";

  const { getProducts } = useProductActions();
  const { getStoreInformation } = useStoreService();
  const { setLoading } = useLoading();
  const showDialog = useDialog((state) => state.showDialog);
  const navigate = useNavigate();

  const [products, setProducts] = useState<ProductsByCategory[]>([]);
  const [store, setStore] = useState<getStoreInformationResponse | null>(null);
  const [showLocationPanel, setShowLocationPanel] = useState(false);

  useEffect(() => {
    if (storeId === null) {
      navigate("/order/pickup");
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);

        const [productsData, storeData] = await Promise.all([
          getProducts(storeId),
          getStoreInformation(storeId),
        ]);

        setProducts(productsData);
        setStore(storeData);
        
      } catch (err) {
        const errorMessage = getErrorMessage(err, "정보를 불러오는데 실패했습니다.");
        console.error(err);
        
        showDialog({
          title: "Invalid request",
          description: errorMessage,
          onConfirm: () => navigate("/order/pickup"),
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [storeId]);

  useEffect(() => {
    setShowLocationPanel(false);
  }, [storeId]);

  if (!store) {
    return <ProductEmpty onChooseAnotherStore={() => navigate('/order/pickup')} />
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
          ))
        }
      </div>
    </div>
  );
};

export default Products;

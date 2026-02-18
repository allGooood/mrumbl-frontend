import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCartStore } from "../../cart/stores/useCartStore";
import { useStoreService } from "../../../api/storeService";
import type { getStoreInformationResponse } from "../../../api/storeService";
import PageLayout from "../../../components/ui/layout/PageLayout";
import Button from "../../../components/ui/Button";
import { useLoading } from "../../../shared/hooks/useLoading";
import StoreInformation from "../../../components/features/order/StoreInformation";
import MyBagList from "../../../components/features/order/MyBagList";
import OrderDetails from "../../../components/features/order/OrderDetails";
import { parseId } from "../../../utils/urlManager";


export default function CheckOut() {
  const { storeId: storeIdParam } = useParams<{ storeId: string }>();
  const navigate = useNavigate();
  const { getStoreInformation } = useStoreService();
  const { items } = useCartStore();

  const [store, setStore] = useState<getStoreInformationResponse | null>(null);
  const { setLoading } = useLoading();

  const storeId = parseId(storeIdParam);

  useEffect(() => {
    let cancelled = false;
    getStoreInformation(storeId ?? 0)
      .then((data) => {
        if (!cancelled) setStore(data);
      })
      .catch(() => {
        if (!cancelled) setStore(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [storeId]);




  if (!store ) {
    return (
      <PageLayout>
        <div className="w-full max-w-6xl py-12 text-center">
          <p className="text-gray-600 mb-4">Store not found.</p>
          <Button variant="outline" onClick={() => navigate("/order/pickup")}>
            Select location
          </Button>
        </div>
      </PageLayout>
    );
  }

  if (items.length === 0) {
    return (
      <PageLayout>
        <div className="w-full max-w-6xl py-12 text-center">
          <p className="text-gray-600 mb-4">Your bag is empty.</p>
          <Button variant="outline" onClick={() => navigate(`/order/pickup/${storeId}`)}>
            Add items
          </Button>
        </div>
      </PageLayout>
    );
  }

  const BorderStyle = "border-3 rounded-2xl border-gray-100 p-5"

  return (
    <div className="mx-auto w-full max-w-6xl py-6 md:py-10">
      <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        {/* Left column: Carryout + My Bag */}
        <div className="lg:col-span-3 space-y-10">
          {/* Carryout Order */}
          <StoreInformation style={BorderStyle} store={store} />

          {/* My Bag */}
          <MyBagList style={BorderStyle} />
        </div>

        {/* Right column: Order Details + Payment */}
        <OrderDetails style={BorderStyle} />
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";

const Order = () => {
  const cardBase =
    "flex flex-col items-center justify-center rounded-2xl border border-gray-500 shadow-[0_4px_14px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)] p-6 min-h-[180px] md:min-h-[220px] transition-shadow cursor-pointer";

  return (
    <PageLayout title="Start an Order" className="max-w-7xl mt-50">
        <div className="pb-12 w-full pt-5">
            <div className="flex w-full">
                <div className="w-1/2 min-w-0 pr-2 md:pr-3">
                    {/* Delivery */}
                    <Link
                    to="/order/delivery"
                    className={`${cardBase} bg-brand-primary block h-full`}
                    aria-label="delivery order"
                    >
                        <img 
                        src="/delivery.png"
                        />
                        <span className="text-xl md:text-2xl font-bold text-black">
                        Delivery
                        </span>
                    </Link>
                </div>
                <div className="w-1/2 min-w-0 pl-2 md:pl-3">
                    {/* Pickup */}
                    <Link
                    to="/order/pickup"
                    className={`${cardBase} bg-brand-primary block h-full`}
                    aria-label="pickup order"
                    >
                        <img 
                        src="/pickup.png"
                        />
                        <span className="text-xl md:text-2xl font-bold text-black">
                        Pickup
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    </PageLayout>
  );
};

export default Order;

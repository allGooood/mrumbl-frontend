import { Link } from "react-router-dom";
import { type Store } from "../../api/storeService";
import { formatAddress } from "../../utils/addressFormatter";
import BuildingIcon from "../icon/BuildingIcon";
import ClockIcon from "../icon/ClockIcon";
import ArrowRightIcon from "../icon/ArrowRightIcon";

interface StoreCardProps {
  store: Store;
}

const StoreCard: React.FC<StoreCardProps> = ({ store }) => {
  const address = formatAddress(store.storeAddress);

  return (
    <li>
      <Link
        to={`/order/pickup/${store.storeId}`}
        className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 text-left transition-colors group"
      >
        <span className="mt-0.5">
          <BuildingIcon />
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-black">{store.storeName}</p>
          {address && <p className="text-sm text-gray-600">{address}</p>}
          {!store.openNow && (
            <p className="flex items-center gap-1 mt-1 text-sm text-red-600">
              <ClockIcon />
              <span>Closed</span>
            </p>
          )}
        </div>
        <span className="mt-1">
          <ArrowRightIcon />
        </span>
      </Link>
    </li>
  );
};

export default StoreCard;

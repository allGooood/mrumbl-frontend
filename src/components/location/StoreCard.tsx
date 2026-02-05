import { type Store } from "../../api/storeService";
import BuildingIcon from "../icon/BuildingIcon";
import OpenLateIcon from "../icon/OpenLateIcon";
import ArrowRightIcon from "../icon/ArrowRightIcon";

interface StoreCardProps {
  store: Store;
  onClick?: () => void;
}

const StoreCard: React.FC<StoreCardProps> = ({ store, onClick }) => {
  const address = store.storeAddress
    ? [store.storeAddress.addressDetail, store.storeAddress.address, store.storeAddress.postcode]
        .filter(Boolean)
        .join(", ")
    : "";

  return (
    <li>
      <button
        type="button"
        onClick={onClick}
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
              <OpenLateIcon />
              <span>Closed</span>
            </p>
          )}
        </div>
        <span className="mt-1">
          <ArrowRightIcon />
        </span>
      </button>
    </li>
  );
};

export default StoreCard;

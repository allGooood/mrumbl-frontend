import type { getStoreInformationResponse } from "../../../api/storeService";
import { formatAddress, truncateAddress } from "../../../utils/addressFormatter";
import LocationIcon from "../../ui/icons/LocationIcon";

type CartStoreInfoProps = {
  store: getStoreInformationResponse;
};

export default function CartStoreInfo({ store }: CartStoreInfoProps) {
  const addressLine = formatAddress(store.storeAddress);
  const truncatedAddress = truncateAddress(addressLine, 30);

  return (
    <div className="px-6 py-3 bg-gray-50 border-b border-gray-200 mb-2">
      <div className="flex items-start gap-2">
        <LocationIcon />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-black mb-1">
            {store.storeName}
          </div>
          <div className="text-xs text-gray-600 leading-relaxed">
            {truncatedAddress}
          </div>
        </div>
      </div>
    </div>
  );
}

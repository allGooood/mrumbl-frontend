import type { getStoreInformationResponse } from "../../api/storeService";
import { formatAddress, truncateAddress } from "../../utils/addressFormatter";
import { formatBusinessHoursRange } from "../../utils/timerFormatter";
import ClockIcon from "../icon/ClockIcon";
import LocationIcon from "../icon/LocationIcon";
import ChevronDownIcon from "../icon/ChevronDownIcon";
import CarryOutIcon from "../icon/CarryOutIcon";
import SelectBox from "../atom/SelectBox";
import type { OrderType } from "../../pages/Products";

interface ProductsStoreBarProps {
  store: getStoreInformationResponse;
  onStoreInfoClick: () => void;
  isLocationPanelOpen?: boolean;
  orderType: OrderType;
}

const ProductsStoreBar: React.FC<ProductsStoreBarProps> = ({
  store,
  onStoreInfoClick,
  isLocationPanelOpen = false,
  orderType,
}) => {
  
  const handleOrderTypeChange = () => {
    // 현재는 URL에서만 orderType을 관리하므로 onChange는 동작하지 않음
  };

  const addressLine = formatAddress(store.storeAddress);
  const truncatedAddress = truncateAddress(addressLine);

  const hoursText = store.storeBusinessHour
    ? formatBusinessHoursRange(store.storeBusinessHour.open, store.storeBusinessHour.close)
    : "—";

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center gap-4 lg:gap-6">
        {/* 1. 배달/Pickup 선택 */}
        <div className="flex items-center">
          <SelectBox
            value={orderType}
            onChange={handleOrderTypeChange}
            options={[
              {
                value: "PICK_UP",
                label: (
                  <>
                    <CarryOutIcon />
                    <span>Carry Out</span>
                  </>
                ),
              },
              {
                value: "DELIVERY",
                label: (
                  <>
                    <CarryOutIcon />
                    <span>Delivery</span>
                  </>
                ),
                disabled: true,
              },
            ]}
          />
        </div>

        {/* 2. 영업 시간 */}
        <div className="flex items-center gap-1.5 text-sm text-black">
          <ClockIcon className="" />
          <span>{hoursText}</span>
        </div>

        {/* 3. 스토어 주소 및 검색 */}
        <button
          type="button"
          onClick={onStoreInfoClick}
          className="flex items-center gap-1.5 text-sm text-black hover:bg-gray-50 rounded-lg px-2 py-1 -mx-2 transition-colors ml-auto"
          aria-expanded={isLocationPanelOpen}
        >
          <LocationIcon />
          <span className="text-left truncate max-w-[200px] sm:max-w-xs">
            <span className="font-bold">{store.storeName}</span>
            {truncatedAddress && (
              <span className="text-gray-700"> - {truncatedAddress}</span>
            )}
          </span>
          <span className={`shrink-0 transition-transform ${isLocationPanelOpen ? "rotate-180" : ""}`}>
            <ChevronDownIcon />
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProductsStoreBar;

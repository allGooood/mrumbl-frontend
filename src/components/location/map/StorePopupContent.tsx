import { useNavigate } from "react-router-dom";
import BuildingIcon from "../../icon/BuildingIcon";
import Button from "../../atom/Button";
import type { Store } from "../../../api/storeService";
import { formatAddress } from "../../../utils/addressFormatter";

const StorePopupContent: React.FC<{ store: Store }> = ({ store }) => {
    const navigate = useNavigate();
    const { storeName, storeAddress, coordinates } = store;
    const addressLine = formatAddress(storeAddress, { fallback: "—" });
    const postcode = storeAddress?.postcode ?? "";
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.latitude},${coordinates.longitude}`;

    return (
        <div className="store-popup min-w-[240px] max-w-[280px]">
            <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-bold text-black text-base">{storeName}</span>
            </div>
            <hr className="border-gray-300 mb-3" />

            <div className="flex gap-2 text-sm text-black mb-3">
                <BuildingIcon />
                <div className="flex flex-col">
                    <span>{addressLine}</span>
                    <span>{postcode}</span>
                </div>
            </div>
            <div className="flex gap-2">
                <Button
                    size={["small", "small", "small", "small"]}
                    className="flex-1"
                    onClick={() => navigate(`/order/pickup?store=${store.storeId}`)}
                >
                    Order
                </Button>
                <Button
                    size={["small", "small", "small", "small"]}
                    variant="outline"
                    className="flex-1"
                    onClick={() => window.open(directionsUrl, "_blank", "noopener,noreferrer")}
                >
                    Directions
                </Button>
            </div>
        </div>
    );
};

export default StorePopupContent;
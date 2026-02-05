import L from "leaflet";
import type { LatLngExpression } from "leaflet";
import { Marker, Popup, useMap } from "react-leaflet";
import type { Store } from "../../../api/storeService";
import StorePopupContent from "./StorePopupContent";

/* BuildingIcon과 동일한 path, stroke 스타일로 흰색 아이콘 */
const BUILDING_SVG =
    '<svg class="store-marker__building" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>';

const createStoreIcon = () =>
    L.divIcon({
        className: "store-marker",
        html: `<span class="store-marker__box">${BUILDING_SVG}</span>`,
        iconSize: [24, 24],
        iconAnchor: [12, 24],
    });

const storeIcon = createStoreIcon();

const StoreMarker: React.FC<{ store: Store }> = ({ store }) => {
    const map = useMap();
    const position: LatLngExpression = [
        store.coordinates.latitude,
        store.coordinates.longitude,
    ];

    return (
        <Marker
            position={position}
            icon={storeIcon}
            eventHandlers={{
                click: () => {
                    const zoomInLevel = 16;
                    map.flyTo(position, Math.max(map.getZoom(), zoomInLevel), {
                        duration: 0.35,
                    });
                },
            }}
        >
            <Popup
                className="store-popup-container"
                offset={[0, -20]}
            >
                <StorePopupContent store={store} />
            </Popup>
        </Marker>
    );
};

export default StoreMarker;
import "leaflet/dist/leaflet.css";
import L, { type LatLngExpression } from "leaflet";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { type Store } from "../../../api/storeService";
import Button from "../../atom/Button";
import BuildingIcon from "../../icon/BuildingIcon";
import StorePopupContent from "./StorePopupContent";
import StoreMarker from "./StoreMarker";

interface WorldMapProps {
    stores?: Store[];
    defaultCenter?: { latitude: number; longitude: number } | null;
}

const FALLBACK_CENTER: LatLngExpression = [51.505, -0.09];
const DEFAULT_ZOOM = 13;
const FLY_DURATION = 0.8;

interface FitBoundsToStoresProps {
    stores: Store[];
}

const FitBoundsToStores: React.FC<FitBoundsToStoresProps> = ({ stores }) => {
    const map = useMap();

    useEffect(() => {
        if (stores.length === 0) return;
        if (stores.length === 1) {
            const { latitude, longitude } = stores[0].coordinates;
            map.flyTo([latitude, longitude], DEFAULT_ZOOM, { duration: FLY_DURATION });
            return;
        }
        const bounds = L.latLngBounds(
            stores.map((s) => [s.coordinates.latitude, s.coordinates.longitude])
        );
        map.flyToBounds(bounds, {
            padding: [32, 32],
            maxZoom: 15,
            duration: FLY_DURATION,
        });
    }, [map, stores]);

    return null;
};

const WorldMap: React.FC<WorldMapProps> = ({ stores = [], defaultCenter = null }) => {
    const center: LatLngExpression =
        stores.length > 0
            ? [stores[0].coordinates.latitude, stores[0].coordinates.longitude]
            : defaultCenter
                ? [defaultCenter.latitude, defaultCenter.longitude]
                : FALLBACK_CENTER;

    return (
        <div className="relative rounded-2xl overflow-hidden bg-gray-200 min-h-[320px] w-full shadow-sm">
            <MapContainer
                center={center}
                zoom={DEFAULT_ZOOM}
                scrollWheelZoom
                className="h-full w-full"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <FitBoundsToStores stores={stores} />

                {/* Marker, 클릭 시 Popup */}
                {stores.map((store) => (
                    <StoreMarker key={store.storeId} store={store} />
                ))}

            </MapContainer>
        </div>
    );
};

export default WorldMap;
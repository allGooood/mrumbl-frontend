import List from "../../ui/List";
import SearchBar from "../store/SearchBar";
import StoreCard from "../store/StoreCard";
import { useUserLocation } from "../../../features/store/hooks/useUserLocation";
import { useStoreSearch } from "../../../features/store/hooks/useStoreSearch";

const LocationPickerPanel: React.FC = () => {
  const { userLocation } = useUserLocation();
  const { search, setSearch, stores } = useStoreSearch(userLocation, { minSearchLength: 3 });

  return (
    <div className="bg-transparent">
      <div className="max-w-3xl mx-auto px-4 pb-8">
        <div className="mt-3 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-gray-100">
            <SearchBar value={search} onChange={setSearch} />
          </div>
          <div className="px-4 sm:px-5 py-3 max-h-[70vh] overflow-y-auto">
            <List>
              {stores.map((store) => (
                <StoreCard key={store.storeId} store={store} />
              ))}
            </List>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPickerPanel;

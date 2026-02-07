import List from "../components/atom/List";
import WorldMap from "../components/location/map/WorldMap";
import SearchBar from "../components/location/SearchBar";
import StoreCard from "../components/location/StoreCard";
import { useUserLocation } from "../hooks/useUserLocation";
import { useStoreSearch } from "../hooks/useStoreSearch";
import { Link } from "react-router-dom";

const SelectLocation = () => {
  const { userLocation } = useUserLocation();
  const { search, setSearch, stores } = useStoreSearch(userLocation, { minSearchLength: 3 });

  return (
    <div className="w-full max-w-6xl mx-auto bg-white mt-30">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[50vh]">

        {/* Map */}
        <WorldMap stores={stores} defaultCenter={userLocation} />

        {/* Location List */}
        <div className="flex flex-col p-6 lg:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-black mb-6">
            Select a location
          </h1>

          <SearchBar value={search} onChange={setSearch} />

          <List>
            {stores.map((store) => (
              <Link key={store.storeId} to={`/order/pickup/${store.storeId}`}>
                <StoreCard store={store} />
              </Link>
            ))}
          </List>
        </div>

      </div>
    </div>
  );
};

export default SelectLocation;

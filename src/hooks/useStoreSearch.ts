import { useEffect, useState } from "react";
import { type Store, useStoreService } from "../api/storeService";

interface UseStoreSearchOptions {
  minSearchLength?: number;
  nearbyRadius?: number;
}

export const useStoreSearch = (userLocation: { latitude: number; longitude: number } | null, options: UseStoreSearchOptions = {}) => {
  const { minSearchLength = 2, nearbyRadius = 5000 } = options;
  const [search, setSearch] = useState("");
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getStores, getNearbyStores } = useStoreService();

  // 초기 로드 시 주변 매장 조회
  useEffect(() => {
    const fetchNearbyStores = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getNearbyStores({
          x: userLocation?.longitude ?? null,
          y: userLocation?.latitude ?? null,
          r: nearbyRadius,
        });
        setStores(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch stores");
        console.error("Failed to fetch stores:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNearbyStores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLocation]);

  // 검색어 변경 시 매장 조회
  useEffect(() => {
    if (search.length < minSearchLength) {
      setStores([]);
      return;
    }

    const fetchStores = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getStores(search);
        setStores(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch stores");
        console.error("Failed to fetch stores:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return { search, setSearch, stores, loading, error };
};

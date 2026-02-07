import { useEffect, useState } from 'react';
import MainProductCard from '../components/main/MainProductCard';
import { useProductActions, type Cookie } from '../api/productService';
import FullPageLoader from '../components/layout/FullPageLoader';
import Button from '../components/atom/Button';
import { OrderNowButton } from '../components/OrderNowButton';

const Home = () => {
  const [cookies, setCookies] = useState<Cookie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getCookies } = useProductActions();

  useEffect(() => {
    const fetchCookies = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCookies();
        setCookies(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '쿠키 정보를 불러오는데 실패했습니다.');
        console.error('Failed to fetch cookies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCookies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <main className="w-full bg-white min-h-screen pb-16 flex items-center justify-center">
        <div className="text-red-600 text-lg">{error}</div>
      </main>
    );
  }

  return (
    <main className="flex flex-col w-full bg-white flex-1">
      {loading && <FullPageLoader />}
      
      {/* Main Image */}
      <div className="relative w-full mb-30">
        <img 
          src="/main.webp"
          alt="Main"
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center flex-col gap-10">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-center px-4 drop-shadow-lg">
            Taste Mrumbl's Classic Flavor Right Now!
          </h1>
          <OrderNowButton />
        </div>
      </div>
      
      {/* Product Cards */}
      <div className="w-full flex flex-col">
        {cookies.map((cookie, index) => (
          <MainProductCard
            key={cookie.cookieId}
            cookieId={cookie.cookieId}
            cookieName={cookie.cookieName}
            imageUrl={cookie.imageUrl}
            description={cookie.description}
            isReversed={index % 2 === 1}
          />
        ))}
      </div>
    </main>
  );
};

export default Home;

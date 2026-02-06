import { useCallback, useEffect, useState } from "react";
import { type Cookie, useProductActions, type getProductDetailResponse } from "../../api/productService";
import QuantitySelector, { getAvailableMax } from "../atom/QuantitySelector";
import Button from "../atom/Button";
import { formatCentAsDollar } from "../../utils/priceFormatter";

type CookieBoxDetailContentProps = {
  product: getProductDetailResponse;
};

const CookieBoxDetailContent = ({ product }: CookieBoxDetailContentProps) => {
  const { getCookies } = useProductActions();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cookies, setCookies] = useState<Cookie[]>([]);
  const [cookieQuantities, setCookieQuantities] = useState<Record<number, number>>({});

  useEffect(() => {
    const fetchCookies = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCookies();
        setCookies(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "쿠키 정보를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
        fetchCookies();
    }, []);

    const total = Object.values(cookieQuantities)
                        .reduce((sum, q) => sum + q, 0);

    const required = product.requiredItemCount ?? 0;

    const totalPrice = cookies.reduce((sum, cookie) => {
        const qty = cookieQuantities[cookie.cookieId] ?? 0;
        const additionalPriceInCents = cookie.additionalPrice != null && 
                                        cookie.additionalPrice > 0 ? cookie.additionalPrice * 100 : 0;
        return sum + (qty * additionalPriceInCents);
    }, product.unitAmount);

    const setCookieQuantity = useCallback((cookieId: number, value: number) => {
        setCookieQuantities((prev) => ({ ...prev, [cookieId]: value }));
    }, []);

    return (
        <>
            <h1 className="text-2xl md:text-4xl font-extrabold text-black mb-2">
                Select {product.requiredItemCount} Flavors
            </h1>
            <div className="flex flex-col mt-4">
                {cookies.map((cookie) => {
                    const qty = cookieQuantities[cookie.cookieId] ?? 0;
                    const othersSum = total - qty;
                    const max = required > 0 ? getAvailableMax(required, othersSum) : undefined;

                    return (
                        <div
                            key={cookie.cookieId}
                            className="flex justify-between items-center border-b border-gray-200 py-3"
                        >
                            <div className="flex flex-row items-center flex-1 min-w-0">
                            <div className="w-[50px] h-[50px] shrink-0 rounded overflow-hidden">
                                <img
                                src={cookie.imageUrl}
                                alt={cookie.cookieName}
                                className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="ml-3 flex flex-col justify-center min-w-0">
                                <p className="font-semibold leading-tight text-black">{cookie.cookieName}</p>
                                <span className="flex flex-row items-center gap-2 mt-0.5">
                                {cookie.additionalPrice != null && cookie.additionalPrice > 0 && (
                                    <span className="font-semibold text-gray-600 text-sm whitespace-nowrap">+${cookie.additionalPrice} each /</span>
                                )}
                                <span className="text-gray-500 text-sm whitespace-nowrap">{cookie.cookieCalorie} cal</span>
                                </span>
                            </div>
                            </div>

                            <div className="shrink-0 ml-2">
                            <QuantitySelector
                                value={qty}
                                onChange={(value) => setCookieQuantity(cookie.cookieId, value)}
                                min={0}
                                max={max}
                                size="small"
                                aria-label={`${cookie.cookieName} 수량`}
                            />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-8">
                <Button
                    type="button"
                    onClick={() => {
                        // TODO: cart 연동
                    }}
                    className="w-full flex flex-row justify-between"
                    disabled={total < required || required === 0}
                >
                    {total < required ? (
                        <p>Add {required - total} more</p>
                    ) : (
                        <p>Add to Bag</p>
                    )}
                    <p>{formatCentAsDollar(totalPrice)}</p>
                </Button>
            </div>
        </>
    );
};

export default CookieBoxDetailContent;


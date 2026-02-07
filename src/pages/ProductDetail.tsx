import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductActions, type getProductDetailResponse, type Product } from "../api/productService";
import FullPageLoader from "../components/layout/FullPageLoader";
import { parseId } from "../utils/urlManager";
import CookieBoxDetailContent from "../components/products/CookieBoxDetailContent";
import MerchDetailContent from "../components/products/MerchDetailContent";

type RouteParams = {
    storeId: string;
    productId: string;
};

const ProductDetail = () => {
    const { storeId: storeIdParam, productId: productIdParam } = useParams<RouteParams>();
    const storeId = parseId(storeIdParam);
    const productId = parseId(productIdParam);

    const { getProductDetail } = useProductActions();

    const [product, setProduct] = useState<getProductDetailResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (storeId === null || productId === null) return;

        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const data = await getProductDetail(storeId, productId);
                setProduct(data);

            } catch (err) {
                setError(
                err instanceof Error ? err.message : "상품 정보를 불러오는데 실패했습니다."
                );          
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [storeId, productId]);

    return (
        <div className="flex flex-col min-h-[calc(100vh-120px)] bg-white mt-8">
        {loading && <FullPageLoader />}

        {/* 메인: 이미지 + 상품 정보 */}
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8 md:py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-15 items-start">
                
                {/* 왼쪽: 상품 이미지 */}
                <div className="w-full aspect-square rounded-2xl bg-brand-primary overflow-hidden flex items-center justify-center">
                    {product?.imageUrl ? (
                    <img
                        src={product.imageUrl}
                        alt={product.productName}
                        className="w-full h-full object-cover object-center"
                    />
                    ) : (
                    <span className="text-black text-sm">No image</span>
                    )}
                </div>

                {/* 오른쪽: productType별 상품 정보 */}
                <div className="flex flex-col">
                    <div className="flex flex-col">
                        {product?.productType === "MERCH" && <MerchDetailContent product={product} />}
                        {product?.productType === "COOKIE_BOX" && <CookieBoxDetailContent product={product} />}
                    </div>
                </div>
            </div>
        </main>
        </div>
    );
};

export default ProductDetail;

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { getProductDetailResponse } from "../../../api/productService";
import { formatCentAsDollar } from "../../../utils/priceFormatter";
import Button from "../../ui/Button";
import QuantitySelector from "../../ui/QuantitySelector";
import { parseId } from "../../../utils/urlManager";
import { useAddToCart } from "../../../features/cart/hooks/useAddToCart";
import { useAppDialogStore } from "../../../shared/stores/useAppDialogStore";

const MerchDetailContent = ({ product }: { product: getProductDetailResponse }) => {
    const { storeId: storeIdParam } = useParams<{ storeId?: string }>();
    const navigate = useNavigate();
    const storeId = parseId(storeIdParam);

    const { addToCart, loading, error, setError } = useAddToCart({
        productId: product.productId,
        storeId,
        productType: product.productType
    });

    const [quantity, setQuantity] = useState(1);

    const { showDialog } = useAppDialogStore();

    useEffect(() => {
        if (!error) return;
        showDialog({
            title: "Invalid request",
            description: error,
            onConfirm: () => {
                setError(null);
            },
        });
    }, [error, showDialog, setError, navigate]);


    return (
        <>
            <h1 className="text-2xl md:text-4xl font-bold text-black mb-2">
                {product.productName}
            </h1>
            <p className="text-black text-lg mb-6">
                {formatCentAsDollar(product.unitAmount)}
            </p>
            <p className="text-black text-base leading-relaxed">
                {product.description}
            </p>

            <div className="flex items-center justify-between gap-5 mt-15">
                <QuantitySelector
                    value={quantity}
                    onChange={setQuantity}
                    aria-label="수량"
                />

                <Button
                    type="button"
                    onClick={() => addToCart({quantity})}
                    disabled={loading}
                    className="flex-1 min-w-[200px] md:max-w-md"
                >
                    {loading ? "Adding…" : "Add to Bag"}
                </Button>
            </div>
        </>
    );
};

export default MerchDetailContent;

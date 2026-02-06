import { useState } from "react";
import type { getProductDetailResponse } from "../../api/productService";
import { formatCentAsDollar } from "../../utils/priceFormatter";
import Button from "../atom/Button";
import QuantitySelector from "../atom/QuantitySelector";

const MerchDetailContent = ({ product }: { product: getProductDetailResponse }) => {
    const [quantity, setQuantity] = useState(1);
    
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
                {/* 수량 선택 */}
                <QuantitySelector
                    value={quantity}
                    onChange={setQuantity}
                    aria-label="수량"
                />

                {/* Add to Bag 버튼 */}
                <Button
                    type="button"
                    onClick={() => {}}
                    className="flex-1 min-w-[200px] md:max-w-md"
                >
                    Add to Bag
                </Button>
            </div>
        </>
    );
};

export default MerchDetailContent;
import { useCartStore } from "../../features/cart/stores/useCartStore";
import type React from "react";
import Button from "../ui/Button";

interface ViewBagButtonProps {
    totalItems: number;
}

const ViewBagButton: React.FC<ViewBagButtonProps> = ({
    totalItems,
}) => {
    const { openCart } = useCartStore();
  
    return (
        <Button 
            type="button" 
            onClick={openCart}
            className="flex items-center gap-3">
            <div className="relative">
                <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
                </svg>
                <span className="absolute -top-1 -left-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {totalItems}
                </span>
            </div>
            View Bag
        </Button>
    );
};

export default ViewBagButton;
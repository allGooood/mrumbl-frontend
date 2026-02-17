import React from "react";
import Button from "../../ui/Button";

interface ProductEmptyProps {
  /** Called when user taps "Choose another store" */
  onChooseAnotherStore?: () => void;
}

export default function ProductEmpty({ onChooseAnotherStore }: ProductEmptyProps) {
  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center py-16 px-6">
      {/* Icon */}
      <div
        className="w-20 h-20 rounded-2xl bg-brand-primary/30 flex items-center justify-center mb-6"
        aria-hidden
      >
        <svg
          className="w-10 h-10 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      </div>

      {/* Heading */}
      <h2 className="text-xl md:text-2xl font-extrabold text-black text-center mb-2">
        No products available
      </h2>

      {/* Description */}
      <p className="text-gray-600 text-center text-base leading-relaxed mb-8 max-w-sm">
        This store doesn’t have any products to show right now. Try choosing another location.
      </p>

      {/* CTA */}
      {onChooseAnotherStore && (
        <Button
          type="button"
          variant="outline"
          size="medium"
          onClick={onChooseAnotherStore}
        >
          Choose another store
        </Button>
      )}
    </div>
  );
}

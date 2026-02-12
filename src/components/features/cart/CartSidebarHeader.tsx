type CartSidebarHeaderProps = {
  onClose: () => void;
};

export default function CartSidebarHeader({ onClose }: CartSidebarHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
      <h2 className="text-xl font-bold text-black">My Bag</h2>
      <button
        type="button"
        onClick={onClose}
        className="p-2 -m-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-black transition-colors"
        aria-label="Close cart"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

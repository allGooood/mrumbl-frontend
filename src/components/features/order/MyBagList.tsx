import React, { useState } from 'react';
import { formatCentAsDollar } from '../../../utils/priceFormatter';
import { useCartStore } from '../../../features/cart/stores/useCartStore';
import { formatCookieOptions } from '../cart/CartItemRow';

interface MyBagListProps {
    style: string;
}

const NOTE_MAX_LENGTH = 150;

const MyBagList: React.FC<MyBagListProps> = ({
    style: BorderStyle,
}) => {
    const [note, setNote] = useState("");
    const { items } = useCartStore();

    return (
        <section className={`flex max-h-[80vh] flex-col ${BorderStyle}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-4 shrink-0">
              My Bag
            </h2>

            <div className="mb-6 shrink-0">
                <p className="text-sm text-gray-700 mb-2">
                    Ordering for someone special? Add a personal note to go on the box!
                </p>
                <div className="relative">
                    <textarea
                    placeholder="Note (optional)"
                    value={note}
                    onChange={(e) =>
                        setNote(e.target.value.slice(0, NOTE_MAX_LENGTH))
                    }
                    maxLength={NOTE_MAX_LENGTH}
                    rows={3}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black resize-none"
                    />
                    <span className="absolute bottom-2 right-3 text-xs text-gray-400">
                    {NOTE_MAX_LENGTH - note.length}
                    </span>
                </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto">
                <ul className="space-y-4 pr-1">
                {items.map((item) => (
                    <li
                    key={item.cartId}
                    className="flex gap-4 p-4 rounded-xl bg-gray-50/50"
                    >
                        <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                            {item.imageUrl ? (
                            <img
                                src={item.imageUrl}
                                alt={item.productName}
                                className="w-full h-full object-cover"
                            />
                            ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                No image
                            </div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-black">{item.productName}</p>
                            
                            {item.options && item.options.length > 0 && (
                                <ul className="text-xs text-gray-600 mt-1 space-y-0.5">
                                    {formatCookieOptions(item.options).map((line, i) => (
                                        <li key={i} className="leading-relaxed">
                                            {line}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            
                            {/* {item.productType === 'COOKIE_BOX' && item.description && (
                                <p className="text-sm text-gray-600 mt-1 line-clamp-2 leading-relaxed">
                                    {item.description}
                                </p>
                            )} */}
                            
                            <p className="text-sm text-gray-500 mt-1.5">
                                Qty: {item.quantity}
                            </p>
                        </div>
                        <div className="text-right shrink-0">
                            <p className="text-xs text-gray-400">{formatCentAsDollar(item.unitAmount)}</p>
                            <p className="font-semibold text-black tabular-nums mt-5">
                                {formatCentAsDollar(
                                    item.productAmount ?? item.unitAmount * item.quantity
                                )}
                            </p>
                        </div>
                    </li>
                ))}
                </ul>
            </div>
        </section>
    );
};

export default MyBagList;
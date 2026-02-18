import React, { useState } from 'react';
import { formatCentAsDollar } from '../../../utils/priceFormatter';
import { useCartStore } from '../../../features/cart/stores/useCartStore';
import { Link } from 'react-router-dom';
import Button from '../../ui/Button';
import Payment from './Payment';
import OrderDetailsFooter from './OrderDetailsFooter';

interface OrderDetailsProps{
    style: string;
}

const TIP_OPTIONS = [200, 300, 500]; // cents
const TAX_RATE = 0.0471;

const OrderDetails: React.FC<OrderDetailsProps> = ({
    style: BorderStyle,
}) => {
    const { getSubTotal } = useCartStore();

    const [tipCents, setTipCents] = useState(200);
    const [tipOther, setTipOther] = useState("");

    const subtotalCents = getSubTotal();
    const taxCents = Math.round(subtotalCents * TAX_RATE);
    const tipAmountCents = tipOther ? Math.round(parseFloat(tipOther) * 100) || 0 : tipCents;
    const totalCents = subtotalCents + taxCents + tipAmountCents;

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: submit order API
    };

    return (
        <div className={`${BorderStyle} lg:col-span-2 space-y-8`}>
          {/* Order Details */}
        <section>
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
              Order Details
            </h2>
            <div className="space-y-2 text-md">
              <div className="flex justify-between font-bold">
                <span className="text-gray-600">Subtotal</span>
                <span className="tabular-nums">{formatCentAsDollar(subtotalCents)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Sales Tax (4.71%)</span>
                <span className="tabular-nums">{formatCentAsDollar(taxCents)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Tip</span>
                <span className="tabular-nums">{formatCentAsDollar(tipAmountCents)}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
                {TIP_OPTIONS.map((cents) => (
                    <button
                        key={cents}
                        type="button"
                        onClick={() => {
                            setTipCents(cents);
                            setTipOther("");
                        }}
                        className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-colors ${
                            !tipOther && tipCents === cents
                            ? "bg-black text-white border-black"
                            : "border-gray-300 text-gray-700 hover:border-gray-400"
                        }`}
                    >
                        {formatCentAsDollar(cents)}
                    </button>
                ))}
                <input
                    type="number"
                    min="0"
                    step="1"
                    placeholder="Other"
                    value={tipOther}
                    onChange={(e) => setTipOther(e.target.value)}
                    className="w-20 px-3 py-2 rounded-full text-sm border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                />
            </div>
            <p className="text-xs text-gray-500 mt-2">
                100% of tips go to the bakers
            </p>
            <p className="text-xl font-bold text-black flex justify-between mt-5">
                <span>Total</span>
                <span>{formatCentAsDollar(totalCents)}</span>
            </p>
        </section>
            

        <hr className="border border-gray-100"/>

        {/* Payment */}
        <Payment />

        {/* Gift Card or Voucher */}
        <OrderDetailsFooter />

        <form onSubmit={handlePlaceOrder} className="mt-6">
            <Button
            type="submit"
            variant="primary"
            className="w-full py-4 text-base font-bold disabled:opacity-50"
            >
            Place order
            </Button>
        </form>
        </div>
    );
};

export default OrderDetails;
import React, { useState } from 'react';

const Payment = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  return (
    <section>
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
            Payment
        </h2>
        <div className="space-y-4">
            <div className="flex items-center gap-2">
            <input
                type="radio"
                name="payment"
                id="payment-card"
                defaultChecked
                className="rounded-full border-gray-400 text-black focus:ring-black"
            />
            <label htmlFor="payment-card" className="text-sm font-medium">
                Card
            </label>
            </div>
            <div className="flex items-center gap-2 opacity-60 cursor-not-allowed" aria-disabled="true">
            <input
                type="radio"
                name="payment"
                id="payment-link"
                disabled
                className="rounded-full border-gray-400"
            />
            <label htmlFor="payment-link" className="text-sm font-medium text-gray-500 select-none">
                Secure checkout via Link
            </label>
            </div>
        </div>

        <div className="mt-4 space-y-4">
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Card number
            </label>
            <input
                type="text"
                placeholder="1234 1234 1234 1234"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            />
            <div className="flex gap-2 mt-2">
                {['Visa', 'Mastercard', 'Amex', 'Discover'].map((brand) => (
                <span
                    key={brand}
                    className="text-xs text-gray-400 border border-gray-200 rounded px-2 py-0.5"
                >
                    {brand}
                </span>
                ))}
            </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiration date
                </label>
                <input
                type="text"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                Security code (CVC)
                </label>
                <input
                type="text"
                placeholder="CVC"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                />
            </div>
            </div>
        </div>
        <p className="text-xs text-gray-500 mt-4">
            By providing your card details, you agree that Mrumbl may charge your card in accordance with our terms.
        </p>
    </section>
  );
};

export default Payment;
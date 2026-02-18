import React from 'react';
import { Link } from 'react-router-dom';
import { showInfoToast } from '../../../utils/toast';

const OrderDetailsFooter = () => {
  const handleGiftCardClick = () => {
    showInfoToast('준비 중입니다');
  };

  return (
    <section>
      <button
        type="button"
        onClick={handleGiftCardClick}
        className="flex items-center gap-2 text-xl font-bold text-black hover:underline"
      >
        <span className="text-gray-500">+</span> Gift Card or Voucher
      </button>

      <p className="text-sm text-gray-600 mt-4">
        By proceeding you agree to our{' '}
        <Link to="#" className="underline text-black">
          Terms and Conditions
        </Link>{' '}
        and confirm you have read and understand our{' '}
        <Link to="#" className="underline text-black">
          Privacy policy
        </Link>
        .
      </p>

      <div className="mt-4 flex items-center gap-3 px-4 py-3 rounded-lg bg-brand-primary text-black">
        <span className="text-xl">🏆</span>
        <span className="text-sm font-medium">
          Sign in to earn Crumbs for this order!
        </span>
      </div>
    </section>
    );
};

export default OrderDetailsFooter;
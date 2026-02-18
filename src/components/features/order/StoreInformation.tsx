import React from 'react';
import CarryOutIcon from '../../ui/icons/CarryOutIcon';
import ClockIcon from '../../ui/icons/ClockIcon';
import LocationIcon from '../../ui/icons/LocationIcon';
import type { getStoreInformationResponse } from '../../../api/storeService';
import { formatAddress } from '../../../utils/addressFormatter';

interface OrderTypeProps {
  style: string;
  store: getStoreInformationResponse;
}

const StoreInformation: React.FC<OrderTypeProps> = ({
  style: borderStyle,
  store,
}) => {
  const pickupTime = store?.storeBusinessHour?.open
    ? `${store.storeBusinessHour.open} - ${store.storeBusinessHour.close}`
    : 'Today is closed';

  const addressLine = store?.storeAddress
    ? formatAddress(store.storeAddress, { includePostcode: true })
    : '';

  return (
    <section className={borderStyle}>
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">Carryout Order</h2>

        <div className="flex flex-col gap-x-8 gap-y-7">
            <div className="flex gap-20">
                <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-700">
                    <CarryOutIcon />
                </span>
                <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Pickup method</p>
                    <p className="text-base font-semibold text-black">Carry Out</p>
                </div>
                </div>

                <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-700">
                    <ClockIcon />
                </span>
                <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Time</p>
                    <p className="text-base font-semibold text-black">{pickupTime}</p>
                </div>
                </div>
            </div>

            <div className="flex items-start gap-3 min-w-0">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-700 mt-0.5">
                <LocationIcon />
                </span>
                <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Location</p>
                <p className="text-base font-semibold text-black">{store.storeName}</p>
                <p className="text-sm text-gray-600 leading-snug mt-0.5">
                    {addressLine}
                </p>
                </div>
            </div>
        </div>
    </section>
  );
};

export default StoreInformation;
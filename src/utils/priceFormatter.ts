/**
 * 센트 단위 가격을 달러로 변환하여 포맷
 * @param cents - 센트 단위 가격 (예: 149 → "$1.49")
 */
export const formatCentAsDollar = (cents: number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    }).format(cents / 100);
};


export const parseId = (id: string | undefined): number | null => {
    if (id == null) return null;
    const num = Number(id);
    return Number.isInteger(num) ? num : null;
};
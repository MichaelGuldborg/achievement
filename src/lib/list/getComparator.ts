export type Order = 'asc' | 'desc';


const getComparator = <Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number => {
    return order === 'desc'
        ? (a, b) => getDescendingComparator(a, b, orderBy)
        : (a, b) => -getDescendingComparator(a, b, orderBy);
}


const getDescendingComparator = <T>(a: T, b: T, orderBy: keyof T) => {
    const valueA = formatValue(a[orderBy]);
    const valueB = formatValue(b[orderBy]);
    if (valueB < valueA) {
        return -1;
    }
    if (valueB > valueA) {
        return 1;
    }
    return 0;
}

const formatValue = (v: any) => {
    if(v === null || v === undefined) return v;
    if (typeof v.getMonth === 'function') {
        return (v as Date).toISOString();
    }
    return v;
}


export default getComparator;

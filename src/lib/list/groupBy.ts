export interface GroupBy<T> {
    name: string;
    items: T[];
}


export const groupByKey = <T, >(list: T[], getKey: (item: T) => string): { [k: string]: T[] } => {
    const groups: { [key: string]: T[] } = {};
    list.forEach((item) => {
        const key = getKey(item);
        if (!groups[key]) groups[key] = [];
        groups[key].push(item);
        return 0;
    }, {} as { [key: string]: T[] });

    return groups;
}

const groupBy = <T, K>(list: T[], getArray: (i: T) => K[], getKey: (item: K) => string): GroupBy<T>[] => {
    const groups: { [key: string]: T[] } = {};
    list.forEach((item) => {
        getArray(item).forEach(group => {
            const key = getKey(group);
            if (!groups[key]) groups[key] = [];
            groups[key].push(item);
            return 0;
        })
    }, {} as { [key: string]: T[] });

    return Object.keys(groups).map((key: string) => {
        return {
            name: key,
            items: groups[key]
        };
    });
}

export default groupBy;
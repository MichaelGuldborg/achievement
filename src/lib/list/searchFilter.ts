export const searchFilter = (value: { [key: string]: string }, search: string): boolean => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return Object.keys(value).reduce<boolean>((prev, current) => {
        return prev || value[current]?.toLowerCase()?.includes(searchLower);
    }, false);
};

export default searchFilter;

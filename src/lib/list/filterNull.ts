export const filterNull = <T, >(array: (T | undefined | null)[]) => {
    return array?.filter((e): e is T => e !== undefined && e !== null) ?? []
}

export default filterNull;
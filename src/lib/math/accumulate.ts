export const accumulate = (array: number[]): number[] => {
    return array.map((v, i) => {
        if (i === 0) return array[i];
        return array[i] + array.slice(0, i).reduce((a1, a2) => a1 + a2);
    })
}
export default accumulate;
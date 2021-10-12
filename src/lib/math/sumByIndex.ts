export const sumByIndex = (a: number[][]) => a.reduce((r, a) => a.map((b, i) => (r[i] || 0) + b), []);
export default sumByIndex;
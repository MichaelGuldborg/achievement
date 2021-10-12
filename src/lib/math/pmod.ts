export const pmod = (a: number, m: number) => {
    return (a % m + m) % m;
};
export default pmod;
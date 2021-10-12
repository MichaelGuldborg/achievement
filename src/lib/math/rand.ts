let _seed = 1;
export const srand = (seed: number) => _seed = seed
const USE_RANDOM_SEED = true;

export function rand() {
    if (USE_RANDOM_SEED) {
        _seed = (_seed * 9301 + 49297) % 233280;
        return (_seed / 233280);
    }
    return Math.random();
}


export const randomFloat = (min?: number, max?: number) => {
    min = min || 0
    max = max || 0;
    const r = rand();
    return min + r * (max - min);
}

export const randomInt = (max: number = 100) => {
    return Math.floor(rand() * Math.floor(max));
};

export const randomDate = (years: number = 35, months: number = 12, dates: number = 26) => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const year = Math.round(randomFloat(currentYear - years, currentYear));
    const month = randomInt(year === currentYear ? Math.min(now.getMonth(), months) : months)
    const date = randomInt(year === currentYear ? Math.min(now.getDate(), dates) : dates)
    return new Date(year, month, date);
}


export type RandomConfig = {
    min?: number,
    max?: number,
    rmin?: number,
    rmax?: number,
    from?: number[],
    count?: number,
    decimals?: number,
    continuity?: number,
    prefix?: string
};

export const randomPoints = (config: RandomConfig): { x: number, y: number; r: number; }[] => {
    const xs = randomNumbers(config);
    const ys = randomNumbers(config);
    return xs.map((x, i) => ({x, y: ys[i], r: 1}));
}

export const randomBubbles = (config: RandomConfig) => {
    return randomPoints(config).map(pt => {
        pt.r = randomFloat(config.rmin, config.rmax);
        return pt;
    });
}


export const randomNumbers = (config?: RandomConfig): number[] => {
    const min = config?.min || 0;
    const max = config?.max || 100;
    const from = config?.from || [];
    const count = config?.count || 8;
    const decimals = config?.decimals || 8;
    const continuity = config?.continuity || 1;
    const dfactor = Math.pow(10, decimals) || 0;
    const data: number[] = [];
    let i, value;

    for (i = 0; i < count; ++i) {
        value = (from[i] || 0) + randomFloat(min, max);
        if (randomFloat() <= continuity) {
            data.push(Math.round(dfactor * value) / dfactor);
        } else {
            // data.push(null);
        }
    }

    return data;
}

export default rand;
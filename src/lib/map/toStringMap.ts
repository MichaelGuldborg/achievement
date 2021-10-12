import StringMap from "../../models/StringMap";


export const mapObject = <T extends object, U>(obj: T | undefined, f: (value: T[keyof T]) => U): Record<keyof T, U> => {
    let result = {} as Record<keyof T, U>;
    if (obj === undefined || obj === null) {
        return result;
    }
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            result[i] = f(obj[i]);
        }
    }
    return result;
}

export const toStringMap = (obj?: object): StringMap => mapObject(obj, (v) => {
    if (v === undefined || v === null) return '';
    if (typeof v !== 'string') return '' + v;
    return v;
})

export default toStringMap;
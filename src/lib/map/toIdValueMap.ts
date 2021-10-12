import Identifiable from "../../models/Identifyable";

export interface IdValueMap<T> {
    [p: string]: T;
}


export const toIdValueMap = <TElement extends Identifiable>(list: TElement[]): IdValueMap<TElement> => {
    const initialValue: IdValueMap<TElement> = {};
    return list.reduce((result, value) => {
            result[value.id] = value;
            return result;
        },
        initialValue,
    );
};


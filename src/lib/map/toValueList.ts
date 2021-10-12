import Identifiable from "../../models/Identifyable";

export const toValueList = <T extends Identifiable>(values: (T | undefined)[], ids: string[]): T[] => {
    return ids.map((id) => values.find(t => t?.id === id)).filter((tag: T | undefined): tag is T => tag !== undefined);
};

export default toValueList;
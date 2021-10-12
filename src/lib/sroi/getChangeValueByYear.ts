import ChangeEffect from "../../models/ChangeEffect";

export const getInitialChangeValue = (change: ChangeEffect): number => {
    return change.count * change.successRate * change.value * (1 - change.deadWeight) * (1 - change.displacement) * (1 - change.attribution) * (1 - change.dropOff);
}

export const getChangeValueByYear = (change: ChangeEffect): number[] => {
    const initialValue = getInitialChangeValue(change);
    return Array.from({length: change.years + 1}, (v, i) => initialValue * Math.pow((1 - 0.035), i));
};

export const getAllChangeValueByYear = (changes: ChangeEffect[]): number[] => {
    return changes.reduce((result, change) => {
        const changeImpact = getChangeValueByYear(change);
        return result.map((v, i) => v + changeImpact[i])
    }, [0, 0, 0, 0, 0, 0]).map(v => Math.round(v));
}


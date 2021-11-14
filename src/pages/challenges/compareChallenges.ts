import {activityLevelMap} from "../../data/activities";
import {Challenge} from "../../models/Activity";

export const compareChallenges = (a: Challenge, b: Challenge) => {
    // sort non-checked first
    if (a.checked && !b.checked) {
        return 1;
    }
    if (b.checked && !a.checked) {
        return -1;
    }
    // sort with level first
    if (a.level && !b.level) {
        return -1;
    }
    if (b.level && !a.level) {
        return 1;
    }
    // sort by level index
    if (a.level && b.level) {
        const levelIndexA = activityLevelMap[a.level].index;
        const levelIndexB = activityLevelMap[b.level].index;
        if (levelIndexA > levelIndexB) return 1;
        if (levelIndexA < levelIndexB) return -1;
    }
    // sort alphabetically by name
    return a.name.localeCompare(b.name);
};
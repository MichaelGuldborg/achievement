import {useCurrentUser} from "./useCurrentUser";
import {useCrudListQuery} from "./useCrudListQuery";
import {Challenge} from "../models/Activity";
import {firestoreCrudService} from "../services/firestoreCrudService";
import {activityLevelMap} from "../data/activities";
import {useCrudQuery} from "./useCrudQuery";

export const firestoreHooks = {
    useUserChallenge: (challengeId: string) => {
        const currentUser = useCurrentUser();
        const collection = `users/${currentUser?.id}/challenges`;
        return useCrudQuery<Challenge>(challengeId, firestoreCrudService(collection))
    },
    useUserChallenges: () => {
        const currentUser = useCurrentUser();
        const collection = `users/${currentUser?.id}/challenges`;
        return useCrudListQuery<Challenge>(firestoreCrudService(collection, (a: Challenge, b: Challenge) => {
            // sort non-checked first
            if (a.checked && !b.checked) {
                return 1;
            }
            if (b.checked && !a.checked) {
                return -1;
            }

            // sort by updated at
            if (a.updatedAt && b.updatedAt) {
                if (a.updatedAt > b.updatedAt) {
                    return -1;
                }
                if (b.updatedAt > a.updatedAt) {
                    return 1;
                }
                return 0;
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
        }));
    }
}


export default firestoreHooks;
export interface Activity {
    id: string;
    name: string;
    imageUrl?: string;
    levels: ActivityLevel[]
    material: ActivityMaterial[]
}

interface ActivityMaterial {
    id: string;
    name: string;
    type: string; // youtube, book, movie
    url: string;
}

export interface ActivityLevel {
    id: string;
    name: string;
    challenges: Challenge[]
}

export interface Challenge {
    id: string;
    name: string;
    description: string;
    isCompleted?: boolean;
}

export const getMaxCompletedLevel = (a: Activity) => {
    for (let i = 0; i < a.levels.length; i++) {
        if (!isLevelComplete(a.levels[i])) {
            return i;
        }
    }
    return a.levels.length;
}

export const isLevelComplete = (l: ActivityLevel) => {
    return !l.challenges.find(e => !e.isCompleted)
}


export default Activity;
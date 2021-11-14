export interface Activity {
    id: string;
    name: string;
    imageUrl?: string;
    tags?: ActivityTag[],
    material?: ActivityMaterial[]
    levels: ActivityLevel[]
}

export type ActivityTag =
    'physical'
    | 'sport'
    | 'food'
    | 'dance'
    | 'musical'
    | 'language'
    | 'spiritual'
    | 'game'
    | 'creativity';

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
    activity?: string;
    level?: string;
    name: string;
    description?: string;
    checked?: boolean
    hidden?: boolean;

    createdAt?: Date;
    updatedAt?: Date;


    // 30 day challenge
    start?: Date;
    checkIndex?: number;
}

export const getMaxCompletedLevel = (a: Activity) => {
    if (a.levels === undefined) return 0;
    for (let i = 0; i < a.levels.length; i++) {
        if (!isLevelComplete(a.levels[i])) {
            return i;
        }
    }
    return a.levels.length;
}

export const isLevelComplete = (l: ActivityLevel) => {
    return !l.challenges.find(e => !e.checked)
}


export default Activity;
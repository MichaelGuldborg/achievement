import {useState} from "react";
import activities from "../data/activities";
import Activity from "../models/Activity";


export const useActivity = (id: string) => {
    const activity = activities.find(e => e.id === id) || activities[0];
    return useState(activity);
}

export const useAllActivities = (): Activity[] => {
    return activities;
}
export default useActivity
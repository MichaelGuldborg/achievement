import {Activity} from "../models/Activity";
import climbing from "./activities/climbing";
import weightLifting from "./activities/weightLifting";


export const activities: Activity[] = [
    weightLifting,
    climbing,
]

export default activities;
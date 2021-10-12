import {groupedIssues} from "./issues";
import {randomDate, randomInt} from "../lib/math/rand";
import Issue from "../models/Issue";
import PatientChange from "../models/PatientChange";


export const dummyIssues = () => {
    return Object.keys(groupedIssues).map(key => {
        const issues = groupedIssues[key];
        return issues[randomInt(issues.length)]
    })
}

export const dummyChanges = (issues: Issue[]): PatientChange[] => {
    return issues.map(current => {
        const altIssues = groupedIssues[current.type].filter(i => i.id !== current.id);
        const previous = altIssues[randomInt(altIssues.length)];
        return ({
            id: '' + previous.id + '-' + current.id,
            name: 'Fra ' + previous.name + ' til ' + current.name,
            type: current.type,
            before: previous.id,
            after: current.id,
            date: randomDate(3),
            indicator: current.value - previous.value,
        });
    });
}
export default dummyIssues;
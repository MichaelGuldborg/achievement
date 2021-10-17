import {randomId} from "../lib/math/randomId";


export const storyLines = [{
    id: 'standard',
    name: 'Standard',
    entries: [{
        id: randomId(),
        index: 0,
        name: 'Baby',
        color: '#29b6f6',
        weeks: 6.5 * 52,
    }, {
        id: randomId(),
        index: 1,
        name: 'Elementary school',
        color: '#7e57c2',
        weeks: 10 * 52,
    }, {
        id: randomId(),
        index: 2,
        name: 'High school',
        color: '#fdd835',
        weeks: 3 * 52,
    }, {
        id: randomId(),
        index: 3,
        name: 'Gap year',
        color: '#66bb6a',
        weeks: 2 * 52,
    }, {
        id: randomId(),
        index: 4,
        name: 'Bachelors degree',
        color: '#ffa726',
        weeks: 3 * 52,
    }, {
        id: randomId(),
        index: 5,
        name: 'Masters degree',
        color: '#f4511e',
        weeks: 2 * 52,
    }, {
        id: randomId(),
        index: 5,
        name: 'Career',
        color: '#2196f3',
        weeks: 4.5 * 52,
    }, {
        id: randomId(),
        index: 5,
        name: 'Have kids',
        color: '#f06292',
        weeks: 18 * 52,
    }, {
        id: randomId(),
        index: 5,
        name: 'Career',
        color: '#2196f3',
        weeks: 17 * 52,
    }, {
        id: randomId(),
        index: 5,
        name: 'Retirement',
        color: '#009688',
        weeks: 24 * 52,
    }]
}]

export default storyLines;
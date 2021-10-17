import {randomId} from "../lib/math/randomId";
import {StoryLine} from "../pages/storyline/StoryLinePage";


export const storyLines: StoryLine[] = [{
    id: 'standard',
    name: 'Standard',
    entries: [{
        id: randomId(),
        index: 0,
        name: 'Baby',
        color: '#29b6f6',
        start: 0,
        end: 338,
        weeks: 338,
    }, {
        id: randomId(),
        index: 1,
        name: 'Elementary school',
        color: '#7e57c2',
        start: 338,
        end: 338 + 520,
        weeks: 10 * 52, // 520
    }, {
        id: randomId(),
        index: 2,
        name: 'High school',
        color: '#fdd835',
        start: 338 + 520,
        end: 338 + 520 + 156,
        weeks: 3 * 52, // 156
    }, {
        id: randomId(),
        index: 3,
        name: 'Gap year',
        color: '#66bb6a',
        start: 338 + 520 + 156,
        end: 338 + 520 + 156 + 104,
        weeks: 2 * 52, // 104
    }, {
        id: randomId(),
        index: 4,
        name: 'Bachelors degree',
        color: '#ffa726',
        start: 338 + 520 + 156 + 104,
        end: 338 + 520 + 156 + 104 + 156,
        weeks: 3 * 52,
    }, {
        id: randomId(),
        index: 5,
        name: 'Masters degree',
        color: '#f4511e',
        start: 338 + 520 + 156 + 104 + 156,
        end: 338 + 520 + 156 + 104 + 156 + 104,
        weeks: 2 * 52,
    }, {
        id: randomId(),
        index: 5,
        name: 'Career',
        color: '#2196f3',
        start: 338 + 520 + 156 + 104 + 156 + 104,
        end: 338 + 520 + 156 + 104 + 156 + 104 + 234,
        weeks: 4.5 * 52,
    }, {
        id: randomId(),
        index: 5,
        name: 'Have kids',
        color: '#f06292',
        start: 338 + 520 + 156 + 104 + 156 + 104 + 234,
        end: 338 + 520 + 156 + 104 + 156 + 104 + 234 + 936,
        weeks: 18 * 52,
    }, {
        id: randomId(),
        index: 5,
        name: 'Career',
        color: '#2196f3',
        start: 338 + 520 + 156 + 104 + 156 + 104 + 234 + 936,
        end: 338 + 520 + 156 + 104 + 156 + 104 + 234 + 936 + 884,
        weeks: 17 * 52,
    }, {
        id: randomId(),
        index: 5,
        name: 'Retirement',
        color: '#009688',
        start: 338 + 520 + 156 + 104 + 156 + 104 + 234 + 936 + 884,
        end: 338 + 520 + 156 + 104 + 156 + 104 + 234 + 936 + 884 + 1248,
        weeks: 24 * 52,
    }]
}, {
    id: 'location',
    name: 'Living location',
    entries: [{
        id: randomId(),
        index: 0,
        name: 'Family house',
        color: '#29b6f6',
        start: 0,
        end: 1092,
    }, {
        id: randomId(),
        index: 1,
        name: 'First apartment',
        color: '#7e57c2',
        start: 1092,
        end: 1092 + 52,
    }, {
        id: randomId(),
        index: 2,
        name: 'University dormitory',
        color: '#fdd835',
        start: 1092 + 52,
        end: 1092 + 52 + 52 * 5,
    }]
}]

export default storyLines;
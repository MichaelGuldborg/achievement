import {randomId} from "../lib/math/randomId";


export interface Balance {
    id: string;
    name: string;
    description?: string;
}


export const balances: Balance[] = [{
    id: randomId(),
    name: 'Love relationships',
    description: 'Date nights'
}, {
    id: randomId(),
    name: 'Friendship',
    description: 'calling close friends, getting together for dinner'
}, {
    id: randomId(),
    name: 'Adventure',
    description: 'Holidays, trips / year, new event / month'
}, {
    id: randomId(),
    name: 'Environment',
    description: 'Make bed, no dirty dishes, trashcan',
}, {
    id: randomId(),
    name: 'Health',
    description: 'Fitness, food routine, push-ups',
}, {
    id: randomId(),
    name: 'Intellect',
    description: 'Reading books',
}, {
    id: randomId(),
    name: 'Spiritual',
    description: 'Medidation, Journaling',
}, {
    id: randomId(),
    name: 'Carrier',
    description: 'Join group, attend events',
}, {
    id: randomId(),
    name: 'Creative life',
    description: 'Journal, Paint, Writing',
}, {
    id: randomId(),
    name: 'Family life',
    description: 'Call family',
}, {
    id: randomId(),
    name: 'Community life',
    description: 'Volunteer, Donations',
}];

export default balances;
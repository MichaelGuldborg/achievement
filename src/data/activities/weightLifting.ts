import {Activity} from "../../models/Activity";
import {randomId} from "../../lib/math/randomId";

export const weightLifting: Activity = {
    id: randomId(),
    name: 'Weight Lifting',
    material: [],
    levels: [{
        id: randomId(),
        name: 'Beginner',
        challenges: [{
            id: randomId(),
            name: '40kg 3x8 Weighted squats',
            description: '',
            isCompleted: true,
        }, {
            id: randomId(),
            name: '40kg 3x8 Bench press',
            description: '',
            isCompleted: true,
        }, {
            id: randomId(),
            name: '20kg 3x8 Overhead press',
            description: '',
            isCompleted: true,
        }, {
            id: randomId(),
            name: '20kg 3x8 Bent over rows',
            description: '',
            isCompleted: true,
        }, {
            id: randomId(),
            name: '60kg 3x8 Deadlift',
            description: '',
            isCompleted: true,
        }]
    }, {
        id: randomId(),
        name: 'Intermediate',
        challenges: [{
            id: randomId(),
            name: '60kg 3x8 Weighted squats',
            description: '',
            isCompleted: true,
        }, {
            id: randomId(),
            name: '60kg 3x8 Bench press',
            description: '',
            isCompleted: true,
        }, {
            id: randomId(),
            name: '30kg 3x8 Overhead press',
            description: '',
            isCompleted: true,
        }, {
            id: randomId(),
            name: '30kg 3x8 Bent over rows',
            description: '',
            isCompleted: true,
        }, {
            id: randomId(),
            name: '80kg 3x8 Deadlift',
            description: '',
            isCompleted: true,
        }]
    }, {
        id: randomId(),
        name: 'Experienced',
        challenges: [{
            id: randomId(),
            name: '80kg 3x8 Weighted squats',
            description: '',
            isCompleted: true,
        }, {
            id: randomId(),
            name: '80kg 3x8 Bench press',
            description: '',
            isCompleted: true,
        }, {
            id: randomId(),
            name: '40kg 3x8 Overhead press',
            description: '',
            isCompleted: true,
        }, {
            id: randomId(),
            name: '40kg 3x8 Bent over rows',
            description: '',
            isCompleted: true,
        }, {
            id: randomId(),
            name: '100kg 3x8 Deadlift',
            description: '',
            isCompleted: true,
        }]
    }],
}

export default weightLifting
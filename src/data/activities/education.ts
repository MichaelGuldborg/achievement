import {randomId} from "../../lib/math/randomId";


export const education = {
    id: randomId(),
    name: 'Education',
    levels: [{
        id: randomId(),
        name: 'Elementary',
        challenges: [{
            id: randomId(),
            name: 'Graduate elementary',
            description: 'Finnish elementary school',
            isCompleted: true,
        }]
    }, {
        id: randomId(),
        name: 'High school',
        challenges: [{
            id: randomId(),
            name: 'Graduate high school',
            description: 'Finnish high school',
            isCompleted: true,
        }]
    }, {
        id: randomId(),
        name: 'Bachelor',
        challenges: [{
            id: randomId(),
            name: 'Bachelors degree',
            description: 'Get a bachelors degree',
            isCompleted: true,
        }]
    }, {
        id: randomId(),
        name: 'Master',
        challenges: [{
            id: randomId(),
            name: 'Masters degree',
            description: 'Get a masters degree',
        }]
    }, {
        id: randomId(),
        name: 'Dr.',
        challenges: [{
            id: randomId(),
            name: 'Doctors degree',
            description: 'Complete a PHD and get a doctors degree',
        }]
    }]
};

export default education;
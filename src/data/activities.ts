import {Activity} from "../models/Activity";
import climbing from "./activities/climbing";
import weightLifting from "./activities/weightLifting";
import {randomId} from "../lib/math/randomId";





export const activities: Activity[] = [
    climbing,
    weightLifting,
    {
        id: randomId(),
        name: 'Bodybuilding',
        tags: ["physical"],
        imageUrl: 'https://ignorelimits.com/wp-content/uploads/2014/05/Weight-Lifting-Workouts.png',
        levels: [],
    },
    {
        id: randomId(),
        name: 'Calisthenics',
        tags: ["physical"],
        imageUrl: 'https://gymgon.com/wp-content/uploads/2020/02/clis1.jpg',
        levels: [{
            id: randomId(),
            name: 'Beginner',
            challenges: [{
                id: randomId(),
                name: 'Muscle-up',
                description: 'Perform a muscle-up'
            }, {
                id: randomId(),
                name: 'Human flag',
                description: 'Perform a human flag for 5 seconds'
            }]
        }]
    },
    {
        id: randomId(),
        name: 'Stretching',
        tags: ["physical"],
        imageUrl: 'https://thorpesphysiotherapy.com/wp-content/uploads/2020/05/stretching_exercise.jpg',
        levels: [{
            id: randomId(),
            name: 'Beginner',
            challenges: [{
                id: randomId(),
                name: 'Split',
                description: 'Perform a sideways split'
            }, {
                id: randomId(),
                name: 'Spagat',
                description: 'Perform a forward-backward split'
            }]
        }]
    },
    {
        id: randomId(),
        name: 'Running',
        tags: ["sport"],
        imageUrl: 'https://www.sydneyphysio.com.au/wp-content/uploads/2019/01/running.jpg',
        levels: [],
    },
    {
        id: randomId(),
        name: 'Swimming',
        tags: ["sport"],
        imageUrl: 'https://4.bp.blogspot.com/-QzuQ7B6Va6w/UkFwtT0TKMI/AAAAAAAAA6I/9fMBMoMqNdA/w1200-h630-p-k-no-nu/Woman-swimming-in-a-pool-008+(1).jpg',
        levels: [],
    },
    {
        id: randomId(),
        name: 'Rowing',
        tags: ["sport"],
        imageUrl: 'http://coolshots9.weebly.com/uploads/1/3/0/0/13002405/____________4156199_orig.jpg',
        levels: [],
    },
    {
        id: randomId(),
        name: 'Parkour / Free running',
        tags: ["sport"],
        levels: [{
            id: randomId(),
            name: 'Beginner',
            challenges: [{
                id: randomId(),
                name: 'Backflip',
                description: 'Perform a backflip off the groud'
            }]
        }, {
            id: randomId(),
            name: 'Intermediate',
            challenges: [{
                id: randomId(),
                name: 'Flik-flak',
                description: 'Perform two consectutive flik-flaks'
            }, {
                id: randomId(),
                name: 'Sideflip',
                description: 'Perform a sideflip'
            }, {
                id: randomId(),
                name: 'Front flip',
                description: 'Perform a front flip'
            }]
        }]
    },
    {
        id: randomId(),
        name: 'Salsa',
        tags: ["dance"],
        levels: [],
    },
    {
        id: randomId(),
        name: 'Hip-hop',
        tags: ["dance"],
        levels: [],
    },
    {
        id: randomId(),
        name: 'Meditation',
        tags: ["spiritual"],
        levels: [],
    },
    {
        id: randomId(),
        name: 'Blacksmith',
        tags: ["creativity"],
        levels: [],
    },
    {
        id: randomId(),
        name: 'Wood work',
        tags: ["creativity"],
        levels: [{
            id: randomId(),
            name: 'Spoon man',
            challenges: [{
                id: randomId(),
                name: 'Craft a spoon',
                description: 'Make a spoon or another small kitchen utensil out of wood'
            }]
        }, {
            id: randomId(),
            name: 'Home maker',
            challenges: [{
                id: randomId(),
                name: 'Create a piece of furniture',
                description: 'Design and craft a piece of furniture. This could be a desk, a chair, a cabinet or a shelf'
            }]
        }]
    },
    {
        id: randomId(),
        name: 'Music production',
        tags: ["creativity"],
        levels: [{
            id: randomId(),
            name: 'Beginner',
            challenges: [{
                id: randomId(),
                name: 'Soundcloud',
                description: 'Mix a song and upload it to soundcloud'
            }]
        }, {
            id: randomId(),
            name: 'Intermediate',
            challenges: [{
                id: randomId(),
                name: 'Album',
                description: 'Record an album (12 songs)'
            }]
        }]
    },
    {
        id: randomId(),
        name: 'Drawing',
        tags: ["creativity"],
        levels: [],
    },
    {
        id: randomId(),
        name: 'Spray painting',
        tags: ["creativity"],
        levels: [],
    },
    {
        id: randomId(),
        name: 'Cooking',
        tags: ["food"],
        levels: [],
    },
    {
        id: randomId(),
        name: 'Race car driving',
        levels: [],
    },
]


export default activities;
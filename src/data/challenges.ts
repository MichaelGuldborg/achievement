import {randomId} from "../lib/math/randomId";
import {Challenge} from "../models/Activity";


export const challenges: Challenge[] = [
    {
        id: randomId(),
        activity: 'climbing',
        level: 'beginner',
        name: '30 days on the wall',
        description: 'Complete a total of 30 days climbing. This can be done by completing any type of climbing session including anything from casual indoor bouldering to outdoor lead climbing',
        checked: true,
    }, {
        id: randomId(),
        activity: 'climbing',
        level: 'beginner',
        name: 'Top rope certificate',
        description: 'Complete an introduction course to top rope climbing and get an official certificate',
        checked: true,
    }, {
        id: randomId(),
        activity: 'climbing',
        level: 'beginner',
        name: 'Buy your first climbing shoes',
        description: 'Pretty self explanatory, but theres a lot of things to consider when making this decision so make sure to check out the material to make an educated decision',
        checked: true,
    }, {
        id: randomId(),
        activity: 'climbing',
        level: 'intermediate',
        name: 'Lead climbing certificate',
        description: 'Complete a course in lead climbing and get an official certificate',
        checked: false,
    }, {
        id: randomId(),
        activity: 'climbing',
        level: 'expert',
        name: 'Complete a 7a boulder',
        description: 'Complete a boulder graded 7a or higher',
        checked: false,
    },
    // WeightLifting
    {
        id: randomId(),
        activity: 'weightlifting',
        level: 'beginner',
        name: '40kg 3x8 Weighted squats',
        description: '',
        checked: true,
    }, {
        id: randomId(),
        activity: 'weightlifting',
        level: 'beginner',
        name: '40kg 3x8 Bench press',
        description: '',
        checked: true,
    }, {
        id: randomId(),
        activity: 'weightlifting',
        level: 'beginner',
        name: '20kg 3x8 Overhead press',
        description: '',
        checked: true,
    }, {
        id: randomId(),
        activity: 'weightlifting',
        level: 'beginner',
        name: '20kg 3x8 Bent over rows',
        description: '',
        checked: true,
    }, {
        id: randomId(),
        activity: 'weightlifting',
        level: 'beginner',
        name: '60kg 3x8 Deadlift',
        description: '',
        checked: true,
    }, {
        id: randomId(),
        activity: 'weightlifting',
        level: 'intermediate',
        name: '60kg 3x8 Weighted squats',
        description: '',
        checked: true,
    }, {
        id: randomId(),
        activity: 'weightlifting',
        level: 'intermediate',
        name: '60kg 3x8 Bench press',
        description: '',
        checked: true,
    }, {
        id: randomId(),
        activity: 'weightlifting',
        level: 'intermediate',
        name: '30kg 3x8 Overhead press',
        description: '',
        checked: true,
    }, {
        id: randomId(),
        activity: 'weightlifting',
        level: 'intermediate',
        name: '30kg 3x8 Bent over rows',
        description: '',
        checked: true,
    }, {
        id: randomId(),
        activity: 'weightlifting',
        level: 'intermediate',
        name: '80kg 3x8 Deadlift',
        description: '',
        checked: true,
    }, {
        id: randomId(),
        activity: 'weightlifting',
        level: 'expert',
        name: '80kg 3x8 Weighted squats',
        description: '',
        checked: true,
    }, {
        id: randomId(),
        activity: 'weightlifting',
        level: 'expert',
        name: '80kg 3x8 Bench press',
        description: '',
        checked: true,
    }, {
        id: randomId(),
        activity: 'weightlifting',
        level: 'expert',
        name: '40kg 3x8 Overhead press',
        description: '',
        checked: true,
    }, {
        id: randomId(),
        activity: 'weightlifting',
        level: 'expert',
        name: '40kg 3x8 Bent over rows',
        description: '',
        checked: true,
    }, {
        id: randomId(),
        activity: 'weightlifting',
        level: 'expert',
        name: '100kg 3x8 Deadlift',
        description: '',
        checked: true,
    },
    // Calisthenics
    {
        id: randomId(),
        activity: 'calisthenics',
        level: 'beginner',
        name: 'Muscle-up',
        description: 'Perform a muscle-up'
    }, {
        id: randomId(),
        activity: 'calisthenics',
        level: 'beginner',
        name: 'Human flag',
        description: 'Perform a human flag for 5 seconds'
    },
    // Flexibility
    {
        id: randomId(),
        activity: 'flexibility',
        level: 'beginner',
        name: 'Split',
        description: 'Perform a sideways split'
    }, {
        id: randomId(),
        activity: 'flexibility',
        level: 'beginner',
        name: 'Spagat',
        description: 'Perform a forward-backward split'
    },
    // Gymnastics
    {
        id: randomId(),
        activity: 'gymnastics',
        level: 'beginner',
        name: 'Backflip',
        description: 'Perform a backflip off the groud',
        checked: true,
    }, {
        id: randomId(),
        activity: 'gymnastics',
        level: 'beginner',
        name: 'Flik-flak',
        description: 'Perform two consectutive flik-flaks'
    }, {
        id: randomId(),
        activity: 'gymnastics',
        level: 'beginner',
        name: 'Sideflip',
        description: 'Perform a sideflip'
    }, {
        id: randomId(),
        activity: 'gymnastics',
        level: 'beginner',
        name: 'Front flip',
        description: 'Perform a front flip'
    },
    // Business
    {
        id: randomId(),
        activity: 'business',
        level: 'beginner',
        name: 'Start a company',
        description: 'Start a hobby, consultancy or startup company selling your skills',
        checked: true,
    }, {
        id: randomId(),
        activity: 'business',
        level: 'beginner',
        name: 'Hire an employee',
        checked: true,
    }, {
        id: randomId(),
        activity: 'business',
        level: 'beginner',
        name: 'Invest 10k in stock',
        checked: true,
    }, {
        id: randomId(),
        activity: 'business',
        level: 'beginner',
        name: 'Invest 100k in stock',
        checked: false,
    }, {
        id: randomId(),
        activity: 'business',
        level: 'beginner',
        name: 'Invest 1 million in stock',
        checked: false,
    }, {
        id: randomId(),
        activity: 'business',
        level: 'beginner',
        name: 'Become finacially independent',
        checked: false,
    },
    // SPORT
    {
        id: randomId(),
        name: 'Skydive',
        checked: false,
    }, {
        id: randomId(),
        name: 'Bungy-jump',
        checked: false,
    }, {
        id: randomId(),
        name: 'Paraglide',
        checked: false,
    },
    // running
    {
        id: randomId(),
        activity: 'running',
        level: 'beginner',
        name: 'Walk 100 kilometers in less than 24 hours',
        checked: true,
    },
    {
        id: randomId(),
        activity: 'running',
        level: 'beginner',
        name: 'Run a half marathon in less than 2 hours',
        checked: true,
    },
    {
        id: randomId(),
        activity: 'running',
        level: 'beginner',
        name: 'Run a marathon in less than 4 hours',
        checked: true,
    },
    // skateboard
    {
        id: randomId(),
        activity: 'skateboard',
        level: 'beginner',
        name: 'Learn to ride a pennyboard',
        description: 'Ride a pennyboard for atleast 1 kilometer',
        checked: true,
    }, {
        id: randomId(),
        activity: 'skateboard',
        level: 'beginner',
        name: 'Learn to ride ramps on a skateboard',
        checked: true,
    }, {
        id: randomId(),
        activity: 'skateboard',
        level: 'beginner',
        name: 'Perform a kickflip',
        checked: false,
    },


    // Other
    {
        id: randomId(),
        name: 'Travel with your mom',
        description: 'Travel to another country with your mom',
        checked: true,
    },
    {
        id: randomId(),
        name: 'Travel with your dad',
        description: 'Travel to another country with your dad',
        checked: false,
    },
    {
        id: randomId(),
        name: 'Travel with your sibling',
        description: 'Travel to another country with your sibling',
        checked: true,
    },
    {
        id: randomId(),
        name: 'Live in another country for half a year',
        checked: true,
    },
    {
        id: randomId(),
        name: 'Eat really expensive food (michelin star)',
        checked: true,
    },
    {
        id: randomId(),
        name: 'Have a psychedelic trip',
        description: 'Plan a safe environment with a sitter you trust and try psilocybin',
        checked: true,
    },
    {
        id: randomId(),
        name: 'Party all night at a club',
        description: 'Party untill the club turns on the lights and orders you home',
        checked: true,
    },
    {
        id: randomId(),
        name: 'Attend Tomorrowland',
        checked: true,
    },
    {
        id: randomId(),
        name: 'Travel solo to another country for a month',
        checked: true,
    },
    {
        id: randomId(),
        name: 'Go on a road trip',
        checked: true,
    },
    {
        id: randomId(),
        name: 'Attend a 10 day vipassana meditation retreat',
        checked: true,
    },
    {
        id: randomId(),
        name: 'Practice social interactions for a month',
        checked: true,
    },
    {
        id: randomId(),
        name: 'Learn to play a song on a guitar',
        checked: true,
    },
    {
        id: randomId(),
        name: 'Move into your own apartment',
        checked: true,
    },
    {
        id: randomId(),
        name: 'Attend a music festival',
        checked: true,
    },
    {
        id: randomId(),
        name: 'Work a retail or service job',
        checked: true,
    },
    {
        id: randomId(),
        name: 'Watch a show on broadway/theater',
        checked: true,
    },
    {
        id: randomId(),
        name: 'Watch a live comedy show',
        checked: true,
    },
    {
        id: randomId(),
        name: 'Attend a naked run / go streaking',
        checked: true,
    },
    {
        id: randomId(),
        name: 'Go skinny dipping during winter season',
        checked: true,
    },
    {
        id: randomId(),
        name: 'Learn to solder',
        checked: true,
    },
    {
        id: randomId(),
        name: 'Craft a large piece of furniture (desk)',
        checked: true,
    },
    {
        id: randomId(),
        name: 'Create a personal portfolio website',
        checked: true,
    },
    {
        id: randomId(),
        name: 'Sail a boat to another country',
        checked: false,
    },
    {
        id: randomId(),
        name: 'Grow a proper windowsill garden',
        checked: false,
    },
    {
        id: randomId(),
        name: 'Get a tattoo',
        checked: false,
    },
    {
        id: randomId(),
        name: 'Go rock climbing outdoors',
        checked: true,
    },
    {
        id: randomId(),
        name: 'Visit all 7 continents',
        description: 'North-America, South-America, Europe, Asia, Australia, Africa, Antarctica/Greenland',
        checked: false,
    },
    {
        id: randomId(),
        name: 'Produce a vidoe course',
        checked: false,
    },
    {
        id: randomId(),
        name: 'Start a youtube channel',
        checked: true,
    },
    {
        id: randomId(),
        name: 'Produce a song',
        checked: false,
    },
]
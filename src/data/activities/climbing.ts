import {Activity} from "../../models/Activity";
import {randomId} from "../../lib/math/randomId";

export const climbing: Activity = {
    id: randomId(),
    name: 'Climbing',
    imageUrl: 'https://wallpapercave.com/wp/wp1871769.jpg',
    // imageUrl: 'https://wallpapercave.com/wp/wp1871760.jpg',
    // imageUrl: 'https://wallpapercave.com/wp/wp1871756.jpg',
    tags: ["physical"],
    material: [{
        id: randomId(),
        name: 'YouTube climbing videos',
        type: 'youtube',
        url: 'https://www.youtube.com/results?search_query=bouldering',
    }, {
        id: randomId(),
        name: 'Free solo',
        type: 'movie',
        url: 'https://www.imdb.com/title/tt7775622/?ref_=fn_al_tt_1'
    }],
    levels: [{
        id: randomId(),
        name: 'Beginner',
        challenges: [{
            id: randomId(),
            name: '30 days on the wall',
            description: 'Complete a total of 30 days climbing. This can be done by completing any type of climbing session including anything from casual indoor bouldering to outdoor lead climbing',
            checked: true,
        }, {
            id: randomId(),
            name: 'Top rope certificate',
            description: 'Complete an introduction course to top rope climbing and get an official certificate',
            checked: true,
        }, {
            id: randomId(),
            name: 'Buy your first climbing shoes',
            description: 'Pretty self explanatory, but theres a lot of things to consider when making this decision so make sure to check out the material to make an educated decision',
            checked: true,
        }]
    }, {
        id: randomId(),
        name: 'Intermediate',
        challenges: [{
            id: randomId(),
            name: 'Lead climbing certificate',
            description: 'Complete a course in lead climbing and get an official certificate',
            checked: false,
        }],
    }, {
        id: randomId(),
        name: 'Experienced',
        challenges: [{
            id: randomId(),
            name: 'Complete a 7a boulder',
            description: 'Complete a boulder graded 7a or higher',
            checked: false,
        }],
    }]
}

export default climbing
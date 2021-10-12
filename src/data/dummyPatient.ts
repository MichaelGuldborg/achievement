// Assume that all patients start with same issues
import {capitalize} from "@material-ui/core";
import {groupedIssues} from "./issues";
import rand, {randomDate, randomFloat, randomInt} from "../lib/math/rand";
import coinFlip from "../lib/math/coinFlip";
import dummyIssues from "./dymmyIssues";

const prevIssues = dummyIssues();
export const dummyPatient = (index: number = 0) => {
    const email = emails[index % emails.length];
    const firstName = capitalize(email.split('@')[0]);
    const lastName = '' + index;

    const issues = prevIssues.map(prev => {
        const options = groupedIssues[prev.type].filter(i => i.id !== prev.id);
        return options[randomInt(options.length)];
    })

    const changes = prevIssues.map((previous, index) => {
        const current = issues[index];
        return ({
            id: '' + previous.id + '-' + current.id,
            name: 'Fra ' + previous.name + ' til ' + current.name,
            type: current.type,
            before: previous.id,
            after: current.id,
            date: randomDate(0),
            indicator: current.value - previous.value,
        });
    });

    return {
        id: '' + index,
        firstName: firstName,
        lastName: lastName,
        name: firstName + ' ' + lastName,
        email: email,
        // phoneNumber: '' + 51901047, // rasmus
        phoneNumber: '' + 4521131391, // michael

        // statistics
        sex: sexOptions[randomInt(2)],
        birthDate: dummyBirthDate(),
        postalCode: dummyPostalCode(),
        municipality: municipalities[randomInt(4)],
        region: 'Hovedstaden',

        // registered info
        issues: issues,
        changes: changes,

        // surveys
        enableWHO5: coinFlip(),
        enableUCLA3: coinFlip(),
    }
}


const dummyBirthDate = () => {
    const now = new Date();
    if (rand() <= 0.3) {
        const years = randomFloat(now.getFullYear() - 35, now.getFullYear() - 15);
        return new Date(years, randomInt(12), randomInt(26));
    }
    const years = randomFloat(now.getFullYear() - 24, now.getFullYear() - 18);
    return new Date(years, randomInt(12), randomInt(26))
}

const dummyPostalCode = () => {
    if (rand() <= 0.5) {
        return (Math.floor(randomFloat(1000, 9990) / 100)) * 100;
    }

    return (Math.floor(randomFloat(1000, 3000) / 100)) * 100;
}

const emails = [
    'michael@innosocial',
    'beta@innosocial',
    'christian@innosocial',
    'nicolai@innosocial',
    'johan@innosocial',
    'daniel@innosocial',
    'rasmus@innosocial',
    'joakim@innosocial',
    'anton@innosocial',
];

const sexOptions = [
    'Male',
    'Female',
];

export const municipalities = [
    'København',
    'Rødovre',
    'Herlev',
    'Gentofte',

];

export default dummyPatient;
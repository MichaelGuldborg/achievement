import {groupByKey} from "../lib/list/groupBy";
import Issue from "../models/Issue";


export const issueTypes: { [k: string]: string } = {
    accommodation: 'Bolig',
    occupation: 'Beskæftigelse',
    income: 'Indtægt',
    'substance-abuse': 'Misbrug',
    physical: 'Fysisk lidelse',
    psychological: 'Psykisk lidelse',
    who5: 'Trivsel',
    ucla3: 'Ensomhed',
    other: 'Andet / Proxy',
}

export const issues: Issue[] = [
    {
        id: 'homeless',
        type: 'accommodation',
        name: 'Hjemløs',
        value: -1,
    },
    {
        id: 'short-term-accommodation',
        type: 'accommodation',
        name: 'Midlertidige botilbud',
        value: -0.5,
    },
    {
        id: 'long-term-accommodation',
        type: 'accommodation',
        name: 'Længerevarende botilbud',
        value: -0.5,
    },
    {
        id: 'placed-network',
        type: 'accommodation',
        name: 'Anbragt i slægt eller netværk',
        value: -0.5,
    },
    {
        id: 'placed-institution',
        type: 'accommodation',
        name: 'Anbragt på institution',
        value: -0.5,
    },
    {
        id: 'placed-family-care',
        type: 'accommodation',
        // name: 'Institutions anbragt',
        name: 'Anbragt i familiepleje',
        value: -0.5,
    },
    {
        id: 'family',
        type: 'accommodation',
        name: 'Familie',
        value: 0,
    },
    {
        id: 'apartment',
        type: 'accommodation',
        name: 'Lejlighed',
        value: 1,
    },
    {
        id: 'dormitory',
        type: 'accommodation',
        name: 'Kollegie',
        value: 1,
    },
    {
        id: 'zero-income',
        type: 'income',
        name: 'Ingen',
        value: -1,
    }, {
        id: 'su',
        type: 'income',
        name: 'SU',
        value: 0.5,
    }, {
        id: 'unemployment-benefits',
        type: 'income',
        name: 'Kontanthjælp',
        value: -1,
    },
    {
        id: 'early-retirement',
        type: 'income',
        name: 'Førtidspension',
        value: -0.5,
    },
    {
        id: 'salary',
        type: 'income',
        name: 'Løn',
        value: 1,
    },

    // substance-abuse
    {
        id: 'no-substance-abuse',
        type: 'substance-abuse',
        name: 'Ingen',
        value: 0,
    },
    {
        id: 'cigarette-abuse',
        type: 'substance-abuse',
        name: 'Cigaretter',
        value: -0.5,
    },
    {
        id: 'alcohol-abuse',
        type: 'substance-abuse',
        name: 'Alkohol',
        value: -0.5,
    },
    {
        id: 'drug-abuse',
        type: 'substance-abuse',
        name: 'Stoffer',
        value: -1,
    },
    // {
    //     id: 'cocaine',
    //     type: 'substance-abuse',
    //     name: 'Kokain',
    //     value: -1,
    // },
    // {
    //     id: 'unemployed',
    //     type: 'occupation',
    //     name: 'Ledig',
    //     value: -0.5,
    // }, {
    //     id: 'student',
    //     type: 'occupation',
    //     name: 'Studerende',
    //     value: 1,
    // }, {
    //     id: 'work',
    //     type: 'occupation',
    //     name: 'Arbejde',
    //     value: 1,
    // }, {
    //     id: 'pension',
    //     type: 'occupation',
    //     name: 'Pensionist',
    //     value: 0,
    // },


    // {
    //     id: 'no-psychological',
    //     type: 'psychological',
    //     name: 'Ingen',
    //     value: 0,
    // }, {
    //     id: 'drepression',
    //     type: 'psychological',
    //     name: 'Drepression',
    //     value: -0.5,
    // }, {
    //     id: 'adhd',
    //     type: 'psychological',
    //     name: 'ADHD',
    //     value: -0.5,
    // }, {
    //     id: 'add',
    //     type: 'psychological',
    //     name: 'ADD',
    //     value: -0.5,
    // }, {
    //     id: 'stress',
    //     type: 'psychological',
    //     name: 'Stresset',
    //     value: -0.5,
    // },
]

export const groupedIssues = groupByKey(issues, (e) => e.type)

export const getIssueById = (id: string) => issues.find(i => i.id === id);

export default issues;
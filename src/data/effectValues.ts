import {IssueType} from "../models/Issue";

export interface EffectValue {
    id: string;
    type: IssueType;
    source: string;
    value: number;
    dropOff: number,
    deadWeight: number,
    displacement: number,
    attribution: number,

    [k: string]: string | number | undefined;
}

export const effectValues: EffectValue[] = [
    // Income
    {
        id: 'zero-income',
        type: "income",
        source: 'SØM-modellen',
        value: 0,
        dropOff: 0.1,
        deadWeight: 0.1,
        displacement: 0.05,
        attribution: 0.05,
    },
    {
        id: 'early-retirement',
        type: "income",
        source: 'SØM-modellen',
        value: 3621 * 52 * -1,
        dropOff: 0.1,
        deadWeight: 0.1,
        displacement: 0.05,
        attribution: 0.05,
        "Målgruppe": "Ikke målgruppespecifik",
        "Hoveddimension": "Indkomstoverførsler",
        "Underdimension": "Førtidspension",
        "Enhed": "Kr. pr. uge",
        "Stat": 724,
        "Region": 0,
        "Kommune": 2.897,
        "Pris i alt": 3.621
    },
    {
        id: 'su',
        type: "income",
        source: 'SØM-modellen',
        value: 1682 * 52 * -1,
        dropOff: 0.1,
        deadWeight: 0.1,
        displacement: 0.05,
        attribution: 0.05,
        "Målgruppe": "Ikke målgruppespecifik",
        "Hoveddimension": "Indkomstoverførsler",
        "Underdimension": "Uddannelseshjælp",
        "Enhed": "Kr. pr. uge",
        "Stat": 336,
        "Region": 0,
        "Kommune": 1.345,
        "Pris i alt": 1.682
    },
    {
        id: 'unemployment-benefits',
        type: "income",
        source: 'SØM-modellen',
        value: 2806 * 52 * -1,
        dropOff: 0.1,
        deadWeight: 0.1,
        displacement: 0.05,
        attribution: 0.05,
        "Målgruppe": "Ikke målgruppespecifik",
        "Hoveddimension": "Indkomstoverførsler",
        "Underdimension": "Kontanthjælp",
        "Enhed": "Kr. pr. uge",
        "Stat": 561,
        "Region": 0,
        "Kommune": 2.245,
        "Pris i alt": 2.806
    },
    {
        id: 'salary',
        type: "income",
        source: 'SØM-modellen',
        // Income Tax
        // depends on non-exclusive variables ei. homeless | alcoholic?? wtf
        value: 312 * 365, // average (som_all.filter(category: 'Skat af indkomst')),
        dropOff: 0.1,
        deadWeight: 0.1,
        displacement: 0.05,
        attribution: 0.05,
    },

    // Accommodation
    {
        id: 'homeless',
        type: 'accommodation',
        source: 'SØM-modellen',
        value: 0, // TODO ADD VALUE
        dropOff: 0,
        deadWeight: 0,
        displacement: 0,
        attribution: 0,
    },
    {
        id: 'family',
        type: 'accommodation',
        source: 'SØM-modellen',
        value: 0, // TODO ADD VALUE
        dropOff: 0,
        deadWeight: 0,
        displacement: 0,
        attribution: 0,
    },
    {
        id: 'apartment',
        type: 'accommodation',
        source: 'SØM-modellen',
        value: 0, // TODO ADD VALUE
        dropOff: 0,
        deadWeight: 0,
        displacement: 0,
        attribution: 0,
    },
    {
        id: 'dormitory',
        type: 'accommodation',
        source: 'SØM-modellen',
        value: 0, // TODO ADD VALUE
        dropOff: 0,
        deadWeight: 0,
        displacement: 0,
        attribution: 0,
    },
    {
        id: 'placed-network',
        type: 'accommodation',
        source: 'SØM-modellen',
        value: 587 * 365 * -1,
        dropOff: 0.1,
        deadWeight: 0.1,
        displacement: 0.05,
        attribution: 0.05,
        "Målgruppe": "Ikke målgruppespecifik",
        "Hoveddimension": "Sociale foranstaltninger til børn og unge under 18",
        "Underdimension": "Anbringelse i slægt eller netværk",
        "Enhed": "Kr. pr. dag",
        "Stat": 24,
        "Region": 0,
        "Kommune": 563,
        "Pris i alt": 587
    }, {
        id: 'placed-family-care',
        type: 'accommodation',
        source: 'SØM-modellen',
        value: 1539 * 365 * -1,
        dropOff: 0.1,
        deadWeight: 0.1,
        displacement: 0.05,
        attribution: 0.05,
        "Målgruppe": "Ikke målgruppespecifik",
        "Hoveddimension": "Sociale foranstaltninger til børn og unge under 18",
        "Underdimension": "Anbringelse i familiepleje",
        "Enhed": "Kr. pr. dag",
        "Stat": 22,
        "Region": 0,
        "Kommune": 1.517,
        "Pris i alt": 1.539
    }, {
        id: 'placed-institution',
        type: 'accommodation',
        source: 'SØM-modellen',
        value: 3458 * 365 * -1,
        dropOff: 0.1,
        deadWeight: 0.1,
        displacement: 0.05,
        attribution: 0.05,
        "Målgruppe": "Ikke målgruppespecifik",
        "Hoveddimension": "Sociale foranstaltninger til børn og unge under 18",
        "Underdimension": "Anbringelse på institution",
        "Enhed": "Kr. pr. dag",
        "Stat": 323,
        "Region": 0,
        "Kommune": 3.135,
        "Pris i alt": 3.458
    }, {
        id: 'long-term-accommodation',
        type: 'accommodation',
        source: 'SØM-modellen',
        value: 3155 * 365 * -1,
        dropOff: 0.1,
        deadWeight: 0.1,
        displacement: 0.05,
        attribution: 0.05,
        "Målgruppe": "Ikke målgruppespecifik",
        "Hoveddimension": "Sociale serviceydelser",
        "Underdimension": "Længerevarende botilbud",
        "Enhed": "Kr. pr. dag",
        "Stat": 148,
        "Region": 0,
        "Kommune": 3.007,
        "Pris i alt": 3.155
    }, {
        id: 'short-term-accommodation',
        type: 'accommodation',
        source: 'SØM-modellen',
        value: 2134 * 365 * -1,
        dropOff: 0.1,
        deadWeight: 0.1,
        displacement: 0.05,
        attribution: 0.05,

        "Målgruppe": "Ikke målgruppespecifik",
        "Hoveddimension": "Sociale serviceydelser",
        "Underdimension": "Midlertidige botilbud",
        "Enhed": "Kr. pr. dag",
        "Stat": 94,
        "Region": 0,
        "Kommune": 2.04,
        "Pris i alt": 2.134
    },
    // Substance abuse
    {
        id: 'no-substance-abuse',
        type: 'substance-abuse',
        source: 'Social Value Bank UK - HACT',
        value: 0,
        dropOff: 0,
        deadWeight: 0,
        displacement: 0,
        attribution: 0,
    }, {
        id: 'cigarette-abuse',
        type: 'substance-abuse',
        source: 'Social Value Bank UK - HACT',
        value: 208879 / 4 * -1, // assume 1/4 of  drugs
        dropOff: 0,
        deadWeight: 0.9,
        displacement: 0,
        attribution: 0.8,
    }, {
        id: 'alcohol-abuse',
        type: 'substance-abuse',
        source: 'Social Value Bank UK - HACT',
        value: 208879 / 2 * -1, // assume 1/2 of  drugs
        dropOff: 0,
        deadWeight: 0.9,
        displacement: 0,
        attribution: 0.8,

    }, {
        id: 'drug-abuse',
        type: 'substance-abuse',
        source: 'Social Value Bank UK - HACT',
        value: 208879 * -1,
        dropOff: 0,
        deadWeight: 0.9,
        displacement: 0,
        attribution: 0.8,
    },

]
export default effectValues;
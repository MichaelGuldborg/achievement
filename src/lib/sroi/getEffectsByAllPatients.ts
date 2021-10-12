import Patient from "../../models/Patient";
import ChangeEffect from "../../models/ChangeEffect";
import PatientChange from "../../models/PatientChange";
import effectValues, {EffectValue} from "../../data/effectValues";
import {getUCLA3SurveyChange, getWHO5SurveyChange} from "./getSurveyChange";
import dummySurveyAnswers from "../../data/dummySurveyAnswers";
import filterNull from "../list/filterNull";


export const getEffectsByAllPatients = (patients: Patient[], filter?: (c: PatientChange) => boolean): ChangeEffect[] => {
    return patients.reduce((result: ChangeEffect[], patient) => {
        return result.concat(getEffectsByPatient(patient, filter));
    }, []).reduce((r: ChangeEffect[], effect) => {
        // Increment counter if some effect are the same
        const prevIndex = r.findIndex(e => e.id === effect.id);
        if (prevIndex !== -1) {
            r[prevIndex].count += 1;
            return r;
        }
        // Only include effect with value different than 0
        if (effect.value === 0) {
            return r;
        }
        return [...r, effect]
    }, [])
}

export const getEffectsByPatient = (patient: Patient, filter?: (c: PatientChange) => boolean): ChangeEffect[] => {

    const ucla3Change = getUCLA3SurveyChange(dummySurveyAnswers({months: 6, questions: 3, maxAnswer: 3}))
    const ucla3Effect = getUCLA3EffectByPatient(ucla3Change)

    const who5Change = getWHO5SurveyChange(dummySurveyAnswers({months: 6, questions: 5, maxAnswer: 5}))
    const who5Effect = getWHO5EffectByPatient(who5Change)


    if (patient?.changes === undefined) return [];
    const changes = filter === undefined ? patient.changes : patient.changes.filter(filter);
    return changes.reduce((r: ChangeEffect[], change) => {
        r.push(getEffectOfChange(patient, change))
        return r;
    }, filterNull([ucla3Effect, who5Effect]));
}

const getUCLA3EffectByPatient = (change?: PatientChange): ChangeEffect | undefined => {
    if (change === undefined) return undefined;
    if (Math.abs(change.indicator) <= 0.3) return undefined;

    return {
        id: 'ucla3',
        name: 'Mindre ensomhed og isolation',
        count: 1,
        successRate: 1,
        value: 6920,
        years: 5,
        source: 'Social Finance: \'Investing to Tackle Loneliness\'',

        dropOff: 0.1,
        deadWeight: 0.05,
        displacement: 0,
        attribution: 0,
    }
}

const getWHO5EffectByPatient = (change?: PatientChange): ChangeEffect | undefined => {
    if (change === undefined) return undefined;
    if (change.indicator <= 0.3) return undefined;

    return {
        id: 'who5',
        name: 'Bedre psykisk trivsel og selvtillid',
        count: 1,
        successRate: 1,
        value: 105496,
        years: 5,
        source: 'Social Value Bank UK - HACT',

        dropOff: 0.1,
        deadWeight: 0.05,
        displacement: 0,
        attribution: 0,
    }
}

export const getEffectOfChange = (patient: Patient, change: PatientChange): ChangeEffect => {

    const previous = effectValues.find((s: EffectValue) => s.id === change.before);
    const previousValue = (previous?.value ?? 0);

    const current = effectValues.find((s: EffectValue) => s.id === change.after);
    const currentValue = (current?.value ?? 0);

    const valueDiff = currentValue - previousValue;

    return {
        id: change.id,
        name: change.name,
        count: 1,
        successRate: 1,
        years: 5,
        source: current?.source || previous?.source,

        value: valueDiff,
        dropOff: current?.dropOff || previous?.dropOff || 0,
        deadWeight: current?.deadWeight || previous?.deadWeight || 0,
        displacement: current?.displacement || previous?.displacement || 0,
        attribution: current?.attribution || previous?.attribution || 0,


        // based on average søm effects from unik rapport
        // dropOff: 0.1,
        // deadWeight: 0.1,
        // displacement: 0.05,
        // attribution: 0.05,
    }
}

export default getEffectsByAllPatients;
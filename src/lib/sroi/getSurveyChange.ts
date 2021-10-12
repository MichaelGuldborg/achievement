import {SurveyAnswer} from "../../models/WHO5Answer";
import PatientChange from "../../models/PatientChange";


export const getUCLA3SurveyChange = (answers: SurveyAnswer[]) => {
    const change = getSurveyChange('ucla3', 12, answers, (a, b) => {
        return 'Fra ' + a + ' til ' + b + ' ensomhed';
    })
    // UCLA 3 lower answer value = less lonely
    change.indicator = change.indicator * -1
    return change;
}

export const getWHO5SurveyChange = (answers: SurveyAnswer[]) => {
    return getSurveyChange('who5', 25, answers, (a, b) => {
        return 'Fra ' + a + ' til ' + b + ' trivsel';
    })
}


export type SurveyLevel = 'low' | 'medium' | 'high';
const surveyLevels: SurveyLevel[] = ['low', 'medium', 'high'];
const getSurveyChange = (
    surveyId: string,
    maxAnswerSum: number,
    answers: SurveyAnswer[],
    name: (a: SurveyLevel, b: SurveyLevel) => string = (a, b) => 'Fra ' + a + ' til ' + b,
): PatientChange => {


    const firstAnswerSum = answers[0].answers.reduce((r, e) => r + e)
    const firstAnswerIndex = Math.abs(Math.round((firstAnswerSum / maxAnswerSum) * surveyLevels.length));
    const prevLevel = surveyLevels[firstAnswerIndex];
    const prev = surveyId + '-' + prevLevel;

    const lastAnswerSum = answers[answers.length - 1].answers.reduce((r, e) => r + e)
    const lastAnswerIndex = Math.abs(Math.round((lastAnswerSum / maxAnswerSum) * surveyLevels.length));
    const currentLevel = surveyLevels[lastAnswerIndex];
    const current = surveyId + '-' + currentLevel;


    const answerDiff = lastAnswerSum - firstAnswerSum;
    const indicator = (answerDiff / maxAnswerSum);


    return {
        id: '' + prev + '-' + current,
        name: name(prevLevel, currentLevel),
        type: surveyId,
        before: prev,
        after: current,
        indicator: indicator,
        date: answers[answers.length - 1].createdAt,
    }
}
export default getSurveyChange;
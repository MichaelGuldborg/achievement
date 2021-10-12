import {randomNumbers} from "../lib/math/rand";


export interface DummySurveyAnswersConfig {
    months: number;
    questions: number;
    maxAnswer: number;
    // if 0 then answers increases over time else decrease
    progressionFactor?: number // 0 .. 1
}

export const dummySurveyAnswers = ({months = 6, questions, maxAnswer, progressionFactor = 0}: DummySurveyAnswersConfig) => {
    const now = new Date();
    return Array.from({length: months}).map((e, index) => {
        const ratio = Math.abs(progressionFactor - (Math.round((index / months) * maxAnswer) / maxAnswer));
        return ({
            createdAt: new Date(2021, ((now.getMonth() - 5 + index) % 12), now.getDate(), now.getHours(), now.getMinutes()),
            answers: randomNumbers({
                count: questions,
                min: 0,
                max: maxAnswer,
                continuity: 1
            }).map((v, i) => Math.round(v * ratio))
        });
    });
}

export default dummySurveyAnswers
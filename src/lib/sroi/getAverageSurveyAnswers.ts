import {SurveyAnswer} from "../../models/WHO5Answer";
import sumByIndex from "../math/sumByIndex";
import filterNull from "../list/filterNull";


export const getAverageSurveyAnswers = (answers: (SurveyAnswer | undefined)[]): SurveyAnswer[] => {
    return filterNull(answers).reduce((result: (SurveyAnswer & { count: number })[], who5) => {
        const index = result.findIndex(a => a.createdAt.getMonth() === who5.createdAt.getMonth())
        if (index === -1) return [...result, {...who5, count: 1}];
        result[index].answers = sumByIndex([result[index].answers, who5.answers])
        result[index].count = result[index].count + 1;
        return result;
    }, []).map(who5 => {
        who5.answers = who5.answers.map(v => v / who5.count)
        return who5;
    })
}
export default getAverageSurveyAnswers;
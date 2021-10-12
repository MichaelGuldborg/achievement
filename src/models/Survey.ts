import {emptySurveyQuestion, SurveyQuestion} from "./SurveyQuestion";
import searchFilter from "../lib/list/searchFilter";

export interface Survey {
    id: string;
    name: string;
    description: string;
    questions: SurveyQuestion[];
    createdAt: Date;
    updatedAt: Date;
}

export const emptySurvey: Survey = {
    id: '',
    name: '',
    description: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    questions: [emptySurveyQuestion]
}

export interface ListSurvey {
    id: string;
    name: string;
    description: string;
    questions: SurveyQuestion[];
    createdAt: string;
    updatedAt: string;
}

export interface SurveyAnswers {
    projectId: string;
    surveyId: string;
    questions: QuestionAnswers[];
}

export interface QuestionAnswers {
    id: string;
    title: string;
    answerCount: {
        [choice: string]: number
    }
}

export const surveySearchFilter = (search: string) => ({name}: Survey) => searchFilter({
    name: name,
}, search);

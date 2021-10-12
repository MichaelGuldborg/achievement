export interface SurveyAnswerRequest {
    userId: string;
    answers: SurveyAnswer[]
}

export interface SurveyAnswer {
    id: string;
    projectId: string;
    surveyId: string;
    questionId: string;
    sessionId: string;
    userId: string;
    type: 'text' | 'scale' | 'choice';
    answerIndex: number;
    answerText: string;
    createdAt: Date;
    updatedAt: Date;
}

export const emptySurveyAnswer: SurveyAnswer = {
    id: "",
    projectId: "",
    surveyId: "",
    questionId: "",
    sessionId: "",
    userId: "",
    type: "choice",
    answerIndex: -1,
    answerText: "",
    createdAt: new Date(),
    updatedAt: new Date()
}
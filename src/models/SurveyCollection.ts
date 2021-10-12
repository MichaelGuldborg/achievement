export interface SurveyCollection {
    id: string;
    name: string;
    projectId: string;
    createdAt: Date;
    updatedAt: Date;
}

export const emptySurveyCollection: SurveyCollection = {
    id: "",
    projectId: "",
    name: "",
    createdAt: new Date(),
    updatedAt: new Date()
}
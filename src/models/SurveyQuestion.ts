import FontColorIcon from "remixicon-react/FontColorIcon";
import {ListItemIcon} from "@material-ui/core";
import React from "react";
import More2LineIcon from "remixicon-react/More2LineIcon";
import MoreLineIcon from "remixicon-react/MoreLineIcon";

export type SurveyQuestionType = "choice" | "scale" | "text";

export interface SurveyQuestion {
    id: string;
    surveyId: string;
    type: SurveyQuestionType;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    properties: SurveyQuestionTextProps | SurveyQuestionChoiceProps | SurveyQuestionScaleProps;
    required: boolean;
}

export const emptySurveyQuestion: SurveyQuestion = {
    id: "",
    surveyId: "",
    type: "text",
    title: "",
    updatedAt: new Date(),
    createdAt: new Date(),
    properties: {},
    required: false,
}

export interface SurveyQuestionTextProps {
}

export interface SurveyQuestionText extends SurveyQuestion {
    type: "text";
}

export const emptySurveyQuestionText: SurveyQuestionText = {
    ...emptySurveyQuestion,
    type: 'text',
}

export interface PropsChoiceType {
    choiceText: string;
    score: number | undefined;
}

export interface SurveyQuestionChoiceProps {
    choices: PropsChoiceType[];
}

export interface SurveyQuestionChoice extends SurveyQuestion {
    type: "choice";
    properties: SurveyQuestionChoiceProps;
}

export const emptySurveyQuestionChoice: SurveyQuestionChoice = {
    ...emptySurveyQuestion,
    type: "choice",
    properties: {
        choices: [{choiceText: "Svarmulighed 1", score: undefined}],
    }
}

export interface SurveyQuestionScaleProps {
    minimum: number;
    minimumLabel: string;
    minimumPoints: number | undefined;
    maximum: number;
    maximumLabel: string;
    maximumPoints: number | undefined;
}

export interface SurveyQuestionScale extends SurveyQuestion {
    type: 'scale';
    properties: SurveyQuestionScaleProps;
}

export const emptySurveyQuestionScale: SurveyQuestionScale = {
    ...emptySurveyQuestion,
    type: "scale",
    properties: {
        minimum: 1,
        minimumLabel: "",
        minimumPoints: undefined,
        maximum: 5,
        maximumLabel: "",
        maximumPoints: undefined,
    },
}

export const typeToEmpty = {
    text: emptySurveyQuestionText,
    choice: emptySurveyQuestionChoice,
    scale: emptySurveyQuestionScale,
}


export const typeToName = {
    text: "Tekst",
    choice: "Svarmuligheder",
    scale: "Lineær skala",
}

export const nameToType = Object.assign({}, ...Object.entries(typeToName).map(([a, b]) => ({[b]: a})))

export const typeToIcon = {
    text: FontColorIcon,
    choice: More2LineIcon,
    scale: MoreLineIcon,
}
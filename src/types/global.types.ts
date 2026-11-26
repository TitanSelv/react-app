import type { Dispatch, SetStateAction } from "react";

export interface IAuthContext {
    isAuth: boolean;
    setIsAuth: Dispatch<SetStateAction<boolean>>;
}

export interface IThemeContext {
    theme: THEME_ENUM;
    setTheme: Dispatch<SetStateAction<THEME_ENUM>>;
}

export enum THEME_ENUM {
    LIGHT = "light",
    DARK = "dark",
    SYSTEM = "system",
}

export interface IQuestionCard {
    id: number;
    question: string;
    answer: string;
    description: string;
    resources: string[],
    level: 1 | 2 | 3;
    completed: boolean;
    editDate?: string;
}

export interface IQuestionFormState extends IQuestionCard {
    clearForm: boolean;
}

export interface IQuestionsResponse {
    data: IQuestionCard[];
    pages: number;
}
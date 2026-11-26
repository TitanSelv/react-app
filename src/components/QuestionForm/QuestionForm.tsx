
import type { FC } from 'react';
import { level } from '../../constants/global.constants';
import { Button } from '../Button';
import { SortSelect } from '../sortSelect';
import cls from './QuestionForm.module.css';
import type { IQuestionFormState } from '../../types/global.types';


export interface IQuestionFormProps {
    formAction: any;
    stateForm: Partial<IQuestionFormState>;
    isPanding: boolean;
    btnText: string;
    clearCheckbox?: boolean;
}



const QuestionForm: FC<IQuestionFormProps> = ({ formAction, stateForm, isPanding, btnText, clearCheckbox }) => {



    return (
        <form action={formAction} className={cls.form}>
            <input type="text" name="questionId" defaultValue={stateForm.id} hidden />
            <div className={cls.formControl}>
                <label htmlFor="questionField">Question: </label>
                <textarea
                    defaultValue={stateForm.question}
                    name="question"
                    id="questionField"
                    cols={30}
                    rows={2}
                    required
                    placeholder='please enter a question'
                ></textarea>
            </div>
            <div className={cls.formControl}>
                <label htmlFor="answerField">Short Answer: </label>
                <textarea
                    defaultValue={stateForm.answer}
                    name="answer"
                    id="answerField"
                    cols={30}
                    rows={2}
                    required
                    placeholder='please enter a short answer'
                ></textarea>
            </div>
            <div className={cls.formControl}>
                <label htmlFor="descriptionField">Description: </label>
                <textarea
                    defaultValue={stateForm.description}
                    name="description"
                    id="descriptionField"
                    cols={30}
                    rows={5}
                    required
                    placeholder='please enter a full description'
                ></textarea>
            </div>
            <div className={cls.formControl}>
                <label htmlFor="resourcesField">Resources: </label>
                <textarea
                    defaultValue={stateForm.resources}
                    name="resources"
                    id="resourcesField"
                    cols={30}
                    rows={5}
                    placeholder='please enter resources separated by commas'
                ></textarea>
            </div>
            <div className={cls.formControl}>
                <label htmlFor="levelField">Level: </label>
                <SortSelect key={stateForm.level ?? 1} nameDisabled={true} defaultValue={String(stateForm.level)} id="levelField" name="level" constants={level} className={cls.levelSelect} />
            </div>
            {clearCheckbox && <label htmlFor="clearFormField" className={cls.clearFormControl}>
                <input className={cls.checkbox} type="checkbox" name="clearForm" id="clearFormField" defaultChecked={stateForm.clearForm} />
                <span>clear form after submitting?</span>
            </label>}

            <Button disabled={isPanding} >{isPanding ? "Загрузка..." : btnText}</Button>
        </form>
    );
};

export default QuestionForm;
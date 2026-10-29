import { Button } from '../../components/Button';
import { SortSelect } from '../../components/sortSelect';
import { level } from '../../constants';
import cls from './AddQuestionPage.module.css';

export const AddQuestionPage = () => {
    return (
        <>
            <h1 className={cls.formTitle}>Add new question</h1>
            <div className={cls.formContainer}>
                <form action="" className={cls.form}>
                    <div className={cls.formControl}>
                        <label htmlFor="questionField">Question: </label>
                        <textarea
                            defaultValue={"defaultValue"}
                            name="question"
                            id="questionField"
                            cols="30"
                            rows="2"
                            required
                            placeholder='please enter a question'
                        ></textarea>
                    </div>
                    <div className={cls.formControl}>
                        <label htmlFor="answerField">Short Answer: </label>
                        <textarea
                            defaultValue={"defaultValue"}
                            name="answer"
                            id="answerField"
                            cols="30"
                            rows="2"
                            required
                            placeholder='please enter a short answer'
                        ></textarea>
                    </div>
                    <div className={cls.formControl}>
                        <label htmlFor="descriptionField">Description: </label>
                        <textarea
                            defaultValue={"defaultValue"}
                            name="description"
                            id="descriptionField"
                            cols="30"
                            rows="5"
                            required
                            placeholder='please enter a full description'
                        ></textarea>
                    </div>
                    <div className={cls.formControl}>
                        <label htmlFor="resourcesField">Resources: </label>
                        <textarea
                            defaultValue={"defaultValue"}
                            name="resources"
                            id="resourcesField"
                            cols="30"
                            rows="5"
                            required
                            placeholder='please enter resources separated by commas'
                        ></textarea>
                    </div>
                    <div className={cls.formControl}>
                        <label htmlFor="levelField">Level: </label>
                        <SortSelect id="levelField" name="Level" constants={level} className={cls.levelSelect} />
                    </div>

                    <label htmlFor="clearFormField" className={cls.clearFormControl}>
                        <input className={cls.checkbox} type="checkbox" name="clearForm" id="clearFormField" defaultChecked={true}/>
                        <span>clear form after submitting?</span>
                    </label>
                    <Button>Add question</Button>
                </form>
            </div>
        </>
    );
};

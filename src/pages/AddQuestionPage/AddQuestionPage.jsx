import { useActionState } from 'react';
import { API_URL } from '../../constants';
import cls from './AddQuestionPage.module.css';
import { toast } from 'react-toastify';
import { delayFn } from '../../helpers/delayFn';
import { Loader } from '../../components/Loader';
import QuestionForm from '../../components/QuestionForm/QuestionForm';

const createActionState = async (_prev, formData) => {

    try {
        const formValues = Object.fromEntries(formData);
        const resources = formValues.resources.trim();
        await delayFn();
        const response = await fetch(`${API_URL}/react/`, {
            method: "POST",
            body: JSON.stringify({
                question: formValues.question,
                answer: formValues.answer,
                description: formValues.description,
                resources: resources.length ? resources.split(",") : [],
                level: Number(formValues.level),
                completed: false,
                editDate: undefined
            })
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        };

        const question = await response.json();
        toast.success("A new question has been successfully created");
        return formValues.clearForm ? {} : question;

    } catch (error) {
        toast.error(error.message);
        return {};
    }

}

const AddQuestionPage = () => {

    const [stateForm, formAction, isPanding] = useActionState(createActionState, { clearForm: true });


    return (
        <>

            {isPanding && <Loader /> }
            <h1 className={cls.formTitle}>Add new question</h1>
            <div className={cls.formContainer}>
                <QuestionForm formAction={formAction} stateForm={stateForm} isPanding={isPanding} btnText="Add Question"/>
            </div>
        </>
    );
};

export default AddQuestionPage;

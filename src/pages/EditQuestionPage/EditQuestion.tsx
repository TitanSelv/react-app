import { useActionState, type FC } from 'react';
import { Loader } from '../../components/Loader';
import QuestionForm from '../../components/QuestionForm/QuestionForm';
import cls from './EditQuestionPage.module.css';
import { toast } from 'react-toastify';
import { delayFn } from '../../helpers/delayFn';
import { API_URL } from '../../constants/global.constants';
import { dateFormat } from '../../helpers/dateFormat';
import { useFetch } from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import type { IQuestionCard, IQuestionFormState } from '../../types/global.types';



const editActionState = async (_prev: Partial<IQuestionFormState>, formData: FormData) => {

    try {
        const formValues = Object.fromEntries(formData);
        const questionId = formValues.questionId;
        const resources = (formValues.resources as string).trim();
        await delayFn();
        const response = await fetch(`${API_URL}/react/${questionId}`, {
            method: "PATCH",
            body: JSON.stringify({
                question: formValues.question,
                answer: formValues.answer,
                description: formValues.description,
                resources: resources.length ? resources.split(",") : [],
                level: Number(formValues.level),
                completed: false,
                editDate: dateFormat(new Date())
            })
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        };

        const question = await response.json();
        toast.success("A question has been edit successfully");
        return formValues.clearForm ? {} : question;

    } catch (error: any) {
        toast.error(error?.message);
        return {};
    }

}

interface IEditQuestionProps {
    state: IQuestionCard;
}


const EditQuestion: FC<IEditQuestionProps> = ({ state }) => {

    const navigate = useNavigate()

    const [removeQuestion, isRemovingQuestion] = useFetch(async () => {
        const response = await fetch(`${API_URL}/react/${state.id}`, {
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        toast.success("A question has been successfully deleted!");
        navigate("/");
    });

    const onRemoveQiestionHandler = () => {
        const isRemove = confirm("Are you sure you want to delete the question?");
        isRemove && removeQuestion();
    }

    const [stateForm, formAction, isPanding] = useActionState<Partial<IQuestionFormState>, FormData>(editActionState, { ...state, clearForm: false });


    return (
        <>

            {isPanding || isRemovingQuestion && <Loader />}
            <h1 className={cls.formTitle}>Edit question</h1>
            <div className={cls.formContainer}>
                <button className={cls.removeBtn} onClick={onRemoveQiestionHandler} disabled={isPanding || isRemovingQuestion}>x</button>
                <QuestionForm formAction={formAction} stateForm={stateForm} isPanding={isPanding || isRemovingQuestion} btnText="Edit Question" />
                
            </div>
            
        </>
    );

};

export default EditQuestion;
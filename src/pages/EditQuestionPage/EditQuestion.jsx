import { useActionState } from 'react';
import { Loader } from '../../components/Loader';
import QuestionForm from '../../components/QuestionForm/QuestionForm';
import cls from './EditQuestionPage.module.css';
import { toast } from 'react-toastify';
import { delayFn } from '../../helpers/delayFn';
import { API_URL } from '../../constants';
import { dateFormat } from '../../helpers/dateFormat';
import { useFetch } from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';

const editActionState = async (_prev, formData) => {

    try {
        const formValues = Object.fromEntries(formData);

        console.log(formValues)
        const questionId = formValues.questionId;
        const resources = formValues.resources.trim();
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
        return formData.clearForm ? "" : question;

    } catch (error) {
        toast.error(error.message);
        return {};
    }

}




const EditQuestion = ({ state = {} }) => {

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

    const [stateForm, formAction, isPanding] = useActionState(editActionState, { ...state, clearForm: false });


    return (
        <>

            {isPanding || isRemovingQuestion && <Loader />}
            <h1 className={cls.formTitle}>Add new question</h1>
            <div className={cls.formContainer}>
                <button className={cls.removeBtn} onClick={onRemoveQiestionHandler} disabled={isPanding || isRemovingQuestion}>x</button>
                <QuestionForm formAction={formAction} stateForm={stateForm} isPanding={isPanding || isRemovingQuestion} btnText="Edit Question" />
                
            </div>
            
        </>
    );

};

export default EditQuestion;
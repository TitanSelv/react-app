import { useFetch } from '../../hooks/useFetch';
import { API_URL } from '../../constants';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import EditQuestion from './EditQuestion';

const EditQuestionPage = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);

    const [getQuestion, isLoadingQuestion] = useFetch(async () => {
        const response = await fetch(`${API_URL}/react/${id}`)
        const data = await response.json();
        setQuestion(data)

    });

    useEffect(() => {
        getQuestion();
    }, [])

    return (
        <>
            {isLoadingQuestion && <Loader />}

            {question && <EditQuestion state={question}/>}

        </>
    );
};

export default EditQuestionPage;
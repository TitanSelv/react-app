import { useEffect, useState } from "react"
import { API_URL } from "../../constants"
import { QuestionCardList } from "../../components/QuestionCardList/"
import { Loader } from "../../components/Loader"
import { useFetch } from "../../hooks/useFetch"



export const HomePage = () => {
    const [cards, setCards] = useState([]);


    const [getQuestions, isLoading, error] = useFetch(async (url) => {
        const response = await fetch(`${API_URL}/${url}`)

        if(!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`)
        }

        const questions = await response.json()

        setCards(questions);

        return questions;


    })

    useEffect(() => {
        getQuestions("react")
    }, [])


    return (
        <>

            {isLoading && <Loader />}
            {error && <p>{error}</p>}
            <QuestionCardList cards={cards} />
        </>
    )
}
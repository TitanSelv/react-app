import { useEffect, useState } from "react"
import { API_URL } from "../../constants"
import { QuestionCardList } from "../../components/QuestionCardList/"
import { Loader } from "../../components/Loader"
import { useFetch } from "../../hooks/useFetch"



export const HomePage = () => {
    const [cards, setCards] = useState([]);
    const [searchValue, setSearchValue] = useState("")


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

    const refHandler = (e) => {
        console.log(e.target.value)
        setSearchValue(e.target.value)
    }


    return (
        <>

            <input type="text" value={searchValue} onChange={refHandler}/>
            {isLoading && <Loader />}
            {error && <p>{error}</p>}
            <QuestionCardList cards={cards} />
        </>
    )
}
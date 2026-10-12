import { useEffect, useState } from "react"
import { API_URL } from "../../constants"
import cls from "./HomePage.module.css"
import { QuestionCardList } from "../../components/QuestionCardList/"
import { Loader } from "../../components/Loader"



export const HomePage = () => {
    const [cards, setCards] = useState([])

    useEffect(() => {
        const getQuestions = async () => {
            try {
                const response = await fetch(`${API_URL}/react`);
                const questions = await response.json();

                if (!response.ok) {
                    throw new Error("Ошибка загрузки")
                }

                setCards(questions)


            } catch (error) {
                console.log(error)
            }
        }

        getQuestions()

    }, [])


    return (
        <>
        <Loader />
        <QuestionCardList cards={cards} />
        </>
    )
}
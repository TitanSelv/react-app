import { useEffect, useState } from "react"
import { QuestionCard } from "../../components/QuestionCard"
import { API_URL } from "../../constants"
import cls from "./HomePage.module.css"



export const HomePage = () => {
    const [cards, setCards] = useState([])

    useEffect(() => {
        const getQuestions = async () => {
            try {
                const response = await fetch(`${API_URL}/react`);
                const questions = await response.json();

                if(!response.ok) {
                    throw new Error("Ошибка загрузки")
                }

                setCards(questions)

                console.log(questions)

            } catch (error) {
                console.log(error)
            }
        }

        getQuestions()

    }, [])


    return (
        <>
            {cards.map((card) => {
                return <QuestionCard card={card} key={card.id} />
            })}
        </>

    )
}
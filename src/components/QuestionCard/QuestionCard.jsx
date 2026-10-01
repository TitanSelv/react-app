import { useNavigate } from "react-router-dom"
import { Button } from "../Button"
import cls from "./QuestionCard.module.css"


export const QuestionCard = ({ card }) => {

    const navigate = useNavigate()
    return (
        <div className={cls.card}>
            <div className={cls.cardStat}>
                <div>Level: {card.level}</div>
                <div> {card.completed ? "Completed" : "No Completed"} </div>
            </div>

            <h5 className={cls.cardTitle}> {card.question} </h5>
            <div className={cls.cardAnswers}>
                <p>Short Answer:</p>
                <label className={cls.CardAnswer}> {card.answer} </label>
            </div>

            <Button onClick={() => navigate(`/question/${card.id}`)}>View</Button>

        </div>

    )
}
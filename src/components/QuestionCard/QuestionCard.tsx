import { useNavigate } from "react-router-dom"
import { Button } from "../Button"
import cls from "./QuestionCard.module.css"
import { memo, type FC } from "react"
import { Badge } from "../Badge/Badge";
import type { IQuestionCard } from "../../types/global.types";

export interface IQuestionCardProps {
    card: IQuestionCard;
}


export const QuestionCard: FC<IQuestionCardProps> = memo(({ card }) => {

    const levelCards = card.level === 1 ? "green" : card.level === 2 ? "orange" : "red"
    const completedCards = card.completed ? "green" : "primary";

    const navigate = useNavigate()
    return (
        <div className={cls.card}>
            <div className={cls.cardStat}>
                <Badge variant={levelCards}>Level: {card.level}</Badge>
                <Badge variant = {completedCards}> {card.completed ? "Completed" : "Not Completed"} </Badge>
            </div>

            <h5 className={cls.cardTitle}> {card.question} </h5>
            <div className={cls.cardAnswers}>
                <p>Short Answer:</p>
                <label className={cls.CardAnswer}> {card.answer} </label>
            </div>

            <Button onClick={() => navigate(`/question/${card.id}`)}>View</Button>

        </div>

    );
});
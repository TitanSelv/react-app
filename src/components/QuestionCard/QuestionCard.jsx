import { Button } from "../Button"
import cls from "./QuestionCard.module.css"

export const QuestionCard = (props) => {
    return (
        <div className={cls.card}>
            <div className={cls.cardStat}>
                <div>Level: 1</div>
                <div>No Completed</div>
            </div>

            <h5 className={cls.cardTitle}>Что такое JSX?</h5>
            <div className={cls.cardAnswers}>
                <p>Short Answer:</p>
                <label className={cls.CardAnswer}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, a.</label>
            </div>

            <Button>View</Button>

        </div>

    )
}
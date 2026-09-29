import { QuestionCard } from "../../components/QuestionCard"
import cls from "./HomePage.module.css"


export const HomePage = (props) => {
    return (
        <div className={cls.HomePage}>
            <QuestionCard />
        </div>

    )
}
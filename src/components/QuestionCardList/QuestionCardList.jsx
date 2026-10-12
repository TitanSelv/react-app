import { } from 'react';
import { QuestionCard } from '../QuestionCard/QuestionCard';
import cls from "./QuestionCardList.module.css"


export const QuestionCardList = ({ cards }) => {

    return (
        <div className={cls.cardList}>
            {cards.map((card) => {
                return <QuestionCard card={card} key={card.id} />
            })}
        </div>
    );

};


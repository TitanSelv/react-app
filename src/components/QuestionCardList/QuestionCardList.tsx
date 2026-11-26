import { type FC } from 'react';
import { QuestionCard } from '../QuestionCard/QuestionCard';
import cls from "./QuestionCardList.module.css"
import type { IQuestionCard } from '../../types/global.types';

export interface IQuestionCardListProps {
    cards: IQuestionCard[];
}


export const QuestionCardList: FC<IQuestionCardListProps> = ({ cards }) => {

    return (
        <div className={cls.cardList}>
            {cards.map((card) => {
                return <QuestionCard card={card} key={card.id} />
            })}
        </div>
    );

};


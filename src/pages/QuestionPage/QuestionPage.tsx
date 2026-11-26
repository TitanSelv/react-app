import { useNavigate, useParams } from 'react-router-dom';
import { Badge } from '../../components/Badge/Badge';
import { Button } from '../../components/Button';
import cls from './QuestionPage.module.css';
import { useEffect, useId, useState, type ChangeEvent } from 'react';
import { API_URL } from '../../constants/global.constants';
import { useFetch } from '../../hooks/useFetch';
import { Loader, SmallLoader } from '../../components/Loader';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';
import type { IQuestionCard } from '../../types/global.types';



type Color = 'green' | 'orange' | 'red';

export const QuestionPage = () => {

    const [card, setCard] = useState<IQuestionCard | null>(null)
    const checkboxId = useId();
    const { id } = useParams<{ id: string }>();
    const { isAuth } = useAuth();
    const navigate = useNavigate();

    const [getCard, isCardLoading] = useFetch(async () => {
        const response = await fetch(`${API_URL}/react/${id}`)
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`)
        }
        const data = await response.json();
        setCard(data);
    });

    const [updateCard, isCardUpdating] = useFetch(async (isChecked) => {
        const response = await fetch(`${API_URL}/react/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed: isChecked })
        })
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`)
        }
        const data = await response.json()
        setCard(data);
        if (isChecked) {
            toast.success("Completed");
        };
    });

    useEffect(() => {
        if (!id) return;
        getCard()
    }, [id]);




    const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        const checkedValue = e.target.checked;
        updateCard(checkedValue);
    };

    const levelCards = (): Color => (card?.level === 1 ? "green" : card?.level === 2 ? "orange" : "red");
    const completedCards = (): "green" | "primary" => (card?.completed ? "green" : "primary");

    return (

        <>
            {isCardLoading && <Loader />}
            {card !== null && <div className={cls.container}>
                <div className={cls.cardStat}>
                    <Badge variant={levelCards()}>Level: {card.level}</Badge>
                    <Badge variant={completedCards()}> {card.completed ? "Completed" : "Not completed"} </Badge>

                    {card?.editDate && <p className={cls.editDate}>{card.editDate}</p>}

                </div>

                <h5 className={cls.cardTitle}> {card.question} </h5>

                <p className={cls.cardDescription}>{card.description}</p>

                <div className={cls.cardAnswers}>
                    <p>Short Answer:</p>
                    <label className={cls.CardAnswer}> {card.answer} </label>
                </div>
                {card.resources.length > 0 && <ul className={cls.cardLinks}>
                    Resourses:
                    {card.resources.map((link, index) => {
                        return <li key={index}>
                            <a href={link.trim()} target='_blank' rel='noreferrer'>
                                {link.trim()}
                            </a>
                        </li>
                    })}
                </ul>}


                <label className={cls.checkboxWrapper} htmlFor={checkboxId}>
                    <input
                        className={cls.checkbox}
                        type="checkbox"
                        id={checkboxId}
                        checked={card.completed}
                        onChange={onChangeCheckboxHandler}
                        disabled={isCardUpdating}
                    />
                    <p>mark question as completed</p>
                    {isCardUpdating && <SmallLoader />}
                </label>


                {isAuth && <Button onClick={() => navigate(`/editquestion/${card.id}`)} disabled={isCardUpdating}>Edit Question</Button>}
                <Button onClick={() => navigate("/")} disabled={isCardUpdating}>Back</Button>

            </div>}

        </>

    );

};

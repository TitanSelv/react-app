import { useEffect, useMemo, useState } from "react"
import { API_URL } from "../../constants"
import { QuestionCardList } from "../../components/QuestionCardList/"
import { Loader } from "../../components/Loader"
import { useFetch } from "../../hooks/useFetch"
import cls from "./HomePage.module.css"
import { SearchInput } from "../../components/SearchInput";




export const HomePage = () => {
    const [cards, setCards] = useState([]);;
    const [searchValue, setSearchValue] = useState("");
    const [sortValue, setSortValue] = useState("");



    const [getQuestions, isLoading, error] = useFetch(async (url) => {
        const response = await fetch(`${API_URL}/${url}`)

        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`)
        }

        const questions = await response.json()

        setCards(questions);

        return questions;


    });

    const filterCards = useMemo(() => {
        return cards.filter((card) => card.question.toLowerCase().includes(searchValue.trim().toLocaleLowerCase()));
    }, [cards, searchValue]);

    useEffect(() => {
        getQuestions(`react?${sortValue}`)
    }, [sortValue]);

    const refHandler = (e) => {
        setSearchValue(e.target.value)
    };

    const sortValueHandler = (e) => {
        setSortValue(e.target.value)
    }


    return (
        <>
            <div className={cls.controlsContainer}>
                <SearchInput value={searchValue} onChange={refHandler} ph={"Search..."} />

                <select className={cls.sortSelect} value={sortValue} onChange={sortValueHandler}>
                    <option value="" >Sort By</option>
                    <hr />
                    <option value="_sort=level">Level ABC</option>
                    <option value="_sort=-level">Level CBA</option>
                    <option value="_sort=completed">Complited</option>
                    <option value="_sort=-completed">No Complited</option>
                </select>

            </div>

            {isLoading && <Loader />}
            {error && <p>{error}</p>}

            {filterCards.length === 0 && <p className={cls.noCards}>Nothing found...</p>}
            

            <QuestionCardList cards={filterCards} />
        </>
    )
}
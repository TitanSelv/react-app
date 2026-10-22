import { useEffect, useMemo, useRef, useState } from "react"
import { API_URL, countSort, sortSelect } from "../../constants"
import { QuestionCardList } from "../../components/QuestionCardList/"
import { Loader } from "../../components/Loader"
import { useFetch } from "../../hooks/useFetch"
import cls from "./HomePage.module.css"
import { SearchInput } from "../../components/SearchInput";
import { Button } from "../../components/Button"
import { SortSelect } from "../../components/sortSelect"


const DEFAUL_PER_PAGE = 10;


export const HomePage = () => {
    const [cards, setCards] = useState({});;
    const [searchValue, setSearchValue] = useState("");
    const [sortValue, setSortValue] = useState("");
    const [countSelectValue, setCountSelectValue] = useState("10");
    const [searchParams, setSearchParams] = useState(`?_page=1&_per_page=${DEFAUL_PER_PAGE}`);
    const controlsContainerRef = useRef();


    const getActivePageButton = () => {
        if (cards.next === null) {
            return cards.pages;
        } else {
            return cards.next - 1;
        };
    };

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

        if (cards?.data) {
            if (searchValue.trim()) {
                return cards.data.filter((card) => card.question.toLowerCase().includes(searchValue.trim().toLocaleLowerCase()));
            } else {
                return cards.data
            }
        }
        return [];

    }, [cards, searchValue]);

    useEffect(() => {
        getQuestions(`react${searchParams}`)
    }, [searchParams]);

    const refHandler = (e) => {
        setSearchValue(e.target.value)
    };

    const sortValueHandler = (e) => {
        setSortValue(e.target.value)
        setSearchParams(`?_page=1&_per_page=${countSelectValue}&${e.target.value}`)
    }

    const paginationHandler = (e) => {
        if (e.target.tagName === "BUTTON") {
            setSearchParams(`?_page=${e.target.textContent}&_per_page=${countSelectValue}&${sortValue}`);
            controlsContainerRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }

    const pagination = useMemo(() => {
        const totalCardsCount = cards?.pages || 0;
        return Array(totalCardsCount).fill(0).map((_, i) => i + 1);
    }, [cards]);

    const countSelectHandler = (e) => {
        setCountSelectValue(e.target.value);
        setSearchParams(`?_page=1&_per_page=${e.target.value}&${sortValue}`);
    }


    return (
        <>
            <div className={cls.controlsContainer} ref={controlsContainerRef}>
                <SearchInput value={searchValue} onChange={refHandler} ph={"Search..."} />

                <SortSelect value={sortValue} onChange={sortValueHandler} name="Sort By" constants={sortSelect} />

                <SortSelect nameDisabled={true} value={countSelectValue} onChange={countSelectHandler} name="Count" constants={countSort} />



            </div>

            {isLoading && <Loader />}
            {error && <p>{error}</p>}
            <QuestionCardList cards={filterCards} />


            {filterCards.length === 0 ? <p className={cls.noCards}>Nothing found...</p> :
                (pagination.length > 1 && <div className={cls.paginationContainer} onClick={paginationHandler}>
                    {pagination.map((value) => {
                        return <Button isActive={value === getActivePageButton()} key={value}>{value}</Button>
                    })}
                </div>)
            }






        </>
    )
}
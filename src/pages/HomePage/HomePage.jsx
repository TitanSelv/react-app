import { useEffect, useMemo, useRef, useState } from "react"
import { API_URL, countSort, sortSelect } from "../../constants"
import { QuestionCardList } from "../../components/QuestionCardList/"
import { Loader } from "../../components/Loader"
import { useFetch } from "../../hooks/useFetch"
import cls from "./HomePage.module.css"
import { SearchInput } from "../../components/SearchInput";
import { SortSelect } from "../../components/sortSelect"
import { Pagination } from "../../components/Pagination"


const DEFAUL_PER_PAGE = 10;


export const HomePage = () => {
    const [cards, setCards] = useState({});;
    const [searchValue, setSearchValue] = useState("");
    const [sortValue, setSortValue] = useState("");
    const [countSelectValue, setCountSelectValue] = useState("10");
    const [searchParams, setSearchParams] = useState(`?_page=1&_per_page=${DEFAUL_PER_PAGE}`);
    const controlsContainerRef = useRef();


    const currentPage = Number(new URLSearchParams(searchParams).get("_page")) || 1;

    const totalPages = cards?.pages || 0;

    const paginationHandler = (page) => {
        if (page === currentPage) return;
        const params = new URLSearchParams();
        params.set("_page", page);
        params.set("_per_page", countSelectValue);
        if (searchValue.trim()) {
            params.set("question:contains", searchValue.trim());
        }
        new URLSearchParams(sortValue.replace(/^[?&]+/, ""))
            .forEach((value, key) => params.set(key, value));
        setSearchParams(`?${params.toString()}`);
        controlsContainerRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
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
        return cards?.data || [];
    }, [cards]);

    useEffect(() => {
        getQuestions(`react${searchParams}`)
    }, [searchParams]);

    const refHandler = (e) => {
        setSearchValue(e.target.value);
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            const params = new URLSearchParams();

            params.set("_page", "1");
            params.set("_per_page", countSelectValue);

            if (searchValue.trim()) {
                params.set("question:contains", searchValue.trim());
            }

            const sortParams = new URLSearchParams(
                sortValue.replace(/^[?&]+/, "")
            );

            sortParams.forEach((v, k) => params.set(k, v));

            setSearchParams(`?${params.toString()}`);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [searchValue]);

    const sortValueHandler = (e) => {
        const value = e.target.value;
        setSortValue(value);
        const params = new URLSearchParams();
        params.set("_page", "1");
        params.set("_per_page", countSelectValue);
        if (searchValue.trim()) {
            params.set("question:contains", searchValue.trim());
        }
        new URLSearchParams(value.replace(/^[?&]+/, ""))
            .forEach((v, k) => params.set(k, v));
        setSearchParams(`?${params.toString()}`);
    }





    const countSelectHandler = (e) => {
        const value = e.target.value;
        setCountSelectValue(value);
        const params = new URLSearchParams();
        params.set("_page", "1");
        params.set("_per_page", value);
        if (searchValue.trim()) {
            params.set("question:contains", searchValue.trim());
        }
        new URLSearchParams(sortValue.replace(/^[?&]+/, ""))
            .forEach((v, k) => params.set(k, v));
        setSearchParams(`?${params.toString()}`);
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


            {filterCards.length === 0 ? (
                <p className={cls.noCards}>Nothing found...</p>
            ) : (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={paginationHandler}
                />
            )}






        </>
    )
}
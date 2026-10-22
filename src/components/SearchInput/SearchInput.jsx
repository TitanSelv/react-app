
import { useId } from "react";
import cls from "./SearchInput.module.css"
import { SearchIcon } from "../icons";

export const SearchInput = (props) => {
    const inputId = useId()
    return (
        <div className={cls.inputContainer}>
            <label htmlFor={inputId}>
                <SearchIcon className={cls.searchIcon} />
            </label>
            <input
                type="text"
                value={props.value}
                onChange={props.onChange}
                placeholder={props.ph}
                className={cls.searchInput}
                id={inputId}
            />
        </div>
    );
};
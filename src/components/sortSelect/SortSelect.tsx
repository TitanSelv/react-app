import type { ChangeEventHandler, FC } from "react";
import cls from "./SortSelect.module.css";

export interface SortOption {
    value: string;
    title: string;
}

export interface SortSelectProps {
    name: string;
    id?: string;
    className?: string;
    value?: string;
    defaultValue?: string;
    onChange?: ChangeEventHandler<HTMLSelectElement>;
    nameDisabled?: boolean;
    constants: SortOption[];
}

export const SortSelect: FC<SortSelectProps> = (props) => {
    return (
        <select
            name={props.name} id={props.id} 
            className={`${cls.sortSelect} ${props.className || ""}`} 
            {...(props.value !== undefined ? { value: props.value } : { defaultValue: props.defaultValue })}
            onChange={props.onChange}
        >
            <option disabled={props.nameDisabled} value="" >{props.name}</option>
            <hr />
            {props.constants.map((constant, index) => {
                return <option key={index} value={constant.value}>{constant.title}</option>
            })}
        </select>
    );
};


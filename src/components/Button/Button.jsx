import { } from 'react';
import cls from "./Button.module.css";

export const Button = (props) => {
    return (
        <button type={props.type || "submit"} className={`${cls.btn} ${props.className} ${props.isActive ? cls.active: ""}`} onClick={props.onClick} disabled={props.disabled}>
            {props.children}
        </button>
    );
};

import { } from 'react';
import cls from "./Button.module.css";



export const Button = ({onClick, text}) => {


    return (
        <button onClick={onClick} className={cls.btn}>
            {text}
        </button>
    );
};


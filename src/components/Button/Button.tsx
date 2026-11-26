import { type FC, type MouseEvent, type ReactNode } from 'react';
import cls from "./Button.module.css";

export interface IButtonProps {
    type?: "button" | "submit" | "reset";
    className?: string;
    isActive?: boolean;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    children: ReactNode;
}

export const Button: FC<IButtonProps> = (props) => {
    return (
        <button type={props.type || "submit"} className={`${cls.btn} ${props.className} ${props.isActive ? cls.active: ""}`} onClick={props.onClick} disabled={props.disabled}>
            {props.children}
        </button>
    );
};

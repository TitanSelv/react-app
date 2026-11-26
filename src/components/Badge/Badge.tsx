import type { FC, ReactNode } from 'react';
import cls from './Badge.module.css';

export interface IBadgeProps {
    variant: "green" | "orange" | "red" | "primary";
    children: ReactNode;
}

export const Badge: FC<IBadgeProps> = (props) => {

    switch (props.variant) {
        case "green":
            return <div className={`${cls.badge} ${cls.green}`} > {props.children} </div>;
        case "orange":
            return <div className={`${cls.badge} ${cls.orange}`} > {props.children} </div>;

        case "red":
            return <div className={`${cls.badge} ${cls.red}`} > {props.children} </div>;

        case "primary":
            return <div className={`${cls.badge} ${cls.primary}`} > {props.children} </div>;
        default:
            return (
                <div className={cls.badge} > {props.children} </div>
            );
    }
};
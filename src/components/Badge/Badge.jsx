import cls from './Badge.module.css';

export const Badge = (props) => {

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
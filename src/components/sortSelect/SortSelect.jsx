import cls from "./sortSelect.module.css";

export const SortSelect = (props) => {
    return (
        <select className={cls.sortSelect} value={props.value} onChange={props.onChange}>
            <option disabled={props.nameDisabled} value="" >{props.name}</option>
            <hr />
            {props.constants.map((constant) => {
                return <option value={constant.value}>{constant.title}</option>
            })}
        </select>
    );
};


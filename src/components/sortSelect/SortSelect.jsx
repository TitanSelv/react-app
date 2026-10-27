import cls from "./SortSelect.module.css";

export const SortSelect = (props) => {
    return (
        <select className={cls.sortSelect} value={props.value} onChange={props.onChange}>
            <option disabled={props.nameDisabled} value="" >{props.name}</option>
            <hr />
            {props.constants.map((constant, index) => {
                return <option key={index} value={constant.value}>{constant.title}</option>
            })}
        </select>
    );
};


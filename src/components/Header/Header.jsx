import { } from 'react';
import ReactLogo from "../../assets/react.svg";
import { Button } from '../Button';
import cls from "./Header.module.css";
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigation = useNavigate();
    return (
        <header className={cls.header}>
            <p onClick={() => navigation("/")}>
                <img src={ReactLogo} alt="React Logo" />
                <span>ReactCards</span>
            </p>
            <div className={cls.buttons}>
                <Button onClick={() => navigation("/addquestion")} >Add</Button>
                <Button>Login</Button>
            </div>
        </header>
    );
};

export default Header;
import { } from 'react';
import ReactLogo from "../../assets/react.svg";
import { Button } from '../Button';
import cls from "./Header.module.css";

const Header = () => {
    return (
        <header className={cls.header}>
            <p>
                <img src={ReactLogo} alt="React Logo" />
                <span>ReactCards</span>
            </p>
            <div className={cls.buttons}>
                <Button >Add</Button>
                <Button>Login</Button>
            </div>
        </header>
    );
};

export default Header;
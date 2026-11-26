import { } from 'react';
import ReactLogo from "../../assets/react.svg";
import { Button } from '../Button';
import cls from "./Header.module.css";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { AUTH_STORAGE } from '../../constants/global.constants';
import { ThemeToggler } from '../../features/ThemeToggler';

const Header = () => {
    const navigation = useNavigate();
    const {isAuth, setIsAuth} = useAuth();

    const loginHandler = () => {
        localStorage.setItem(AUTH_STORAGE, `${!isAuth}`);
        setIsAuth(!isAuth);
    }


    return (
        <header className={cls.header}>
            <p onClick={() => navigation("/")}>
                <img src={ReactLogo} alt="React Logo" />
                <span>ReactCards</span>
            </p>
            <div className={cls.buttons}>
                <ThemeToggler />
                {isAuth && <Button onClick={() => navigation("/addquestion")} >Add</Button>}
                <Button onClick={loginHandler} isActive={!isAuth}>{isAuth ? "Logout" : "Login"}</Button>
            </div>
        </header>
    );
};

export default Header;
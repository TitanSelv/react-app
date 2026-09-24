import { } from 'react';

import cls from './MainLayout.module.css';

export const MainLayout = () => {

    const currentYear = new Date().getFullYear();

    return (
        <div className={cls.mainLayout}>
            <header>Header</header>
            <div className={cls.mainWrapper}> 
                <main className={cls.main}>Main Content</main>
                <footer className={cls.footer}>
                    React Question Cards Applocation | {currentYear} <br />
                    by Nikita
                </footer>
            </div>

        </div>
    );
};


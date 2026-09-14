import { useState } from 'react';

import cls from "/src/components/Button/Button.module.css";




const Counter = () => {
    const [counter, setCounter] = useState(0);

    return (
        <button onClick={() => setCounter(counter + 1)} className={cls.btn}>
            count is {counter}
        </button>
    );
};

export default Counter;
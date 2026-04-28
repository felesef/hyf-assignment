// implement a counter component with two button

import { useState } from "react";

export default function Counter() {
    const [count, setCount] = useState(0);
    // set the count to 0 if the count is less than 0
    function handleIncrement() {
        setCount(count + 1);
    }
    function handleDecrement() {
        if (count <= 0) {
            alert("Count cannot be less than 0");
            return;
        }
        setCount(count - 1);
    }
    function handleReset() {
        setCount(0);
    }
    return (
        <div>
            <button className="counter-button" onClick={handleIncrement}>Increase</button>
            <button className="counter-button" onClick={handleDecrement}>Decrease</button>
            <button className="counter-button" onClick={handleReset}>Reset</button>
            <p>Count: {count}</p>
        </div>
    );
}
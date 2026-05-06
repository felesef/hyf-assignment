import { useState, useEffect } from "react";
import "./Clock.css";

export default function Clock() {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(intervalId); // cleanup function
    }, []);
    return (
        <div className="clock-container">
            <p>{time.toLocaleTimeString()}</p>
        </div>
    );
}
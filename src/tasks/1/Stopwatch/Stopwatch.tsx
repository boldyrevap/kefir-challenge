import {FC, useState, useEffect} from "react";

const Stopwatch: FC = () => {
    const [status, setStatus] = useState(false);
    const [runningTime, setRunningTime] = useState(0);

    useEffect(() => {
        let timer: any = null;
        if (status) {
            const startTime = Date.now() - runningTime;
            timer = setInterval(() => {
                setRunningTime(Date.now() - startTime);
            });
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [status, runningTime]);

    const getUnits = (time: number) => {
        const seconds = time / 1000;

        const min = Math.floor(seconds / 60).toString();
        const sec = Math.floor(seconds % 60).toString();
        const msec = (seconds % 1).toFixed(3).substring(2);

        return `${min}:${sec}:${msec}`;
    };

    const handleClick = () => {
        setStatus(!status);
    };

    const handleReset = () => {
        setStatus(false);
        setRunningTime(0);
    };

    const handleLap = () => {
        console.log(getUnits(runningTime));
    };

    return (
        <div>
            <p>{getUnits(runningTime)}</p>
            <button onClick={handleClick}>{status ? "Stop" : "Start"}</button>
            <button onClick={handleReset}>Reset</button>
            <button onClick={handleLap}>Lap</button>
        </div>
    );
};

export default Stopwatch;

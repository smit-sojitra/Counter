import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CounterPage({ config }) {
    const navigate = useNavigate();
    if (!config) {
        return <p className="text-center mt-10 text-red-500">Configuration not found. Please go back and configure.</p>;
    }

    const { initial, target, interval } = config;
    const [count, setCount] = useState(initial);
    const [times, setTimes] = useState([]);
    const [startTime, setStartTime] = useState(Date.now());
    const lastIntervalTimeRef = useRef(Date.now());

    useEffect(() => {
        setStartTime(Date.now());
        lastIntervalTimeRef.current = Date.now();
    }, []);

    const playSound = (type) => {
        let src = '../../public/sounds/click.wav';
        if (type === 'interval') src = '../../public/sounds/interval.wav';
        else if (type === 'target') src = '../../public/sounds/target.wav';
        new Audio(src).play().catch(err => console.error('Sound error:', err));
    };

    const handleClick = () => {
        const next = count + 1;
        setCount(next);
        playSound('click');

        if (next % interval === 0 && next < target) {
            const now = Date.now();
            const diff = Math.round((now - lastIntervalTimeRef.current) / 1000);
            lastIntervalTimeRef.current = now;

            // Format interval time in minutes and seconds
            const minsInterval = Math.floor(diff / 60);
            const secsInterval = diff % 60;
            const formattedInterval = minsInterval > 0
                ? `${minsInterval} minute${minsInterval > 1 ? 's' : ''} ${secsInterval} second${secsInterval !== 1 ? 's' : ''}`
                : `${secsInterval} second${secsInterval !== 1 ? 's' : ''}`;

            setTimes(prev => [...prev, `Time to reach ${next}: ${formattedInterval}`]);
            playSound('interval');
        }

        if (next === target) {
            const totalTime = Math.round((Date.now() - startTime) / 1000);

            // Format total time in minutes and seconds
            const mins = Math.floor(totalTime / 60);
            const secs = totalTime % 60;
            const formatted = mins > 0
                ? `${mins} minute${mins > 1 ? 's' : ''} ${secs} second${secs !== 1 ? 's' : ''}`
                : `${secs} second${secs !== 1 ? 's' : ''}`;

            setTimes(prev => [...prev, `🎯 Target reached in ${formatted}`]);
            playSound('target');
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Click Counter</h1>
            <p className="text-lg mb-2">Count: {count}</p>
            <button onClick={handleClick} className="bg-green-600 h-[200px] w-[200px] rounded-full  text-white px-6 py-3 text-xl ">
                Click
            </button>
            <div className="mt-6 text-left">
                <h2 className="font-semibold mb-2">Interval Logs:</h2>
                {times.map((log, i) => (
                    <p key={i} className="text-sm">• {log}</p>
                ))}
            </div>
        </div>
    );
}

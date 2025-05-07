import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CounterPage({ config }) {
    const navigate = useNavigate();
    useEffect(() => {
        if (!config) {
            console.log("first")
            navigate('/');
        }
    }, [config, navigate]);

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
        let src = '/sounds/click.mp3';
        if (type === 'interval') src = '/sounds/interval.mp3';
        else if (type === 'target') src = '/sounds/target.mp3';
        new Audio(src).play().catch(err => console.error('Sound error:', err));
    };

    const handleClick = () => {
        const next = count + 1;
        setCount(next);
        playSound('click');

        const now = Date.now();

        if (next % interval === 0 && next < target) {
            const diff = Math.round((now - lastIntervalTimeRef.current) / 1000);
            lastIntervalTimeRef.current = now;

            const minsInterval = Math.floor(diff / 60);
            const secsInterval = diff % 60;
            const formattedInterval = minsInterval > 0
                ? `${minsInterval} minute${minsInterval > 1 ? 's' : ''} ${secsInterval} second${secsInterval !== 1 ? 's' : ''}`
                : `${secsInterval} second${secsInterval !== 1 ? 's' : ''}`;

            setTimes(prev => [...prev, `Time to reach ${next}: ${formattedInterval}`]);
            playSound('interval');
        }

        if (next === target) {
            // Final interval before target
            const diff = Math.round((now - lastIntervalTimeRef.current) / 1000);
            const minsInterval = Math.floor(diff / 60);
            const secsInterval = diff % 60;
            const formattedInterval = minsInterval > 0
                ? `${minsInterval} minute${minsInterval > 1 ? 's' : ''} ${secsInterval} second${secsInterval !== 1 ? 's' : ''}`
                : `${secsInterval} second${secsInterval !== 1 ? 's' : ''}`;

            setTimes(prev => [
                ...prev,
                `Time to reach ${next}: ${formattedInterval}`
            ]);

            // Total time to reach target
            const totalTime = Math.round((now - startTime) / 1000);
            const mins = Math.floor(totalTime / 60);
            const secs = totalTime % 60;
            const formattedTotal = mins > 0
                ? `${mins} minute${mins > 1 ? 's' : ''} ${secs} second${secs !== 1 ? 's' : ''}`
                : `${secs} second${secs !== 1 ? 's' : ''}`;

            setTimes(prev => [
                ...prev,
                `🎯 Target reached in ${formattedTotal}`
            ]);
            playSound('target');
        }
    };


    return (
        <div className="p-4 min-h-screen bg-[#313b45] w-screen text-center">

            <button className='button' onClick={() => navigate(-1)}>Back</button>
            <div className=' flex flex-col justify-center items-center pt-28'>

                <div className="inline-block rounded-full border-6 border-[#4ed6e2] p-2">

                    <button onClick={handleClick} className="bg-[#4ed6e2] border-[#333a47] text-5xl h-[300px] w-[300px] rounded-full text-white px-6 py-3">
                        {count}
                    </button>
                </div>
                <div className="mt-6 text-left">
                    <h2 className="font-semibold mb-2 text-white">Interval Logs:</h2>
                    {times.map((log, i) => (
                        <p key={i} className="text-sm text-white">{log}</p>
                    ))}
                </div>
            </div>
        </div>
    );
}

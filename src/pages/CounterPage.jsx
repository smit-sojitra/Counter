import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackgroundBeamsWithCollision } from '../components/ui/background-beams-with-collision';
import { cn } from '../lib/utils';
export default function CounterPage({ config, setConfig }) {
    const navigate = useNavigate();
    const { initial, target, interval } = config;
    useEffect(() => {
        const savedConfig = localStorage.getItem('counterConfig');
        setConfig(JSON.parse(savedConfig));
        console.log('localStorage---', config);
        console.log('savedConfig', savedConfig);
    }, []);
    useEffect(() => {
        if (!config) {
            console.log("first")
            navigate('/');
        }
    }, [config, navigate]);


    console.log("localStorage:-", localStorage.getItem('counterConfig'));
    console.log("config:-", config);
    const [count, setCount] = useState(()=>{
        const saved = JSON.parse(localStorage.getItem('counterApp'));
        return saved ? saved.count || 0 : initial;  
    });
    const [times, setTimes] = useState(()=>{
        const saved = JSON.parse(localStorage.getItem('counterApp'));
        return saved ? saved.times || [] : [];
    });
    const [startTime, setStartTime] = useState(Date.now());
    const lastIntervalTimeRef = useRef(Date.now());

    useEffect(() => {
        setStartTime(Date.now());
        lastIntervalTimeRef.current = Date.now();
    }, []);
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('counterApp'));
        console.log("count",saved)
        if (saved) {
            setCount(saved.count || 0);
            setTimes(saved.times || []);
            setStartTime(saved.startTime || Date.now());
            lastIntervalTimeRef.current = saved.lastIntervalTime || Date.now();
        } else {
            setStartTime(Date.now());
            lastIntervalTimeRef.current = Date.now();
        }
    }, []);

    // Update localStorage when count, times, or startTime changes
    useEffect(() => {
        localStorage.setItem('counterApp', JSON.stringify({
            count,
            times,
            startTime,
            lastIntervalTime: lastIntervalTimeRef.current,
        }));
    }, [count, times, startTime]);
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('counterApp'));
        if (saved) {
            setCount(saved.count || 0);
            setTimes(saved.times || []);
            setStartTime(saved.startTime || Date.now());
            lastIntervalTimeRef.current = saved.lastIntervalTime || Date.now();
        } else {
            setStartTime(Date.now());
            lastIntervalTimeRef.current = Date.now();
        }
    }, []);
    useEffect(() => {
        localStorage.setItem('counterApp', JSON.stringify({
            count,
            times,
            startTime,
            lastIntervalTime: lastIntervalTimeRef.current,
        }));
    }, [count, times, startTime]);
 

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
    const resetHandler = () => {
        setCount(initial);
        setTimes([]);
        setStartTime(Date.now());
        lastIntervalTimeRef.current = Date.now();
        localStorage.setItem('counterApp', JSON.stringify({
            count: initial,
            times: [],
            startTime: Date.now(),
            lastIntervalTime: Date.now(),
        }));
    }

    return (
            // <BackgroundBeamsWithCollision className="relative min-h-screen">
             <div className="relative flex min-h-screen w-full justify-center md:items-center bg-black">
        
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] bg-black"></div>
    
        <div className="p-4 z-10 text-center">
            <div className='flex justify-between'>

            <button className='button' onClick={() => navigate(-1)}>Back</button>
            <button className='button' onClick={resetHandler}>Reset</button>
            </div>
            <div className=' flex flex-col justify-center items-center pt-28'>

                <div className="inline-block rounded-full border-4 border-[#119aa7] p-[4px]">

                        <button onClick={handleClick} className="bg-[#01465d] gradient border-[#333a47] text-5xl h-[330px] w-[330px] rounded-full text-white px-6 py-3">
                        {count}
                    </button>
                </div>
                <div className="mt-6 text-left">
                    {/* <h2 className="font-semibold mb-2 text-white">Interval /Logs:</h2> */}
                    {times.map((log, i) => (
                        <p key={i} className="text-sm text-white">{log}</p>
                    ))}
                </div>
            </div>
        </div>
      
    </div>
        // </BackgroundBeamsWithCollision >

    );
}

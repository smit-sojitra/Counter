import { useState, useEffect, useRef } from 'react';
import React from 'react';
export default function ClickCounter() {
  const [initial, setInitial] = useState(0);
  const [target, setTarget] = useState(100);
  const [interval, setIntervalValue] = useState(25);
  const [count, setCount] = useState(0);
  const [intervalTimes, setIntervalTimes] = useState([]);
  const [startTime, setStartTime] = useState(null);

  const clickAudio = useRef(new Audio('/sounds/click.wav'));
  const intervalAudio = useRef(new Audio('/sounds/interval.wav'));
  const targetAudio = useRef(new Audio('/sounds/target.wav'));

  useEffect(() => {
    setCount(Number(initial));
    setIntervalTimes([]);
    setStartTime(null);
  }, [initial, target, interval]);

  const handleClick = () => {
    if (count >= target) return;

    if (!startTime) setStartTime(Date.now());
    clickAudio.current.play();

    const newCount = count + 1;
    setCount(newCount);

    const isInterval = newCount % interval === 0;
    const isTarget = newCount === Number(target);

    if (isInterval || isTarget) {
      const timeNow = Date.now();
      const timeTaken = ((timeNow - startTime) / 1000).toFixed(2); // seconds
      setIntervalTimes(prev => [...prev, `Reached ${newCount}: ${timeTaken}s`]);
      setStartTime(timeNow);

      if (isTarget) targetAudio.current.play();
      else intervalAudio.current.play();
    }
  };

  const handleReset = () => {
    setCount(Number(initial));
    setIntervalTimes([]);
    setStartTime(null);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow space-y-4">
      <div className="space-y-2">
        <label>Initial:
          <input type="number" value={initial} onChange={e => setInitial(Number(e.target.value))} className="ml-2 border px-2" />
        </label>
        <label>Target:
          <input type="number" value={target} onChange={e => setTarget(Number(e.target.value))} className="ml-2 border px-2" />
        </label>
        <label>Interval:
          <input type="number" value={interval} onChange={e => setIntervalValue(Number(e.target.value))} className="ml-2 border px-2" />
        </label>
      </div>

      <h2 className="text-xl font-bold">Counter: {count}</h2>
      <button onClick={handleClick} className="bg-blue-500 text-white px-4 py-2 rounded">Click</button>
      <button onClick={handleReset} className="bg-gray-400 text-white px-4 py-2 rounded ml-2">Reset</button>

      <div className="mt-4">
        <h3 className="font-semibold">Interval Times:</h3>
        <ul className="list-disc list-inside">
          {intervalTimes.map((msg, idx) => (
            <li key={idx}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export default function ConfigPage({ setConfig }) {
    const [initial, setInitial] = useState(0);
    const [target, setTarget] = useState(100);
    const [interval, setInterval] = useState(25);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (initial >= target) return setError('Initial must be less than target');
        if (interval <= 0 || target <= 0) return setError('Interval and target must be > 0');
        if (interval > target) return setError('Interval cannot exceed target');

        setConfig({ initial, target, interval });
        navigate('/counter');
    };

    return (
        <div className="p-4 h-screen w-screen text-white bg-[#212121] gap-10 justify-center items-center flex flex-col">
            <h1 className="text-2xl font-bold mb-4">Configure Counter</h1>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <div className="container">
                <input inputMode="numeric"
                    pattern="[0-9]*" required="" name="text" value={initial} onChange={e => setInitial(+e.target.value)} autoComplete="off" className="input" />
                <label className="label">Initial Count</label>
            </div>

            <div className="container">
                <input inputMode="numeric"
                    required="" name="text" value={target} onChange={e => setTarget(+e.target.value)} autoComplete="off" className="input" />
                <label className="label">Target</label>
            </div>
            <div className="container">
                <input inputMode="numeric"
                    required="" name="text" value={interval} onChange={e => setInterval(+e.target.value)} autoComplete="off" className="input" />
                <label className="label">Interval</label>
            </div>
            {/* <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Start Counter</button> */}

            <button className='button' onClick={handleSubmit}>Counter</button>

        </div>
    );
}

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
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-xl font-bold mb-4">Configure Counter</h1>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <p>Initial</p>
            <input type="number" value={initial} onChange={e => setInitial(+e.target.value)} className="mb-2 block w-full p-2 border rounded" />
            <p>Target</p>
            <input type="number" value={target} onChange={e => setTarget(+e.target.value)} className="mb-2 block w-full p-2 border rounded" />
            <p>Interval</p>
            <input type="number" value={interval} onChange={e => setInterval(+e.target.value)} className="mb-2 block w-full p-2 border rounded" />
            <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Start Counter</button>
        </div>
    );
}

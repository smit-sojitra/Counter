import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ConfigPage from './pages/ConfigPage';
import CounterPage from './pages/CounterPage';

export default function App() {
  const [config, setConfig] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<ConfigPage setConfig={setConfig} />} />
      <Route path="/counter" element={<CounterPage config={config} />} />
    </Routes>
  );
}

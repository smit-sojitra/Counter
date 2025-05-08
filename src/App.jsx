import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ConfigPage from './pages/ConfigPage';
import CounterPage from './pages/CounterPage';
import Test from './pages/Test';

export default function App() {
  const [config, setConfig] = useState(()=>{
    const savedConfig = localStorage.getItem('counterConfig');
    return savedConfig ? JSON.parse(savedConfig) : { initial: 0, target: 100, interval: 25 }; // Default values
  });

  // Load the config from localStorage when the app loads
  useEffect(() => {
    const savedConfig = localStorage.getItem('counterConfig');
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig)); // Set the saved config if available
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<ConfigPage setConfig={setConfig} />} />
      <Route path="/counter" element={<CounterPage config={config} setConfig={setConfig} />} />
      <Route path="/t" element={<Test/>} />
    </Routes>
  );
}

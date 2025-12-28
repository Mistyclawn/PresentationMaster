import { useState } from 'react';
import EditorLayout from './components/Editor/EditorLayout';
import Dashboard from './components/Dashboard/Dashboard';
import './App.css';

function App() {
    const [view, setView] = useState<'editor' | 'dashboard'>('editor');

    if (view === 'dashboard') {
        return <Dashboard onBack={() => setView('editor')} />;
    }

    return (
        <EditorLayout onNavigateToDashboard={() => setView('dashboard')} />
    );
}

export default App;

import { useState } from 'react';
import EditorLayout from './components/Editor/EditorLayout';
import Dashboard from './components/Dashboard/Dashboard';
import InitialScreen from './components/InitialScreen/InitialScreen';
import './App.css';

function App() {
    const [view, setView] = useState<'initial' | 'editor' | 'dashboard'>('initial');

    if (view === 'initial') {
        return (
            <InitialScreen
                onNavigateToEditor={() => setView('editor')}
                onNavigateToDashboard={() => setView('dashboard')}
            />
        );
    }

    if (view === 'dashboard') {
        return <Dashboard onBack={() => setView('editor')} />;
    }

    return (
        <EditorLayout onNavigateToDashboard={() => setView('dashboard')} />
    );
}

export default App;

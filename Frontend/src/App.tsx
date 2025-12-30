import { useState } from 'react';
import EditorLayout from './components/Editor/EditorLayout';
import Dashboard from './components/Dashboard/Dashboard';
import InitialScreen from './components/InitialScreen/InitialScreen';
import './App.css';

function App() {
    const [view, setView] = useState<'initial' | 'editor' | 'dashboard'>('initial');
    const [activeProject, setActiveProject] = useState<boolean>(false);

    const handleOpenProject = () => {
        setActiveProject(true);
        setView('editor');
    };

    const handleCreateProject = () => {
        // In future, this would take title/script
        setActiveProject(true);
        setView('editor');
    };

    if (view === 'initial') {
        return (
            <InitialScreen
                hasActiveProject={activeProject}
                onNavigateToEditor={() => setView('editor')}
                onNavigateToDashboard={() => setView('dashboard')}
                onOpenProject={handleOpenProject}
                onCreateProject={handleCreateProject}
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

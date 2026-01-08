import { useState, useEffect } from 'react';
import EditorLayout from './components/Editor/EditorLayout';
import Dashboard from './components/Dashboard/Dashboard';
import InitialScreen from './components/InitialScreen/InitialScreen';
import { Slide, ProjectMetadata, DesignTemplate } from './types';
import './App.css';

// Mock initial data
const INITIAL_TEMPLATE: DesignTemplate = {
  id: 'default',
  name: 'Modern Blue',
  colors: ['#1976d2', '#ffffff', '#000000', '#f5f5f5', '#ff4081'],
  fontFamily: 'Segoe UI',
  backgroundColor: '#ffffff'
};

const INITIAL_PROJECT: ProjectMetadata = {
  id: 'proj_1',
  title: 'Untitled Presentation',
  createdAt: Date.now(),
  updatedAt: Date.now(),
  version: '1.0.0'
};

function App() {
    const [view, setView] = useState<'initial' | 'editor' | 'dashboard'>('initial');
    
    // Lifted State
    const [project, setProject] = useState<ProjectMetadata | null>(null);
    const [slides, setSlides] = useState<Slide[]>([]);
    const [designTemplate, setDesignTemplate] = useState<DesignTemplate>(INITIAL_TEMPLATE);
    
    // Editor State
    const [currentSlideId, setCurrentSlideId] = useState<string | null>(null);

    const handleOpenProject = () => {
        // Mock load
        setProject(INITIAL_PROJECT);
        const initialSlides: Slide[] = [
            {
                id: 'slide-1',
                order: 1,
                title: 'Welcome',
                description: 'Introduction slide',
                script: 'Welcome everyone to our presentation.',
                duration: 120,
                elements: []
            }
        ];
        setSlides(initialSlides);
        setCurrentSlideId('slide-1');
        setView('editor');
    };

    const handleCreateProject = () => {
        setProject({ ...INITIAL_PROJECT, createdAt: Date.now() });
        const newSlide: Slide = {
            id: `slide-${Date.now()}`,
            order: 1,
            title: 'New Slide',
            description: '',
            script: '',
            duration: 60,
            elements: []
        };
        setSlides([newSlide]);
        setCurrentSlideId(newSlide.id);
        setView('editor');
    };

    const handleUpdateSlide = (updatedSlide: Slide) => {
        setSlides(prev => prev.map(s => s.id === updatedSlide.id ? updatedSlide : s));
    };

    const handleUpdateSlides = (newSlides: Slide[]) => {
        setSlides(newSlides);
    };

    // IPC Save Effect (Example)
    useEffect(() => {
        if (project && slides.length > 0) {
            // Debounce save logic would go here
            if (window.ipc) {
                console.log('Saving via IPC...');
                // window.ipc.send('save-project', { metadata: project, slides, designTemplate });
            }
        }
    }, [slides, project, designTemplate]);

    if (view === 'initial') {
        return (
            <InitialScreen
                hasActiveProject={!!project}
                onNavigateToEditor={() => setView('editor')}
                onNavigateToDashboard={() => setView('dashboard')}
                onOpenProject={handleOpenProject}
                onCreateProject={handleCreateProject}
            />
        );
    }

    if (view === 'dashboard') {
        return (
            <Dashboard 
                slides={slides}
                onUpdateSlides={handleUpdateSlides}
                projectMetadata={project}
                onBack={() => setView('editor')} 
            />
        );
    }

    return (
        <EditorLayout 
            slides={slides}
            currentSlideId={currentSlideId || (slides[0]?.id)}
            onSlideSelect={setCurrentSlideId}
            onUpdateSlide={handleUpdateSlide}
            onNavigateToDashboard={() => setView('dashboard')} 
        />
    );
}

export default App;

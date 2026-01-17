import { useState, useEffect } from 'react';
import EditorLayout from './components/Editor/EditorLayout';
import Dashboard from './components/Dashboard/Dashboard';
import InitialScreen from './components/InitialScreen/InitialScreen';
import PresentationMode from './components/PresentationMode/PresentationMode';
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
    const [view, setView] = useState<'initial' | 'editor' | 'dashboard' | 'presentation'>('initial');

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
                title: 'Q3 Financial Overview',
                description: 'Financial Summary',
                script: 'Here is the overview for Q3.',
                duration: 120,
                elements: [
                    // Title
                    { id: 'el-1', type: 'text', x: 50, y: 40, width: 800, height: 60, content: 'Q3 Financial Overview', style: { fontSize: 48, fontWeight: 'bold', color: '#111827' } },
                    // List Box Background
                    { id: 'el-2', type: 'rect', x: 50, y: 140, width: 400, height: 260, style: { backgroundColor: 'rgba(19, 127, 236, 0.05)', borderColor: '#137fec', borderWidth: 1 } },
                    // List Items
                    { id: 'el-3', type: 'text', x: 70, y: 160, width: 360, height: 30, content: '• Revenue growth up by 15% YoY', style: { fontSize: 20, color: '#374151' } },
                    { id: 'el-4', type: 'text', x: 70, y: 200, width: 360, height: 30, content: '• Operating expenses reduced by 8%', style: { fontSize: 20, color: '#374151' } },
                    { id: 'el-5', type: 'text', x: 70, y: 240, width: 360, height: 30, content: '• New market acquisition in APAC', style: { fontSize: 20, color: '#374151' } },
                    { id: 'el-6', type: 'text', x: 70, y: 280, width: 360, height: 30, content: '• Product margin increased to 32%', style: { fontSize: 20, color: '#374151' } },
                    // Key Takeaway Box
                    { id: 'el-7', type: 'rect', x: 50, y: 420, width: 400, height: 60, style: { backgroundColor: '#eff6ff', borderColor: '#dbeafe', borderWidth: 1, borderRadius: 8 } },
                    { id: 'el-8', type: 'text', x: 70, y: 435, width: 360, height: 30, content: 'Key Takeaway: Strong performance driven by enterprise sector.', style: { fontSize: 14, color: '#1e40af' } },
                    // Chart Area
                    { id: 'el-9', type: 'rect', x: 500, y: 140, width: 400, height: 340, style: { backgroundColor: 'transparent' } }, // Chart container placeholder
                    // Chart Bars
                    { id: 'el-10', type: 'rect', x: 520, y: 300, width: 50, height: 180, style: { backgroundColor: '#60a5fa' } },
                    { id: 'el-11', type: 'rect', x: 600, y: 240, width: 50, height: 240, style: { backgroundColor: '#3b82f6' } },
                    { id: 'el-12', type: 'rect', x: 680, y: 280, width: 50, height: 200, style: { backgroundColor: '#60a5fa' } },
                    { id: 'el-13', type: 'rect', x: 760, y: 160, width: 50, height: 320, style: { backgroundColor: '#2563eb' } },
                    { id: 'el-14', type: 'rect', x: 840, y: 220, width: 50, height: 260, style: { backgroundColor: '#3b82f6' } },
                    // Chart Axis Lines
                    { id: 'el-15', type: 'rect', x: 500, y: 480, width: 400, height: 2, style: { backgroundColor: '#d1d5db' } }, // X Axis
                    { id: 'el-16', type: 'rect', x: 500, y: 140, width: 2, height: 340, style: { backgroundColor: '#d1d5db' } }, // Y Axis
                ]
            },
            {
                id: 'slide-2',
                order: 2,
                title: 'Market Analysis',
                description: '',
                script: '',
                duration: 60,
                elements: [
                    { id: 'el-2-1', type: 'text', x: 50, y: 50, width: 800, height: 60, content: 'Market Analysis', style: { fontSize: 48, fontWeight: 'bold' } }
                ]
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
                onNavigateToPresentation={() => setView('presentation')}
            />
        );
    }

    if (view === 'presentation') {
        return (
            <PresentationMode
                slides={slides}
                onExit={() => setView('editor')}
                onNavigateToDashboard={() => setView('dashboard')}
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
            onNavigateToPresentation={() => setView('presentation')}
        />
    );
}

export default App;

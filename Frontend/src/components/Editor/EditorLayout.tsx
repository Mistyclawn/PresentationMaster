import React from 'react';
import './Editor.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Workspace from './Workspace';
import { Slide } from '../../types';

interface EditorLayoutProps {    slides: Slide[];
    currentSlideId: string;
    onSlideSelect: (id: string) => void;
    onUpdateSlide: (slide: Slide) => void;    onNavigateToDashboard?: () => void;
}

const EditorLayout: React.FC<EditorLayoutProps> = ({ slides, currentSlideId, onSlideSelect, onUpdateSlide, onNavigateToDashboard }) => {
    
    // Find selected slide
    const selectedSlide = slides.find(s => s.id === currentSlideId);
    const [sidebarWidth, setSidebarWidth] = React.useState(240);
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
    const isResizing = React.useRef(false);

    const startResizing = React.useCallback(() => {
        isResizing.current = true;
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none'; // Prevent text selection
    }, []);

    const stopResizing = React.useCallback(() => {
        isResizing.current = false;
        document.body.style.cursor = 'default';
        document.body.style.userSelect = '';
    }, []);

    const resize = React.useCallback((mouseMoveEvent: MouseEvent) => {
        if (isResizing.current) {
            const newWidth = mouseMoveEvent.clientX;
            if (newWidth > 150 && newWidth < 480) { // Min/Max constraints
                setSidebarWidth(newWidth);
            }
        }
    }, []);

    React.useEffect(() => {
        window.addEventListener('mousemove', resize);
        window.addEventListener('mouseup', stopResizing);
        return () => {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResizing);
        };
    }, [resize, stopResizing]);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="editor-layout">
            <Header onNavigateToDashboard={onNavigateToDashboard} />
            <div className="editor-body">
                {isSidebarOpen ? (
                    <div style={{ width: sidebarWidth, position: 'relative', display: 'flex' }}>
                        <Sidebar 
                            slides={slides}
                            currentSlideId={currentSlideId}
                            onSlideSelect={onSlideSelect}
                            onToggle={toggleSidebar} 
                        />
                        <div
                            className="resizer"
                            onMouseDown={startResizing}
                        />
                    </div>
                ) : (
                    <button className="sidebar-trigger" onClick={toggleSidebar} title="Open Sidebar">
                        <span className="material-symbols-outlined">dock_to_right</span>
                    </button>
                )}
                {selectedSlide && (
                    <Workspace 
                        slide={selectedSlide}
                        onUpdateSlide={onUpdateSlide}
                        isSidebarOpen={isSidebarOpen} 
                        onToggleSidebar={toggleSidebar} 
                    />
                )}
            </div>
        </div>
    );
};

export default EditorLayout;

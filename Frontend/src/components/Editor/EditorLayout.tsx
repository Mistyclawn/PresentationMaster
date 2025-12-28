import React from 'react';
import './Editor.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Workspace from './Workspace';

interface EditorLayoutProps {
    onNavigateToDashboard?: () => void;
}

const EditorLayout: React.FC<EditorLayoutProps> = ({ onNavigateToDashboard }) => {
    return (
        <div className="editor-layout">
            <Header onNavigateToDashboard={onNavigateToDashboard} />
            <div className="editor-body">
                <Sidebar />
                <Workspace />
            </div>
        </div>
    );
};

export default EditorLayout;

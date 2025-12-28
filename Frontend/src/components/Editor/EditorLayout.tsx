import React from 'react';
import './Editor.css';
import Header from './Header'; // Placeholder import
import Sidebar from './Sidebar'; // Placeholder import
import Workspace from './Workspace'; // Placeholder import

const EditorLayout: React.FC = () => {
    return (
        <div className="editor-layout">
            <Header />
            <div className="editor-body">
                <Sidebar />
                <Workspace />
            </div>
        </div>
    );
};

export default EditorLayout;

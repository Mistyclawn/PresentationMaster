import React, { useState } from 'react';
import './InitialScreen.css';

interface InitialScreenProps {
    onNavigateToEditor: () => void;
    onNavigateToDashboard: () => void;
}

const InitialScreen: React.FC<InitialScreenProps> = ({ onNavigateToEditor, onNavigateToDashboard }) => {
    // State for inputs (optional, just for interactivity)
    const [title, setTitle] = useState('');
    const [script, setScript] = useState('');

    const handleCreateSlide = () => {
        // Logic to create slide would go here
        onNavigateToEditor();
    };

    return (
        <div className="initial-screen-container dark"> {/* Assuming dark mode default for now or handled by parent class */}
            <header className="initial-header">
                <div className="initial-brand">
                    <div className="brand-logo-box">
                        <span className="material-symbols-outlined" style={{ fontSize: 24 }}>dashboard</span>
                    </div>
                    <h2 className="brand-title">Presentation Master</h2>
                </div>
                <div className="header-actions">
                    <button className="btn-header btn-header-mode" onClick={onNavigateToDashboard}>
                        <span className="material-symbols-outlined" style={{ marginRight: 8, fontSize: 20 }}>slideshow</span>
                        <span>Presentation Mode</span>
                    </button>
                    <button className="btn-header btn-header-primary" onClick={onNavigateToEditor}>
                        <span className="material-symbols-outlined" style={{ marginRight: 8, fontSize: 18 }}>arrow_back</span>
                        <span>Back to Editor</span>
                    </button>
                    <button className="btn-header-icon">
                        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>help</span>
                    </button>
                    <button className="btn-header-icon">
                        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>settings</span>
                    </button>
                </div>
            </header>

            <main className="initial-main">
                <div className="initial-content-wrapper">
                    {/* Empty State Hero */}
                    <div className="empty-state-hero">
                        <div className="hero-box">
                            <div className="hero-bg-pattern"></div>
                            <div className="hero-content">
                                <div className="hero-icon-box">
                                    <span className="material-symbols-outlined hero-icon">present_to_all</span>
                                </div>
                                <h1 className="hero-title">No Slides Yet</h1>
                                <p className="hero-subtitle">Let's start building your presentation!</p>
                            </div>
                        </div>
                    </div>

                    {/* Grid Actions */}
                    <div className="initial-grid">
                        {/* Create Slide Card */}
                        <div className="col-left">
                            <div className="card-create">
                                <div className="card-header">
                                    <div className="card-icon-box">
                                        <span className="material-symbols-outlined">add_circle</span>
                                    </div>
                                    <div className="card-title-group">
                                        <h3>Add Your First Slide</h3>
                                        <p>Enter title & script to begin.</p>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label className="form-label">Slide Title</label>
                                        <input 
                                            className="form-input" 
                                            placeholder="e.g. Q3 Strategy Overview" 
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group" style={{ flex: 1 }}>
                                        <label className="form-label">Speaker Script</label>
                                        <textarea 
                                            className="form-textarea" 
                                            placeholder="Type your narration here..."
                                            value={script}
                                            onChange={(e) => setScript(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <button className="btn-create" onClick={handleCreateSlide}>
                                        <span className="material-symbols-outlined">check_circle</span> Create Slide
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Side Actions */}
                        <div className="col-right">
                            {/* Generate Outline */}
                            <button className="action-card card-generate">
                                <div className="bg-icon-overlay">
                                    <span className="material-symbols-outlined bg-icon-large">psychology</span>
                                </div>
                                <div className="action-content">
                                    <div className="action-icon-box">
                                        <span className="material-symbols-outlined">auto_awesome</span>
                                    </div>
                                    <h3 className="action-title">Generate Outline</h3>
                                    <p className="action-desc">Use AI to suggest topics and narrative flow.</p>
                                </div>
                            </button>

                            {/* Import Content */}
                            <button className="action-card card-import">
                                <div className="bg-icon-overlay">
                                    <span className="material-symbols-outlined bg-icon-large">folder_open</span>
                                </div>
                                <div className="action-content">
                                    <div className="action-icon-box" style={{ backgroundColor: '#d1fae5', color: '#059669' }}>
                                         <span className="material-symbols-outlined">upload_file</span>
                                    </div>
                                    <h3 className="action-title">Import Content</h3>
                                    <p className="action-desc">Bring in existing PDF, Word, or PPTX files.</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default InitialScreen;

import React, { useState } from 'react';
import './InitialScreen.css';
import Header from '../Editor/Header';

interface InitialScreenProps {
    hasActiveProject: boolean;
    onNavigateToEditor: () => void;
    onNavigateToDashboard: () => void;
    onOpenProject: () => void;
    onCreateProject: () => void;
}

const InitialScreen: React.FC<InitialScreenProps> = ({
    hasActiveProject,
    onNavigateToEditor,
    onNavigateToDashboard,
    onOpenProject,
    onCreateProject
}) => {
    // State for inputs
    const [title, setTitle] = useState('');
    const [script, setScript] = useState('');

    const handleCreateSlide = () => {
        onCreateProject();
    };

    const recentProjects = [
        { id: 1, title: 'Q3 Financial Overview', date: 'Edited 2 mins ago', thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMRUYMaQ7CukbYmLbQHLCVNpKtysfHlwElrM6-ixNedSlLjzy2WZsROJ_rdYICZ2xfxJqQRdKBGDSKVmDOFnT9lYTHanufjIt3FT1HMASM12ffaH4tWJ346sPPYGQZ979bYfIytCVAtidi-B0AGqBrHfJTGvDEOlHlflJ436yUhB1KPLfajCgMNlkEKPLNyycLr4oS80A5sGNjP_HN3hM5q7bSzqKvQPpRSXFegtipL-jNsXi_DJ3byUjIiaLk-X1ATf-ZyGjBw10G' },
        { id: 2, title: 'Project Alpha Pitch', date: 'Edited yesterday', thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCD__G9k4j04P_in85vFtmB3sI6BelNH-gBnDTiLf9Ub56A49mvgdMmoiXTzPOPBQwFQdEvMWdonGq9RouaJkhtjOwcb0cvvbLv7DsG4JpbrUMa0gf0MheBB-GFnnroNB83Jd8z1PSfofcgzRwtPcJaMJhr-2HiO33hYb_K4_8caKVgAQkvp3dmHBLom4g8KH2u-lIQlPz2aT2Eg3Qz9M0Y6R_U0uNulE04hN1E3M6mS0C-2nz_CEru1RVwEydL4x2ahf85g3J75Zhj' },
        { id: 3, title: 'Team Sync Updates', date: 'Edited last week', thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOU3py3A_oASVF25UCBtVpAlivxaurhese28KdOCPOPzben1EdCo5pLKGF6hyKOntlTzf50NIa1NcMlV_hoTuZoRLa8M1p9fWPptzO1-2lHll3GPRQ0TN6rNk95gyKVY6v6pz0PY2MTnMTXj9E46s4qPyt_gUUJ4440-bce0zLMHRTjmomxQSmJoe-lXVvEnUsjrN6FD4H_jWdr4a4fJok2KHU648TrR4gHNborgSOKcBf4x0MOFmk5U-bxD2mZguxhZbbFiPCGPiO' },
    ];

    return (
        <div className="initial-screen-container dark">
            <Header
                mode="initial"
                hasActiveProject={hasActiveProject}
                onNavigateToDashboard={onNavigateToDashboard}
                onNavigateToEditor={onNavigateToEditor}
            />

            <main className="initial-main">
                <div className="layout-wrapper">
                    <div className="initial-content-wrapper">

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
                                            <h3>New Project</h3>
                                            <p>Start from scratch with a new slide</p>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label className="form-label">Project Title</label>
                                            <input
                                                className="form-input"
                                                placeholder="e.g. Q3 Strategy Overview"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group" style={{ flex: 1 }}>
                                            <label className="form-label">Initial Script</label>
                                            <textarea
                                                className="form-textarea"
                                                placeholder="Type your narration here..."
                                                value={script}
                                                onChange={(e) => setScript(e.target.value)}
                                            ></textarea>
                                        </div>
                                        <button className="btn-create" onClick={handleCreateSlide}>
                                            <span className="material-symbols-outlined">check_circle</span> Create Project
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

                        {/* Recent Projects Section */}
                        <div className="recent-projects-section">
                            <h3 className="section-title">Recent Projects</h3>
                            <div className="recent-grid">
                                {recentProjects.map(project => (
                                    <div key={project.id} className="recent-card" onClick={onOpenProject}>
                                        <div className="recent-thumb" style={{ backgroundImage: `url('${project.thumb}')` }}></div>
                                        <div className="recent-info">
                                            <h4 className="recent-title">{project.title}</h4>
                                            <p className="recent-date">{project.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default InitialScreen;

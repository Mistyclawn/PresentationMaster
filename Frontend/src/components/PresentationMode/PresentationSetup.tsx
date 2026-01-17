import React from 'react';
import './PresentationSetup.css';
import { Slide } from '../../types';

interface PresentationSetupProps {
    slides: Slide[];
    onStartPractice: () => void;
}

const PresentationSetup: React.FC<PresentationSetupProps> = ({ slides, onStartPractice }) => {
    return (
        <div className="presentation-setup layout-container">
            {/* Main Content Area */}
            <main className="setup-main">
                {/* Flow & Script Section */}
                <section className="setup-card flow-section">
                    <div className="flow-header">
                        <div className="flow-title-group">
                            <h1 className="text-xl font-bold">Flow & Script</h1>
                            <p className="text-sm text-slate-500">Manage narrative and pacing</p>
                        </div>
                        <div className="divider-vertical"></div>
                        <div className="flow-stat">
                            <label className="stat-label">Total Time</label>
                            <div className="stat-input-group">
                                <div className="input-wrapper">
                                    <input type="text" defaultValue="10:00" className="time-input" />
                                    <span className="material-symbols-outlined input-icon">timer</span>
                                </div>
                                <button className="btn-icon-only" title="Auto-distribute time">
                                    <span className="material-symbols-outlined">equalizer</span>
                                </button>
                            </div>
                        </div>
                        <div className="flow-stat">
                            <label className="stat-label">Est. Speaking</label>
                            <div className="stat-display-group">
                                <span className="stat-value text-emerald">09:45</span>
                                <span className="stat-sub">/ 1250 words</span>
                            </div>
                        </div>
                    </div>

                    <div className="flow-actions">
                        <button className="btn-secondary">
                            <span className="material-symbols-outlined">autorenew</span>
                            <span>Regenerate All Scripts</span>
                        </button>
                        <button className="btn-primary-large" onClick={onStartPractice}>
                            <span className="material-symbols-outlined animate-pulse-slow">play_circle</span>
                            <div className="btn-text-group">
                                <span className="btn-sub">Ready to present?</span>
                                <span className="btn-main">Start Practice Mode</span>
                            </div>
                        </button>
                    </div>
                </section>

                <div className="setup-grid">
                    {/* Slides List */}
                    <div className="slides-column">
                        {slides.map((slide, index) => (
                            <div key={slide.id} className="slide-script-card">
                                <div className="slide-drag-handle">
                                    <span className="material-symbols-outlined">drag_indicator</span>
                                    <span className="slide-number">{String(index + 1).padStart(2, '0')}</span>
                                </div>

                                <div className="slide-thumb">
                                    {/* Placeholder for actual thumb */}
                                    <div className="thumb-placeholder" style={{ backgroundColor: '#f1f5f9' }}></div>
                                </div>

                                <div className="slide-content">
                                    <div className="slide-header">
                                        <input className="slide-title-input" defaultValue={slide.title} />
                                    </div>
                                    <div className="script-editor-wrapper">
                                        <textarea
                                            className="script-textarea"
                                            placeholder="Enter speaker notes..."
                                            defaultValue={slide.script}
                                        />
                                        <button className="btn-regenerate-small">
                                            <span className="material-symbols-outlined">autorenew</span> Regenerate
                                        </button>
                                        <div className="script-time-est">~{slide.duration || 45}s</div>
                                    </div>
                                    <div className="slide-attachments">
                                        <span className="attachment-label"><span className="material-symbols-outlined">attachment</span> Context:</span>
                                        <span className="no-files">No files attached</span>
                                        <button className="btn-add-file"><span className="material-symbols-outlined">add_circle</span></button>
                                    </div>
                                </div>

                                <div className="slide-meta-sidebar">
                                    <div className="allocated-time">
                                        <label>Allocated</label>
                                        <input type="text" defaultValue="00:45" />
                                    </div>
                                    <div className="slide-tools">
                                        <button><span className="material-symbols-outlined">edit_note</span></button>
                                        <button className="text-red"><span className="material-symbols-outlined">delete</span></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Sidebar Widgets */}
                    <div className="sidebar-column">
                        <div className="widget-card ai-flow-assistant">
                            <div className="widget-header">
                                <h3 className="widget-title">
                                    <span className="material-symbols-outlined text-indigo-300">auto_awesome</span>
                                    AI Flow Assistant
                                </h3>
                                <span className="status-badge">Active</span>
                            </div>
                            <div className="widget-body">
                                <div className="score-group">
                                    <div className="score-label">
                                        <span>Narrative Coherence</span>
                                        <span className="score-val">72/100</span>
                                    </div>
                                    <div className="progress-track">
                                        <div className="progress-bar" style={{ width: '72%' }}></div>
                                    </div>
                                </div>

                                <div className="insights-group">
                                    <span className="group-label">Insights</span>
                                    <div className="insight-box">
                                        Your presentation starts strong but lacks a connection between <span className="highlight">financial data</span> and <span className="highlight">team effort</span>.
                                    </div>
                                    <div className="alert-box">
                                        <span className="material-symbols-outlined">warning</span>
                                        <div className="alert-content">
                                            <strong>Pacing Alert</strong>
                                            Slide 2 is dense. Consider splitting it or increasing allocated time by 30s.
                                        </div>
                                    </div>
                                </div>

                                <button className="btn-block-outline">
                                    <span className="material-symbols-outlined">refresh</span> Re-analyze Flow
                                </button>
                            </div>
                        </div>

                        <div className="widget-card sources-list">
                            <div className="widget-header">
                                <h3 className="widget-title-simple">
                                    Referenced Sources
                                    <span className="count-badge">2 Files</span>
                                </h3>
                            </div>
                            <div className="sources-body">
                                <div className="source-item">
                                    <div className="source-icon blue"><span className="material-symbols-outlined">table_chart</span></div>
                                    <div className="source-info">
                                        <div className="source-name">Q3_Raw_Data.csv</div>
                                        <div className="source-link">Linked to Slide 2</div>
                                    </div>
                                </div>
                                <div className="source-item">
                                    <div className="source-icon red"><span className="material-symbols-outlined">picture_as_pdf</span></div>
                                    <div className="source-info">
                                        <div className="source-name">Acquisition_Report.pdf</div>
                                        <div className="source-link">Linked to Slide 2</div>
                                    </div>
                                </div>
                                <button className="btn-add-source">
                                    <span className="material-symbols-outlined">add</span> Add Source File
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PresentationSetup;

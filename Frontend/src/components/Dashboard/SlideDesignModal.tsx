import React from 'react';
import './SlideDesignModal.css';

interface SlideDesignModalProps {
    isOpen: boolean;
    onClose: () => void;
    slide: any; // Using any for now to match strict design props easily, can be typed later
}

const SlideDesignModal: React.FC<SlideDesignModalProps> = ({ isOpen, onClose, slide }) => {
    if (!isOpen) return null;

    // Use slide data if available, else fallback to design mock data for fidelity check
    const title = slide?.title || "Growth Metrics 2024";
    const slideNumber = slide?.id ? `0${slide.id}` : "02";
    const thumbUrl = slide?.thumb || "https://lh3.googleusercontent.com/aida-public/AB6AXuCD__G9k4j04P_in85vFtmB3sI6BelNH-gBnDTiLf9Ub56A49mvgdMmoiXTzPOPBQwFQdEvMWdonGq9RouaJkhtjOwcb0cvvbLv7DsG4JpbrUMa0gf0MheBB-GFnnroNB83Jd8z1PSfofcgzRwtPcJaMJhr-2HiO33hYb_K4_8caKVgAQkvp3dmHBLom4g8KH2u-lIQlPz2aT2Eg3Qz9M0Y6R_U0uNulE04hN1E3M6mS0C-2nz_CEru1RVwEydL4x2ahf85g3J75Zhj";

    return (
        <div className="modal-overlay" role="dialog" aria-modal="true">
            <div className="modal-backdrop" onClick={onClose}></div>

            <div className="modal-container">
                {/* Header */}
                <header className="modal-header">
                    <div className="modal-title-area">
                        <div className="modal-icon-box">
                            <span className="material-symbols-outlined" style={{ fontSize: 24 }}>design_services</span>
                        </div>
                        <div className="modal-title">
                            <h2>Slide Designer</h2>
                            <p>Editing: <span style={{ color: 'var(--color-text-emphasis)' }}>Slide {slideNumber}</span></p>
                        </div>
                    </div>

                    <div className="modal-actions">
                        <div style={{ display: 'flex', gap: 8 }} className="hidden sm:flex">
                            <button className="action-btn">
                                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>dashboard</span>
                                Template
                            </button>
                            <div className="relative group">
                                <button className="action-btn">
                                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>style</span>
                                    Layouts
                                    <span className="material-symbols-outlined" style={{ fontSize: 12 }}>expand_more</span>
                                </button>
                            </div>
                        </div>
                        <button className="close-btn" onClick={onClose} aria-label="Close modal">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                </header>

                <div className="modal-body">
                    {/* Left Sidebar: Configuration */}
                    <aside className="design-sidebar-left">
                        <div className="sidebar-section">
                            <div className="sidebar-header">
                                Slide Configuration
                            </div>

                            {/* Page Title */}
                            <div className="config-group">
                                <label className="config-label">Page Title</label>
                                <input className="config-input" type="text" defaultValue={title} />
                            </div>

                            {/* Visual Description */}
                            <div className="complex-input-box">
                                <div className="complex-header">
                                    <label className="config-label" style={{ marginBottom: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#94a3b8' }}>description</span>
                                        Visual Description
                                    </label>
                                    <button style={{ fontSize: 10, display: 'flex', alignItems: 'center', gap: 2, padding: '2px 6px', borderRadius: 4, background: 'rgba(19, 127, 236, 0.05)', color: '#64748b', border: 'none', cursor: 'pointer' }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: 12 }}>auto_fix_high</span>
                                        Refine
                                    </button>
                                </div>
                                <div className="complex-body">
                                    <textarea
                                        style={{ width: '100%', background: 'transparent', border: 'none', fontSize: 14, color: '#475569', resize: 'none', outline: 'none' }}
                                        rows={4}
                                        defaultValue="Bar chart visualizing the 15% drop in user acquisition cost year-over-year. Compare this with the steady 85% retention rate line graph overlay."
                                    />
                                </div>
                                <div className="complex-footer">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                        <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Attachments</span>
                                        <button style={{ color: 'var(--color-primary)', fontSize: 10, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <span className="material-symbols-outlined" style={{ fontSize: 12 }}>add_circle</span> Add
                                        </button>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 6, background: 'white', borderRadius: 4, border: '1px solid #e2e8f0' }}>
                                            <div style={{ width: 24, height: 24, background: '#d1fae5', color: '#059669', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>table_chart</span>
                                            </div>
                                            <div style={{ flex: 1, overflow: 'hidden' }}>
                                                <p style={{ fontSize: 12, fontWeight: 500, color: '#334155', margin: 0 }}>Q3_Metrics.csv</p>
                                                <p style={{ fontSize: 10, color: '#94a3b8', margin: 0 }}>12KB</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Color Palette */}
                            <div className="palette-box">
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, alignItems: 'center' }}>
                                    <h4 style={{ fontSize: 12, fontWeight: 700, color: '#334155', display: 'flex', alignItems: 'center', gap: 6, margin: 0 }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#6366f1' }}>palette</span>
                                        Color Palette
                                    </h4>
                                    <button style={{ fontSize: 10, color: 'var(--color-primary)', border: 'none', background: 'none', cursor: 'pointer' }}>Edit Global</button>
                                </div>
                                <div className="palette-circles">
                                    <button className="color-circle" style={{ backgroundColor: '#137fec' }} title="Primary Blue"></button>
                                    <button className="color-circle" style={{ backgroundColor: '#111418' }} title="Dark Background"></button>
                                    <button className="color-circle" style={{ backgroundColor: '#ffffff' }} title="White Text"></button>
                                    <button className="color-circle" style={{ borderStyle: 'dashed', display: 'flex', alignItems: 'center', justifyContent: 'center', borderColor: '#cbd5e1' }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#94a3b8' }}>add</span>
                                    </button>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center', opacity: 0.5, margin: '-8px 0' }}>
                                <span className="material-symbols-outlined" style={{ color: '#cbd5e1' }}>arrow_downward</span>
                            </div>

                            {/* Speaker Script */}
                            <div className="script-box">
                                <div className="script-header">
                                    <label style={{ fontSize: 12, fontWeight: 700, color: '#312e81', display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#6366f1' }}>record_voice_over</span>
                                        Speaker Script
                                    </label>
                                    <span style={{ fontSize: 10, fontWeight: 500, color: '#818cf8', background: 'rgba(255,255,255,0.5)', padding: '2px 6px', borderRadius: 4 }}>~45s</span>
                                </div>
                                <div style={{ padding: 12 }}>
                                    <textarea
                                        style={{ width: '100%', background: 'transparent', border: 'none', fontSize: 14, color: '#334155', resize: 'none', outline: 'none', lineHeight: 1.5 }}
                                        rows={5}
                                        defaultValue="As you can see on the chart, our user acquisition cost has dropped by 15% while retention remains steady. This indicates our marketing efficiency is improving significantly without sacrificing user loyalty."
                                    />
                                </div>
                                <div style={{ background: 'rgba(224, 231, 255, 0.5)', padding: '8px 12px', borderTop: '1px solid rgba(224, 231, 255, 1)' }}>
                                    <button style={{ width: '100%', padding: '6px 0', background: '#4f46e5', color: 'white', fontSize: 12, fontWeight: 700, borderRadius: 6, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer' }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>sync</span>
                                        Regenerate Script
                                    </button>
                                </div>
                            </div>

                            <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />

                            {/* Regenerate Slide Button */}
                            <button className="btn-regenerate-slide">
                                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>autorenew</span>
                                Regenerate Slide Design
                            </button>

                            {/* Advice Box */}
                            <div style={{ padding: 12, borderRadius: 8, background: '#fffbeb', border: '1px solid #fde68a', display: 'flex', gap: 8 }}>
                                <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#f59e0b' }}>info</span>
                                <div>
                                    <p style={{ fontSize: 12, fontWeight: 700, color: '#92400e', margin: 0 }}>Style Suggestion</p>
                                    <p style={{ fontSize: 11, color: '#b45309', margin: '2px 0 0 0' }}>Consider using a bar chart instead of text to visualize the 15% drop.</p>
                                </div>
                            </div>

                        </div>
                    </aside>

                    {/* Main Canvas */}
                    <main className="design-main">
                        <div className="canvas-toolbar">
                            <div style={{ display: 'flex', gap: 4 }}>
                                <button style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 4, border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b' }} title="Undo">
                                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>undo</span>
                                </button>
                                <button style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 4, border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b' }} title="Redo">
                                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>redo</span>
                                </button>
                            </div>

                            <div className="quick-edit-bar">
                                <button style={{ width: 32, height: 28, borderRadius: 4, color: 'var(--color-primary)', border: 'none', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>magic_button</span>
                                </button>
                                <input style={{ flex: 1, background: 'transparent', border: 'none', fontSize: 12, fontWeight: 500, color: '#334155', outline: 'none' }} placeholder="Quick Edit (e.g. 'Make chart darker')" />
                                <button style={{ width: 28, height: 28, borderRadius: 4, color: '#94a3b8', border: 'none', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>send</span>
                                </button>
                            </div>

                            <div style={{ width: 72 }}></div>{/* Spacer for balance */}
                        </div>

                        <div className="design-canvas-area custom-scrollbar">
                            <div className="slide-canvas">
                                <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('${thumbUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: 4 }}></div>
                            </div>
                        </div>
                    </main>

                    {/* Right Sidebar: History */}
                    <aside className="design-sidebar-right">
                        <div style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', margin: 0 }}>Design History</h3>
                            <button style={{ fontSize: 12, color: 'var(--color-primary)', fontWeight: 500, border: 'none', background: 'none', cursor: 'pointer' }}>Clear</button>
                        </div>
                        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
                            {/* Current */}
                            <div className="history-item active">
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, alignItems: 'baseline' }}>
                                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-primary)' }}>Current Version</span>
                                    <span style={{ fontSize: 10, color: '#94a3b8' }}>Now</span>
                                </div>
                                <div className="history-thumb">
                                    <div style={{ width: '100%', height: '100%', backgroundImage: `url('${thumbUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                </div>
                            </div>

                            {/* Old 1 */}
                            <div className="history-item inactive">
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, alignItems: 'baseline' }}>
                                    <span style={{ fontSize: 12, fontWeight: 500, color: '#475569' }}>Iteration 2</span>
                                    <span style={{ fontSize: 10, color: '#94a3b8' }}>5 mins ago</span>
                                </div>
                                <div className="history-thumb">
                                    <div style={{ width: '100%', height: '100%', backgroundImage: `url('${thumbUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'grayscale(100%)' }}></div>
                                </div>
                            </div>

                            {/* Old 2 */}
                            <div className="history-item inactive">
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, alignItems: 'baseline' }}>
                                    <span style={{ fontSize: 12, fontWeight: 500, color: '#475569' }}>Iteration 1</span>
                                    <span style={{ fontSize: 10, color: '#94a3b8' }}>12 mins ago</span>
                                </div>
                                <div className="history-thumb">
                                    <div style={{ width: '100%', height: '100%', backgroundImage: `url('${thumbUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'grayscale(100%)' }}></div>
                                </div>
                            </div>

                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default SlideDesignModal;

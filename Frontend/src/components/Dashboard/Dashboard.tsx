import React, { useState } from 'react';
import './Dashboard.css';

interface DashboardProps {
    onBack: () => void;
}

type ViewMode = 'normal' | 'compact';

const Dashboard: React.FC<DashboardProps> = ({ onBack }) => {
    const [viewMode, setViewMode] = useState<ViewMode>('normal');

    const slides = [
        { id: 1, title: "Q3 Financial Overview", description: "Title slide with high-level summary of Q3 financial performance and key achievements.", script: "Welcome everyone. Today we will discuss...", thumb: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMRUYMaQ7CukbYmLbQHLCVNpKtysfHlwElrM6-ixNedSlLjzy2WZsROJ_rdYICZ2xfxJqQRdKBGDSKVmDOFnT9lYTHanufjIt3FT1HMASM12ffaH4tWJ346sPPYGQZ979bYfIytCVAtidi-B0AGqBrHfJTGvDEOlHlflJ436yUhB1KPLfajCgMNlkEKPLNyycLr4oS80A5sGNjP_HN3hM5q7bSzqKvQPpRSXFegtipL-jNsXi_DJ3byUjIiaLk-X1ATf-ZyGjBw10G" },
        { id: 2, title: "Growth Metrics 2024", description: "Detailed breakdown of user acquisition costs and retention rates compared to last year.", script: "As you can see on the chart, our user...", thumb: "https://lh3.googleusercontent.com/aida-public/AB6AXuCD__G9k4j04P_in85vFtmB3sI6BelNH-gBnDTiLf9Ub56A49mvgdMmoiXTzPOPBQwFQdEvMWdonGq9RouaJkhtjOwcb0cvvbLv7DsG4JpbrUMa0gf0MheBB-GFnnroNB83Jd8z1PSfofcgzRwtPcJaMJhr-2HiO33hYb_K4_8caKVgAQkvp3dmHBLom4g8KH2u-lIQlPz2aT2Eg3Qz9M0Y6R_U0uNulE04hN1E3M6mS0C-2nz_CEru1RVwEydL4x2ahf85g3J75Zhj", badge: "Font", badgeColor: "#f59e0b" },
        { id: 3, title: "Meet the Team", description: "Introduction of the core project team members and their specific roles.", script: "I'd like to introduce the core members...", thumb: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOU3py3A_oASVF25UCBtVpAlivxaurhese28KdOCPOPzben1EdCo5pLKGF6hyKOntlTzf50NIa1NcMlV_hoTuZoRLa8M1p9fWPptzO1-2lHll3GPRQ0TN6rNk95gyKVY6v6pz0PY2MTnMTXj9E46s4qPyt_gUUJ4440-bce0zLMHRTjmomxQSmJoe-lXVvEnUsjrN6FD4H_jWdr4a4fJok2KHU648TrR4gHNborgSOKcBf4x0MOFmk5U-bxD2mZguxhZbbFiPCGPiO" },
    ];

    const renderNormalItem = (slide: any) => (
        <div className="slide-item" key={slide.id}>
            {/* Drag Handle */}
            <div className="slide-handle">
                <span className="material-symbols-outlined">drag_indicator</span>
                <span>0{slide.id}</span>
            </div>

            {/* Thumb */}
            <div className="slide-thumb" style={{ width: '256px', aspectRatio: '16/9', display: 'block', position: 'relative', borderRadius: 8, overflow: 'hidden', border: '1px solid #3b4754' }}>
                <div style={{ width: '100%', height: '100%', backgroundImage: `url('${slide.thumb}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                {slide.badge && (
                    <div style={{ position: 'absolute', top: 8, right: 8, background: slide.badgeColor, color: 'white', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 10, marginRight: 2 }}>warning</span> {slide.badge}
                    </div>
                )}
            </div>

            {/* Inputs */}
            <div className="slide-inputs">
                <div className="input-group">
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#94a3b8', marginBottom: 4 }}>Page Title</label>
                    <input className="input-control" defaultValue={slide.title} />
                </div>
                <div className="input-group">
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#94a3b8', marginBottom: 4 }}>Description</label>
                    <textarea className="input-control" rows={2} defaultValue={slide.description} style={{ resize: 'none' }} />
                </div>
                <div className="input-group">
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#94a3b8', marginBottom: 4 }}>Script</label>
                    <textarea className="input-control" rows={2} defaultValue={slide.script} style={{ resize: 'none' }} />
                </div>
            </div>

            {/* Side Actions (Time, Delete, Design) */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', marginLeft: 12, borderLeft: '1px solid #3b4754', paddingLeft: 12, minWidth: 120 }}>
                <button className="btn-design">
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>palette</span> Design
                </button>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                    <div style={{ fontSize: 12, color: '#64748b', display: 'flex', alignItems: 'center', gap: 4, background: 'var(--color-bg-hover)', padding: '2px 8px', borderRadius: 4 }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 14 }}>timer</span> 45s
                    </div>
                    <button className="btn-delete"><span className="material-symbols-outlined" style={{ fontSize: 20 }}>delete</span></button>
                </div>
            </div>
        </div>
    );

    const renderCompactItem = (slide: any) => (
        <div className="compact-item" key={slide.id}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-primary)', cursor: 'grab', paddingLeft: 8 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>drag_indicator</span>
                <span style={{ fontSize: 12, fontWeight: 'bold', width: 20, textAlign: 'center' }}>0{slide.id}</span>
            </div>
            <div className="compact-thumb" style={{ width: 80, height: 48, borderRadius: 4, overflow: 'hidden', position: 'relative', border: '1px solid #3b4754' }}>
                <div style={{ width: '100%', height: '100%', backgroundImage: `url('${slide.thumb}')`, backgroundSize: 'cover' }}></div>
                {slide.badge && (
                    <div style={{ position: 'absolute', top: 4, right: 4, width: 8, height: 8, background: slide.badgeColor, borderRadius: '50%' }}></div>
                )}
            </div>
            <div className="compact-content" style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{ fontSize: 14, fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0 }}>{slide.title}</h4>
            </div>
            <div className="compact-actions" style={{ display: 'flex', gap: 8 }}>
                <button className="compact-action-btn-primary" title="Open Slide Designer">
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>edit_square</span>
                </button>
                <button className="compact-action-btn delete" title="Delete Slide">
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>delete</span>
                </button>
            </div>
        </div>
    );

    return (
        <div className="dashboard-container dark">
            {/* Header */}
            <header className="dashboard-header">
                <div className="dashboard-brand">
                    <div className="brand-icon">
                        <span className="material-symbols-outlined">dashboard</span>
                    </div>
                    <h2 style={{ fontSize: '18px', fontWeight: '700' }}>Presentation Master</h2>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="header-btn header-btn-mode">
                        <span className="material-symbols-outlined" style={{ fontSize: 20, marginRight: 8 }}>slideshow</span>
                        <span>Presentation Mode</span>
                    </button>
                    <button onClick={onBack} className="header-btn header-btn-primary">
                        <span className="material-symbols-outlined" style={{ fontSize: 18, marginRight: 8 }}>arrow_back</span>
                        <span>Back to Editor</span>
                    </button>
                    <button className="header-icon-btn">
                        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>help</span>
                    </button>
                    <button className="header-icon-btn">
                        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>settings</span>
                    </button>
                </div>
            </header>

            <main className="dashboard-main">
                {/* Top Stats - Force Row Layout on Desktop */}
                <section className="stats-grid">
                    {/* Hero Card */}
                    <div className="hero-card">
                        <div
                            style={{
                                position: 'absolute', inset: 0, backgroundSize: 'cover', backgroundPosition: 'center',
                                backgroundImage: "linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.2) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuANM8ywubdfs1CdcBLrFsdgfAlE_8flizP1qC3587XiWgnOt3KpLDDXA8Znn87NyWFXag9QwpZb_5gMcG16xf1eXyOMZx4No6vn_5rWOuis3uMakIM80K8eQx-pKR4yZdZAo76RxoC_C_6xnqZukTuyYUf3wfw_NM4s2C0ZqyH8UPhtZkSGcFmIWm2yZM8622dI5kSjR_xpCB7s0ZLQbGkKrPR5Sx5h1lMK5DGHX-ZmzVJDdvAq7Ifb2aSaeQtsxXDlKDFUW62uUub1')"
                            }}
                        />
                        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: 20 }}>
                            <span style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: 'var(--color-primary)', color: 'white', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>Draft</span>
                            <h1 style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', marginTop: '8px', lineHeight: 1.2 }}>Q3 2024 Financial Overview</h1>
                            <p style={{ color: '#e2e8f0', fontSize: '14px', marginTop: '4px' }}>Last edited 2 mins ago by Sarah M.</p>
                        </div>
                    </div>

                    {/* Stat Cards */}
                    <div className="stats-cards">
                        <div className="stat-card">
                            <div className="stat-header" style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: 14, fontWeight: 500 }}>
                                <span>Total Slides</span>
                                <span className="material-symbols-outlined">layers</span>
                            </div>
                            <div>
                                <div className="stat-value">12</div>
                                <div style={{ color: '#10b981', fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>trending_up</span> Optimum length
                                </div>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-header" style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: 14, fontWeight: 500 }}>
                                <span>Est. Read Time</span>
                                <span className="material-symbols-outlined">schedule</span>
                            </div>
                            <div>
                                <div className="stat-value">5 <span style={{ fontSize: '18px', fontWeight: '400', color: '#64748b' }}>mins</span></div>
                                <div style={{ color: '#10b981', fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>check_circle</span> Good pacing
                                </div>
                            </div>
                        </div>
                        <div className="stat-card alert">
                            <div className="stat-header" style={{ display: 'flex', justifyContent: 'space-between', color: '#f59e0b', fontSize: 14, fontWeight: 500 }}>
                                <span>Design Issues</span>
                                <span className="material-symbols-outlined">warning</span>
                            </div>
                            <div>
                                <div className="stat-value" style={{ color: 'white' }}>3</div>
                                <div style={{ color: '#fbbf24', fontSize: '14px', fontWeight: '500', marginTop: '4px' }}>
                                    Inconsistent fonts detected
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Info Grid - Ensure Grid Layout */}
                <div className="content-grid">
                    {/* Detailed Slides Narrative - Span 8 */}
                    <div className="narrative-col">
                        <div className="narrative-header">
                            <h3 className="narrative-title">Narrative Flow</h3>

                            {/* View Mode Toggles */}
                            <div className="view-toggles">
                                <button className="toggle-btn">
                                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>sort</span> Auto-Sort
                                </button>
                                <button
                                    className={`toggle-btn ${viewMode === 'compact' ? 'active' : ''}`}
                                    onClick={() => setViewMode(viewMode === 'normal' ? 'compact' : 'normal')}
                                >
                                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>view_agenda</span>
                                    {viewMode === 'normal' ? 'Compact View' : 'Compact View'}
                                </button>
                            </div>
                        </div>

                        {/* Items Rendered */}
                        <div style={viewMode === 'compact' ? { display: 'flex', flexDirection: 'column', gap: '8px' } : { display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {slides.map(slide => viewMode === 'compact' ? renderCompactItem(slide) : renderNormalItem(slide))}
                        </div>
                    </div>

                    {/* Right Sidebar - Span 4 - Explicitly Rendered */}
                    <div className="sidebar-col">
                        <div className="sidebar-card">
                            <div style={{ padding: '16px', borderBottom: '1px solid #3b4754', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1a1f26' }}>
                                <h3 style={{ fontWeight: 'bold', fontSize: 16 }}>Design Consistency</h3>
                                <span style={{ background: 'rgba(245, 158, 11, 0.3)', color: '#f59e0b', fontSize: '12px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '100px' }}>85% Score</span>
                            </div>
                            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                        <div style={{ minWidth: 20, marginTop: 2 }}><span className="material-symbols-outlined" style={{ color: '#f59e0b', fontSize: 20 }}>text_fields</span></div>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontSize: '14px', fontWeight: '500', color: '#e2e8f0', margin: 0 }}>Mixed Fonts Detected</p>
                                            <p style={{ fontSize: '12px', color: '#64748b', marginTop: 2, margin: 0 }}>Slide 2 and 5 use 'Arial'...</p>
                                        </div>
                                        <button style={{ color: 'var(--color-primary)', fontSize: 12, fontWeight: 'bold', border: 'none', background: 'none', cursor: 'pointer', marginLeft: 'auto' }}>Fix</button>
                                    </div>
                                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                        <div style={{ minWidth: 20, marginTop: 2 }}><span className="material-symbols-outlined" style={{ color: '#10b981', fontSize: 20 }}>palette</span></div>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontSize: '14px', fontWeight: '500', color: '#e2e8f0', margin: 0 }}>Color Palette</p>
                                            <p style={{ fontSize: '12px', color: '#64748b', marginTop: 2, margin: 0 }}>Consistent across all 12 slides.</p>
                                        </div>
                                        <span className="material-symbols-outlined" style={{ color: '#10b981', fontSize: 18, marginLeft: 'auto' }}>check</span>
                                    </div>
                                </div>

                                <div style={{ padding: '12px', background: '#111418', borderRadius: 8, border: '1px solid #3b4754' }}>
                                    <p style={{ fontSize: 12, fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', marginBottom: 8, marginTop: 0 }}>Primary Styles</p>
                                    <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#137fec', border: '2px solid #3b4754', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}></div>
                                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#111418', border: '2px solid #3b4754', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}></div>
                                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#ffffff', border: '2px solid #3b4754', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}></div>
                                    </div>
                                    <p style={{ fontSize: 12, color: '#94a3b8', margin: 0 }}>Font: <span style={{ color: '#cbd5e1', fontWeight: 500 }}>Inter, Noto Sans</span></p>
                                </div>

                                <button className="btn-unify">
                                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>magic_button</span> Unify Design Across All Slides
                                </button>
                            </div>
                        </div>

                        <div className="sidebar-card ai-card">
                            <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(4px)' }}>
                                <h3 style={{ fontWeight: 'bold', display: 'flex', gap: '8px', alignItems: 'center', fontSize: 16 }}>
                                    <span className="material-symbols-outlined" style={{ color: '#818cf8' }}>psychology</span>
                                    AI Narrative Check
                                </h3>
                            </div>
                            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                                <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: 12 }}>
                                    <p style={{ fontSize: '14px', lineHeight: '1.5', color: '#e0e7ff', margin: 0 }}>
                                        <span style={{ fontWeight: 'bold', color: '#a5b4fc' }}>Suggestion:</span> The transition between Slide 2 (Growth Metrics) and Slide 3 (Team) feels abrupt.
                                    </p>
                                    <button className="btn-generate">Generate Bridge Slide</button>
                                </div>

                                <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
                                    <span className="material-symbols-outlined" style={{ color: '#34d399' }}>check_circle</span>
                                    <p style={{ fontSize: 14, color: '#cbd5e1', margin: 0 }}>Tone is consistent (Professional/Formal).</p>
                                </div>
                            </div>
                            <div style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                <button className="btn-analysis">Run Full Analysis</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;

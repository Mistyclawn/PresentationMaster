import React, { useState } from 'react';
import './Editor.css'; // Utilizing shared styles or ensure separate CSS file if needed

interface WorkspaceProps {
    isSidebarOpen?: boolean;
    onToggleSidebar?: () => void;
}

const Workspace: React.FC<WorkspaceProps> = ({ isSidebarOpen = true, onToggleSidebar }) => {
    const [zoomLevel, setZoomLevel] = useState(84);
    const [viewMode, setViewMode] = useState<'grid' | 'single' | 'slideshow'>('single');

    const handleZoomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setZoomLevel(Number(event.target.value));
    };

    const handleZoomIn = () => {
        setZoomLevel(prev => Math.min(prev + 10, 200));
    };

    const handleZoomOut = () => {
        setZoomLevel(prev => Math.max(prev - 10, 10));
    };

    return (
        <main className="editor-workspace">
            {/* Top Ruler / Info area (Optional, skipping for now as per previous placeholder) */}

            {/* Canvas Area */}
            <div className="workspace-canvas-area">
                {/* The Slide Canvas */}
                <div className="slide-canvas" style={{
                    width: '960px', // Scaled 1080p roughly
                    aspectRatio: '16/9',
                    backgroundColor: 'white',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    position: 'relative',
                    padding: '64px',
                    userSelect: 'none', // Prevent selection of UI
                    transform: `scale(${zoomLevel / 100})`,
                    transformOrigin: 'center center',
                    transition: 'transform 0.1s ease-out'
                }}>
                    {/* Content of Slide 2 as per screenshot */}
                    <div style={{ border: '1px dashed transparent', padding: '8px', marginBottom: '32px', transition: 'border-color 0.2s', cursor: 'text' }} className="hover:border-gray-300">
                        <h1 style={{ fontSize: '48px', fontWeight: '700', color: '#111827', margin: 0, letterSpacing: '-0.025em' }}>Q3 Financial Overview</h1>
                    </div>

                    <div style={{ display: 'flex', gap: '48px', height: '100%' }}>
                        <div style={{ width: '50%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ border: '1px solid #137fec', padding: '8px', margin: '-8px', backgroundColor: 'rgba(19, 127, 236, 0.05)', position: 'relative', cursor: 'move' }}>
                                <ul style={{ fontSize: '20px', color: '#374151', listStyleType: 'disc', paddingLeft: '20px', lineHeight: 1.6, margin: 0 }}>
                                    <li>Revenue growth up by <span style={{ fontWeight: 'bold', color: '#16a34a' }}>15%</span> YoY</li>
                                    <li>Operating expenses reduced by 8%</li>
                                    <li>New market acquisition in APAC region</li>
                                    <li>Product margin increased to 32%</li>
                                </ul>

                                {/* Selection Handles */}
                                <div className="handle top-left"></div>
                                <div className="handle top-mid"></div>
                                <div className="handle top-right"></div>
                                <div className="handle mid-left"></div>
                                <div className="handle mid-right"></div>
                                <div className="handle bot-left"></div>
                                <div className="handle bot-mid"></div>
                                <div className="handle bot-right"></div>
                                <div className="handle-rotate"></div>
                            </div>

                            <div style={{
                                marginTop: '16px',
                                padding: '16px',
                                backgroundColor: '#eff6ff',
                                border: '1px solid #dbeafe',
                                borderRadius: '8px',
                                display: 'flex',
                                gap: '12px',
                                alignItems: 'center'
                            }}>
                                <span className="material-symbols-outlined" style={{ color: '#2563eb' }}>tips_and_updates</span>
                                <p style={{ fontSize: '14px', color: '#1e40af', margin: 0 }}>Key Takeaway: Strong performance driven by enterprise sector.</p>
                            </div>
                        </div>
                        <div style={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {/* Placeholder Chart Graphic */}
                            <div style={{ width: '100%', height: '200px', position: 'relative' }}>
                                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '15%', height: '40%', background: '#60a5fa', borderTopLeftRadius: 2, borderTopRightRadius: 2 }}></div>
                                <div style={{ position: 'absolute', bottom: 0, left: '20%', width: '15%', height: '55%', background: '#3b82f6', borderTopLeftRadius: 2, borderTopRightRadius: 2 }}></div>
                                <div style={{ position: 'absolute', bottom: 0, left: '40%', width: '15%', height: '45%', background: '#60a5fa', borderTopLeftRadius: 2, borderTopRightRadius: 2 }}></div>
                                <div style={{ position: 'absolute', bottom: 0, left: '60%', width: '15%', height: '75%', background: '#2563eb', borderTopLeftRadius: 2, borderTopRightRadius: 2, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}></div>
                                <div style={{ position: 'absolute', bottom: 0, left: '80%', width: '15%', height: '60%', background: '#3b82f6', borderTopLeftRadius: 2, borderTopRightRadius: 2 }}></div>
                                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 1, background: '#d1d5db' }}></div>
                                <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: 1, background: '#d1d5db' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Bottom Bar */}
            <div className="workspace-bottom-bar" style={{
                height: '32px',
                backgroundColor: '#111418',
                borderTop: '1px solid #283039',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 16px 0 8px', // Adjusted padding for sidebar toggle
                fontSize: '12px',
                color: '#9dabb9',
                flexShrink: 0
            }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button className="btn-bottom-bar">
                        <span className="text-responsive-long">Slide 2 of 5</span>
                        <span className="text-responsive-short">2 / 5</span>
                    </button>

                    <button className="btn-bottom-bar">
                        <span className="text-responsive-long">English (US)</span>
                        <span className="text-responsive-short">En(US)</span>
                    </button>

                    <button className="btn-bottom-bar">
                        <span className="material-symbols-outlined" style={{ fontSize: 14 }}>notes</span>
                        <span className="icon-responsive-label">Notes</span>
                    </button>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    {/* View Modes */}


                    {/* View Modes */}
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <button
                            className={`btn-icon-small ${viewMode === 'grid' ? 'active' : ''}`}
                            onClick={() => setViewMode('grid')}
                            title="Grid View"
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>grid_view</span>
                        </button>
                        <button
                            className={`btn-icon-small ${viewMode === 'single' ? 'active' : ''}`}
                            onClick={() => setViewMode('single')}
                            title="Single View"
                        >
                            <span className="material-symbols-outlined filled" style={{ fontSize: 16 }}>crop_landscape</span>
                        </button>
                        <button
                            className={`btn-icon-small ${viewMode === 'slideshow' ? 'active' : ''}`}
                            onClick={() => setViewMode('slideshow')}
                            title="Slideshow"
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>slideshow</span>
                        </button>
                    </div>

                    <div style={{ width: 1, height: 16, background: '#3b4754' }}></div>

                    {/* Zoom Controls */}
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <button onClick={handleZoomOut} className="btn-icon-small"><span className="material-symbols-outlined" style={{ fontSize: 16 }}>remove</span></button>

                        {/* Interactive Slider */}
                        <div style={{ display: 'flex', alignItems: 'center', width: '96px' }}>
                            <input
                                type="range"
                                min="10"
                                max="200"
                                value={zoomLevel}
                                onChange={handleZoomChange}
                                style={{
                                    width: '100%',
                                    height: '4px',
                                    accentColor: '#137fec',
                                    borderRadius: '2px',
                                    cursor: 'pointer'
                                }}
                            />
                        </div>

                        <button onClick={handleZoomIn} className="btn-icon-small"><span className="material-symbols-outlined" style={{ fontSize: 16 }}>add</span></button>
                        <span style={{ width: '32px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{zoomLevel}%</span>
                        <button onClick={() => setZoomLevel(84)} className="btn-icon-small" title="Fit to window"><span className="material-symbols-outlined" style={{ fontSize: 16 }}>fit_screen</span></button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Workspace;

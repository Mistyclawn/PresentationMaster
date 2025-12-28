import React from 'react';
import './Editor.css'; // Utilizing shared styles or ensure separate CSS file if needed

const Workspace: React.FC = () => {
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
                    userSelect: 'none' // Prevent selection of UI
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
                padding: '0 16px',
                fontSize: '12px',
                color: '#9dabb9',
                flexShrink: 0
            }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <span style={{ cursor: 'pointer' }} className="hover-white">Slide 2 of 5</span>
                    <span style={{ cursor: 'pointer' }} className="hover-white">English (US)</span>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }} className="hover-white">
                        <span className="material-symbols-outlined" style={{ fontSize: 14 }}>notes</span> Notes
                    </button>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    {/* View Modes */}
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <button className="btn-icon-small hover-white"><span className="material-symbols-outlined" style={{ fontSize: 16 }}>grid_view</span></button>
                        <button className="btn-icon-small active white"><span className="material-symbols-outlined filled" style={{ fontSize: 16 }}>crop_landscape</span></button>
                        <button className="btn-icon-small hover-white"><span className="material-symbols-outlined" style={{ fontSize: 16 }}>slideshow</span></button>
                    </div>

                    <div style={{ width: 1, height: 16, background: '#3b4754' }}></div>

                    {/* Zoom Controls */}
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <button className="btn-icon-small hover-white"><span className="material-symbols-outlined" style={{ fontSize: 16 }}>remove</span></button>

                        {/* Simplified Slider */}
                        <div style={{ position: 'relative', width: '96px', height: '4px', background: '#3b4754', borderRadius: '2px', cursor: 'pointer' }}>
                            <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '60%', background: '#9dabb9', borderRadius: '2px' }}></div>
                            <div style={{ position: 'absolute', left: '60%', top: '50%', transform: 'translate(-50%, -50%)', width: '12px', height: '12px', background: 'white', borderRadius: '50%', boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }}></div>
                        </div>

                        <button className="btn-icon-small hover-white"><span className="material-symbols-outlined" style={{ fontSize: 16 }}>add</span></button>
                        <span style={{ width: '32px', textAlign: 'right' }}>84%</span>
                        <button className="btn-icon-small hover-white" title="Fit to window"><span className="material-symbols-outlined" style={{ fontSize: 16 }}>fit_screen</span></button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Workspace;

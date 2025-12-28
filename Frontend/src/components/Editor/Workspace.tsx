import React from 'react';

const Workspace: React.FC = () => {
    return (
        <main className="editor-workspace">
            {/* Top Ruler / Info (Optional, skipping for now) */}

            {/* Canvas Area */}
            <div className="workspace-canvas-area">
                {/* The Slide Canvas */}
                <div className="slide-canvas" style={{
                    width: '960px', // Scaled 1080p roughly
                    aspectRatio: '16/9',
                    backgroundColor: 'white',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    position: 'relative',
                    padding: '64px'
                }}>
                    {/* Content of Slide 2 as per screenshot */}
                    <div style={{ border: '1px dashed transparent', padding: '8px', marginBottom: '32px' }}>
                        <h1 style={{ fontSize: '48px', fontWeight: '700', color: '#111827', margin: 0 }}>Q3 Financial Overview</h1>
                    </div>

                    <div style={{ display: 'flex', gap: '48px', height: '100%' }}>
                        <div style={{ width: '50%' }}>
                            <ul style={{ fontSize: '20px', color: '#374151', listStyleType: 'disc', paddingLeft: '20px', lineHeight: 1.6 }}>
                                <li>Revenue growth up by <span style={{ fontWeight: 'bold', color: '#16a34a' }}>15%</span> YoY</li>
                                <li>Operating expenses reduced by 8%</li>
                                <li>New market acquisition in APAC region</li>
                                <li>Product margin increased to 32%</li>
                            </ul>

                            <div style={{
                                marginTop: '32px',
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
                            {/* Placeholder Chart */}
                            <div style={{ width: '100%', height: '200px', background: '#f3f4f6', display: 'flex', alignItems: 'end', justifyContent: 'center', paddingBottom: 0, gap: '10%' }}>
                                <div style={{ width: '15%', height: '40%', background: '#60a5fa' }}></div>
                                <div style={{ width: '15%', height: '60%', background: '#3b82f6' }}></div>
                                <div style={{ width: '15%', height: '50%', background: '#60a5fa' }}></div>
                                <div style={{ width: '15%', height: '80%', background: '#2563eb' }}></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Bar (Zoom, etc) */}
            <div className="workspace-bottom-bar" style={{
                height: '32px',
                backgroundColor: 'var(--color-bg-panel)',
                borderTop: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 16px',
                fontSize: '12px',
                color: 'var(--color-text-muted)',
                flexShrink: 0
            }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                    <span>Slide 2 of 5</span>
                    <span>English (US)</span>
                </div>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <span>84%</span>
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>fit_screen</span>
                </div>
            </div>
        </main>
    );
};

export default Workspace;

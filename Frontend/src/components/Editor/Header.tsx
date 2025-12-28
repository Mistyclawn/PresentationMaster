import React from 'react';
import './Header.css';

const Header: React.FC = () => {
    return (
        <header className="editor-header">
            {/* Top Bar: Icon, Title, Search, Profile, Actions */}
            <div className="header-top">
                <div className="header-title-area">
                    <div className="app-icon">
                        <span className="material-symbols-outlined filled">pie_chart</span>
                    </div>
                    <div className="header-title">
                        <h1>Q3 Financial Overview.pptx</h1>
                        <span>Saved to Drive</span>
                    </div>
                </div>

                {/* Search Bar (Hidden on small screens in original, keeping it simple here) */}
                {/* <div className="search-bar"> ... </div> */}

                <div className="header-actions">
                    {/* Profile Avatars (Dummy) */}
                    <div className="flex -space-x-2" style={{ display: 'flex' }}>
                        {/* Simulating avatars with simple circles for now if images fail */}
                        <div className="avatar" style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#555', border: '2px solid var(--color-bg-dark)' }}></div>
                    </div>

                    <button className="btn-icon-text btn-secondary">
                        <span className="material-symbols-outlined">share</span>
                        <span>Share</span>
                    </button>

                    <button className="btn-icon-text btn-primary">
                        <span className="material-symbols-outlined filled">play_arrow</span>
                        <span>Present</span>
                    </button>
                </div>
            </div>

            {/* Ribbon Menu Tabs */}
            <div className="header-menu">
                <button className="menu-item active">Home</button>
                <button className="menu-item">File</button>
                <button className="menu-item">Insert</button>
                <button className="menu-item">Design</button>
                <button className="menu-item">Transitions</button>
                <button className="menu-item">Animations</button>
                <button className="menu-item">Slide Show</button>
                <button className="menu-item">Review</button>
                <button className="menu-item">View</button>
            </div>

            {/* Toolbar (Contextual) - Can be separated into Toolbar.tsx later */}
            {/* For now, just a placeholder or minimal formatting bar as per screen1.png */}
            <div className="header-toolbar" style={{ padding: '8px 16px', backgroundColor: '#1e2329', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div className="toolbar-group" style={{ display: 'flex', gap: '4px' }}>
                    <button className="btn-icon" style={{ color: '#9dabb9', background: 'none', border: 'none', cursor: 'pointer' }}><span className="material-symbols-outlined">undo</span></button>
                    <button className="btn-icon" style={{ color: '#9dabb9', background: 'none', border: 'none', cursor: 'pointer' }}><span className="material-symbols-outlined">redo</span></button>
                </div>
                <div style={{ width: 1, height: 20, background: '#3b4754' }}></div>
                <div className="toolbar-group">
                    <button className="btn-icon-text" style={{ color: 'white', background: 'none', border: 'none', fontWeight: 500 }}>
                        <span className="material-symbols-outlined filled" style={{ color: 'var(--color-primary)' }}>add_box</span> New Slide
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;

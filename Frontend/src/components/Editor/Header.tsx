import React from 'react';
import './Header.css';

interface HeaderProps {
    onNavigateToDashboard?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigateToDashboard }) => {
    return (
        <header className="editor-header">
            {/* Top Bar */}
            <div className="header-top">
                <div className="header-title-area">
                    <div className="app-icon">
                        <span className="material-symbols-outlined filled" style={{ fontSize: 24 }}>pie_chart</span>
                    </div>
                    <div className="header-title">
                        <h1>Q3 Financial Overview.pptx</h1>
                        <span>Saved to Drive</span>
                    </div>
                </div>

                <div className="header-actions">
                    {/* Avatars */}
                    <div className="flex -space-x-2" style={{ display: 'flex', marginRight: 12 }}>
                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuAgDdMD-xvOaXkZysnVKynkEVWBs4OsiWOwASkfWvG20XqmA3MUAraRSKuF8qLsyAg1XmulMuPSa6Q-ATrGIH1VPDsGN_5isp2Af2OpbIjlzd3Bu-LiRK9i5n6SJt3-bfSV61fIG7uJ6LXlzYTTamQC7GN09a6h3FS1cgMo7PguGb4hfCXjor31vbBkGps0ezTK3mCishaaAj9hWjvhfLdcrf0Hbe-4qmmZHLIW1fAcwrLObuyLVfTUOjc_0tWgS5v8GXEumTtyWxKQ) center/cover', border: '2px solid var(--color-bg-dark)' }}></div>
                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#283039', border: '2px solid var(--color-bg-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 'bold', marginLeft: -8 }}>+2</div>
                    </div>

                    <button className="btn-icon-text btn-secondary">
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>share</span>
                        <span>Share</span>
                    </button>

                    <button className="btn-icon-text btn-primary">
                        <span className="material-symbols-outlined filled" style={{ fontSize: 18 }}>play_arrow</span>
                        <span>Present</span>
                    </button>

                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuCfQ0wrNtbd7JTA9nOexXShjohl7gh5okcDi65rV7TIVv468vw-C_o4vGZ8Hgl9q56vi7uVcXpPmE_7Ug7kewNW4VFY4g4KhPLvrgr8ad1vQ7fXE96XVuX5qKK-alMY8BcTokgJsH2_MIWqN_bUvaO5WB5G9tfu3YLzIRM-9tf2rSsBR-YeBnltgr-STEsYAuzen8I9eDxmt3bsyqhbsZKF-RApwvplDO9McHY2Xev3Nq2YeTn2WTw-7YJcpZETzm96MENW0KiK53dp) center/cover', marginLeft: 8 }}></div>
                </div>
            </div>

            {/* Menu Tabs */}
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

            {/* Toolbar */}
            <div className="header-toolbar">
                <div className="toolbar-left-group">
                    {/* Undo/Redo */}
                    <div className="toolbar-group-bordered">
                        <button className="btn-icon"><span className="material-symbols-outlined">undo</span></button>
                        <button className="btn-icon"><span className="material-symbols-outlined">redo</span></button>
                    </div>

                    {/* Insert / Layout */}
                    <div className="toolbar-group-bordered" style={{ paddingLeft: 16 }}>
                        <button className="btn-toolbar-text">
                            <span className="material-symbols-outlined filled text-primary" style={{ color: 'var(--color-primary)', fontSize: 18 }}>add_box</span>
                            <span>New Slide</span>
                            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>expand_more</span>
                        </button>
                        <button className="btn-toolbar-text">
                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>grid_view</span>
                            <span>Layout</span>
                        </button>
                    </div>

                    {/* Fonts */}
                    <div className="toolbar-group-bordered" style={{ paddingLeft: 16 }}>
                        <select className="toolbar-select" style={{ width: 96 }}>
                            <option>Inter</option>
                            <option>Arial</option>
                            <option>Roboto</option>
                        </select>
                        <select className="toolbar-select" style={{ width: 56 }} defaultValue="48">
                            <option>18</option>
                            <option>24</option>
                            <option>32</option>
                            <option>48</option>
                        </select>
                        <div style={{ width: 1, height: 24, background: '#3b4754', margin: '0 4px' }}></div>
                        <button className="btn-icon active"><span className="material-symbols-outlined">format_bold</span></button>
                        <button className="btn-icon"><span className="material-symbols-outlined">format_italic</span></button>
                        <button className="btn-icon"><span className="material-symbols-outlined">format_underlined</span></button>
                        <button className="btn-icon"><span className="material-symbols-outlined">format_color_text</span></button>
                    </div>

                    {/* Paragraph */}
                    <div className="toolbar-group-bordered" style={{ paddingLeft: 16 }}>
                        <button className="btn-icon"><span className="material-symbols-outlined">format_list_bulleted</span></button>
                        <button className="btn-icon active"><span className="material-symbols-outlined">format_align_left</span></button>
                        <button className="btn-icon"><span className="material-symbols-outlined">format_align_center</span></button>
                    </div>

                    {/* Shapes */}
                    <div className="toolbar-group" style={{ paddingLeft: 16 }}>
                        <button className="btn-icon"><span className="material-symbols-outlined">rectangle</span></button>
                        <button className="btn-icon"><span className="material-symbols-outlined">circle</span></button>
                        <button className="btn-icon"><span className="material-symbols-outlined">arrow_outward</span></button>
                        <button className="btn-icon"><span className="material-symbols-outlined">text_fields</span></button>
                        <button className="btn-icon"><span className="material-symbols-outlined">image</span></button>
                    </div>
                </div>

                {/* Presentation Master Button */}
                <button className="presentation-master-btn" onClick={onNavigateToDashboard}>
                    <span className="material-symbols-outlined filled" style={{ fontSize: 18 }}>auto_awesome</span>
                    <span>Presentation Master</span>
                </button>
            </div>
        </header>
    );
};

export default Header;

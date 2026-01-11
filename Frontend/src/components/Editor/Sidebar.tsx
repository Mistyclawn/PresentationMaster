import React from 'react';
import './Sidebar.css';
import { Slide } from '../../types';

interface SidebarProps {
    slides: Slide[];
    currentSlideId: string;
    onSlideSelect: (id: string) => void;
    onToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ slides = [], currentSlideId, onSlideSelect, onToggle }) => {
    return (
        <aside className="editor-sidebar">
            <div className="sidebar-header">
                <span>SLIDES</span>
                <button
                    onClick={onToggle}
                    style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', display: 'flex' }}
                    title="Close Sidebar"
                >
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>dock_to_left</span>
                </button>
            </div>

            <div className="slide-list">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`slide-thumbnail-item ${slide.id === currentSlideId ? 'active' : ''}`}
                        onClick={() => onSlideSelect(slide.id)}
                    >
                        <span className="slide-number">{index + 1}</span>
                        <div className="slide-wrapper">
                            {/* Placeholder content for thumbnail - eventually use slide.thumbnail or render elements */}
                            <div style={{ padding: 8, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <div style={{ width: '60%', height: 4, background: '#ddd', marginBottom: 4 }}></div>
                                <div style={{ width: '40%', height: 4, background: '#eee' }}></div>
                                {slide.title && <div style={{ fontSize: '8px', marginTop: 4, color: '#666', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{slide.title}</div>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="add-slide-area">
                <button className="btn-add-slide">
                    + Add Slide
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;

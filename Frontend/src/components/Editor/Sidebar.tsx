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
    const slides = [1, 2, 3, 4, 5]; // Dummy data
    const activeSlide = 2;

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
                {slides.map((num) => (
                    <div key={num} className={`slide-thumbnail-item ${num === activeSlide ? 'active' : ''}`}>
                        <span className="slide-number">{num}</span>
                        <div className="slide-wrapper">
                            {/* Placeholder content for thumbnail */}
                            <div style={{ padding: 8, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <div style={{ width: '60%', height: 4, background: '#ddd', marginBottom: 4 }}></div>
                                <div style={{ width: '40%', height: 4, background: '#eee' }}></div>
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

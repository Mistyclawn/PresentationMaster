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
                            {/* Slide Thumbnail Renderer */}
                            <div style={{
                                width: '100%',
                                height: '100%',
                                position: 'relative',
                                overflow: 'hidden',
                                backgroundColor: 'white'
                            }}>
                                <div style={{
                                    width: 960,
                                    height: 540,
                                    transform: 'scale(0.18)', // Fits nicely in the sidebar thumbnail
                                    transformOrigin: 'top left',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    pointerEvents: 'none' // Prevent interaction in thumbnail
                                }}>
                                    {slide.elements.map(el => (
                                        <div key={el.id} style={{
                                            position: 'absolute',
                                            left: el.x,
                                            top: el.y,
                                            width: el.width,
                                            height: el.height,
                                            backgroundColor: el.style?.backgroundColor || 'transparent',
                                            border: el.style?.borderWidth ? `${el.style.borderWidth}px solid ${el.style.borderColor}` : 'none',
                                            borderRadius: el.style?.borderRadius || 0,
                                            color: el.style?.color || 'black',
                                            fontSize: el.style?.fontSize ? `${el.style.fontSize}px` : '16px',
                                            fontWeight: el.style?.fontWeight as any,
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'flex-start',
                                            fontFamily: 'inherit'
                                        }}>
                                            {el.type === 'text' ? el.content : ''}
                                        </div>
                                    ))}
                                </div>
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

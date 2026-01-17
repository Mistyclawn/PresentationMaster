import React, { useState, useEffect } from 'react';
import './PracticeMode.css';
import { Slide } from '../../types';

interface PresentationModeProps {
    slides: Slide[];
    onExit: () => void;
}

const PracticeMode: React.FC<PresentationModeProps> = ({ slides, onExit }) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);

    // Timer effect
    useEffect(() => {
        const timer = setInterval(() => {
            setElapsedTime(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const currentSlide = slides[currentSlideIndex];

    const handleNext = () => {
        if (currentSlideIndex < slides.length - 1) {
            setCurrentSlideIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentSlideIndex > 0) {
            setCurrentSlideIndex(prev => prev - 1);
        }
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === 'Space') {
                handleNext();
            } else if (e.key === 'ArrowLeft') {
                handlePrev();
            } else if (e.key === 'Escape') {
                onExit();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentSlideIndex, slides.length]); // Add deps to ensure current state is used

    return (
        <div className="presentation-mode">
            {/* Top Bar */}
            <div className="pm-header">
                <div className="pm-header-left">
                    <span className="recording-dot"></span>
                    <span className="pm-title">PRACTICE MODE</span>
                </div>
                <div className="pm-header-center">
                    <span className="material-symbols-outlined icon-timer">timer</span>
                    <span className="timer-text">{formatTime(elapsedTime)}</span>
                </div>
                <div className="pm-header-right">
                    <button className="pm-btn" onClick={() => { setElapsedTime(0); setCurrentSlideIndex(0); }}>
                        <span className="material-symbols-outlined">restart_alt</span>
                        Restart
                    </button>
                    {/* Settings button placeholder based on mock */}
                    <button className="pm-btn">
                        <span className="material-symbols-outlined">settings</span>
                        Settings
                    </button>
                    <button className="pm-btn exit-btn" onClick={onExit}>
                        <span className="material-symbols-outlined">close</span>

                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="pm-content">
                {/* Slide View */}
                <div className="pm-slide-container">
                    <div className="pm-slide-wrapper">
                        <div className="pm-slide-preview">
                            {/* Render elements */}
                            {currentSlide?.elements && currentSlide.elements.length > 0 ? (
                                <div className="slide-renderer" style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
                                    {currentSlide.elements.map((el: any) => (
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
                                            whiteSpace: 'pre-wrap', // Allow text wrapping
                                            fontFamily: 'inherit',
                                            display: 'flex',
                                            alignItems: 'center',
                                            // Apply scaling if needed, for now assuming 1:1 or responsive
                                        }}>
                                            {el.type === 'text' ? el.content : ''}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="slide-placeholder">
                                    <h2>{currentSlide?.title || 'Slide'}</h2>
                                    <p>{currentSlide?.description}</p>
                                </div>
                            )}
                        </div>

                        <div className="pm-slide-controls">
                            <button className="pm-slide-control-btn" title="Fullscreen">
                                <span className="material-symbols-outlined">fullscreen</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="pm-sidebar">
                    <div className="pm-sidebar-header">
                        <h3>SPEAKER SCRIPT</h3>
                        <div className="font-controls">
                            <button title="Decrease Font"><span className="material-symbols-outlined">text_decrease</span></button>
                            <button title="Increase Font"><span className="material-symbols-outlined">text_increase</span></button>
                        </div>
                    </div>
                    <div className="pm-sidebar-content">
                        <div className="script-slide-indicator">SLIDE {currentSlideIndex + 1}: {currentSlide?.title}</div>
                        <div className="script-text">
                            {currentSlide?.script ? (
                                <p>{currentSlide.script}</p>
                            ) : (
                                <p className="no-script">No script notes added for this slide.</p>
                            )}
                        </div>
                    </div>
                    <div className="pm-sidebar-footer">
                        <button className="nav-btn" onClick={handlePrev} disabled={currentSlideIndex === 0}>
                            <span className="material-symbols-outlined">arrow_back</span>
                        </button>
                        <div className="nav-info">
                            <span className="slide-counter">Slide {currentSlideIndex + 1} / {slides.length}</span>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: `${((currentSlideIndex + 1) / slides.length) * 100}%` }}></div>
                            </div>
                        </div>
                        <button className="nav-btn main-action" onClick={handleNext} disabled={currentSlideIndex === slides.length - 1}>
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PracticeMode;

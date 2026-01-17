import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Slide } from '../../types';
import './Editor.css';

interface WorkspaceProps {
    slide: Slide;
    onUpdateSlide: (slide: Slide) => void;
    isSidebarOpen?: boolean;
    onToggleSidebar?: () => void;
}

const Workspace: React.FC<WorkspaceProps> = ({ slide, onUpdateSlide, isSidebarOpen = true, onToggleSidebar }) => {
    const [zoomLevel, setZoomLevel] = useState(100);
    const [viewMode, setViewMode] = useState<'grid' | 'single' | 'slideshow'>('single');
    const [isFitToScreen, setIsFitToScreen] = useState(true);

    // Panning State
    const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
    const [isPanning, setIsPanning] = useState(false);
    const [isHandMode, setIsHandMode] = useState(false);
    const lastMousePos = useRef({ x: 0, y: 0 });
    const isSpacePressed = useRef(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const SLIDE_WIDTH = 960;
    const SLIDE_HEIGHT = 540;
    const PADDING = 120; // Increased padding for better breathing room

    const calculateFitZoom = useCallback(() => {
        if (!containerRef.current) return 100;
        const container = containerRef.current;
        const availableWidth = container.clientWidth - (PADDING * 2);
        const availableHeight = container.clientHeight - (PADDING * 2);

        const scaleX = availableWidth / SLIDE_WIDTH;
        const scaleY = availableHeight / SLIDE_HEIGHT;

        // Use the smaller scale to ensure it fits completely
        let scale = Math.min(scaleX, scaleY) * 100;
        return Math.floor(scale);
    }, []);

    useEffect(() => {
        if (!isFitToScreen) return;

        const handleResize = () => {
            const fitZoom = calculateFitZoom();
            setZoomLevel(fitZoom);
            setPanOffset({ x: 0, y: 0 }); // Reset pan on fit
        };

        handleResize(); // Initial calculation

        const resizeObserver = new ResizeObserver(handleResize);
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => resizeObserver.disconnect();
    }, [isFitToScreen, calculateFitZoom, isSidebarOpen]); // Recalculate when sidebar toggles

    const handleZoomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsFitToScreen(false);
        setZoomLevel(Number(event.target.value));
    };

    const handleZoomIn = () => {
        setIsFitToScreen(false);
        setZoomLevel(prev => Math.min(prev + 10, 200));
    };

    const handleZoomOut = () => {
        setIsFitToScreen(false);
        setZoomLevel(prev => Math.max(prev - 10, 10));
    };

    const handleFitToScreen = () => {
        setIsFitToScreen(true);
        // The effect will trigger and calculate the zoom
    };

    // Spacebar for Hand Mode
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space' && !e.repeat && !e.target?.toString().includes('Input')) {
                isSpacePressed.current = true;
                if (containerRef.current) containerRef.current.style.cursor = 'grab';
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                isSpacePressed.current = false;
                if (containerRef.current && !isHandMode) containerRef.current.style.cursor = 'default';
                setIsPanning(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [isHandMode]);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (isHandMode || isSpacePressed.current || e.button === 1) {
            e.preventDefault();
            setIsPanning(true);
            lastMousePos.current = { x: e.clientX, y: e.clientY };
            if (containerRef.current) containerRef.current.style.cursor = 'grabbing';
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isPanning) return;
        e.preventDefault();

        const deltaX = e.clientX - lastMousePos.current.x;
        const deltaY = e.clientY - lastMousePos.current.y;

        setPanOffset(prev => ({
            x: prev.x + deltaX,
            y: prev.y + deltaY
        }));

        lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
        setIsPanning(false);
        if (containerRef.current) {
            containerRef.current.style.cursor = (isHandMode || isSpacePressed.current) ? 'grab' : 'default';
        }
    };

    return (
        <main className="editor-workspace" onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
            {/* Top Ruler / Info area (Optional, skipping for now as per previous placeholder) */}

            {/* Canvas Area */}
            {/* Canvas Area */}
            <div
                className="workspace-canvas-area"
                ref={containerRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                style={{
                    cursor: (isHandMode || isSpacePressed.current) ? 'grab' : 'default',
                    overflow: 'hidden', // Hide scrollbars, we pan manually
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                {/* Transform Wrapper for Panning */}
                <div style={{
                    transform: `translate(${panOffset.x}px, ${panOffset.y}px)`,
                    transition: isPanning ? 'none' : 'transform 0.1s ease-out', // Smooth reset, instant drag
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                }}>
                    {/* Scaler Wrapper - keeps slide centered initially */}
                    <div style={{
                        width: `${SLIDE_WIDTH * zoomLevel / 100}px`,
                        height: `${SLIDE_HEIGHT * zoomLevel / 100}px`,
                        position: 'relative',
                    }}>
                        <div className="slide-canvas" style={{
                            width: '960px',
                            height: '540px',
                            backgroundColor: 'white',
                            position: 'absolute',
                            top: PADDING,
                            left: PADDING,
                            transform: `scale(${zoomLevel / 100})`,
                            transformOrigin: 'top left',
                            transition: 'transform 0.1s ease-out',
                            overflow: 'hidden' // Clip content to slide bounds
                        }}>
                            {slide?.elements?.map(el => (
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
                                    fontFamily: 'inherit',
                                    cursor: 'pointer',
                                    userSelect: 'none'
                                }}>
                                    {el.type === 'text' ? el.content : ''}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Bottom Bar */}
            {/* Detailed Bottom Bar */}
            <div className="workspace-bottom-bar" style={{
                height: '32px',
                backgroundColor: '#111418',
                borderTop: '1px solid #283039',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 16px 0 8px',
                fontSize: '12px',
                color: '#9dabb9',
                flexShrink: 0
            }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button className="btn-bottom-bar">
                        <span className="text-responsive-long">Slide 2 of 5</span>
                        <span className="text-responsive-short">2 / 5</span>
                    </button>

                    {/* Hand Tool Toggle */}
                    <div style={{ width: 1, height: 16, background: '#3b4754', margin: '0 4px' }}></div>
                    <button
                        className={`btn-icon-small ${isHandMode ? 'active' : ''}`}
                        onClick={() => setIsHandMode(!isHandMode)}
                        title="Hand Tool (Space + Drag)"
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>pan_tool</span>
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
                        <div className="zoom-slider-container" style={{ display: 'flex', alignItems: 'center', width: '96px' }}>
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
                        <button onClick={handleFitToScreen} className={`btn-icon-small ${isFitToScreen ? 'active' : ''}`} title="Fit to window"><span className="material-symbols-outlined" style={{ fontSize: 16 }}>fit_screen</span></button>
                    </div>
                </div>
            </div >
        </main >
    );
};

export default Workspace;

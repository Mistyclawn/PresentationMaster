import React, { useState } from 'react';
import Header from '../Editor/Header';
import PresentationSetup from './PresentationSetup';
import PracticeMode from './PracticeMode';
import { Slide } from '../../types';

interface PresentationModeContainerProps {
    slides: Slide[];
    onExit: () => void;
    onNavigateToDashboard?: () => void;
}

const PresentationModeContainer: React.FC<PresentationModeContainerProps> = ({ slides, onExit, onNavigateToDashboard }) => {
    const [view, setView] = useState<'setup' | 'practice'>('setup');

    if (view === 'practice') {
        return (
            <PracticeMode
                slides={slides}
                onExit={() => {
                    setView('setup');
                }}
            />
        );
    }

    return (
        <div className="dark" style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: 'var(--color-bg-panel)' }}>
            <Header
                mode="presentation"
                onNavigateToEditor={onExit}
                onNavigateToDashboard={onNavigateToDashboard}
            />

            <div style={{ flex: 1, overflowY: 'auto' }}>
                <PresentationSetup
                    slides={slides}
                    onStartPractice={() => setView('practice')}
                />
            </div>
        </div>
    );
};

export default PresentationModeContainer;

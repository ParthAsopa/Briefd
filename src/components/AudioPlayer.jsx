import { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Square } from 'lucide-react';
import { play, pause, resume, stop, skipNext, skipPrev } from '../lib/audioService';

export default function AudioPlayer({ state, currentIndex, totalArticles }) {
  const isPlaying = state === 'playing';
  const isPaused = state === 'paused';
  const isActive = isPlaying || isPaused;

  const btnStyle = (primary = false) => ({
    background: primary ? 'var(--accent)' : 'var(--surface2)',
    border: 'none',
    borderRadius: '50%',
    width: primary ? '52px' : '40px',
    height: primary ? '52px' : '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: primary ? '#0f172a' : 'var(--text)',
    transition: 'all 0.2s ease',
  });

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#0d1f35',
      borderTop: '1px solid var(--surface2)',
      padding: '12px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 100,
      backdropFilter: 'blur(10px)',
    }}>
      <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
        {isActive
          ? `Story ${(currentIndex ?? 0) + 1} of ${totalArticles}`
          : 'Ready to brief you'}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button style={btnStyle()} onClick={skipPrev}>
          <SkipBack size={16} />
        </button>

        {isPlaying ? (
          <button style={btnStyle(true)} onClick={pause}>
            <Pause size={20} />
          </button>
        ) : isPaused ? (
          <button style={btnStyle(true)} onClick={resume}>
            <Play size={20} />
          </button>
        ) : (
          <button style={btnStyle(true)} onClick={play}>
            <Play size={20} />
          </button>
        )}

        <button style={btnStyle()} onClick={skipNext}>
          <SkipForward size={16} />
        </button>

        {isActive && (
          <button style={btnStyle()} onClick={stop}>
            <Square size={16} />
          </button>
        )}
      </div>

      <div style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 600 }}>
        {isPlaying ? '▶ Playing' : isPaused ? '⏸ Paused' : ''}
      </div>
    </div>
  );
}
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
    width: primary ? '48px' : '36px',
    height: primary ? '48px' : '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: primary ? '#080c14' : 'var(--text)',
    transition: 'all 0.2s ease',
  });

  const Equalizer = () => (
    <div style={{
      display: 'flex',
      alignItems: 'flex-end',
      gap: '3px',
      height: '20px',
    }}>
      {[0, 1, 2].map(i => (
        <div
          key={i}
          style={{
            width: '3px',
            height: isPlaying ? `${40 + Math.random() * 60}%` : '40%',
            backgroundColor: 'var(--accent)',
            borderRadius: '2px',
            animation: isPlaying ? `none` : 'none',
            transition: isPlaying ? 'height 0.1s ease' : 'none',
          }}
        />
      ))}
    </div>
  );

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(8, 12, 20, 0.95)',
      borderTop: '1px solid var(--surface2)',
      backdropFilter: 'blur(20px)',
      zIndex: 100,
    }}>
      {isActive && (
        <div style={{
          height: '3px',
          background: `linear-gradient(90deg, var(--accent) 0%, var(--accent) ${Math.random() * 100}%, var(--surface2) ${Math.random() * 100}%, var(--surface2) 100%)`,
          transition: 'all 0.3s ease',
        }} />
      )}
      
      <div style={{
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
      }}>
        <div style={{ 
          fontSize: '12px', 
          color: 'var(--text-muted)',
          minWidth: '120px',
        }}>
          {isActive
            ? `Story ${(currentIndex ?? 0) + 1} / ${totalArticles}`
            : 'Ready to brief you'}
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flex: 1,
          justifyContent: 'center',
        }}>
          <button style={btnStyle()} onClick={skipPrev} title="Previous">
            <SkipBack size={14} />
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

          <button style={btnStyle()} onClick={skipNext} title="Next">
            <SkipForward size={14} />
          </button>

          {isActive && (
            <button style={btnStyle()} onClick={stop} title="Stop">
              <Square size={14} />
            </button>
          )}
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          minWidth: '80px',
          justifyContent: 'flex-end',
        }}>
          {isActive && <Equalizer />}
          <div style={{
            fontSize: '12px',
            color: 'var(--accent)',
            fontWeight: 600,
            minWidth: '50px',
            textAlign: 'right',
          }}>
            {isPlaying ? '♫ Playing' : isPaused ? '⏸ Paused' : ''}
          </div>
        </div>
      </div>
    </div>
  );
}

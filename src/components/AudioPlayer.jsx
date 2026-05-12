import { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Square } from 'lucide-react';
import { play, pause, resume, stop, skipNext, skipPrev } from '../lib/audioService';

export default function AudioPlayer({ state, currentIndex, totalArticles }) {
  const isPlaying = state === 'playing';
  const isPaused = state === 'paused';
  const isActive = isPlaying || isPaused;

  const btnStyle = (primary = false) => ({
    background: primary ? 'var(--accent)' : 'transparent',
    border: primary ? 'none' : '1px solid var(--border)',
    borderRadius: '50%',
    width: primary ? '40px' : '32px',
    height: primary ? '40px' : '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: primary ? '#0a0a0a' : 'var(--text)',
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

  const progressPercent = isActive && totalArticles > 0 
    ? ((currentIndex ?? 0) + 1) / totalArticles * 100 
    : 0;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'var(--bg)',
      borderTop: '1px solid var(--border)',
      zIndex: 100,
    }}>
      <div style={{
        height: '2px',
        backgroundColor: 'transparent',
        position: 'relative',
      }}>
        <div style={{
          height: '100%',
          width: `${progressPercent}%`,
          backgroundColor: 'var(--accent)',
          transition: 'width 0.3s ease',
        }} />
      </div>
      
      <div style={{
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
      }}>
        <div style={{ 
          fontSize: '12px', 
          color: 'var(--text-muted)',
          minWidth: 'auto',
        }}>
          {isActive
            ? `Story ${(currentIndex ?? 0) + 1} of ${totalArticles}`
            : ''}
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

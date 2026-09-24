import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Map, 
  Cpu, 
  Radio, 
  Bell, 
  Navigation, 
  History, 
  Sliders, 
  Layers, 
  Volume2, 
  VolumeX, 
  Home, 
  LayoutDashboard,
  Clock,
  Sparkles
} from 'lucide-react';

export function Navbar({ 
  activeTab, 
  setActiveTab, 
  alertCount, 
  audioMuted, 
  setAudioMuted,
  onPlayAudioTest,
  isLanding,
  setIsLanding,
  presetScenario,
  onSelectScenario
}) {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'map', label: 'Live Risk Map', icon: Map },
    { id: 'prediction', label: 'Prediction Engine', icon: Cpu },
    { id: 'sensors', label: 'Sensors', icon: Radio },
    { id: 'alerts', label: 'Alerts', icon: Bell, badge: alertCount },
    { id: 'routes', label: 'Safe Routes', icon: Navigation },
    { id: 'history', label: 'History', icon: History },
    { id: 'simulation', label: 'Simulation', icon: Sliders },
    { id: 'architecture', label: 'Architecture', icon: Layers }
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'rgba(6, 10, 18, 0.92)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(56, 189, 248, 0.2)'
    }}>
      {/* Top Utility Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 20px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        fontSize: '0.8rem',
        color: 'var(--text-secondary)'
      }}>
        {/* Left: Branding & Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div 
            onClick={() => setIsLanding(true)}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              cursor: 'pointer',
              userSelect: 'none'
            }}
          >
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 12px rgba(2, 132, 199, 0.5)'
            }}>
              <ShieldAlert size={19} color="#ffffff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '0.04em', color: '#ffffff' }}>
                  AQUA<span style={{ color: '#38bdf8' }}>-SHIELD</span>
                </span>
                <span style={{ fontSize: '0.68rem', padding: '1px 6px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', borderRadius: '4px', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                  SIH 2026
                </span>
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                PS 26192 • Team Aethervortex
              </div>
            </div>
          </div>

          <div style={{ width: '1px', height: '20px', background: 'rgba(255, 255, 255, 0.1)', margin: '0 4px' }} />

          {/* System Online Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} className="pulse-beacon" />
            <span style={{ color: '#10b981', fontWeight: 600, letterSpacing: '0.03em' }}>ONLINE</span>
            <span style={{ color: '#64748b' }}>(Edge Latency: 18ms)</span>
          </div>
        </div>

        {/* Right: Scenario Quick Select + Time + Audio Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          
          {/* Quick Demo Scenario Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 255, 255, 0.04)', padding: '3px 8px', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
            <Sparkles size={13} color="#38bdf8" />
            <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Demo Preset:</span>
            <button 
              id="nav-preset-normal"
              onClick={() => onSelectScenario('NORMAL')}
              style={{
                background: presetScenario === 'NORMAL' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                color: presetScenario === 'NORMAL' ? '#10b981' : '#94a3b8',
                border: 'none',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '0.72rem',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              Normal
            </button>
            <button 
              id="nav-preset-heavy"
              onClick={() => onSelectScenario('HEAVY_RAIN')}
              style={{
                background: presetScenario === 'HEAVY_RAIN' ? 'rgba(245, 158, 11, 0.2)' : 'transparent',
                color: presetScenario === 'HEAVY_RAIN' ? '#f59e0b' : '#94a3b8',
                border: 'none',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '0.72rem',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              Heavy Rain
            </button>
            <button 
              id="nav-preset-flood"
              onClick={() => onSelectScenario('FLASH_FLOOD')}
              style={{
                background: presetScenario === 'FLASH_FLOOD' ? 'rgba(239, 68, 68, 0.25)' : 'transparent',
                color: presetScenario === 'FLASH_FLOOD' ? '#ef4444' : '#94a3b8',
                border: 'none',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '0.72rem',
                cursor: 'pointer',
                fontWeight: 700
              }}
            >
              Flash Flood
            </button>
          </div>

          {/* Audio Chime Toggle */}
          <button
            id="btn-toggle-audio"
            onClick={() => {
              setAudioMuted(!audioMuted);
              if (audioMuted) onPlayAudioTest();
            }}
            title={audioMuted ? "Audio warnings muted (click to unmute)" : "Audio warnings active"}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: audioMuted ? 'rgba(255, 255, 255, 0.05)' : 'rgba(6, 182, 212, 0.15)',
              color: audioMuted ? '#64748b' : '#38bdf8',
              border: `1px solid ${audioMuted ? 'rgba(255,255,255,0.1)' : 'rgba(56, 189, 248, 0.4)'}`,
              padding: '4px 8px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.75rem'
            }}
          >
            {audioMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            <span>{audioMuted ? 'Muted' : 'Siren'}</span>
          </button>

          {/* Clock */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#cbd5e1', fontFamily: 'var(--font-mono)' }}>
            <Clock size={13} color="#38bdf8" />
            <span>{currentTime || '22:24:00'} IST</span>
          </div>

          {/* Landing / Control Room Toggle */}
          <button
            id="btn-landing-toggle"
            onClick={() => setIsLanding(!isLanding)}
            className="btn btn-secondary btn-sm"
            style={{ padding: '3px 10px', fontSize: '0.74rem' }}
          >
            {isLanding ? <LayoutDashboard size={13} /> : <Home size={13} />}
            <span>{isLanding ? 'Control Room' : 'Landing'}</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        overflowX: 'auto',
        gap: '4px'
      }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = !isLanding && activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-tab-${item.id}`}
              onClick={() => {
                setIsLanding(false);
                setActiveTab(item.id);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '11px 14px',
                background: 'transparent',
                border: 'none',
                borderBottom: isActive ? '2px solid #38bdf8' : '2px solid transparent',
                color: isActive ? '#38bdf8' : 'var(--text-secondary)',
                fontWeight: isActive ? 600 : 500,
                fontSize: '0.86rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all var(--transition-fast)'
              }}
            >
              <Icon size={16} color={isActive ? '#38bdf8' : 'currentColor'} />
              <span>{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span style={{
                  background: '#ef4444',
                  color: '#ffffff',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  padding: '1px 6px',
                  borderRadius: '10px',
                  boxShadow: '0 0 8px rgba(239, 68, 68, 0.6)'
                }}>
                  {item.badge < 10 ? `0${item.badge}` : item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </header>
  );
}

import React from 'react';
import { 
  ShieldAlert, 
  Layers, 
  MapPin, 
  AlertTriangle, 
  ArrowRight, 
  Activity, 
  Cpu, 
  Radar, 
  Compass, 
  Mountain,
  Droplets
} from 'lucide-react';

export function LandingHero({ onStartMonitoring, onExploreSimulation, currentRisk, leadTime }) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', minHeight: '88vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
      
      {/* Dynamic Animated Topographic Contour Canvas/SVG Background */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.18, pointerEvents: 'none' }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="topo-glow" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0b1120" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#topo-glow)" />
          {/* Topographic Elevation Curves */}
          <path d="M-100 200 Q 250 80, 600 220 T 1300 180 T 2000 250" fill="none" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="6 4" opacity="0.6" />
          <path d="M-100 280 Q 300 150, 700 310 T 1400 260 T 2000 320" fill="none" stroke="#38bdf8" strokeWidth="1.4" opacity="0.5" />
          <path d="M-100 360 Q 350 220, 800 390 T 1500 340 T 2000 400" fill="none" stroke="#06b6d4" strokeWidth="1.5" opacity="0.7" />
          <path d="M-100 450 Q 400 300, 850 490 T 1550 430 T 2000 500" fill="none" stroke="#06b6d4" strokeWidth="1.6" opacity="0.6" />
          <path d="M-100 550 Q 450 420, 950 590 T 1650 540 T 2000 620" fill="none" stroke="#3b82f6" strokeWidth="1.8" opacity="0.4" />
          <path d="M-100 670 Q 500 540, 1050 710 T 1750 660 T 2000 740" fill="none" stroke="#6366f1" strokeWidth="2.0" opacity="0.3" />
          {/* River Line */}
          <path d="M 680 -50 C 620 200, 480 320, 420 500 C 380 620, 440 750, 480 1000" fill="none" stroke="#0284c7" strokeWidth="4" opacity="0.7" />
        </svg>
      </div>

      {/* Radar scanning circular ring animation */}
      <div style={{
        position: 'absolute',
        top: '25%',
        right: '10%',
        width: '420px',
        height: '420px',
        borderRadius: '50%',
        border: '1px solid rgba(56, 189, 248, 0.15)',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ width: '280px', height: '280px', borderRadius: '50%', border: '1px dashed rgba(56, 189, 248, 0.2)' }} />
        <div style={{ width: '140px', height: '140px', borderRadius: '50%', border: '1px solid rgba(56, 189, 248, 0.25)' }} />
        <div className="radar-sweep-anim" style={{
          position: 'absolute',
          width: '50%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #38bdf8)',
          top: '50%',
          left: '50%',
          transformOrigin: '0 0'
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1080px', margin: '0 auto', textAlign: 'center' }}>
        
        {/* Hackathon Header Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(6, 182, 212, 0.12)', border: '1px solid rgba(6, 182, 212, 0.35)', borderRadius: '9999px', marginBottom: '22px', fontSize: '0.82rem', fontWeight: 600, color: '#38bdf8' }}>
          <ShieldAlert size={15} color="#38bdf8" />
          <span>SMART INDIA HACKATHON 2026 • PROBLEM ID: 26192 • TEAM AETHERVORTEX</span>
        </div>

        {/* Hero Title */}
        <h1 style={{ fontSize: 'clamp(2.4rem, 5.2vw, 4.2rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '18px' }}>
          <span style={{ color: '#ffffff' }}>AQUA-</span>
          <span style={{ background: 'linear-gradient(135deg, #38bdf8 0%, #06b6d4 50%, #3b82f6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>SHIELD</span>
        </h1>

        <h2 style={{ fontSize: 'clamp(1.2rem, 2.4vw, 1.75rem)', fontWeight: 600, color: '#e2e8f0', marginBottom: '18px' }}>
          Hyper-Local Flash Flood Intelligence for Hilly Regions
        </h2>

        {/* Subtitle with scientific premise */}
        <p style={{ maxWidth: '780px', margin: '0 auto 36px', fontSize: '1.08rem', color: '#94a3b8', lineHeight: 1.65 }}>
          “Fuse rainfall, soil moisture, terrain, history and live sensor data to detect rising flash-flood risk before it becomes an emergency.”
        </p>

        {/* Call to action buttons */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
          <button 
            id="btn-start-monitoring"
            className="btn btn-primary" 
            style={{ padding: '14px 28px', fontSize: '1.02rem', gap: '10px' }}
            onClick={onStartMonitoring}
          >
            <Activity size={18} />
            <span>Start Live Monitoring</span>
            <ArrowRight size={17} />
          </button>

          <button 
            id="btn-explore-simulation"
            className="btn btn-secondary" 
            style={{ padding: '14px 26px', fontSize: '1.02rem', gap: '10px', background: 'rgba(255, 255, 255, 0.04)' }}
            onClick={onExploreSimulation}
          >
            <Cpu size={18} color="#38bdf8" />
            <span>Explore Simulation</span>
          </button>
        </div>

        {/* Three Core Innovation Indicators */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '18px',
          textAlign: 'left'
        }}>
          
          <div className="card-panel" style={{ padding: '22px', borderLeft: '3px solid #06b6d4' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'rgba(6, 182, 212, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Layers size={20} color="#06b6d4" />
              </div>
              <h3 style={{ fontSize: '1.02rem', fontWeight: 700, color: '#f8fafc' }}>Multi-Source Intelligence</h3>
            </div>
            <p style={{ fontSize: '0.86rem', color: '#94a3b8', lineHeight: 1.55 }}>
              Combines IMD radar precipitation, IoT soil dielectric probes, DEM slope gradients and historical choke points. Rainfall alone is never enough.
            </p>
          </div>

          <div className="card-panel" style={{ padding: '22px', borderLeft: '3px solid #3b82f6' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapPin size={20} color="#3b82f6" />
              </div>
              <h3 style={{ fontSize: '1.02rem', fontWeight: 700, color: '#f8fafc' }}>Hyper-Local Risk Mapping</h3>
            </div>
            <p style={{ fontSize: '0.86rem', color: '#94a3b8', lineHeight: 1.55 }}>
              30m resolution catchment modeling for mountain villages, river meanders, bridge causeways and low-lying vulnerable settlements.
            </p>
          </div>

          <div className="card-panel" style={{ padding: '22px', borderLeft: '3px solid #10b981' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertTriangle size={20} color="#10b981" />
              </div>
              <h3 style={{ fontSize: '1.02rem', fontWeight: 700, color: '#f8fafc' }}>Early Action Guidance</h3>
            </div>
            <p style={{ fontSize: '0.86rem', color: '#94a3b8', lineHeight: 1.55 }}>
              Provides concrete 3-tier actionable directives: Control Room commands, field responder barrier deployments, and safe community evacuation routes.
            </p>
          </div>

        </div>

        {/* Live Operational Status Strip */}
        <div style={{
          marginTop: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          padding: '14px 24px',
          background: 'rgba(15, 25, 45, 0.55)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          fontSize: '0.84rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 8px #10b981' }} />
            <span style={{ color: '#e2e8f0', fontWeight: 600 }}>MONITORED REGION:</span>
            <span style={{ color: '#94a3b8' }}>Nilgiri-Shola Basin, Tamil Nadu (342 km² Catchment)</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div>
              <span style={{ color: '#94a3b8' }}>Live Risk: </span>
              <span style={{ fontWeight: 700, color: currentRisk >= 80 ? '#ef4444' : currentRisk >= 60 ? '#f97316' : '#10b981' }}>
                {currentRisk} / 100
              </span>
            </div>
            <div>
              <span style={{ color: '#94a3b8' }}>Est. Lead Time: </span>
              <span style={{ fontWeight: 700, color: '#38bdf8' }}>{leadTime} min</span>
            </div>
            <div>
              <span style={{ color: '#94a3b8' }}>IoT Mesh: </span>
              <span style={{ fontWeight: 700, color: '#10b981' }}>47 / 50 Nodes Active</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { 
  Sliders, 
  Play, 
  RotateCcw, 
  Sparkles, 
  CloudRain, 
  Activity, 
  Mountain, 
  Radio, 
  History, 
  ArrowRight,
  ShieldAlert,
  Flame,
  CheckCircle2,
  AlertTriangle,
  Clock
} from 'lucide-react';
import { PRESET_SCENARIOS } from '../data/mockData';

export function SimulationTab({ 
  rainfall, 
  setRainfall, 
  soilMoisture, 
  setSoilMoisture, 
  slopeRisk, 
  setSlopeRisk, 
  sensorAvailability, 
  setSensorAvailability, 
  historicalRisk, 
  setHistoricalRisk,
  onApplyPreset,
  floodData,
  onNavigateToMap,
  onRunStormProgression,
  isProgressionRunning,
  progressionStep
}) {
  const [isSimulating, setIsSimulating] = useState(false);

  const {
    riskScore,
    riskLevel,
    riskColor,
    leadTimeMinutes,
    confidence,
    explanation
  } = floodData;

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 600);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1440px', margin: '0 auto' }}>
      
      {/* HEADER */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sliders size={22} color="#38bdf8" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
              Flash-Flood Scenario Simulation Studio
            </h2>
            <span style={{ fontSize: '0.74rem', padding: '2px 8px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', borderRadius: '4px', fontWeight: 600 }}>
              SIH Live Interactive Sandbox
            </span>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
            Adjust physical hydrologic parameters and observe real-time recalculation of risk scores, lead time, map hazard zones, and automated alerts.
          </p>
        </div>

        {/* TIME-LAPSE STORM PROGRESSION RUNNER */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            id="btn-run-storm-progression"
            onClick={onRunStormProgression}
            disabled={isProgressionRunning}
            className="btn btn-primary"
            style={{ gap: '8px', padding: '9px 16px', fontSize: '0.82rem' }}
          >
            <Play size={15} />
            <span>{isProgressionRunning ? `Simulating Storm (${progressionStep}/5)...` : 'Auto-Run 40-Min Storm Timelapse'}</span>
          </button>
        </div>
      </div>

      {/* SECTION 18: THREE PRESET DEMO SCENARIOS BUTTONS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px',
        marginBottom: '28px'
      }}>
        
        {/* Preset 1: Normal */}
        <div 
          onClick={() => onApplyPreset('NORMAL')}
          className="card-panel"
          style={{
            padding: '18px',
            cursor: 'pointer',
            borderLeft: '4px solid #10b981',
            background: 'rgba(16, 185, 129, 0.06)',
            transition: 'all 0.2s ease'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ fontWeight: 800, fontSize: '0.98rem', color: '#10b981' }}>
              1. NORMAL CONDITIONS
            </div>
            <span className="badge badge-safe">SAFE (LOW)</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.45, marginBottom: '10px' }}>
            Light rain (14 mm/hr) on dry soil (38%). Soil retention capacity absorbs precipitation; runoff is negligible.
          </p>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
            Click to load scenario →
          </div>
        </div>

        {/* Preset 2: Heavy Rain */}
        <div 
          onClick={() => onApplyPreset('HEAVY_RAIN')}
          className="card-panel"
          style={{
            padding: '18px',
            cursor: 'pointer',
            borderLeft: '4px solid #f59e0b',
            background: 'rgba(245, 158, 11, 0.06)',
            transition: 'all 0.2s ease'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ fontWeight: 800, fontSize: '0.98rem', color: '#f59e0b' }}>
              2. HEAVY RAINFALL
            </div>
            <span className="badge badge-watch">WATCH / HIGH</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.45, marginBottom: '10px' }}>
            Sustained downpour (65 mm/hr) and rising saturation (76%). Infiltration drops, initiating surface sheet runoff.
          </p>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
            Click to load scenario →
          </div>
        </div>

        {/* Preset 3: Flash Flood Threat */}
        <div 
          onClick={() => onApplyPreset('FLASH_FLOOD')}
          className="card-panel"
          style={{
            padding: '18px',
            cursor: 'pointer',
            borderLeft: '4px solid #ef4444',
            background: 'rgba(239, 68, 68, 0.08)',
            transition: 'all 0.2s ease'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ fontWeight: 800, fontSize: '0.98rem', color: '#ef4444' }}>
              3. FLASH FLOOD THREAT
            </div>
            <span className="badge badge-critical">CRITICAL SURGE</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.45, marginBottom: '10px' }}>
            Extreme cloudburst (124 mm/hr) on saturated basin (93%). Zero infiltration capacity channels lethal torrents into valleys.
          </p>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
            Click to load scenario →
          </div>
        </div>

      </div>

      {/* SECTION 17: MANUAL PARAMETER CONTROLS + REAL-TIME RESPONSE PANEL */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.4fr) 1fr',
        gap: '24px',
        alignItems: 'start'
      }}>
        
        {/* LEFT: SLIDERS & CONTROLS */}
        <div className="card-panel tech-corners" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <Sliders size={20} color="#38bdf8" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>
              Physical Hydrology Sliders
            </h3>
          </div>

          {/* Slider 1: Rainfall Intensity */}
          <div style={{ marginBottom: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CloudRain size={16} color="#38bdf8" />
                <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#ffffff' }}>Rainfall Intensity</span>
              </div>
              <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#38bdf8' }}>
                {rainfall} <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>mm/hr</span>
              </span>
            </div>
            <input 
              id="slider-rainfall"
              type="range" 
              min="0" 
              max="150" 
              value={rainfall}
              onChange={(e) => setRainfall(Number(e.target.value))}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b', marginTop: '4px' }}>
              <span>0 (Dry)</span>
              <span>40 (Moderate)</span>
              <span>80 (Heavy)</span>
              <span>150 (Cloudburst)</span>
            </div>
          </div>

          {/* Slider 2: Soil Moisture Saturation */}
          <div style={{ marginBottom: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Activity size={16} color="#f97316" />
                <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#ffffff' }}>Soil Saturation</span>
              </div>
              <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f97316' }}>
                {soilMoisture}%
              </span>
            </div>
            <input 
              id="slider-soil"
              type="range" 
              min="0" 
              max="100" 
              value={soilMoisture}
              onChange={(e) => setSoilMoisture(Number(e.target.value))}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b', marginTop: '4px' }}>
              <span>0% (Bone Dry)</span>
              <span>50% (Moist)</span>
              <span style={{ color: '#ef4444', fontWeight: 600 }}>80% (Runoff Threshold)</span>
              <span>100% (Flooded)</span>
            </div>
          </div>

          {/* Slider 3: Slope Risk */}
          <div style={{ marginBottom: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Mountain size={16} color="#f59e0b" />
                <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#ffffff' }}>Terrain & Slope Gradient</span>
              </div>
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f59e0b' }}>
                {slopeRisk} Slope Risk
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
              {['Low', 'Medium', 'High'].map(opt => (
                <button
                  key={opt}
                  onClick={() => setSlopeRisk(opt)}
                  style={{
                    background: slopeRisk === opt ? 'rgba(245, 158, 11, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                    color: slopeRisk === opt ? '#f59e0b' : '#94a3b8',
                    border: `1px solid ${slopeRisk === opt ? '#f59e0b' : 'rgba(255, 255, 255, 0.1)'}`,
                    padding: '8px',
                    borderRadius: '6px',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Slider 4: Sensor Availability */}
          <div style={{ marginBottom: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Radio size={16} color="#10b981" />
                <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#ffffff' }}>IoT Sensor Availability</span>
              </div>
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#10b981' }}>
                {sensorAvailability}% Live
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
              {[100, 50, 20].map(pct => (
                <button
                  key={pct}
                  onClick={() => setSensorAvailability(pct)}
                  style={{
                    background: sensorAvailability === pct ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                    color: sensorAvailability === pct ? '#10b981' : '#94a3b8',
                    border: `1px solid ${sensorAvailability === pct ? '#10b981' : 'rgba(255, 255, 255, 0.1)'}`,
                    padding: '8px',
                    borderRadius: '6px',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                >
                  {pct}% Mesh
                </button>
              ))}
            </div>
          </div>

          {/* Slider 5: Historical Vulnerability Weight */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <History size={16} color="#a855f7" />
                <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#ffffff' }}>Historical Risk Recurrence</span>
              </div>
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#a855f7' }}>
                {historicalRisk}
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
              {['Low', 'Medium', 'High'].map(opt => (
                <button
                  key={opt}
                  onClick={() => setHistoricalRisk(opt)}
                  style={{
                    background: historicalRisk === opt ? 'rgba(168, 85, 247, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                    color: historicalRisk === opt ? '#a855f7' : '#94a3b8',
                    border: `1px solid ${historicalRisk === opt ? '#a855f7' : 'rgba(255, 255, 255, 0.1)'}`,
                    padding: '8px',
                    borderRadius: '6px',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* RUN SIMULATION BUTTON */}
          <button
            id="btn-run-simulation"
            onClick={handleRunSimulation}
            className="btn btn-primary"
            style={{ width: '100%', padding: '12px', fontSize: '0.96rem' }}
          >
            <Sparkles size={18} />
            <span>{isSimulating ? 'Recalculating Multi-Source Model...' : 'RUN SIMULATION'}</span>
          </button>
        </div>

        {/* RIGHT: REAL-TIME SIMULATION IMPACT DISPLAY */}
        <div className="card-panel tech-corners" style={{ padding: '24px', borderLeft: `4px solid ${riskColor}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
            <div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 700 }}>SIMULATED PREDICTION RESULT</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>Dynamic Decision Output</div>
            </div>
            <span className={`badge badge-${riskLevel.toLowerCase()}`}>
              {riskLevel}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '18px' }}>
            <div style={{ padding: '14px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Risk Index</div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: riskColor }}>
                {riskScore} <span style={{ fontSize: '0.9rem', color: '#64748b' }}>/ 100</span>
              </div>
            </div>

            <div style={{ padding: '14px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Lead Time Window</div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#38bdf8' }}>
                {leadTimeMinutes} <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>min</span>
              </div>
            </div>
          </div>

          {/* Model Confidence Meter */}
          <div style={{ marginBottom: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '6px' }}>
              <span style={{ color: '#cbd5e1' }}>Model Confidence Level</span>
              <span style={{ fontWeight: 700, color: confidence > 80 ? '#10b981' : '#f59e0b' }}>{confidence}%</span>
            </div>
            <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${confidence}%`, height: '100%', background: confidence > 80 ? '#10b981' : '#f59e0b', borderRadius: '4px' }} />
            </div>
            <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '4px' }}>
              {sensorAvailability < 60 ? 'Confidence penalized by missing sensor nodes' : 'All edge nodes reporting'}
            </div>
          </div>

          {/* Scientific Output Summary */}
          <div style={{ padding: '14px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '20px' }}>
            <strong style={{ color: '#38bdf8' }}>Simulated Impact: </strong>
            {explanation}
          </div>

          {/* Jump to Map Button */}
          <button
            onClick={onNavigateToMap}
            className="btn btn-secondary"
            style={{ width: '100%', gap: '8px' }}
          >
            <span>View Affected GIS Map & Roads</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>

    </div>
  );
}

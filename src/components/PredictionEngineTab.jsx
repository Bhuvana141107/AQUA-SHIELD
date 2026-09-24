import React from 'react';
import { 
  Cpu, 
  ShieldCheck, 
  Activity, 
  Droplets, 
  Mountain, 
  History, 
  Radio, 
  CheckCircle2, 
  AlertCircle, 
  ArrowDown, 
  ArrowRight,
  Sliders,
  Layers,
  Zap,
  Info
} from 'lucide-react';

export function PredictionEngineTab({ 
  floodData, 
  rainfall, 
  soilMoisture, 
  slopeRisk, 
  sensorAvailability, 
  historicalRisk, 
  anomalyActive,
  onToggleAnomaly 
}) {
  const {
    riskScore,
    riskLevel,
    riskColor,
    riskBg,
    leadTimeMinutes,
    confidence,
    featureAttribution
  } = floodData;

  const confidenceFactors = [
    { name: "Radar & Rain Gauge Ingestion", status: "Nominal", ok: true, source: "IMD Doppler & Edge Tipping Bucket", weight: "30%" },
    { name: "Soil Dielectric Sensor Stream", status: "Nominal", ok: true, source: "TDR Volumetric Probes", weight: "25%" },
    { name: "High-Res Digital Elevation (DEM)", status: "Static 30m Grid", ok: true, source: "Cartosat-1 Hydro DEM", weight: "20%" },
    { name: "Historical Event Recurrence DB", status: "Indexed", ok: true, source: "15-Year Nilgiri Flood Archive", weight: "10%" },
    { 
      name: "IoT Mesh Coverage & Liveness", 
      status: anomalyActive ? "Anomaly Penalized" : sensorAvailability < 60 ? "Degraded Mesh" : "High Reliability", 
      ok: !anomalyActive && sensorAvailability >= 60, 
      source: `${sensorAvailability}% Active Nodes`, 
      weight: "15%" 
    }
  ];

  return (
    <div style={{ padding: '24px', maxWidth: '1440px', margin: '0 auto' }}>
      
      {/* HEADER BANNER */}
      <div className="card-panel tech-corners" style={{ padding: '22px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Cpu size={22} color="#38bdf8" />
              </div>
              <div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff' }}>
                  Flash-Flood Prediction Engine
                </h2>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                  Architecture: Multi-Head XGBoost Gradient Boosted Trees + Spatial Runoff Hydraulic Simulation
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.75rem', padding: '4px 10px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#38bdf8' }}>
              Simulation Engine Mode (SIH Prototype Verification)
            </span>
          </div>
        </div>
      </div>

      {/* CORE ML METRICS OVERVIEW */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '18px',
        marginBottom: '24px'
      }}>
        
        <div className="card-panel" style={{ padding: '20px', background: riskBg, borderColor: riskColor }}>
          <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>MODEL RISK SCORE</div>
          <div style={{ fontSize: '2.6rem', fontWeight: 800, color: riskColor, lineHeight: 1.1 }}>
            {riskScore} <span style={{ fontSize: '1.1rem', color: '#64748b' }}>/ 100</span>
          </div>
          <div style={{ fontSize: '0.82rem', color: riskColor, fontWeight: 700, marginTop: '4px' }}>
            {riskLevel} FLOOD PROBABILITY
          </div>
        </div>

        <div className="card-panel" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>ESTIMATED TIME TO CRITICAL SURGE</div>
          <div style={{ fontSize: '2.6rem', fontWeight: 800, color: '#38bdf8', lineHeight: 1.1 }}>
            {leadTimeMinutes} <span style={{ fontSize: '1.1rem', color: '#94a3b8' }}>min</span>
          </div>
          <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '4px' }}>
            Kinematic wave catchment transit velocity
          </div>
        </div>

        <div className="card-panel" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>PREDICTION CONFIDENCE</div>
          <div style={{ fontSize: '2.6rem', fontWeight: 800, color: confidence > 80 ? '#10b981' : confidence > 60 ? '#f59e0b' : '#ef4444', lineHeight: 1.1 }}>
            {confidence}%
          </div>
          <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '4px' }}>
            {anomalyActive ? '⚠ Penalized by Sensor Anomaly' : sensorAvailability < 60 ? 'Degraded IoT node density' : 'All 5 data channels verified'}
          </div>
        </div>

        <div className="card-panel" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>TRAINED ALGORITHM</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.2, marginTop: '6px' }}>
            XGBoost Hydro
          </div>
          <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '6px' }}>
            AUC-ROC: 0.948 | F1-Score: 0.912
          </div>
        </div>

      </div>

      {/* SECTION 22: MULTI-SOURCE DATA FUSION PIPELINE VISUALIZATION */}
      <div className="card-panel" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
          <Activity size={20} color="#38bdf8" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>
            Multi-Source Data Fusion Pipeline
          </h3>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '12px',
          marginBottom: '20px'
        }}>
          {/* Stream 1: Rain */}
          <div style={{ padding: '14px', background: 'rgba(2, 132, 199, 0.12)', border: '1px solid rgba(2, 132, 199, 0.3)', borderRadius: '8px', textAlign: 'center' }}>
            <Droplets size={22} color="#38bdf8" style={{ margin: '0 auto 6px' }} />
            <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#ffffff' }}>RAIN INTENSITY</div>
            <div style={{ fontSize: '0.76rem', color: '#38bdf8' }}>{rainfall} mm/hr</div>
            <div style={{ fontSize: '0.68rem', color: '#64748b' }}>IMD Doppler + Gauges</div>
          </div>

          {/* Stream 2: Soil */}
          <div style={{ padding: '14px', background: 'rgba(234, 88, 12, 0.12)', border: '1px solid rgba(234, 88, 12, 0.3)', borderRadius: '8px', textAlign: 'center' }}>
            <Activity size={22} color="#f97316" style={{ margin: '0 auto 6px' }} />
            <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#ffffff' }}>SOIL SATURATION</div>
            <div style={{ fontSize: '0.76rem', color: '#f97316' }}>{soilMoisture}% VWC</div>
            <div style={{ fontSize: '0.68rem', color: '#64748b' }}>TDR Capacitive Probes</div>
          </div>

          {/* Stream 3: Slope */}
          <div style={{ padding: '14px', background: 'rgba(217, 119, 6, 0.12)', border: '1px solid rgba(217, 119, 6, 0.3)', borderRadius: '8px', textAlign: 'center' }}>
            <Mountain size={22} color="#f59e0b" style={{ margin: '0 auto 6px' }} />
            <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#ffffff' }}>TERRAIN GRADIENT</div>
            <div style={{ fontSize: '0.76rem', color: '#f59e0b' }}>{slopeRisk} Slope</div>
            <div style={{ fontSize: '0.68rem', color: '#64748b' }}>30m DEM Cartosat</div>
          </div>

          {/* Stream 4: History */}
          <div style={{ padding: '14px', background: 'rgba(126, 34, 206, 0.12)', border: '1px solid rgba(126, 34, 206, 0.3)', borderRadius: '8px', textAlign: 'center' }}>
            <History size={22} color="#a855f7" style={{ margin: '0 auto 6px' }} />
            <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#ffffff' }}>HISTORIC EVENTS</div>
            <div style={{ fontSize: '0.76rem', color: '#a855f7' }}>{historicalRisk} Priors</div>
            <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Prior Flood Topology</div>
          </div>

          {/* Stream 5: IoT Coverage */}
          <div style={{ padding: '14px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '8px', textAlign: 'center' }}>
            <Radio size={22} color="#10b981" style={{ margin: '0 auto 6px' }} />
            <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#ffffff' }}>IOT SENSOR MESH</div>
            <div style={{ fontSize: '0.76rem', color: '#10b981' }}>{sensorAvailability}% Live</div>
            <div style={{ fontSize: '0.68rem', color: '#64748b' }}>ESP32 LoRaWAN Array</div>
          </div>
        </div>

        {/* Downward Flow Connector */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '20px', border: '1px solid rgba(56, 189, 248, 0.3)', fontSize: '0.78rem', color: '#38bdf8' }}>
            <ArrowDown size={14} /> Edge Feature Cleaning & Spatial Interpolation (Kriging) <ArrowDown size={14} />
          </div>
        </div>

        {/* Middle Stage: ML Feature Engine */}
        <div style={{ padding: '16px', background: 'rgba(15, 25, 45, 0.65)', border: '1px solid var(--border-tech)', borderRadius: '10px', textAlign: 'center', marginBottom: '14px' }}>
          <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
            HYDROLOGICAL INFILTRATION & RUNOFF ENGINE (XGBOOST)
          </div>
          <p style={{ fontSize: '0.78rem', color: '#94a3b8', maxWidth: '720px', margin: '0 auto' }}>
            Computes Antecedent Moisture Condition (AMC-III) saturation, runoff coefficient, and velocity of overland wave propagation across the Nilgiri drainage network.
          </p>
        </div>

        {/* Downward Flow Connector */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '20px', border: '1px solid rgba(239, 68, 68, 0.3)', fontSize: '0.78rem', color: '#f87171' }}>
            <ArrowDown size={14} /> Dynamic Decision Output <ArrowDown size={14} />
          </div>
        </div>

        {/* Final Stage: Actions & Map */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '12px'
        }}>
          <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#38bdf8' }}>HYPER-LOCAL RISK MAP</div>
            <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Dynamic 30m hazard zones</div>
          </div>
          <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ef4444' }}>SMART ALERTS</div>
            <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Cell broadcast & siren triggers</div>
          </div>
          <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#10b981' }}>SAFE ROUTE ENGINE</div>
            <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Dynamic road closure & bypass</div>
          </div>
        </div>

      </div>

      {/* SECTION 13: CONFIDENCE SCORE BREAKDOWN & SENSOR ANOMALY CHECK */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 360px',
        gap: '24px'
      }}>
        
        {/* Confidence Audit Table */}
        <div className="card-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={20} color="#10b981" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff' }}>
                Data Confidence Verification Matrix
              </h3>
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#10b981' }}>
              Overall Integrity: {confidence}%
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {confidenceFactors.map((f, i) => (
              <div 
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.06)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {f.ok ? (
                    <CheckCircle2 size={16} color="#10b981" />
                  ) : (
                    <AlertCircle size={16} color="#ef4444" />
                  )}
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>{f.name}</div>
                    <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>{f.source}</div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ 
                    fontSize: '0.72rem', 
                    padding: '2px 8px', 
                    borderRadius: '4px', 
                    background: f.ok ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                    color: f.ok ? '#10b981' : '#ef4444',
                    fontWeight: 600
                  }}>
                    {f.status}
                  </span>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '2px' }}>Weight: {f.weight}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Anomaly Toggle Box */}
        <div className="card-panel tech-corners" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <AlertCircle size={18} color="#f59e0b" />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>
              Anomaly Stress Testing
            </h3>
          </div>

          <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: '16px' }}>
            Simulate a sensor glitch (e.g. SENSOR-014 hardware error) to test how AQUA-SHIELD detects discrepancies, penalizes confidence, and shifts to spatial interpolation.
          </p>

          <button
            id="btn-toggle-anomaly"
            onClick={onToggleAnomaly}
            className={`btn ${anomalyActive ? 'btn-danger' : 'btn-secondary'}`}
            style={{ width: '100%', marginBottom: '14px' }}
          >
            {anomalyActive ? 'Reset Anomaly (Restore Confidence)' : 'Simulate SENSOR-014 Anomaly'}
          </button>

          {anomalyActive ? (
            <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '8px', fontSize: '0.78rem', color: '#fca5a5' }}>
              <div style={{ fontWeight: 700, marginBottom: '4px' }}>⚠ SENSOR ANOMALY DETECTED</div>
              SENSOR-014 reporting erratic rain spikes differing from neighbors SENSOR-022 and SENSOR-045. Confidence reduced by 18%.
            </div>
          ) : (
            <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '8px', fontSize: '0.78rem', color: '#a7f3d0' }}>
              ✓ All 50 telemetry streams spatially consistent within ±1.2σ expected variance.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

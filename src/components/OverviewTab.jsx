import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Clock, 
  Bell, 
  Radio, 
  TrendingUp, 
  Droplets, 
  Mountain, 
  AlertTriangle, 
  Activity, 
  ChevronRight, 
  Zap,
  Info,
  CheckCircle2,
  Maximize2
} from 'lucide-react';

export function OverviewTab({ 
  floodData, 
  rainfall, 
  soilMoisture, 
  slopeRisk, 
  onNavigateToMap,
  onNavigateToSim,
  onSelectVillage
}) {
  const [rainTimeframe, setRainTimeframe] = useState('60m');

  const {
    riskScore,
    riskLevel,
    riskColor,
    riskBg,
    riskBorder,
    leadTimeMinutes,
    confidence,
    featureAttribution,
    explanation,
    alerts
  } = floodData;

  // Rainfall trend curve generation based on current rainfall
  const getRainDataPoints = () => {
    const base = rainfall;
    if (rainTimeframe === '15m') {
      return [
        { t: '15m ago', val: Math.round(base * 0.72) },
        { t: '10m ago', val: Math.round(base * 0.82) },
        { t: '5m ago', val: Math.round(base * 0.94) },
        { t: 'Current', val: Math.round(base) }
      ];
    } else if (rainTimeframe === '30m') {
      return [
        { t: '30m ago', val: Math.round(base * 0.55) },
        { t: '20m ago', val: Math.round(base * 0.72) },
        { t: '10m ago', val: Math.round(base * 0.88) },
        { t: 'Current', val: Math.round(base) }
      ];
    } else if (rainTimeframe === '6h') {
      return [
        { t: '6h ago', val: Math.round(base * 0.25) },
        { t: '4h ago', val: Math.round(base * 0.4) },
        { t: '2h ago', val: Math.round(base * 0.65) },
        { t: '1h ago', val: Math.round(base * 0.85) },
        { t: 'Current', val: Math.round(base) }
      ];
    }
    // Default 60 min
    return [
      { t: '60m ago', val: Math.round(base * 0.42) },
      { t: '45m ago', val: Math.round(base * 0.56) },
      { t: '30m ago', val: Math.round(base * 0.7) },
      { t: '15m ago', val: Math.round(base * 0.88) },
      { t: 'Current', val: Math.round(base) }
    ];
  };

  const rainPoints = getRainDataPoints();
  const maxRainInPoints = Math.max(...rainPoints.map(p => p.val), 50);

  // Soil saturation status text
  let soilStatus = 'NORMAL ABSORPTION';
  let soilColor = '#10b981';
  if (soilMoisture >= 88) {
    soilStatus = 'NEAR COMPLETE SATURATION';
    soilColor = '#ef4444';
  } else if (soilMoisture >= 75) {
    soilStatus = 'HIGHLY SATURATED';
    soilColor = '#f97316';
  } else if (soilMoisture >= 55) {
    soilStatus = 'MODERATE RETENTION';
    soilColor = '#f59e0b';
  }

  return (
    <div style={{ padding: '24px', maxWidth: '1440px', margin: '0 auto' }}>
      
      {/* SECTION 5: TOP SUMMARY CARDS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '18px',
        marginBottom: '24px'
      }}>
        
        {/* 1. CURRENT RISK CARD */}
        <div className="card-panel tech-corners" style={{ padding: '20px', background: riskBg, borderColor: riskBorder }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.05em', color: '#94a3b8' }}>
              CURRENT RISK INDEX
            </span>
            <span className={`badge badge-${riskLevel.toLowerCase()}`}>
              {riskLevel} RISK
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '2.8rem', fontWeight: 800, color: riskColor, lineHeight: 1 }}>
              {riskScore}
            </span>
            <span style={{ fontSize: '1.1rem', color: '#64748b', fontWeight: 600 }}>/ 100</span>
          </div>

          <p style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.45 }}>
            {riskScore >= 75 
              ? "Critical surge threshold: Infiltration exhausted + rainfall acceleration." 
              : riskScore >= 55 
              ? "Elevated runoff risk: High soil saturation with steady rainfall rate." 
              : "Catchment basin within stable hydrological absorption parameters."}
          </p>
        </div>

        {/* 2. LEAD TIME CARD */}
        <div className="card-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.05em', color: '#94a3b8' }}>
              ESTIMATED LEAD TIME
            </span>
            <Clock size={16} color="#38bdf8" />
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '8px' }}>
            <span style={{ fontSize: '2.8rem', fontWeight: 800, color: '#38bdf8', lineHeight: 1 }}>
              {leadTimeMinutes}
            </span>
            <span style={{ fontSize: '1.2rem', color: '#94a3b8', fontWeight: 600 }}>min</span>
          </div>

          <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.45 }}>
            Estimated time before critical overland inundation reaches valley bottleneck.
          </p>
        </div>

        {/* 3. ACTIVE ALERTS CARD */}
        <div className="card-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.05em', color: '#94a3b8' }}>
              ACTIVE ALERTS
            </span>
            <Bell size={16} color={alerts.length > 1 ? '#ef4444' : '#10b981'} />
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '8px' }}>
            <span style={{ 
              fontSize: '2.8rem', 
              fontWeight: 800, 
              color: alerts.some(a => a.severity === 'CRITICAL') ? '#ef4444' : '#f59e0b', 
              lineHeight: 1 
            }}>
              {alerts.length < 10 ? `0${alerts.length}` : alerts.length}
            </span>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Sectors flagged</span>
          </div>

          <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.45 }}>
            {alerts.some(a => a.severity === 'CRITICAL') 
              ? 'Level-3 Emergency evacuation directives broadcast.'
              : 'Hydrological watch & telemetry advisory active.'}
          </p>
        </div>

        {/* 4. SENSOR HEALTH CARD */}
        <div className="card-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.05em', color: '#94a3b8' }}>
              IOT SENSOR HEALTH
            </span>
            <Radio size={16} color="#10b981" />
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '8px' }}>
            <span style={{ fontSize: '2.8rem', fontWeight: 800, color: '#10b981', lineHeight: 1 }}>
              {Math.round(confidence)}%
            </span>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Mesh Integrity</span>
          </div>

          <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.45 }}>
            47 / 50 sensors reporting live over LoRaWAN + cellular edge relay.
          </p>
        </div>

      </div>

      {/* SECTION 7: WHY IS THE RISK HIGH? (EXPLAINABLE AI ATTRIBUTION) */}
      <div className="card-panel" style={{ padding: '24px', marginBottom: '24px', borderLeft: `4px solid ${riskColor}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={18} color="#38bdf8" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '0.02em', color: '#ffffff' }}>
                WHY IS THE RISK {riskLevel}?
              </h2>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                Multi-source explainability engine breakdown (SHAP feature attribution)
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.76rem', color: '#64748b' }}>AI Model:</span>
            <span style={{ fontSize: '0.76rem', padding: '3px 8px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '4px', color: '#38bdf8', border: '1px solid var(--border-tech)' }}>
              XGBoost Hydro-ML v2.6 (Edge-Inferred)
            </span>
          </div>
        </div>

        {/* Feature Contribution Visual Bars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '18px' }}>
          
          {/* Rainfall Bar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
              <span style={{ color: '#cbd5e1' }}>Rainfall Intensity & Spike</span>
              <span style={{ fontWeight: 700, color: '#38bdf8' }}>{featureAttribution.rainfall}%</span>
            </div>
            <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${featureAttribution.rainfall}%`, height: '100%', background: 'linear-gradient(90deg, #0284c7, #38bdf8)', borderRadius: '4px', transition: 'width 0.4s ease' }} />
            </div>
          </div>

          {/* Soil Moisture Bar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
              <span style={{ color: '#cbd5e1' }}>Soil Moisture Saturation</span>
              <span style={{ fontWeight: 700, color: '#f97316' }}>{featureAttribution.soilMoisture}%</span>
            </div>
            <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${featureAttribution.soilMoisture}%`, height: '100%', background: 'linear-gradient(90deg, #ea580c, #f97316)', borderRadius: '4px', transition: 'width 0.4s ease' }} />
            </div>
          </div>

          {/* Slope Gradient Bar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
              <span style={{ color: '#cbd5e1' }}>Terrain & Slope Velocity</span>
              <span style={{ fontWeight: 700, color: '#f59e0b' }}>{featureAttribution.slope}%</span>
            </div>
            <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${featureAttribution.slope}%`, height: '100%', background: 'linear-gradient(90deg, #d97706, #f59e0b)', borderRadius: '4px', transition: 'width 0.4s ease' }} />
            </div>
          </div>

          {/* Historical Recurrence Bar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
              <span style={{ color: '#cbd5e1' }}>Historical Choke Recurrence</span>
              <span style={{ fontWeight: 700, color: '#a855f7' }}>{featureAttribution.history}%</span>
            </div>
            <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${featureAttribution.history}%`, height: '100%', background: 'linear-gradient(90deg, #7e22ce, #a855f7)', borderRadius: '4px', transition: 'width 0.4s ease' }} />
            </div>
          </div>

        </div>

        {/* Narrative Explanation */}
        <div style={{
          padding: '14px 18px',
          background: 'rgba(0, 0, 0, 0.35)',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          fontSize: '0.88rem',
          color: '#e2e8f0',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
          lineHeight: 1.55
        }}>
          <Info size={18} color="#38bdf8" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <span style={{ fontWeight: 700, color: '#38bdf8' }}>Scientific Diagnostic: </span>
            {explanation}
          </div>
        </div>

      </div>

      {/* TWO-COLUMN LOWER SECTION: RAINFALL TREND + SOIL GAUGE + QUICK MAP CTA */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '24px'
      }}>
        
        {/* SECTION 9: RAINFALL TREND CHART */}
        <div className="card-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Droplets size={18} color="#38bdf8" />
              <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#ffffff' }}>
                Rainfall Telemetry Trend
              </h3>
            </div>

            {/* Timeframe selector */}
            <div style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '6px', padding: '2px' }}>
              {['15m', '30m', '60m', '6h'].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setRainTimeframe(tf)}
                  style={{
                    background: rainTimeframe === tf ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                    color: rainTimeframe === tf ? '#38bdf8' : '#94a3b8',
                    border: 'none',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Metrics */}
          <div style={{ display: 'flex', gap: '20px', marginBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '12px' }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Current Rate</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff' }}>
                {rainfall} <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 500 }}>mm/hr</span>
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>15m Delta Trend</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: rainfall > 50 ? '#ef4444' : '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <TrendingUp size={15} />
                +{rainfall > 40 ? '28%' : '8%'} in 15m
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Basin Peak</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#38bdf8' }}>
                {Math.round(rainfall * 1.15)} mm/hr
              </div>
            </div>
          </div>

          {/* SVG Rainfall Trend Line Chart */}
          <div style={{ width: '100%', height: '140px', position: 'relative' }}>
            <svg width="100%" height="100%" viewBox="0 0 400 140" preserveAspectRatio="none">
              <defs>
                <linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              
              {/* Grid lines */}
              <line x1="0" y1="35" x2="400" y2="35" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
              <line x1="0" y1="70" x2="400" y2="70" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
              <line x1="0" y1="105" x2="400" y2="105" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />

              {/* Area fill */}
              {(() => {
                const points = rainPoints.map((p, idx) => {
                  const x = (idx / (rainPoints.length - 1)) * 380 + 10;
                  const y = 125 - (p.val / (maxRainInPoints * 1.25)) * 105;
                  return { x, y, ...p };
                });
                const dPath = points.reduce((acc, curr, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${curr.x} ${curr.y}`, '');
                const areaPath = `${dPath} L ${points[points.length - 1].x} 130 L ${points[0].x} 130 Z`;

                return (
                  <>
                    <path d={areaPath} fill="url(#rainGradient)" />
                    <path d={dPath} fill="none" stroke="#38bdf8" strokeWidth="2.5" />
                    {points.map((pt, i) => (
                      <circle key={i} cx={pt.x} cy={pt.y} r="4" fill="#38bdf8" stroke="#060a12" strokeWidth="2" />
                    ))}
                  </>
                );
              })()}
            </svg>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b', marginTop: '6px' }}>
            {rainPoints.map((p, idx) => (
              <span key={idx}>{p.t} ({p.val})</span>
            ))}
          </div>
        </div>

        {/* SECTION 10: SOIL SATURATION GAUGE & HYDROLOGY */}
        <div className="card-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={18} color="#f97316" />
              <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#ffffff' }}>
                Soil Saturation & Infiltration
              </h3>
            </div>
            <span style={{ fontSize: '0.74rem', padding: '3px 8px', background: `${soilColor}20`, color: soilColor, borderRadius: '4px', fontWeight: 600 }}>
              {soilStatus}
            </span>
          </div>

          {/* Visual Bar Gauge */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Volumetric Water Content (VWC)</span>
              <span style={{ fontSize: '1.8rem', fontWeight: 800, color: soilColor }}>
                {soilMoisture}%
              </span>
            </div>

            <div style={{ height: '14px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '7px', overflow: 'hidden', position: 'relative' }}>
              <div 
                style={{ 
                  width: `${soilMoisture}%`, 
                  height: '100%', 
                  background: `linear-gradient(90deg, #10b981 0%, #f59e0b 60%, #ef4444 100%)`, 
                  borderRadius: '7px',
                  transition: 'width 0.4s ease'
                }} 
              />
              {/* Threshold mark for field capacity (80%) */}
              <div style={{ position: 'absolute', left: '80%', top: 0, bottom: 0, width: '2px', background: '#ffffff', opacity: 0.7 }} title="Field Capacity Limit" />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b', marginTop: '6px' }}>
              <span>0% Dry</span>
              <span>40% Retentive</span>
              <span style={{ color: '#ef4444', fontWeight: 600 }}>80% Runoff Trigger</span>
              <span>100% Saturated</span>
            </div>
          </div>

          {/* Scientific Hydraulic Explanation */}
          <div style={{
            padding: '12px 14px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            fontSize: '0.82rem',
            color: '#94a3b8',
            lineHeight: 1.5
          }}>
            “High antecedent moisture reduces soil infiltration capacity and exponentially increases surface runoff potential into steep drainage ravines.”
          </div>

          {/* SECTION 11: TERRAIN / SLOPE RISK PREVIEW */}
          <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(245, 158, 11, 0.08)', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Mountain size={18} color="#f59e0b" />
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f59e0b' }}>Slope Risk: {slopeRisk.toUpperCase()}</div>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Catchment Gradient: 28° - 42° Steep Ravines</div>
              </div>
            </div>
            <button 
              onClick={onNavigateToMap}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.74rem', padding: '4px 10px' }}
            >
              Open GIS Map →
            </button>
          </div>

        </div>

      </div>

      {/* QUICK INCIDENT TIMELINE STRIP */}
      <div className="card-panel" style={{ marginTop: '24px', padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={18} color="#38bdf8" />
            <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#ffffff' }}>
              Live Telemetry Incident Log
            </h3>
          </div>
          <span style={{ fontSize: '0.74rem', color: '#64748b' }}>Edge-Logged Timestamps</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
          <div style={{ padding: '10px 14px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '6px', borderLeft: '3px solid #38bdf8' }}>
            <div style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 700 }}>22:04 IST</div>
            <div style={{ fontSize: '0.82rem', color: '#e2e8f0', fontWeight: 600 }}>Rainfall Rate Escalation</div>
            <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Precipitation crossed {rainfall} mm/hr threshold.</div>
          </div>

          <div style={{ padding: '10px 14px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '6px', borderLeft: '3px solid #f97316' }}>
            <div style={{ fontSize: '0.72rem', color: '#f97316', fontWeight: 700 }}>22:11 IST</div>
            <div style={{ fontSize: '0.82rem', color: '#e2e8f0', fontWeight: 600 }}>Soil Saturation Critical</div>
            <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Volumetric moisture reached {soilMoisture}%.</div>
          </div>

          <div style={{ padding: '10px 14px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '6px', borderLeft: `3px solid ${riskColor}` }}>
            <div style={{ fontSize: '0.72rem', color: riskColor, fontWeight: 700 }}>22:18 IST</div>
            <div style={{ fontSize: '0.82rem', color: '#e2e8f0', fontWeight: 600 }}>Risk Score {riskScore} ({riskLevel})</div>
            <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Lead time calculated: {leadTimeMinutes} min.</div>
          </div>

          <div style={{ padding: '10px 14px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '6px', borderLeft: '3px solid #10b981' }}>
            <div style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700 }}>22:24 IST</div>
            <div style={{ fontSize: '0.82rem', color: '#e2e8f0', fontWeight: 600 }}>Action Advisory Dispatched</div>
            <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Control room & responder directives synched.</div>
          </div>
        </div>
      </div>

    </div>
  );
}

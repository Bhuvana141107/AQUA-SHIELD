import React, { useState } from 'react';
import { 
  VILLAGES, 
  SENSORS, 
  BRIDGES, 
  DISTRICT_INFO 
} from '../data/mockData';
import { 
  MapPin, 
  Radio, 
  AlertTriangle, 
  Navigation, 
  Layers, 
  ShieldCheck, 
  Clock, 
  Droplets, 
  Activity, 
  Mountain, 
  X, 
  Eye,
  CheckCircle,
  AlertOctagon,
  ArrowRight
} from 'lucide-react';

export function LiveMap({ 
  floodData, 
  rainfall, 
  soilMoisture, 
  slopeRisk,
  selectedVillageId,
  setSelectedVillageId,
  onSelectSensor
}) {
  const [activeLayers, setActiveLayers] = useState({
    heatmap: true,
    rivers: true,
    roads: true,
    villages: true,
    sensors: true,
    bridges: true
  });

  const [selectedSensor, setSelectedSensor] = useState(null);

  const {
    riskScore,
    riskLevel,
    riskColor,
    leadTimeMinutes,
    villageRisks,
    routeStatus
  } = floodData;

  const selectedVillage = VILLAGES.find(v => v.id === selectedVillageId) || VILLAGES[0];
  const vRisk = villageRisks[selectedVillage.id] || {
    score: riskScore,
    level: riskLevel,
    color: riskColor,
    leadTime: leadTimeMinutes
  };

  const toggleLayer = (layerKey) => {
    setActiveLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1440px', margin: '0 auto' }}>
      
      {/* MAP HEADER & CONTROLS */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '18px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
              Hyper-Local Flash Flood Risk GIS Engine
            </h2>
            <span style={{ fontSize: '0.72rem', padding: '2px 8px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', borderRadius: '4px' }}>
              30m DEM Resolution
            </span>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
            {DISTRICT_INFO.name} ({DISTRICT_INFO.catchmentAreaKm2} km²) • {DISTRICT_INFO.riverSystem}
          </p>
        </div>

        {/* LAYER TOGGLE PILLS */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(15, 25, 45, 0.75)',
          padding: '4px 10px',
          borderRadius: '8px',
          border: '1px solid var(--border-tech)',
          flexWrap: 'wrap'
        }}>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px', marginRight: '4px' }}>
            <Layers size={13} /> Layers:
          </span>

          {[
            { key: 'heatmap', label: 'Risk Heatmap' },
            { key: 'rivers', label: 'River Catchment' },
            { key: 'roads', label: 'Roads & Evac' },
            { key: 'villages', label: 'Settlements' },
            { key: 'sensors', label: 'IoT Sensors' },
            { key: 'bridges', label: 'Bridges' }
          ].map(layer => (
            <button
              key={layer.key}
              onClick={() => toggleLayer(layer.key)}
              style={{
                background: activeLayers[layer.key] ? 'rgba(56, 189, 248, 0.22)' : 'rgba(255, 255, 255, 0.04)',
                color: activeLayers[layer.key] ? '#38bdf8' : '#64748b',
                border: `1px solid ${activeLayers[layer.key] ? 'rgba(56, 189, 248, 0.4)' : 'transparent'}`,
                padding: '3px 8px',
                borderRadius: '4px',
                fontSize: '0.72rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {activeLayers[layer.key] ? '✓ ' : ''}{layer.label}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN TWO-COLUMN MAP WORKSPACE */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 380px',
        gap: '24px',
        alignItems: 'start'
      }}>
        
        {/* INTERACTIVE GIS MAP CONTAINER */}
        <div className="card-panel" style={{
          position: 'relative',
          height: '620px',
          background: '#070d18',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          overflow: 'hidden',
          borderRadius: '16px'
        }}>
          
          {/* Top Left Map Overlay HUD */}
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            zIndex: 10,
            background: 'rgba(6, 10, 18, 0.85)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            padding: '10px 14px',
            fontSize: '0.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Mountain size={14} color="#38bdf8" />
              <span style={{ fontWeight: 700, color: '#ffffff' }}>TOPOGRAPHIC CONTOURS (100m INTERVALS)</span>
            </div>
            <div style={{ color: '#94a3b8' }}>
              Basin Crest: 2,240m | Valley Outlet: 980m
            </div>
          </div>

          {/* Top Right Map Legend HUD */}
          <div style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            background: 'rgba(6, 10, 18, 0.85)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            padding: '10px 14px',
            fontSize: '0.72rem'
          }}>
            <div style={{ fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>RISK ZONING</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#ef4444' }} />
                <span>CRITICAL (Risk &gt; 80)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#f97316' }} />
                <span>HIGH (Risk 60 - 79)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#f59e0b' }} />
                <span>WATCH (Risk 35 - 59)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#10b981' }} />
                <span>LOW (Safe &lt; 35)</span>
              </div>
            </div>
          </div>

          {/* Bottom Left Evacuation Route Guide HUD */}
          <div style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            zIndex: 10,
            background: 'rgba(6, 10, 18, 0.88)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '8px',
            padding: '8px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: '0.74rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '24px', height: '3px', background: '#06b6d4', display: 'inline-block' }} />
              <span style={{ color: '#06b6d4', fontWeight: 600 }}>Safe Evacuation Route</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '24px', height: '3px', background: '#ef4444', display: 'inline-block', borderTop: '2px dashed #ffffff' }} />
              <span style={{ color: '#ef4444', fontWeight: 600 }}>Inundated / Blocked Road</span>
            </div>
          </div>

          {/* SVG MAP CANVAS */}
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 900 620" 
            preserveAspectRatio="xMidYMid slice"
            style={{ display: 'block', width: '100%', height: '100%' }}
          >
            <defs>
              {/* Radial gradients for risk zones */}
              <radialGradient id="grad-high-risk" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.45" />
                <stop offset="60%" stopColor="#f97316" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="grad-mod-risk" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
                <stop offset="80%" stopColor="#f59e0b" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="grad-safe-refuge" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </radialGradient>

              {/* Road Dash Pattern */}
              <pattern id="roadPattern" width="10" height="10" patternUnits="userSpaceOnUse">
                <line x1="0" y1="5" x2="10" y2="5" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 3" />
              </pattern>
            </defs>

            {/* BASE TOPOGRAPHIC MOUNTAIN RELIEF & CONTOURS */}
            <g id="topography" opacity="0.45">
              {/* Mountain ridge shaded polygons */}
              <polygon points="120,40 380,110 260,260 80,180" fill="#0b172a" />
              <polygon points="380,110 580,70 520,240 260,260" fill="#0f1f38" />
              <polygon points="580,70 820,90 760,280 520,240" fill="#0b182e" />
              <polygon points="260,260 520,240 460,420 180,390" fill="#091424" />
              <polygon points="520,240 760,280 720,460 460,420" fill="#0d1c32" />
              <polygon points="180,390 460,420 440,580 140,560" fill="#08101e" />
              <polygon points="460,420 720,460 640,590 440,580" fill="#0a1526" />

              {/* Contour Lines */}
              <path d="M 50,150 C 220,110 400,160 560,110 C 720,70 850,130 880,140" fill="none" stroke="#1e293b" strokeWidth="1.2" />
              <path d="M 60,240 C 230,200 420,250 580,210 C 740,170 860,230 880,240" fill="none" stroke="#334155" strokeWidth="1.2" />
              <path d="M 70,340 C 240,300 440,350 600,310 C 760,270 870,330 890,340" fill="none" stroke="#1e293b" strokeWidth="1.2" />
              <path d="M 80,440 C 250,400 460,450 620,410 C 780,370 880,430 900,440" fill="none" stroke="#334155" strokeWidth="1.2" />
              <path d="M 90,530 C 260,490 480,540 640,500 C 800,460 890,520 900,530" fill="none" stroke="#1e293b" strokeWidth="1.2" />
            </g>

            {/* LAYER: RISK HEATMAP OVERLAYS */}
            {activeLayers.heatmap && (
              <g id="risk-heatmap">
                {/* Hillview High Risk Bubble */}
                <ellipse 
                  cx="440" 
                  cy="190" 
                  rx={riskScore > 65 ? "140" : "90"} 
                  ry={riskScore > 65 ? "95" : "60"} 
                  fill={riskScore >= 80 ? "url(#grad-high-risk)" : "url(#grad-mod-risk)"} 
                />

                {/* Riverbend Bottleneck Critical Basin Bubble */}
                <ellipse 
                  cx="310" 
                  cy="430" 
                  rx={riskScore > 65 ? "150" : "100"} 
                  ry={riskScore > 65 ? "110" : "70"} 
                  fill={riskScore >= 75 ? "url(#grad-high-risk)" : "url(#grad-mod-risk)"} 
                />

                {/* Valley Junction Catchment Exit Bubble */}
                <ellipse 
                  cx="480" 
                  cy="530" 
                  rx="110" 
                  ry="75" 
                  fill={riskScore >= 70 ? "url(#grad-high-risk)" : "url(#grad-mod-risk)"} 
                />

                {/* Green Ridge Designated Safe Refuge Zone */}
                <ellipse 
                  cx="680" 
                  cy="130" 
                  rx="110" 
                  ry="80" 
                  fill="url(#grad-safe-refuge)" 
                />
              </g>
            )}

            {/* LAYER: STREAM & RIVER NETWORK */}
            {activeLayers.rivers && (
              <g id="river-network">
                {/* Tributary 1: Upper Brook from Upper Valley */}
                <path 
                  d="M 360,95 Q 400,140 440,190" 
                  fill="none" 
                  stroke="#38bdf8" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  opacity="0.8" 
                />
                
                {/* Main Shola River Channel */}
                <path 
                  d="M 440,190 C 510,230 580,260 620,280 C 520,330 400,380 310,430 C 270,470 360,510 480,530 C 530,560 520,600 530,620" 
                  fill="none" 
                  stroke="#0284c7" 
                  strokeWidth={riskScore >= 75 ? "7" : "5"} 
                  strokeLinecap="round"
                  style={{ filter: riskScore >= 75 ? 'drop-shadow(0 0 8px #0284c7)' : 'none' }}
                />

                {/* Water flow indicator animation dots */}
                <circle cx="480" cy="210" r="2.5" fill="#e0f2fe" className="pulse-beacon" />
                <circle cx="560" cy="300" r="2.5" fill="#e0f2fe" className="pulse-beacon" />
                <circle cx="350" cy="410" r="2.5" fill="#e0f2fe" className="pulse-beacon" />
                <circle cx="430" cy="490" r="2.5" fill="#e0f2fe" className="pulse-beacon" />
              </g>
            )}

            {/* LAYER: ROADS & EVACUATION NETWORK */}
            {activeLayers.roads && (
              <g id="road-network">
                {/* Route 1: Upper Ridge Highway (High elevation, always safe) */}
                <path 
                  d="M 120,80 Q 240,90 350,100 T 680,130 T 820,160" 
                  fill="none" 
                  stroke="#10b981" 
                  strokeWidth="3.5" 
                  strokeDasharray="8 4" 
                  opacity="0.8"
                />

                {/* Route 2: Shola Valley Byway */}
                <path 
                  d="M 230,260 C 340,240 440,190 620,280" 
                  fill="none" 
                  stroke={riskScore >= 60 ? "#f59e0b" : "#94a3b8"} 
                  strokeWidth="3" 
                  opacity="0.75"
                />

                {/* Route 3: Kotagiri Riverbed Road (Low-lying, submerged during flood) */}
                <path 
                  d="M 620,280 C 500,340 410,400 310,430 T 480,530" 
                  fill="none" 
                  stroke={riskScore >= 60 ? "#ef4444" : "#94a3b8"} 
                  strokeWidth={riskScore >= 60 ? "5" : "3"} 
                  strokeDasharray={riskScore >= 60 ? "6 6" : "none"}
                  style={{ filter: riskScore >= 60 ? 'drop-shadow(0 0 6px #ef4444)' : 'none' }}
                />

                {/* Route 4: PRIMARY SAFE EVACUATION ROUTE (Pine Valley -> Hillview Ridge -> Green Ridge Safe Refuge) */}
                <path 
                  d="M 310,430 C 270,350 230,260 230,260 C 260,180 350,100 680,130" 
                  fill="none" 
                  stroke="#06b6d4" 
                  strokeWidth="4" 
                  strokeLinecap="round"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.7))' }}
                />
              </g>
            )}

            {/* LAYER: BRIDGES & CHOKE POINTS */}
            {activeLayers.bridges && BRIDGES.map((b) => (
              <g key={b.id} transform={`translate(${b.x}, ${b.y})`}>
                <rect x="-10" y="-5" width="20" height="10" rx="2" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                <line x1="-8" y1="0" x2="8" y2="0" stroke="#f8fafc" strokeWidth="1.5" />
                <text x="14" y="4" fill="#cbd5e1" fontSize="9" fontWeight="600">
                  {b.name}
                </text>
              </g>
            ))}

            {/* LAYER: IOT SENSOR NODES */}
            {activeLayers.sensors && SENSORS.map((s) => {
              const isSelected = selectedSensor?.id === s.id;
              return (
                <g 
                  key={s.id} 
                  transform={`translate(${s.x}, ${s.y})`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedSensor(s)}
                >
                  <circle 
                    r={isSelected ? "11" : "7"} 
                    fill="#06b6d4" 
                    fillOpacity="0.3" 
                    stroke="#06b6d4" 
                    strokeWidth="1.5" 
                  />
                  <circle r="3.5" fill="#38bdf8" />
                  <text 
                    x="10" 
                    y="-4" 
                    fill="#38bdf8" 
                    fontSize="9" 
                    fontWeight="700" 
                    fontFamily="var(--font-mono)"
                  >
                    {s.id}
                  </text>
                </g>
              );
            })}

            {/* LAYER: VILLAGE SETTLEMENTS */}
            {activeLayers.villages && VILLAGES.map((v) => {
              const isSelected = selectedVillage.id === v.id;
              const villageRisk = villageRisks[v.id] || { score: riskScore, color: riskColor };
              
              return (
                <g 
                  key={v.id} 
                  transform={`translate(${v.x}, ${v.y})`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedVillageId(v.id)}
                >
                  {/* Selection Ring */}
                  {isSelected && (
                    <circle 
                      r="22" 
                      fill="none" 
                      stroke="#ffffff" 
                      strokeWidth="2" 
                      strokeDasharray="4 2" 
                      className="radar-sweep-anim" 
                    />
                  )}

                  {/* Pulsing Risk Beacon */}
                  <circle 
                    r={isSelected ? "16" : "12"} 
                    fill={villageRisk.color} 
                    fillOpacity={isSelected ? "0.35" : "0.2"} 
                    stroke={villageRisk.color} 
                    strokeWidth={isSelected ? "2.5" : "1.8"} 
                  />
                  
                  {/* Center Dot */}
                  <circle r="4.5" fill="#ffffff" />

                  {/* Label Card */}
                  <g transform="translate(0, 20)">
                    <rect 
                      x="-42" 
                      y="0" 
                      width="84" 
                      height="20" 
                      rx="4" 
                      fill="rgba(6, 10, 18, 0.9)" 
                      stroke={isSelected ? '#38bdf8' : 'rgba(255, 255, 255, 0.15)'} 
                      strokeWidth="1" 
                    />
                    <text 
                      x="0" 
                      y="14" 
                      textAnchor="middle" 
                      fill="#ffffff" 
                      fontSize="9.5" 
                      fontWeight="700"
                    >
                      {v.name}
                    </text>
                  </g>

                  {/* Risk Score Pill */}
                  <g transform="translate(0, -18)">
                    <rect 
                      x="-16" 
                      y="-12" 
                      width="32" 
                      height="14" 
                      rx="3" 
                      fill={villageRisk.color} 
                    />
                    <text 
                      x="0" 
                      y="-2" 
                      textAnchor="middle" 
                      fill="#ffffff" 
                      fontSize="8.5" 
                      fontWeight="800"
                    >
                      {villageRisk.score}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>

        {/* RIGHT COLUMN: SELECTED VILLAGE DEEP-DIVE DOSSIER */}
        <div className="card-panel tech-corners" style={{ padding: '22px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={18} color="#38bdf8" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
                  {selectedVillage.name}
                </h3>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                Elevation {selectedVillage.elevation}m • {selectedVillage.drainageProximity}
              </p>
            </div>

            <span className={`badge badge-${vRisk.level.toLowerCase()}`}>
              {vRisk.level} RISK
            </span>
          </div>

          {/* VILLAGE RISK GAUGES */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            marginBottom: '18px',
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '12px',
            borderRadius: '10px'
          }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Local Risk Score</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: vRisk.color }}>
                {vRisk.score} <span style={{ fontSize: '0.85rem', color: '#64748b' }}>/100</span>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Lead Time to Peak</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38bdf8' }}>
                {vRisk.leadTime} <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>min</span>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Population Exposed</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>
                {selectedVillage.population.toLocaleString()}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Slope Risk Category</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: selectedVillage.slopePercent > 30 ? '#ef4444' : '#f59e0b' }}>
                {selectedVillage.slopeRiskCategory} ({selectedVillage.slopePercent}%)
              </div>
            </div>
          </div>

          {/* TELEMETRY INPUTS FOR THIS LOCATION */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px', fontSize: '0.82rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '6px' }}>
              <span style={{ color: '#94a3b8' }}>Rainfall Rate</span>
              <span style={{ fontWeight: 600, color: '#ffffff' }}>{rainfall} mm/hr</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '6px' }}>
              <span style={{ color: '#94a3b8' }}>Soil Moisture Saturation</span>
              <span style={{ fontWeight: 600, color: '#f97316' }}>{soilMoisture}%</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '6px' }}>
              <span style={{ color: '#94a3b8' }}>Nearest Monitoring Node</span>
              <span style={{ fontWeight: 600, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
                {selectedVillage.nearestSensorId}
              </span>
            </div>
          </div>

          {/* ROUTE SAFETY STATUS */}
          <div style={{
            marginBottom: '18px',
            padding: '12px',
            borderRadius: '8px',
            background: vRisk.score >= 60 ? 'rgba(239, 68, 68, 0.12)' : 'rgba(16, 185, 129, 0.1)',
            border: `1px solid ${vRisk.score >= 60 ? 'rgba(239, 68, 68, 0.4)' : 'rgba(16, 185, 129, 0.3)'}`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              {vRisk.score >= 60 ? <AlertOctagon size={16} color="#ef4444" /> : <CheckCircle size={16} color="#10b981" />}
              <span style={{ fontWeight: 700, fontSize: '0.85rem', color: vRisk.score >= 60 ? '#ef4444' : '#10b981' }}>
                {vRisk.score >= 60 ? 'ROUTE 3 (RIVERBED ROAD) BLOCKED' : 'ALL ACCESS ROUTES OPEN'}
              </span>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.45 }}>
              {vRisk.score >= 60 
                ? 'High water velocity crossing Kotagiri culverts. Reroute evacuation strictly via Route 4 toward Green Ridge Safe Refuge.'
                : 'Roadway clear. Routine drainage monitoring active.'}
            </p>
          </div>

          {/* RECOMMENDED ACTION DIRECTIVE */}
          <div style={{
            padding: '12px 14px',
            background: 'rgba(56, 189, 248, 0.08)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '8px',
            fontSize: '0.82rem',
            color: '#e2e8f0',
            lineHeight: 1.5
          }}>
            <div style={{ fontWeight: 700, color: '#38bdf8', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Navigation size={14} /> Immediate Action Guidance:
            </div>
            {vRisk.score >= 80 
              ? 'Execute immediate preventative evacuation from low-lying settlement zones. Sound siren and mobilize Gram Panchayat responders.'
              : vRisk.score >= 60
              ? 'Place emergency response vehicles on standby at Pine Valley junction. Alert citizens living within 100m of stream banks.'
              : 'Maintain normal surveillance. Verify that local storm drainage culverts remain clear of agricultural debris.'}
          </div>

          {/* Quick Village Switcher Buttons */}
          <div style={{ marginTop: '18px' }}>
            <div style={{ fontSize: '0.72rem', color: '#64748b', marginBottom: '6px' }}>
              Select Other Locations:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {VILLAGES.map(v => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVillageId(v.id)}
                  style={{
                    background: selectedVillage.id === v.id ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                    color: selectedVillage.id === v.id ? '#38bdf8' : '#94a3b8',
                    border: selectedVillage.id === v.id ? '1px solid #38bdf8' : '1px solid transparent',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    cursor: 'pointer'
                  }}
                >
                  {v.name}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

import React, { useState } from 'react';
import { SENSORS } from '../data/mockData';
import { 
  Radio, 
  Battery, 
  Wifi, 
  Droplets, 
  Activity, 
  Thermometer, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp,
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react';

export function SensorsTab({ anomalyActive, onToggleAnomaly }) {
  const [selectedSensorId, setSelectedSensorId] = useState('SENSOR-014');

  const activeSensor = SENSORS.find(s => s.id === selectedSensorId) || SENSORS[0];

  return (
    <div style={{ padding: '24px', maxWidth: '1440px', margin: '0 auto' }}>
      
      {/* HEADER & DATA QUALITY MONITOR BANNER */}
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
            <Radio size={22} color="#10b981" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
              IoT Edge Sensor Mesh & Telemetry Fleet
            </h2>
            <span style={{ fontSize: '0.74rem', padding: '2px 8px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', borderRadius: '4px' }}>
              47 / 50 Nodes Online
            </span>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
            LoRaWAN 868MHz + 4G LTE Edge Relays deployed across high-risk mountain sectors.
          </p>
        </div>

        {/* ANOMALY TEST TRIGGER */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={onToggleAnomaly}
            className={`btn ${anomalyActive ? 'btn-danger' : 'btn-secondary'} btn-sm`}
            style={{ fontSize: '0.78rem' }}
          >
            <AlertTriangle size={14} />
            <span>{anomalyActive ? 'Clear Telemetry Anomaly' : 'Inject SENSOR-014 Glitch'}</span>
          </button>
        </div>
      </div>

      {/* SECTION 21: DATA QUALITY MONITOR BANNER */}
      {anomalyActive && (
        <div className="card-panel" style={{
          padding: '16px 20px',
          background: 'rgba(239, 68, 68, 0.14)',
          border: '1px solid rgba(239, 68, 68, 0.45)',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '14px'
        }}>
          <AlertTriangle size={22} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontWeight: 800, color: '#ef4444', fontSize: '0.92rem' }}>
                ⚠ SENSOR ANOMALY: SPATIAL DIVERGENCE DETECTED
              </span>
              <span style={{ fontSize: '0.7rem', padding: '2px 6px', background: '#ef4444', color: '#ffffff', borderRadius: '4px', fontWeight: 700 }}>
                AUTO-FILTERED
              </span>
            </div>
            <p style={{ fontSize: '0.84rem', color: '#fca5a5', lineHeight: 1.5, marginBottom: '8px' }}>
              “SENSOR-014 (Hillview Peak) reporting sudden spike of 165 mm/hr, while adjacent nodes SENSOR-022 and SENSOR-045 report 54 mm/hr and 42 mm/hr. Reading deviates &gt;3.8σ from spatial expectations.”
            </p>
            <div style={{ display: 'flex', gap: '16px', fontSize: '0.78rem', color: '#ffffff', flexWrap: 'wrap' }}>
              <span>✓ Cross-checked 4 neighboring sensor nodes</span>
              <span>✓ Overall model confidence reduced by 18%</span>
              <span>✓ Fallback: Spatial Kriging interpolation applied</span>
              <span>✓ Malfunctioning reading isolated from flood model</span>
            </div>
          </div>
        </div>
      )}

      {/* MAIN SENSOR WORKSPACE: GRID OF SENSORS + SELECTED SENSOR TELEMETRY */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 380px',
        gap: '24px',
        alignItems: 'start'
      }}>
        
        {/* LEFT: SENSOR CARDS GRID */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px'
        }}>
          {SENSORS.map((s) => {
            const isSelected = selectedSensorId === s.id;
            const isAnomaly = anomalyActive && s.id === 'SENSOR-014';

            return (
              <div
                key={s.id}
                className="card-panel"
                onClick={() => setSelectedSensorId(s.id)}
                style={{
                  padding: '18px',
                  cursor: 'pointer',
                  borderColor: isAnomaly ? '#ef4444' : isSelected ? '#38bdf8' : 'var(--border-tech)',
                  background: isAnomaly 
                    ? 'rgba(239, 68, 68, 0.12)' 
                    : isSelected 
                    ? 'rgba(56, 189, 248, 0.08)' 
                    : 'var(--bg-card)',
                  transition: 'all 0.18s ease'
                }}
              >
                {/* Top Row: Sensor ID + Status */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: isSelected ? '#38bdf8' : '#ffffff', fontFamily: 'var(--font-mono)' }}>
                      {s.id}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>{s.location}</div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span 
                      style={{ 
                        width: '8px', 
                        height: '8px', 
                        borderRadius: '50%', 
                        background: isAnomaly ? '#ef4444' : '#10b981',
                        boxShadow: `0 0 8px ${isAnomaly ? '#ef4444' : '#10b981'}`
                      }} 
                      className="pulse-beacon" 
                    />
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: isAnomaly ? '#ef4444' : '#10b981' }}>
                      {isAnomaly ? 'ANOMALY' : '● LIVE'}
                    </span>
                  </div>
                </div>

                {/* Sensor Readings Metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                  <div style={{ padding: '8px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '6px' }}>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Droplets size={12} color="#38bdf8" /> Rainfall
                    </div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: isAnomaly ? '#ef4444' : '#ffffff' }}>
                      {isAnomaly ? '165 mm/hr' : `${s.rainfallRate} mm/hr`}
                    </div>
                  </div>

                  <div style={{ padding: '8px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '6px' }}>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Activity size={12} color="#f97316" /> Soil Moisture
                    </div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f97316' }}>
                      {s.soilMoisture}%
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Hardware Health (Battery & Signal) */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: '#94a3b8', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Battery size={14} color="#10b981" />
                    <span>{s.battery}%</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Wifi size={14} color="#38bdf8" />
                    <span>{s.signal.split(' ')[0]}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Thermometer size={14} color="#cbd5e1" />
                    <span>{s.temperature}°C</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT: DEEP-DIVE TELEMETRY LOG FOR SELECTED SENSOR */}
        <div className="card-panel tech-corners" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.15rem', color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
                {activeSensor.id}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{activeSensor.name}</div>
            </div>
            <span className="badge badge-safe">
              ESP32 Edge Node
            </span>
          </div>

          <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '16px' }}>
            <strong>Sensor Specs:</strong> {activeSensor.type} with solar trickle charger and industrial TDR soil probe.
          </div>

          {/* Historical Trend Sparkline for this sensor */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', color: '#94a3b8', marginBottom: '8px' }}>
              <span>Recent 6-Hour Precipitation Trend</span>
              <span style={{ color: '#38bdf8', fontWeight: 600 }}>Peak: {Math.max(...activeSensor.history)} mm/hr</span>
            </div>

            <div style={{ height: '80px', display: 'flex', alignItems: 'flex-end', gap: '8px', padding: '8px', background: 'rgba(0, 0, 0, 0.3)', borderRadius: '8px' }}>
              {activeSensor.history.map((val, idx) => {
                const heightPercent = Math.min((val / 80) * 100, 100);
                return (
                  <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                    <div style={{
                      width: '100%',
                      height: `${heightPercent}%`,
                      background: 'linear-gradient(180deg, #38bdf8 0%, #0284c7 100%)',
                      borderRadius: '3px 3px 0 0'
                    }} />
                    <span style={{ fontSize: '0.65rem', color: '#64748b', marginTop: '4px' }}>T-{6 - idx}h</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Telemetry Attributes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '6px' }}>
              <span style={{ color: '#94a3b8' }}>Edge Firmware</span>
              <span style={{ color: '#ffffff', fontFamily: 'var(--font-mono)' }}>{activeSensor.firmware}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '6px' }}>
              <span style={{ color: '#94a3b8' }}>Transmission Protocol</span>
              <span style={{ color: '#ffffff' }}>MQTT / LoRaWAN Class A</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '6px' }}>
              <span style={{ color: '#94a3b8' }}>Sampling Interval</span>
              <span style={{ color: '#ffffff' }}>30 seconds (Adaptive)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '6px' }}>
              <span style={{ color: '#94a3b8' }}>Battery Health</span>
              <span style={{ color: '#10b981', fontWeight: 700 }}>{activeSensor.battery}% (LiFePO4)</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

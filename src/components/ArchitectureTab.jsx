import React from 'react';
import { 
  Layers, 
  Cpu, 
  Radio, 
  Map, 
  Server, 
  ShieldAlert, 
  ArrowDown, 
  Database, 
  Wifi, 
  Code, 
  Cloud,
  CheckCircle2,
  Terminal,
  Activity
} from 'lucide-react';

export function ArchitectureTab() {
  const techStack = [
    {
      category: "AI & Hydrological Modeling",
      icon: Cpu,
      color: "#38bdf8",
      items: [
        { name: "XGBoost Classifier & Regressor", desc: "Non-linear multi-source flash-flood risk scoring" },
        { name: "Python 3.11 & Scikit-Learn", desc: "Feature scaling, hyperparameter tuning & SHAP explainability" },
        { name: "Hydraulic Kinematic Wave Simulation", desc: "Calculates time-to-peak runoff propagation" }
      ]
    },
    {
      category: "Edge IoT Hardware & Firmware",
      icon: Radio,
      color: "#10b981",
      items: [
        { name: "ESP32-S3 Microcontroller", desc: "Ultra-low power dual-core edge telemetry node" },
        { name: "Industrial TDR Soil Moisture Probe", desc: "Dielectric volumetric water content (0-100%)" },
        { name: "Tipping Bucket & Acoustic Rain Gauge", desc: "0.2mm precipitation resolution per pulse" },
        { name: "LoRaWAN 868MHz + 4G LTE", desc: "Redundant mesh telemetry in mountain shadow zones" }
      ]
    },
    {
      category: "Spatial GIS & Terrain Analytics",
      icon: Map,
      color: "#f59e0b",
      items: [
        { name: "Cartosat-1 30m Digital Elevation Model", desc: "Calculates slope gradient and drainage aspect" },
        { name: "PostGIS Spatial Database", desc: "Geospatial vector queries and road hazard intersections" },
        { name: "GeoPandas & Rasterio", desc: "Hydrological watershed basin boundary delineation" }
      ]
    },
    {
      category: "Backend & Event Streaming",
      icon: Server,
      color: "#6366f1",
      items: [
        { name: "FastAPI Async Microservices", desc: "High-throughput telemetry ingestion & REST endpoints" },
        { name: "MQTT Broker (EMQX / Mosquitto)", desc: "Real-time edge IoT sensor message pub/sub" },
        { name: "WebSocket Dispatcher", desc: "Sub-100ms push alerts to emergency control room" }
      ]
    },
    {
      category: "Emergency Operations Frontend",
      icon: Code,
      color: "#06b6d4",
      items: [
        { name: "React 19 & Vite", desc: "High-performance reactive control-room dashboard" },
        { name: "Custom SVG Topographic GIS Engine", desc: "Dynamic hazard overlays without external API keys" },
        { name: "Web Audio API Tactical Sound", desc: "Subconscious audio alerting for critical surge triggers" }
      ]
    },
    {
      category: "Dissemination & Deployment",
      icon: Cloud,
      color: "#ef4444",
      items: [
        { name: "Common Alerting Protocol (CAP)", desc: "Cell broadcast SMS & Gram Panchayat sirens" },
        { name: "Hybrid Edge-Cloud Architecture", desc: "Runs locally during total cloud blackout or landlines severed" }
      ]
    }
  ];

  return (
    <div style={{ padding: '24px', maxWidth: '1440px', margin: '0 auto' }}>
      
      {/* HEADER */}
      <div style={{ marginBottom: '22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Layers size={22} color="#38bdf8" />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
            System Architecture & Technology Specification
          </h2>
          <span style={{ fontSize: '0.74rem', padding: '2px 8px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', borderRadius: '4px', fontWeight: 600 }}>
            SIH Problem Statement 26192 • Team Aethervortex
          </span>
        </div>
        <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
          Comprehensive multi-tier engineering blueprint: From edge sensor physical telemetry to explainable AI and CAP emergency dispatch.
        </p>
      </div>

      {/* SECTION 23: FULL SYSTEM ARCHITECTURE PIPELINE */}
      <div className="card-panel tech-corners" style={{ padding: '28px', marginBottom: '28px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={18} color="#38bdf8" />
          End-to-End Disaster Intelligence Flow
        </h3>

        {/* Tier 1: Ingestion Sources */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '12px',
          marginBottom: '16px'
        }}>
          {[
            { title: "IMD Doppler Radar", sub: "Rainfall Precipitation Grid" },
            { title: "IoT Edge Telemetry", sub: "Soil TDR + Gauge Pulses" },
            { title: "30m DEM Terrain", sub: "Slope Gradient & Watershed" },
            { title: "Historical Archive", sub: "15-Yr Choke Points DB" },
            { title: "Satellite Soil / InSAR", sub: "Antecedent Moisture" }
          ].map((src, i) => (
            <div key={i} style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-tech)', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>{src.title}</div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{src.sub}</div>
            </div>
          ))}
        </div>

        {/* Arrow Down */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '4px 0' }}>
          <ArrowDown size={18} color="#38bdf8" />
        </div>

        {/* Tier 2: Ingestion & Normalization */}
        <div style={{ padding: '14px', background: 'rgba(2, 132, 199, 0.1)', border: '1px solid rgba(2, 132, 199, 0.3)', borderRadius: '8px', textAlign: 'center', marginBottom: '14px' }}>
          <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#38bdf8' }}>
            DATA INGESTION & ANOMALY FILTER (MQTT BROKER + FASTAPI REST API)
          </div>
          <div style={{ fontSize: '0.74rem', color: '#cbd5e1' }}>
            Spatial neighbor divergence verification (3-sigma filter) • Missing value imputation via Ordinary Kriging
          </div>
        </div>

        {/* Arrow Down */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '4px 0' }}>
          <ArrowDown size={18} color="#38bdf8" />
        </div>

        {/* Tier 3: Feature Engine */}
        <div style={{ padding: '14px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '8px', textAlign: 'center', marginBottom: '14px' }}>
          <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#f59e0b' }}>
            DYNAMIC FEATURE ENGINE & HYDRAULIC WAVE MODEL
          </div>
          <div style={{ fontSize: '0.74rem', color: '#cbd5e1' }}>
            Rainfall 15m/60m Acceleration • AMC-III Soil Saturation Curve • Manning Roughness Overland Runoff Velocity
          </div>
        </div>

        {/* Arrow Down */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '4px 0' }}>
          <ArrowDown size={18} color="#38bdf8" />
        </div>

        {/* Tier 4: AI Model & Risk Engine */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '14px',
          marginBottom: '14px'
        }}>
          <div style={{ padding: '14px', background: 'rgba(99, 102, 241, 0.12)', border: '1px solid rgba(99, 102, 241, 0.35)', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#818cf8' }}>
              XGBOOST PREDICTION & SHAP ATTRIBUTION
            </div>
            <div style={{ fontSize: '0.74rem', color: '#cbd5e1' }}>
              Flash-Flood Probability Score (0-100) + Transparent Factor % Breakdown
            </div>
          </div>

          <div style={{ padding: '14px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.35)', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#10b981' }}>
              LEAD TIME & ROUTE SAFETY ENGINE
            </div>
            <div style={{ fontSize: '0.74rem', color: '#cbd5e1' }}>
              Catchment Transit Lag Time + Road Hazard Obstruction Flagging
            </div>
          </div>
        </div>

        {/* Arrow Down */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '4px 0' }}>
          <ArrowDown size={18} color="#ef4444" />
        </div>

        {/* Tier 5: Output & Multi-Channel Alerting */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px'
        }}>
          <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ef4444' }}>CAP CELL BROADCAST</div>
            <div style={{ fontSize: '0.7rem', color: '#cbd5e1' }}>Geo-fenced SMS to Citizens</div>
          </div>
          <div style={{ padding: '12px', background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#38bdf8' }}>DEOC CONTROL ROOM</div>
            <div style={{ fontSize: '0.7rem', color: '#cbd5e1' }}>Tactical Screen & Map</div>
          </div>
          <div style={{ padding: '12px', background: 'rgba(249, 115, 22, 0.12)', border: '1px solid rgba(249, 115, 22, 0.3)', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f97316' }}>FIELD RESPONDERS</div>
            <div style={{ fontSize: '0.7rem', color: '#cbd5e1' }}>NDRF Tactical Barrier Orders</div>
          </div>
          <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#10b981' }}>EVACUATION CORRIDORS</div>
            <div style={{ fontSize: '0.7rem', color: '#cbd5e1' }}>Safe Bypass Routing</div>
          </div>
        </div>

      </div>

      {/* SECTION 24: TECHNOLOGY STACK SPECIFICATION CARDS */}
      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginBottom: '16px' }}>
        Proposed Production Technology Stack
      </h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '18px'
      }}>
        {techStack.map((tech, i) => {
          const Icon = tech.icon;
          return (
            <div 
              key={i} 
              className="card-panel" 
              style={{ padding: '20px', borderTop: `3px solid ${tech.color}` }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '6px', background: `${tech.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={18} color={tech.color} />
                </div>
                <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#ffffff' }}>
                  {tech.category}
                </h4>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {tech.items.map((item, idx) => (
                  <div key={idx} style={{ padding: '8px 10px', background: 'rgba(255, 255, 255, 0.025)', borderRadius: '6px' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>{item.name}</div>
                    <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

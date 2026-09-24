import React from 'react';
import { HISTORICAL_EVENTS } from '../data/mockData';
import { 
  History, 
  TrendingUp, 
  MapPin, 
  AlertTriangle, 
  ShieldCheck, 
  Calendar, 
  Droplets,
  Activity,
  Layers
} from 'lucide-react';

export function HistoryTab() {
  const hotspots = [
    { location: "Riverbend Meander Bottleneck", events: 7, avgLeadTime: "24 min", severity: "High Recurrence", riskColor: "#ef4444" },
    { location: "Hillview Catchment Terrace", events: 5, avgLeadTime: "28 min", severity: "High Recurrence", riskColor: "#ef4444" },
    { location: "Valley Junction Gateway", events: 4, avgLeadTime: "32 min", severity: "Moderate Recurrence", riskColor: "#f97316" },
    { location: "Kothagiri Stream Confluence", events: 3, avgLeadTime: "40 min", severity: "Moderate Recurrence", riskColor: "#f59e0b" },
    { location: "Pine Valley Mid-Slope", events: 1, avgLeadTime: "55 min", severity: "Low Recurrence", riskColor: "#10b981" }
  ];

  return (
    <div style={{ padding: '24px', maxWidth: '1440px', margin: '0 auto' }}>
      
      {/* HEADER */}
      <div style={{ marginBottom: '22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <History size={22} color="#a855f7" />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
            Historical Inundations & Vulnerability Analytics
          </h2>
          <span style={{ fontSize: '0.74rem', padding: '2px 8px', background: 'rgba(168, 85, 247, 0.15)', color: '#a855f7', borderRadius: '4px' }}>
            Nilgiri Basin 15-Year Longitudinal Database
          </span>
        </div>
        <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
          Validates AQUA-SHIELD model calibrations against real past orographic cloudburst and monsoon deluge records.
        </p>
      </div>

      {/* TOP ANALYTICAL SUMMARY TILES */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div className="card-panel" style={{ padding: '18px' }}>
          <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>TOTAL LOGGED EVENTS</div>
          <div style={{ fontSize: '2.2rem', fontWeight: 850, color: '#ffffff' }}>24</div>
          <div style={{ fontSize: '0.74rem', color: '#10b981' }}>100% early warning issued</div>
        </div>

        <div className="card-panel" style={{ padding: '18px' }}>
          <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>AVERAGE EARLY LEAD TIME</div>
          <div style={{ fontSize: '2.2rem', fontWeight: 850, color: '#38bdf8' }}>31.5 <span style={{ fontSize: '1rem', color: '#94a3b8' }}>min</span></div>
          <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Prior to culvert submergence</div>
        </div>

        <div className="card-panel" style={{ padding: '18px' }}>
          <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>MODEL ACCURACY VS GROUND TRUTH</div>
          <div style={{ fontSize: '2.2rem', fontWeight: 850, color: '#10b981' }}>93.8%</div>
          <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>F1 classification metric</div>
        </div>

        <div className="card-panel" style={{ padding: '18px' }}>
          <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>FALSE ALARM REDUCTION</div>
          <div style={{ fontSize: '2.2rem', fontWeight: 850, color: '#f59e0b' }}>-64%</div>
          <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Via multi-sensor soil fusion</div>
        </div>
      </div>

      {/* TWO-COLUMN LAYOUT: HISTORICAL LOG TABLE + RECURRENCE HOTSPOTS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.8fr) 1.2fr',
        gap: '24px',
        alignItems: 'start'
      }}>
        
        {/* SECTION 20: HISTORICAL EVENTS TABLE */}
        <div className="card-panel" style={{ padding: '22px', overflowX: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Calendar size={18} color="#38bdf8" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff' }}>
              Historical Flash Flood Incident Archive
            </h3>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#94a3b8', fontSize: '0.72rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px 8px' }}>Date</th>
                <th style={{ padding: '10px 8px' }}>Location</th>
                <th style={{ padding: '10px 8px' }}>Peak Rain</th>
                <th style={{ padding: '10px 8px' }}>Peak Risk</th>
                <th style={{ padding: '10px 8px' }}>Lead Time</th>
                <th style={{ padding: '10px 8px' }}>Impact & Evacuation</th>
              </tr>
            </thead>
            <tbody>
              {HISTORICAL_EVENTS.map(ev => (
                <tr key={ev.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                  <td style={{ padding: '12px 8px', color: '#ffffff', fontWeight: 600 }}>{ev.date}</td>
                  <td style={{ padding: '12px 8px', color: '#38bdf8' }}>{ev.location}</td>
                  <td style={{ padding: '12px 8px', color: '#ffffff' }}>{ev.peakRainfall}</td>
                  <td style={{ padding: '12px 8px' }}>
                    <span style={{ color: ev.peakRisk >= 80 ? '#ef4444' : '#f97316', fontWeight: 800 }}>
                      {ev.peakRisk} / 100
                    </span>
                  </td>
                  <td style={{ padding: '12px 8px', color: '#10b981', fontWeight: 600 }}>{ev.leadTime}</td>
                  <td style={{ padding: '12px 8px', color: '#cbd5e1', maxWidth: '280px', lineHeight: 1.4 }}>
                    {ev.impact}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* HOTSPOT RECURRENCE ANALYSIS */}
        <div className="card-panel tech-corners" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <AlertTriangle size={18} color="#ef4444" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff' }}>
              Catchment Hotspot Analysis
            </h3>
          </div>

          <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: '16px' }}>
            Locations repeatedly experiencing elevated risk due to acute drainage confluence angles and shallow soil bedrock depth:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {hotspots.map((hs, i) => (
              <div
                key={i}
                style={{
                  padding: '12px 14px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '8px',
                  borderLeft: `4px solid ${hs.riskColor}`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.86rem', color: '#ffffff' }}>{hs.location}</span>
                  <span style={{ fontSize: '0.72rem', color: hs.riskColor, fontWeight: 700 }}>{hs.severity}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8' }}>
                  <span>Logged Cloudbursts: <strong style={{ color: '#ffffff' }}>{hs.events}</strong></span>
                  <span>Avg Lead Window: <strong style={{ color: '#38bdf8' }}>{hs.avgLeadTime}</strong></span>
                </div>
              </div>
            ))}
          </div>

          {/* Scientific Note on Soil & Slope */}
          <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(56, 189, 248, 0.08)', borderRadius: '8px', fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.45 }}>
            <strong style={{ color: '#38bdf8' }}>Core Finding: </strong>
            Riverbend and Hillview have the highest recurrent exposure because tributary runoff from Upper Valley converges directly into a 40m wide narrow gorge.
          </div>
        </div>

      </div>

    </div>
  );
}

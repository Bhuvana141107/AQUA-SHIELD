import React, { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle, 
  MapPin, 
  Clock, 
  ShieldAlert, 
  Send, 
  CheckCircle2, 
  Radio, 
  Filter,
  Eye
} from 'lucide-react';

export function AlertsTab({ 
  alerts, 
  onAcknowledgeAlert, 
  onViewLocationOnMap 
}) {
  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [broadcastSent, setBroadcastSent] = useState(false);
  const [selectedAlertForDetails, setSelectedAlertForDetails] = useState(null);

  const filteredAlerts = alerts.filter(a => {
    if (filterSeverity === 'ALL') return true;
    return a.severity === filterSeverity;
  });

  const handleSimulateBroadcast = () => {
    setBroadcastSent(true);
    setTimeout(() => {
      setBroadcastSent(false);
    }, 4000);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1440px', margin: '0 auto' }}>
      
      {/* HEADER & CONTROLS */}
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
            <Bell size={22} color="#ef4444" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
              Disaster Early Warning & Alerts Hub
            </h2>
            <span style={{ fontSize: '0.74rem', padding: '2px 8px', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', borderRadius: '4px', fontWeight: 700 }}>
              {alerts.length} Active Dispatches
            </span>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
            Automated threshold evaluation across IMD radar, TDR soil sensors, and hydraulic flow models.
          </p>
        </div>

        {/* SEVERITY FILTER PILLS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {['ALL', 'CRITICAL', 'HIGH', 'WATCH', 'LOW'].map(sev => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              style={{
                background: filterSeverity === sev ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                color: filterSeverity === sev ? '#38bdf8' : '#94a3b8',
                border: filterSeverity === sev ? '1px solid #38bdf8' : '1px solid transparent',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.74rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* TWO-COLUMN LAYOUT: ALERTS LIST + EMERGENCY CELL BROADCAST PREVIEW */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 380px',
        gap: '24px',
        alignItems: 'start'
      }}>
        
        {/* ALERTS LIST */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {filteredAlerts.length === 0 ? (
            <div className="card-panel" style={{ padding: '36px', textAlign: 'center', color: '#94a3b8' }}>
              <CheckCircle2 size={36} color="#10b981" style={{ margin: '0 auto 12px' }} />
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>No Alerts in This Category</div>
              <div style={{ fontSize: '0.84rem' }}>All hydrological signals for this filter are nominal.</div>
            </div>
          ) : (
            filteredAlerts.map(alert => {
              const isCrit = alert.severity === 'CRITICAL';
              return (
                <div
                  key={alert.id}
                  className="card-panel"
                  style={{
                    padding: '20px',
                    borderLeft: `5px solid ${alert.color}`,
                    background: alert.acknowledged 
                      ? 'rgba(15, 25, 45, 0.5)' 
                      : isCrit 
                      ? 'rgba(239, 68, 68, 0.12)' 
                      : 'var(--bg-card)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className={`badge badge-${alert.severity.toLowerCase()}`}>
                        {alert.severity}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={13} /> {alert.time} IST
                      </span>
                      {alert.acknowledged && (
                        <span style={{ fontSize: '0.72rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '3px' }}>
                          <CheckCircle size={12} /> Acknowledged
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <button
                        onClick={() => onViewLocationOnMap(alert.location)}
                        className="btn btn-secondary btn-sm"
                        style={{ fontSize: '0.74rem', padding: '4px 10px' }}
                      >
                        <MapPin size={12} />
                        <span>View on Map</span>
                      </button>

                      {!alert.acknowledged && (
                        <button
                          onClick={() => onAcknowledgeAlert(alert.id)}
                          className="btn btn-primary btn-sm"
                          style={{ fontSize: '0.74rem', padding: '4px 10px' }}
                        >
                          <CheckCircle2 size={12} />
                          <span>Acknowledge</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Title & Location */}
                  <h3 style={{ fontSize: '1.02rem', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                    {alert.title}
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: '#38bdf8', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={13} /> Targeted Area: {alert.location}
                  </div>

                  {/* Trigger Explanation */}
                  <div style={{ padding: '8px 12px', background: 'rgba(0, 0, 0, 0.25)', borderRadius: '6px', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '10px' }}>
                    <strong style={{ color: '#94a3b8' }}>Hydrological Trigger: </strong>
                    {alert.trigger}
                  </div>

                  {/* Recommended Action */}
                  <div style={{ fontSize: '0.82rem', color: '#f8fafc', display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <span style={{ color: alert.color, fontWeight: 700 }}>Directive:</span>
                    <span>{alert.action}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* RIGHT: EMERGENCY CELL BROADCAST & SIREN DISPATCH SIMULATOR */}
        <div className="card-panel tech-corners" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Radio size={20} color="#ef4444" />
            <h3 style={{ fontSize: '1.08rem', fontWeight: 800, color: '#ffffff' }}>
              CAP Emergency Broadcast
            </h3>
          </div>

          <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: '16px' }}>
            Simulates Common Alerting Protocol (CAP) multi-channel push to telecommunication cell towers, Gram Panchayat PA sirens, and responder radios.
          </p>

          {/* Citizen Phone SMS Preview */}
          <div style={{
            background: '#040711',
            border: '2px solid rgba(239, 68, 68, 0.5)',
            borderRadius: '14px',
            padding: '16px',
            marginBottom: '16px',
            boxShadow: '0 0 20px rgba(239, 68, 68, 0.15)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', fontSize: '0.72rem', color: '#ef4444', fontWeight: 700 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldAlert size={14} /> NDMA / SDMA EMERGENCY ALERT
              </span>
              <span>LIVE BROADCAST</span>
            </div>

            <div style={{ fontSize: '0.84rem', color: '#ffffff', fontWeight: 600, marginBottom: '6px' }}>
              FLASH FLOOD EVACUATION NOTICE - NILGIRI BASIN
            </div>

            <p style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.45, marginBottom: '8px' }}>
              “Severe flash-flood surge developing within 25 minutes. Residents of Hillview, Riverbend & Valley Junction move immediately to Green Ridge Safe Refuge. Route 3 is BLOCKED. Follow designated Route 4.”
            </p>

            <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
              Dispatched by: AQUA-SHIELD EOC • Latency: 1.2s
            </div>
          </div>

          {/* Action Trigger Button */}
          <button
            id="btn-simulate-broadcast"
            onClick={handleSimulateBroadcast}
            disabled={broadcastSent}
            className="btn btn-danger"
            style={{ width: '100%', gap: '8px' }}
          >
            <Send size={16} />
            <span>{broadcastSent ? '✓ Broadcast Transmitted via Cell Towers' : 'Transmit Emergency Warning SMS'}</span>
          </button>

          {broadcastSent && (
            <div style={{ marginTop: '12px', padding: '10px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: '6px', fontSize: '0.78rem', color: '#10b981', textAlign: 'center' }}>
              ✓ Broadcast received by 12,460 mobile handsets in target geofence.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

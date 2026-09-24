import React from 'react';
import { 
  Navigation, 
  AlertOctagon, 
  CheckCircle2, 
  ShieldCheck, 
  Users, 
  Truck, 
  Radio, 
  ArrowRight, 
  MapPin, 
  Compass,
  AlertTriangle
} from 'lucide-react';

export function SafeRoutesTab({ floodData, onNavigateToMap }) {
  const {
    riskScore,
    riskLevel,
    riskColor,
    routeStatus,
    actionRecommendations
  } = floodData;

  const routes = [
    routeStatus.route1,
    routeStatus.route2,
    routeStatus.route3,
    routeStatus.route4
  ];

  return (
    <div style={{ padding: '24px', maxWidth: '1440px', margin: '0 auto' }}>
      
      {/* HEADER */}
      <div style={{ marginBottom: '22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Navigation size={22} color="#06b6d4" />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
            Safe Evacuation Routing & Decision Support
          </h2>
          <span className={`badge badge-${riskLevel.toLowerCase()}`}>
            {riskLevel} RISK PROTOCOL
          </span>
        </div>
        <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
          Dynamic catchment road inundation model. Identifies river crossings at risk of overtopping and computes alternate high-elevation evacuation corridors.
        </p>
      </div>

      {/* SECTION 16: ROUTE SAFETY CARDS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px',
        marginBottom: '28px'
      }}>
        {routes.map((rt, idx) => {
          const isBlocked = rt.status.includes('BLOCKED');
          const isSafeRoute = rt.status.includes('RECOMMENDED');
          const isCaution = rt.status === 'CAUTION';

          return (
            <div
              key={idx}
              className="card-panel"
              style={{
                padding: '20px',
                borderLeft: `5px solid ${rt.color}`,
                background: isBlocked 
                  ? 'rgba(239, 68, 68, 0.12)' 
                  : isSafeRoute 
                  ? 'rgba(6, 182, 212, 0.1)' 
                  : 'var(--bg-card)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div style={{ fontWeight: 700, fontSize: '0.94rem', color: '#ffffff' }}>
                  {rt.name}
                </div>
                {isBlocked ? (
                  <AlertOctagon size={18} color="#ef4444" />
                ) : isSafeRoute ? (
                  <ShieldCheck size={18} color="#06b6d4" />
                ) : (
                  <CheckCircle2 size={18} color="#10b981" />
                )}
              </div>

              <div style={{ marginBottom: '10px' }}>
                <span style={{
                  fontSize: '0.74rem',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  background: isBlocked ? '#ef4444' : isCaution ? '#f59e0b' : isSafeRoute ? '#06b6d4' : '#10b981',
                  color: isBlocked ? '#ffffff' : '#060a12',
                  fontWeight: 800
                }}>
                  {rt.status}
                </span>
              </div>

              <p style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '14px' }}>
                {rt.notes}
              </p>

              {isBlocked && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.75rem',
                  color: '#38bdf8',
                  background: 'rgba(56, 189, 248, 0.1)',
                  padding: '6px 10px',
                  borderRadius: '6px'
                }}>
                  <span>Alternate: Divert traffic to Route 4</span>
                  <ArrowRight size={13} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* SECTION 15: SMART ACTION RECOMMENDATIONS (3 TIERS) */}
      <div style={{ marginBottom: '18px' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
          Role-Based Emergency Action Directives
        </h3>
        <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
          Tailored tactical instructions dynamically calibrated to current flash flood risk level ({riskScore}/100 - {riskLevel}).
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '20px'
      }}>
        
        {/* TIER 1: FOR CONTROL ROOM */}
        <div className="card-panel tech-corners" style={{ padding: '22px', borderTop: '3px solid #38bdf8' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Radio size={20} color="#38bdf8" />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>FOR CONTROL ROOM</h4>
              <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>District Emergency Operation Center (DEOC)</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {actionRecommendations.controlRoom.map((rec, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.84rem', color: '#e2e8f0', lineHeight: 1.45 }}>
                <span style={{ color: '#38bdf8', fontWeight: 700 }}>•</span>
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* TIER 2: FOR FIELD RESPONDERS */}
        <div className="card-panel tech-corners" style={{ padding: '22px', borderTop: '3px solid #f97316' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(249, 115, 22, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Truck size={20} color="#f97316" />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>FOR FIELD RESPONDERS</h4>
              <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>NDRF / SDRF / Police / Fire Services</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {actionRecommendations.fieldResponders.map((rec, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.84rem', color: '#e2e8f0', lineHeight: 1.45 }}>
                <span style={{ color: '#f97316', fontWeight: 700 }}>•</span>
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* TIER 3: FOR COMMUNITY */}
        <div className="card-panel tech-corners" style={{ padding: '22px', borderTop: '3px solid #10b981' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={20} color="#10b981" />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>FOR COMMUNITY</h4>
              <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Gram Panchayats & Local Citizens</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {actionRecommendations.community.map((rec, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.84rem', color: '#e2e8f0', lineHeight: 1.45 }}>
                <span style={{ color: '#10b981', fontWeight: 700 }}>•</span>
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

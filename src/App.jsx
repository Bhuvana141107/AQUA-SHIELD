import React, { useState, useMemo, useEffect, useRef } from 'react';
import { calculateFloodRisk } from './utils/floodEngine';
import { PRESET_SCENARIOS, VILLAGES } from './data/mockData';
import { playEmergencyAlert } from './utils/audioAlert';

import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { OverviewTab } from './components/OverviewTab';
import { LiveMap } from './components/LiveMap';
import { PredictionEngineTab } from './components/PredictionEngineTab';
import { SensorsTab } from './components/SensorsTab';
import { AlertsTab } from './components/AlertsTab';
import { SafeRoutesTab } from './components/SafeRoutesTab';
import { HistoryTab } from './components/HistoryTab';
import { SimulationTab } from './components/SimulationTab';
import { ArchitectureTab } from './components/ArchitectureTab';

import { ShieldAlert, AlertTriangle, ArrowRight, Volume2 } from 'lucide-react';

export default function App() {
  const [isLanding, setIsLanding] = useState(false); // Default directly to Operations Dashboard for fast evaluation, or toggleable anytime!
  const [activeTab, setActiveTab] = useState('overview');
  
  // Hydrological simulation state variables
  const [rainfall, setRainfall] = useState(72); // mm/hr
  const [soilMoisture, setSoilMoisture] = useState(86); // %
  const [slopeRisk, setSlopeRisk] = useState('High'); // 'Low', 'Medium', 'High'
  const [sensorAvailability, setSensorAvailability] = useState(94); // %
  const [historicalRisk, setHistoricalRisk] = useState('High'); // 'Low', 'Medium', 'High'
  const [anomalyActive, setAnomalyActive] = useState(false);
  
  const [selectedVillageId, setSelectedVillageId] = useState('v-hillview');
  const [presetScenario, setPresetScenario] = useState('HEAVY_RAIN');
  const [acknowledgedAlertIds, setAcknowledgedAlertIds] = useState([]);
  
  // Audio chime state
  const [audioMuted, setAudioMuted] = useState(true);

  // Storm progression timelapse runner
  const [isProgressionRunning, setIsProgressionRunning] = useState(false);
  const [progressionStep, setProgressionStep] = useState(0);
  const progressionTimerRef = useRef(null);

  // Core risk calculation
  const rawFloodData = useMemo(() => {
    return calculateFloodRisk({
      rainfall,
      soilMoisture,
      slopeRisk,
      sensorAvailability,
      historicalRisk,
      anomalyActive
    });
  }, [rainfall, soilMoisture, slopeRisk, sensorAvailability, historicalRisk, anomalyActive]);

  // Adjust alerts to mark acknowledged ones
  const floodData = useMemo(() => {
    const updatedAlerts = rawFloodData.alerts.map(a => ({
      ...a,
      acknowledged: a.acknowledged || acknowledgedAlertIds.includes(a.id)
    }));
    return {
      ...rawFloodData,
      alerts: updatedAlerts
    };
  }, [rawFloodData, acknowledgedAlertIds]);

  const activeAlertCount = floodData.alerts.filter(a => !a.acknowledged && a.severity !== 'LOW').length;

  // Sound alert trigger when risk jumps to critical or high
  useEffect(() => {
    if (!audioMuted && (floodData.riskLevel === 'CRITICAL' || floodData.riskLevel === 'HIGH')) {
      playEmergencyAlert(floodData.riskLevel);
    }
  }, [floodData.riskLevel, audioMuted]);

  // Handlers
  const handleStartMonitoring = () => {
    setIsLanding(false);
    setActiveTab('map');
  };

  const handleExploreSimulation = () => {
    setIsLanding(false);
    setActiveTab('simulation');
  };

  const handleApplyPreset = (scenarioKey) => {
    setPresetScenario(scenarioKey);
    const p = PRESET_SCENARIOS[scenarioKey];
    if (p) {
      setRainfall(p.rainfall);
      setSoilMoisture(p.soilMoisture);
      setSlopeRisk(p.slopeRisk);
      setSensorAvailability(p.sensorAvailability);
      setHistoricalRisk(p.historicalRisk);
      
      if (!audioMuted) {
        playEmergencyAlert(scenarioKey === 'FLASH_FLOOD' ? 'CRITICAL' : 'HIGH');
      }
    }
  };

  const handleToggleAnomaly = () => {
    setAnomalyActive(prev => !prev);
    if (!anomalyActive && !audioMuted) {
      playEmergencyAlert('HIGH');
    }
  };

  const handleAcknowledgeAlert = (alertId) => {
    setAcknowledgedAlertIds(prev => [...prev, alertId]);
  };

  const handleViewLocationOnMap = (locationStr) => {
    setActiveTab('map');
    setIsLanding(false);
    const matched = VILLAGES.find(v => locationStr.toLowerCase().includes(v.name.toLowerCase()));
    if (matched) {
      setSelectedVillageId(matched.id);
    }
  };

  const handlePlayAudioTest = () => {
    playEmergencyAlert('CRITICAL');
  };

  // Automated 5-stage storm progression timelapse runner
  const handleRunStormProgression = () => {
    if (isProgressionRunning) return;
    setIsProgressionRunning(true);
    setProgressionStep(1);

    const stages = [
      { step: 1, rain: 15, soil: 42, slope: 'Medium', delay: 0 },
      { step: 2, rain: 48, soil: 64, slope: 'Medium', delay: 1800 },
      { step: 3, rain: 82, soil: 81, slope: 'High', delay: 3600 },
      { step: 4, rain: 115, soil: 92, slope: 'High', delay: 5400 },
      { step: 5, rain: 142, soil: 98, slope: 'High', delay: 7200 }
    ];

    stages.forEach((stage, idx) => {
      setTimeout(() => {
        setProgressionStep(stage.step);
        setRainfall(stage.rain);
        setSoilMoisture(stage.soil);
        setSlopeRisk(stage.slope);

        if (stage.step >= 4 && !audioMuted) {
          playEmergencyAlert('CRITICAL');
        }

        if (idx === stages.length - 1) {
          setTimeout(() => {
            setIsProgressionRunning(false);
          }, 1500);
        }
      }, stage.delay);
    });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)' }}>
      
      {/* GLOBAL NAVBAR */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        alertCount={activeAlertCount}
        audioMuted={audioMuted}
        setAudioMuted={setAudioMuted}
        onPlayAudioTest={handlePlayAudioTest}
        isLanding={isLanding}
        setIsLanding={setIsLanding}
        presetScenario={presetScenario}
        onSelectScenario={handleApplyPreset}
      />

      {/* TOP EMERGENCY MARQUEE TICKER (Visible when high/critical risk or anomaly active) */}
      {!isLanding && (floodData.riskLevel === 'CRITICAL' || floodData.riskLevel === 'HIGH' || anomalyActive) && (
        <div className="emergency-ticker">
          <AlertTriangle size={16} color={floodData.riskColor} className="pulse-beacon" />
          <span style={{ fontWeight: 800, color: '#ffffff', letterSpacing: '0.04em' }}>
            {floodData.riskLevel === 'CRITICAL' ? 'FLASH FLOOD EMERGENCY DISPATCH:' : 'OPERATIONAL ADVISORY:'}
          </span>
          <span style={{ color: '#fecaca', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            Risk Index: {floodData.riskScore}/100 • Lead Time: {floodData.leadTimeMinutes} min • Route 3 Blocked • Infiltration Exhausted ({soilMoisture}%) • Immediate Evacuation to Green Ridge Plateau.
          </span>
          <button 
            onClick={() => setActiveTab('alerts')}
            style={{ 
              background: 'rgba(255, 255, 255, 0.1)', 
              border: 'none', 
              color: '#ffffff', 
              padding: '2px 8px', 
              borderRadius: '4px', 
              fontSize: '0.72rem', 
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            Open Dispatch Log →
          </button>
        </div>
      )}

      {/* MAIN VIEWPORT */}
      <main style={{ flex: 1 }}>
        {isLanding ? (
          <LandingHero 
            onStartMonitoring={handleStartMonitoring}
            onExploreSimulation={handleExploreSimulation}
            currentRisk={floodData.riskScore}
            leadTime={floodData.leadTimeMinutes}
          />
        ) : (
          <>
            {activeTab === 'overview' && (
              <OverviewTab 
                floodData={floodData} 
                rainfall={rainfall} 
                soilMoisture={soilMoisture} 
                slopeRisk={slopeRisk} 
                onNavigateToMap={() => setActiveTab('map')}
                onNavigateToSim={() => setActiveTab('simulation')}
                onSelectVillage={(vId) => {
                  setSelectedVillageId(vId);
                  setActiveTab('map');
                }}
              />
            )}

            {activeTab === 'map' && (
              <LiveMap 
                floodData={floodData} 
                rainfall={rainfall} 
                soilMoisture={soilMoisture} 
                slopeRisk={slopeRisk}
                selectedVillageId={selectedVillageId}
                setSelectedVillageId={setSelectedVillageId}
                onSelectSensor={(s) => setActiveTab('sensors')}
              />
            )}

            {activeTab === 'prediction' && (
              <PredictionEngineTab 
                floodData={floodData} 
                rainfall={rainfall} 
                soilMoisture={soilMoisture} 
                slopeRisk={slopeRisk} 
                sensorAvailability={sensorAvailability} 
                historicalRisk={historicalRisk} 
                anomalyActive={anomalyActive}
                onToggleAnomaly={handleToggleAnomaly}
              />
            )}

            {activeTab === 'sensors' && (
              <SensorsTab 
                anomalyActive={anomalyActive} 
                onToggleAnomaly={handleToggleAnomaly} 
              />
            )}

            {activeTab === 'alerts' && (
              <AlertsTab 
                alerts={floodData.alerts}
                onAcknowledgeAlert={handleAcknowledgeAlert}
                onViewLocationOnMap={handleViewLocationOnMap}
              />
            )}

            {activeTab === 'routes' && (
              <SafeRoutesTab 
                floodData={floodData} 
                onNavigateToMap={() => setActiveTab('map')} 
              />
            )}

            {activeTab === 'history' && (
              <HistoryTab />
            )}

            {activeTab === 'simulation' && (
              <SimulationTab 
                rainfall={rainfall}
                setRainfall={setRainfall}
                soilMoisture={soilMoisture}
                setSoilMoisture={setSoilMoisture}
                slopeRisk={slopeRisk}
                setSlopeRisk={setSlopeRisk}
                sensorAvailability={sensorAvailability}
                setSensorAvailability={setSensorAvailability}
                historicalRisk={historicalRisk}
                setHistoricalRisk={setHistoricalRisk}
                onApplyPreset={handleApplyPreset}
                floodData={floodData}
                onNavigateToMap={() => setActiveTab('map')}
                onRunStormProgression={handleRunStormProgression}
                isProgressionRunning={isProgressionRunning}
                progressionStep={progressionStep}
              />
            )}

            {activeTab === 'architecture' && (
              <ArchitectureTab />
            )}
          </>
        )}
      </main>

      {/* FOOTER */}
      <footer style={{
        padding: '16px 24px',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        backgroundColor: 'rgba(6, 10, 18, 0.95)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        fontSize: '0.78rem',
        color: '#64748b'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldAlert size={15} color="#38bdf8" />
          <span style={{ color: '#cbd5e1', fontWeight: 600 }}>AQUA-SHIELD</span>
          <span>• Smart India Hackathon 2026 • PS ID: 26192 • Team Aethervortex</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span>Theme: Disaster Management</span>
          <span>Target Catchment: Nilgiri-Shola Basin</span>
          <span style={{ color: '#10b981' }}>Telemetry Edge Node Mesh Online (94%)</span>
        </div>
      </footer>

    </div>
  );
}

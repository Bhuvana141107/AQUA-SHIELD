// AQUA-SHIELD Multi-Source Flash-Flood Prediction Engine
// Problem Statement ID: 26192 | Team: Aethervortex

import { VILLAGES } from '../data/mockData';

export function calculateFloodRisk({
  rainfall = 65,
  soilMoisture = 76,
  slopeRisk = 'Medium', // 'Low', 'Medium', 'High'
  sensorAvailability = 94,
  historicalRisk = 'Medium', // 'Low', 'Medium', 'High'
  anomalyActive = false
}) {
  // 1. Normalized factor values [0, 1]
  const rainNorm = Math.min(Math.max(rainfall / 140, 0), 1);
  
  // Non-linear soil saturation curve: above 75%, runoff risk explodes exponentially
  const soilNorm = Math.min(Math.max(soilMoisture / 100, 0), 1);
  const soilExponentialRisk = soilNorm > 0.75 
    ? Math.pow(soilNorm, 1.8) * 1.25 
    : Math.pow(soilNorm, 1.2) * 0.8;

  const slopeMap = { Low: 0.25, Medium: 0.6, High: 0.95 };
  const slopeNorm = slopeMap[slopeRisk] || 0.6;

  const historyMap = { Low: 0.2, Medium: 0.55, High: 0.9 };
  const historyNorm = historyMap[historicalRisk] || 0.55;

  // 2. Multi-source Interaction: Rainfall * Soil Saturation interaction
  // Key scientific principle: Rainfall alone is NOT enough.
  // Saturated ground turns rain directly into lethal surface runoff.
  const fusionTerm = (rainNorm * 0.45) + (soilExponentialRisk * 0.35) + (slopeNorm * 0.15) + (historyNorm * 0.05);
  
  // Interaction bonus when both rain and soil are high
  const synergyMultiplier = (rainNorm > 0.6 && soilNorm > 0.7) ? 1.18 : 1.0;

  // Raw score out of 100
  let rawScore = fusionTerm * synergyMultiplier * 100;
  rawScore = Math.min(Math.max(Math.round(rawScore), 5), 98);

  // 3. Risk Classification
  let riskLevel = 'LOW';
  let riskColor = '#10b981';
  let riskBg = 'rgba(16, 185, 129, 0.15)';
  let riskBorder = 'rgba(16, 185, 129, 0.4)';

  if (rawScore >= 80) {
    riskLevel = 'CRITICAL';
    riskColor = '#ef4444';
    riskBg = 'rgba(239, 68, 68, 0.18)';
    riskBorder = 'rgba(239, 68, 68, 0.5)';
  } else if (rawScore >= 60) {
    riskLevel = 'HIGH';
    riskColor = '#f97316';
    riskBg = 'rgba(249, 115, 22, 0.15)';
    riskBorder = 'rgba(249, 115, 22, 0.4)';
  } else if (rawScore >= 35) {
    riskLevel = 'WATCH';
    riskColor = '#f59e0b';
    riskBg = 'rgba(245, 158, 11, 0.15)';
    riskBorder = 'rgba(245, 158, 11, 0.4)';
  }

  // 4. Lead Time Estimation (Minutes before critical inundation)
  // Steeper slopes & higher saturation lead to faster time-to-peak (shorter lead time)
  let leadTimeMinutes;
  if (rawScore < 30) {
    leadTimeMinutes = 85;
  } else if (rawScore < 50) {
    leadTimeMinutes = 52;
  } else if (rawScore < 70) {
    leadTimeMinutes = 38;
  } else if (rawScore < 85) {
    leadTimeMinutes = 24;
  } else {
    leadTimeMinutes = 14;
  }

  // 5. Confidence Score Calculation
  // Degraded by low sensor availability and active sensor anomalies
  let baseConfidence = Math.round((sensorAvailability * 0.7) + 26);
  if (anomalyActive) {
    baseConfidence -= 18; // Anomaly penalty
  }
  const confidence = Math.min(Math.max(baseConfidence, 35), 96);

  // 6. Explainable AI Feature Attribution (SHAP-style % breakdown)
  const totalAttributionWeight = (rainNorm * 38) + (soilExponentialRisk * 30) + (slopeNorm * 20) + (historyNorm * 8) + 4;
  const rainContrib = Math.round(((rainNorm * 38) / totalAttributionWeight) * 100);
  const soilContrib = Math.round(((soilExponentialRisk * 30) / totalAttributionWeight) * 100);
  const slopeContrib = Math.round(((slopeNorm * 20) / totalAttributionWeight) * 100);
  const historyContrib = Math.round(((historyNorm * 8) / totalAttributionWeight) * 100);
  const otherContrib = Math.max(100 - (rainContrib + soilContrib + slopeContrib + historyContrib), 3);

  // Dynamic explanation text
  let explanation = '';
  if (rawScore >= 80) {
    explanation = `Critical surge imminent. Rainfall (${rainfall} mm/hr) hitting near-saturated soil (${soilMoisture}%) on steep ${slopeRisk.toLowerCase()} gradient slopes. Infiltration capacity is virtually exhausted, channeling rapid overland torrents into valley bottlenecks within ${leadTimeMinutes} minutes.`;
  } else if (rawScore >= 60) {
    explanation = `High risk developing. Rapid rainfall spike combined with high soil moisture (${soilMoisture}%) is suppressing soil absorption. Stream hydrographs are steepening along major catchment drainage conduits.`;
  } else if (rawScore >= 35) {
    explanation = `Watch advisory active. Moderate rainfall is being partially buffered by current soil absorption capacity, but saturation is advancing across mid-elevation sectors. Continuous monitoring recommended.`;
  } else {
    explanation = `Conditions stable. Subsurface soil retention capacity is high (${100 - soilMoisture}% buffer). Current light precipitation (${rainfall} mm/hr) poses negligible risk of flash inundation.`;
  }

  // 7. Calculate Per-Village Risk Scores
  const villageRisks = {};
  VILLAGES.forEach((v) => {
    let localModifier = 0;
    if (v.id === 'v-hillview') localModifier = +8;
    else if (v.id === 'v-riverbend') localModifier = +12;
    else if (v.id === 'v-greenridge') localModifier = -35;
    else if (v.id === 'v-valleyjunction') localModifier = +10;
    else if (v.id === 'v-uppervalley') localModifier = +4;
    else if (v.id === 'v-kothagiri') localModifier = +2;
    else if (v.id === 'v-pinevalley') localModifier = -10;

    let vScore = Math.min(Math.max(rawScore + localModifier, 8), 99);
    let vLevel = 'LOW';
    let vColor = '#10b981';
    if (vScore >= 80) { vLevel = 'CRITICAL'; vColor = '#ef4444'; }
    else if (vScore >= 60) { vLevel = 'HIGH'; vColor = '#f97316'; }
    else if (vScore >= 35) { vLevel = 'WATCH'; vColor = '#f59e0b'; }

    let vLead = Math.max(leadTimeMinutes + (v.elevation > 1500 ? -4 : 6), 10);
    if (vScore < 30) vLead = 90;

    villageRisks[v.id] = {
      score: vScore,
      level: vLevel,
      color: vColor,
      leadTime: vLead,
      population: v.population,
      slopePercent: v.slopePercent,
      elevation: v.elevation
    };
  });

  // 8. Route Status
  const route3Blocked = rawScore >= 60;
  const route2Caution = rawScore >= 45;

  return {
    riskScore: rawScore,
    riskLevel,
    riskColor,
    riskBg,
    riskBorder,
    leadTimeMinutes,
    confidence,
    anomalyActive,
    explanation,
    featureAttribution: {
      rainfall: rainContrib,
      soilMoisture: soilContrib,
      slope: slopeContrib,
      history: historyContrib,
      otherSignals: otherContrib
    },
    villageRisks,
    routeStatus: {
      route1: { name: "Route 1: Upper Ridge Highway", status: "SAFE", color: "#10b981", notes: "High elevation basalt route; clear of drainage flood paths." },
      route2: { name: "Route 2: Shola Valley Byway", status: route2Caution ? "CAUTION" : "SAFE", color: route2Caution ? "#f59e0b" : "#10b981", notes: route2Caution ? "Water sheeting on culvert crossings; heavy vehicles only." : "Open and fully passable." },
      route3: { name: "Route 3: Kotagiri Riverbed Road", status: route3Blocked ? "BLOCKED / UNSAFE" : "SAFE", color: route3Blocked ? "#ef4444" : "#10b981", notes: route3Blocked ? "FLASH FLOOD INUNDATION HAZARD. Low-lying river culvert submerged. Barricaded." : "Passable under monitoring." },
      route4: { name: "Route 4: Emergency Green Ridge Link", status: "RECOMMENDED SAFE ROUTE", color: "#06b6d4", notes: "Primary designated evacuation corridor towards elevated Green Ridge Shelter." }
    },
    actionRecommendations: getActionRecommendations(riskLevel, rawScore, leadTimeMinutes),
    alerts: generateAlerts(rawScore, riskLevel, leadTimeMinutes, anomalyActive)
  };
}

function getActionRecommendations(riskLevel, score, leadTime) {
  if (riskLevel === 'CRITICAL') {
    return {
      controlRoom: [
        "Sound Sector 2 & 4 outdoor emergency sirens immediately.",
        "Authorize immediate preventative evacuation for Hillview & Riverbend low-lying sectors.",
        "Deploy SDRF / NDRF Water Rescue Teams to Staging Post Riverbend.",
        "Issue Flash-Flood Emergency Broadcast via Cell Broadcast & SMS gateways."
      ],
      fieldResponders: [
        "Erect hard barricades on Route 3 (Kotagiri Riverbed Road).",
        "Inspect culvert C-12 & Shola Bridge approach for debris dams.",
        "Pre-position heavy earthmovers and high-clearance 4x4s at Pine Valley junction.",
        "Coordinate orderly transport of elderly and vulnerable to Green Ridge Safe Zone."
      ],
      community: [
        "Immediately move away from riverbanks, ravines, and culverts to designated upper ground.",
        "Do NOT attempt to drive or walk through moving floodwater (Turn Around, Don't Drown).",
        "Ascend to Green Ridge Community Shelter or solid reinforced concrete upper levels.",
        "Turn off main electrical breakers and pack essential medicines and documents."
      ]
    };
  } else if (riskLevel === 'HIGH') {
    return {
      controlRoom: [
        "Put District Disaster Response Force on immediate 15-minute standby.",
        "Pre-alert Green Ridge Emergency Refuge staff to prepare cots and relief kits.",
        "Activate automated river gauge telemetry polling at 1-minute intervals.",
        "Issue High Flash-Flood Watch bulletin to Gram Panchayats."
      ],
      fieldResponders: [
        "Deploy flag marshals to Riverbend Causeway and Valley Junction.",
        "Check storm-drain grates for pine needle and fallen log blockages.",
        "Advise tourist buses and heavy freight away from vulnerable hillside switchbacks."
      ],
      community: [
        "Stay alert for rapid water color change (brown/turbid water indicates upstream surge).",
        "Keep emergency kit, flashlights, and mobile phone chargers ready.",
        "Avoid low-lying river paths and park vehicles away from drainage basins."
      ]
    };
  } else if (riskLevel === 'WATCH') {
    return {
      controlRoom: [
        "Maintain routine continuous telemetry monitoring on Nilgiri-Shola catchment nodes.",
        "Verify backup satellite VHF radio links between EOC and Hillview node.",
        "Review weather radar storm cell tracking updates."
      ],
      fieldResponders: [
        "Routine visual patrol of stream markers in low-lying zones.",
        "Verify roadside drainage gullies are clear of major debris."
      ],
      community: [
        "Monitor local weather announcements.",
        "Farmers advised to secure loose equipment away from seasonal brook margins."
      ]
    };
  } else {
    return {
      controlRoom: [
        "All systems in nominal baseline state. Telemetry health 94%.",
        "Scheduled diagnostic check for IoT sensor battery arrays."
      ],
      fieldResponders: [
        "Routine standby. Standard disaster preparedness posture."
      ],
      community: [
        "Normal conditions. No immediate flash-flood threat detected."
      ]
    };
  }
}

function generateAlerts(score, level, leadTime, anomalyActive) {
  const alerts = [];
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (anomalyActive) {
    alerts.push({
      id: "alt-anomaly",
      severity: "WATCH",
      color: "#f59e0b",
      title: "⚠ SENSOR ANOMALY: Spatial Inconsistency",
      location: "SENSOR-014 (Hillview Catchment)",
      time: timeStr,
      trigger: "Sensor reading deviates >3.8σ from adjacent spatial cluster (SENSOR-022)",
      action: "Neighbor cross-validation engaged. Prediction confidence adjusted. Alternate spatial interpolation active.",
      acknowledged: false
    });
  }

  if (level === 'CRITICAL') {
    alerts.push({
      id: "alt-crit-1",
      severity: "CRITICAL",
      color: "#ef4444",
      title: "🔴 CRITICAL FLASH FLOOD THREAT: Rapid Runoff Inundation",
      location: "Hillview, Riverbend & Valley Junction",
      time: timeStr,
      trigger: `Extreme rainfall spike with saturated soil (Infiltration < 2 mm/hr). Estimated lead time: ${leadTime} min.`,
      action: "Execute Level-3 Immediate Evacuation to Green Ridge Plateau. Barricade Route 3.",
      acknowledged: false
    });
    alerts.push({
      id: "alt-crit-2",
      severity: "CRITICAL",
      color: "#ef4444",
      title: "🔴 INFRASTRUCTURE ALERT: Riverbend Causeway Overtopping",
      location: "Riverbend Lowland Channel",
      time: timeStr,
      trigger: "Stream hydrograph velocity exceeds 3.4 m/s. Causeway submergence imminent.",
      action: "Redirect all evacuation vehicular traffic to Route 4 (Pine Valley - Green Ridge corridor).",
      acknowledged: false
    });
  } else if (level === 'HIGH') {
    alerts.push({
      id: "alt-high-1",
      severity: "HIGH",
      color: "#f97316",
      title: "🟠 HIGH RISK ADVISORY: Rapid Catchment Saturation",
      location: "Hillview & Upper Valley",
      time: timeStr,
      trigger: `Continuous rainfall intensity on steep terrain. Lead time window: ~${leadTime} min.`,
      action: "Prepare emergency response teams. Pre-warn vulnerable communities along Shola river corridor.",
      acknowledged: false
    });
  } else if (level === 'WATCH') {
    alerts.push({
      id: "alt-watch-1",
      severity: "WATCH",
      color: "#f59e0b",
      title: "🟡 HYDROLOGIC WATCH: Elevated Catchment Moisture",
      location: "Nilgiri-Shola Basin",
      time: timeStr,
      trigger: "Rainfall accumulation detected; soil moisture trending upward past baseline threshold.",
      action: "Telemetry frequency set to high-rate polling (1-min). Monitor downstream culvert gauges.",
      acknowledged: false
    });
  } else {
    alerts.push({
      id: "alt-low-1",
      severity: "LOW",
      color: "#10b981",
      title: "🟢 SYSTEM NOMINAL: Low Hydrological Risk",
      location: "All 7 District Sectors",
      time: timeStr,
      trigger: "All meteorological and IoT telemetry within safe baseline parameters.",
      action: "Continuous background surveillance active.",
      acknowledged: true
    });
  }

  return alerts;
}

// AQUA-SHIELD Mock Data & Geographical Topology
// Problem Statement ID: 26192 | Team: Aethervortex | Smart India Hackathon 2026

export const DISTRICT_INFO = {
  name: "Nilgiri-Shola Basin",
  state: "Tamil Nadu - Kerala Border Zone",
  elevationRange: "980m - 2,240m",
  totalSensors: 50,
  activeSensors: 47,
  catchmentAreaKm2: 342,
  riverSystem: "Upper Bhavani - Shola River Catchment"
};

export const VILLAGES = [
  {
    id: "v-hillview",
    name: "Hillview",
    elevation: 1840,
    slopePercent: 38,
    slopeRiskCategory: "High",
    population: 3420,
    x: 440,
    y: 190,
    baseVulnerability: 85,
    nearestSensorId: "SENSOR-014",
    drainageProximity: "120m to Upper Brook",
    description: "Steep terraced settlement near primary mountain catchment funnel."
  },
  {
    id: "v-kothagiri",
    name: "Kothagiri",
    elevation: 1620,
    slopePercent: 24,
    slopeRiskCategory: "Medium",
    population: 6850,
    x: 620,
    y: 280,
    baseVulnerability: 72,
    nearestSensorId: "SENSOR-022",
    drainageProximity: "80m to Shola Confluence",
    description: "Dense tea-plantation valley market town at river convergence point."
  },
  {
    id: "v-riverbend",
    name: "Riverbend",
    elevation: 1150,
    slopePercent: 14,
    slopeRiskCategory: "High",
    population: 4190,
    x: 310,
    y: 430,
    baseVulnerability: 90,
    nearestSensorId: "SENSOR-031",
    drainageProximity: "25m to Shola Main Channel",
    description: "Low-lying floodplain settlement situated on acute meander bottleneck."
  },
  {
    id: "v-pinevalley",
    name: "Pine Valley",
    elevation: 1480,
    slopePercent: 22,
    slopeRiskCategory: "Medium",
    population: 2890,
    x: 230,
    y: 260,
    baseVulnerability: 58,
    nearestSensorId: "SENSOR-045",
    drainageProximity: "210m to West Stream",
    description: "Mid-elevation settlement buffered by pine canopy with moderate runoff."
  },
  {
    id: "v-uppervalley",
    name: "Upper Valley",
    elevation: 1920,
    slopePercent: 42,
    slopeRiskCategory: "High",
    population: 1740,
    x: 350,
    y: 100,
    baseVulnerability: 78,
    nearestSensorId: "SENSOR-014",
    drainageProximity: "40m to Ridge Gully",
    description: "Crest ridge settlement directly exposed to orographic cloudbursts."
  },
  {
    id: "v-greenridge",
    name: "Green Ridge",
    elevation: 1710,
    slopePercent: 8,
    slopeRiskCategory: "Low",
    population: 2150,
    x: 680,
    y: 130,
    baseVulnerability: 20,
    nearestSensorId: "SENSOR-048",
    drainageProximity: "650m (Elevated Bedrock)",
    description: "Stable high-elevation basalt plateau; designated Primary Safe Refuge Zone.",
    isSafeRefuge: true
  },
  {
    id: "v-valleyjunction",
    name: "Valley Junction",
    elevation: 980,
    slopePercent: 12,
    slopeRiskCategory: "High",
    population: 5200,
    x: 480,
    y: 530,
    baseVulnerability: 88,
    nearestSensorId: "SENSOR-050",
    drainageProximity: "15m to Highway Culvert & River",
    description: "Lowest district gateway and crucial transport choke point at canyon mouth."
  }
];

export const SENSORS = [
  {
    id: "SENSOR-014",
    name: "Hillview Peak Node",
    location: "Hillview Catchment (1,850m)",
    type: "Tipping Bucket + TDR Soil Moisture",
    rainfallRate: 68,
    soilMoisture: 88,
    temperature: 17.4,
    battery: 92,
    signal: "Strong (RSSI -68 dBm)",
    status: "LIVE",
    firmware: "v2.4.1-Edge",
    x: 460,
    y: 180,
    history: [12, 18, 24, 38, 52, 68]
  },
  {
    id: "SENSOR-022",
    name: "Kothagiri Confluence Node",
    location: "Kothagiri Stream (1,610m)",
    type: "Ultrasonic Stream Level + Rain",
    rainfallRate: 54,
    soilMoisture: 81,
    temperature: 18.2,
    battery: 88,
    signal: "Strong (RSSI -71 dBm)",
    status: "LIVE",
    firmware: "v2.4.1-Edge",
    x: 605,
    y: 295,
    history: [10, 15, 22, 34, 45, 54]
  },
  {
    id: "SENSOR-031",
    name: "Riverbend Culvert Node",
    location: "Riverbend Lowlands (1,140m)",
    type: "Hydrostatic Pressure + Soil Probe",
    rainfallRate: 62,
    soilMoisture: 93,
    temperature: 19.8,
    battery: 79,
    signal: "Medium (RSSI -82 dBm)",
    status: "LIVE",
    firmware: "v2.3.9-Edge",
    x: 325,
    y: 445,
    history: [15, 20, 28, 42, 55, 62]
  },
  {
    id: "SENSOR-045",
    name: "Pine Valley Ridge Node",
    location: "Pine Valley Slope (1,490m)",
    type: "Optical Rain Gauge + Soil Capacitance",
    rainfallRate: 42,
    soilMoisture: 67,
    temperature: 18.9,
    battery: 95,
    signal: "Strong (RSSI -65 dBm)",
    status: "LIVE",
    firmware: "v2.4.1-Edge",
    x: 215,
    y: 275,
    history: [8, 12, 16, 25, 33, 42]
  },
  {
    id: "SENSOR-048",
    name: "Green Ridge Plateau Node",
    location: "Green Ridge Safe Zone (1,710m)",
    type: "Full Weather Station + Soil Core",
    rainfallRate: 28,
    soilMoisture: 42,
    temperature: 16.8,
    battery: 98,
    signal: "Strong (RSSI -60 dBm)",
    status: "LIVE",
    firmware: "v2.4.1-Edge",
    x: 695,
    y: 115,
    history: [5, 8, 11, 16, 21, 28]
  },
  {
    id: "SENSOR-050",
    name: "Valley Siphon Node",
    location: "Valley Junction Gateway (975m)",
    type: "Doppler Flow Radar + TDR Probe",
    rainfallRate: 70,
    soilMoisture: 94,
    temperature: 21.1,
    battery: 84,
    signal: "Strong (RSSI -74 dBm)",
    status: "LIVE",
    firmware: "v2.4.1-Edge",
    x: 495,
    y: 545,
    history: [14, 22, 31, 48, 60, 70]
  }
];

export const BRIDGES = [
  { id: "b1", name: "North Shola Bridge", x: 490, y: 240, status: "Advisory" },
  { id: "b2", name: "Kotagiri Valley Viaduct", x: 550, y: 350, status: "Safe" },
  { id: "b3", name: "Riverbend Causeway", x: 370, y: 440, status: "Critical Vulnerability" },
  { id: "b4", name: "Valley Junction Bridge", x: 440, y: 520, status: "High Risk" }
];

export const HISTORICAL_EVENTS = [
  {
    id: "H-2024-03",
    date: "14 Oct 2024",
    location: "Hillview & Riverbend",
    peakRainfall: "118 mm/hr",
    peakRisk: 94,
    leadTime: "34 min",
    alertStatus: "Red Alert Issued (T-28m)",
    impact: "Road breach on Route 3; 640 residents safely evacuated to Green Ridge.",
    sensorsReporting: "48/50"
  },
  {
    id: "H-2023-08",
    date: "22 Aug 2023",
    location: "Riverbend Bottleneck",
    peakRainfall: "92 mm/hr",
    peakRisk: 86,
    leadTime: "26 min",
    alertStatus: "Orange Alert Issued",
    impact: "Causeway submerged; emergency traffic diversion to Ridge Bypass succeeded.",
    sensorsReporting: "46/50"
  },
  {
    id: "H-2022-11",
    date: "04 Nov 2022",
    location: "Valley Junction",
    peakRainfall: "105 mm/hr",
    peakRisk: 91,
    leadTime: "31 min",
    alertStatus: "Red Alert Issued",
    impact: "Debris flow checked by containment silt traps; zero human casualties.",
    sensorsReporting: "44/50"
  },
  {
    id: "H-2021-07",
    date: "18 Jul 2021",
    location: "Kothagiri Confluence",
    peakRainfall: "78 mm/hr",
    peakRisk: 74,
    leadTime: "42 min",
    alertStatus: "Yellow Watch Issued",
    impact: "Tea plantation slope slumping; culvert clearout initiated in advance.",
    sensorsReporting: "40/50"
  }
];

export const PRESET_SCENARIOS = {
  NORMAL: {
    name: "Normal Conditions",
    description: "Standard seasonal drizzle; low soil saturation, high infiltration capacity.",
    rainfall: 14,
    soilMoisture: 38,
    slopeRisk: "Low",
    sensorAvailability: 100,
    historicalRisk: "Low"
  },
  HEAVY_RAIN: {
    name: "Heavy Rainfall Event",
    description: "Continuous monsoon squall; saturation rising, surface runoff commencing.",
    rainfall: 65,
    soilMoisture: 76,
    slopeRisk: "Medium",
    sensorAvailability: 94,
    historicalRisk: "Medium"
  },
  FLASH_FLOOD: {
    name: "Flash Flood Threat (Cloudburst)",
    description: "Extreme orographic deluge over saturated basin; immediate flash surge imminent.",
    rainfall: 124,
    soilMoisture: 93,
    slopeRisk: "High",
    sensorAvailability: 88,
    historicalRisk: "High"
  }
};

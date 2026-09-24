# AQUA-SHIELD: Hyper-Local Flash Flood Intelligence for Hilly Regions

**Smart India Hackathon 2026**  
**Problem Statement ID:** 26192  
**Theme:** Disaster Management  
**Team:** Aethervortex  
**Catchment:** Nilgiri-Shola Basin, Western Ghats  

---

## 🌟 Executive Summary

**AQUA-SHIELD** is an AI/ML-driven flash-flood early warning and decision-support system engineered specifically for complex mountain topographies. Conventional flood forecasting relies almost exclusively on rainfall gauges, failing in hilly terrains where soil saturation, steep gradients, and narrow river bottlenecks transform moderate storms into lethal flash surges within minutes.

**Core Innovation:**
> **Rainfall alone is NOT enough.**  
> Flash flood severity is governed by the intersection of **Rainfall Intensity + Antecedent Soil Saturation + DEM Slope Velocity + Historical Vulnerabilities + Live IoT Edge Telemetry**.

---

## 🚀 Key Functional Modules

1. **Topographic GIS Live Risk Map:**
   - 30m Digital Elevation Model representation of the fictional *Nilgiri-Shola Basin* catchment.
   - Interactive settlements: **Hillview**, **Kothagiri**, **Riverbend**, **Pine Valley**, **Upper Valley**, **Green Ridge (Designated Safe Refuge)**, and **Valley Junction**.
   - Dynamic river hydrography, bridges, road networks, and live IoT sensor nodes.
   - Clickable village dossiers displaying population exposed, local elevation, slope risk, nearest sensor, lead time, and dynamic route status.

2. **Explainable AI Engine (SHAP-Style Feature Attribution):**
   - Breaks down contributing hazard drivers:
     - **Rainfall Intensity & Trend** (35%)
     - **Soil Moisture Saturation** (28%)
     - **Terrain & Slope Velocity** (20%)
     - **Historical Choke Recurrence** (10%)
     - **Stream Hydrograph & Runoff** (7%)
   - Generates transparent, human-readable hydrological explanations for control-room operators.

3. **Data Quality Monitor & Anomaly Detection:**
   - Detects malfunctioning or malicious sensor telemetry via 3.8σ spatial divergence filters.
   - Demonstrates automated down-weighting of prediction confidence and seamless fallback to spatial Kriging interpolation.

4. **Multi-Tiered Early Action Guidance:**
   - **For Control Room (DEOC):** Siren authorization, SDRF staging, cell broadcasts.
   - **For Field Responders:** Road barricading, culvert debris inspections, 4x4 positioning.
   - **For Community:** Immediate low-lying evacuation, avoiding flooded culverts, safe route guidance.

5. **Dynamic Safe Evacuation Routing:**
   - Automatically marks inundated roads (e.g., *Route 3: Kotagiri Riverbed Road*) as **BLOCKED / UNSAFE**.
   - Computes and highlights **Route 4: Emergency Green Ridge Link** towards elevated bedrock shelters.

6. **Interactive Simulation Studio:**
   - 5 physical parameter controls: Rainfall (0–150 mm/hr), Soil Moisture (0–100%), Slope Risk, Sensor Availability (100%–20%), and Historical Risk.
   - **3 Instant SIH Demo Presets:**
     - 🟢 *Normal Conditions* (14 mm/hr, 38% soil → Safe)
     - 🟡 *Heavy Rainfall* (65 mm/hr, 76% soil → Watch / High)
     - 🔴 *Flash Flood Threat* (124 mm/hr, 93% soil → Critical Surge)
   - **Auto-Run 40-Minute Storm Timelapse:** Plays a 5-stage cloudburst progression watching risk climb in real time.

7. **Multi-Source Data Fusion & Architecture Visualization:**
   - Full pipeline diagram: Data Sources → Ingestion & Cleaning → Feature Engine → XGBoost Model → GIS/PostGIS → Alerts & Common Alerting Protocol (CAP) SMS Broadcast.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **AI / ML** | Python, XGBoost Gradient Boosted Trees, Scikit-Learn, SHAP Explainability |
| **IoT Hardware** | ESP32-S3 Microcontrollers, TDR Soil Probes, Tipping Bucket Rain Gauges, LoRaWAN 868MHz, MQTT |
| **Spatial GIS** | Cartosat-1 30m DEM, PostGIS, GeoPandas, Rasterio, Custom SVG Topographic Canvas |
| **Backend** | FastAPI Async Microservices, WebSockets, EMQX Broker |
| **Frontend** | React 19, Vite, Modern Responsive Vanilla CSS, Web Audio API Emergency Siren |
| **Disaster Protocol** | Common Alerting Protocol (CAP), Cell Broadcast SMS, NDMA / SDMA Geo-fencing |

---

## 📋 2-Minute SIH Judge Demonstration Flow

1. **Landing Page:** Open AQUA-SHIELD at `http://localhost:5173/`, review the high-tech mountain terrain background and core proposition.
2. **Start Monitoring:** Click **Start Live Monitoring** to enter the Emergency Operations Dashboard.
3. **Overview Review:** Inspect summary cards, the explainable *"Why is Risk High?"* attribution bars, and the hydraulic soil saturation gauge.
4. **Live Risk Map:** Click **Live Risk Map**, select **Hillview** or **Riverbend**, and review the village dossier and route status.
5. **Simulation Studio:** Switch to **Simulation**, select **3. FLASH FLOOD THREAT**, or run the **Auto-Run 40-Min Storm Timelapse**.
6. **Observe Dynamic Cascade:**
   - Risk score accelerates past 85 into **CRITICAL**.
   - Estimated lead time shrinks to **14–24 min**.
   - Emergency banner ticker alerts activate with optional tactical siren audio.
   - Route 3 turns into a red dashed line (**BLOCKED**), and Route 4 illuminates as the **Recommended Safe Evacuation Corridor**.
7. **Telemetry & Anomaly Test:** Open **Sensors**, click **Inject SENSOR-014 Glitch**, and observe how the Data Quality Monitor isolates the sensor and adjusts confidence.
8. **Architecture Walkthrough:** Switch to **Architecture** to showcase the enterprise-grade ingestion and multi-source ML fusion pipeline.

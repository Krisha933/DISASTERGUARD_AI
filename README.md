<div align="center">

# 🌪️🛡️ DisasterGuard AI

### AI-Powered Multi-Hazard Disaster Risk Monitoring & Safe Route Assistant

**🌦️ Predict • 🗺️ Monitor • 🤖 Analyse • 🚗 Navigate • 🛡️ Stay Safe**

[![Python](https://img.shields.io/badge/Python-3.x-blue?logo=python)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-Web%20Framework-black?logo=flask)](https://flask.palletsprojects.com/)
[![Machine Learning](https://img.shields.io/badge/ML-Random%20Forest-green)](https://scikit-learn.org/)
[![Leaflet](https://img.shields.io/badge/Maps-Leaflet-brightgreen?logo=leaflet)](https://leafletjs.com/)
[![OpenStreetMap](https://img.shields.io/badge/Maps-OpenStreetMap-blue)](https://www.openstreetmap.org/)

</div>

---

## 🌍 About the Project

**DisasterGuard AI** is an AI-powered disaster intelligence and safety platform designed to help users **monitor environmental hazards, predict flood risk, analyse historical disaster patterns, and identify safer travel routes**.

The platform combines:

- 🤖 Machine Learning
- 🌦️ Live Weather Intelligence
- 🗺️ Interactive Maps
- 📊 Historical Disaster Analysis
- ⚡ Lightning Risk Detection
- 🌪️ Storm Risk Analysis
- 🚗 Safe Route Analysis
- 🚨 Emergency Assistance

into a single web-based disaster monitoring system.

> **Goal:** Convert environmental and historical data into simple, understandable risk information that can help users make safer decisions.

---

# 🚀 Key Features

## 🤖 1. AI Flood Risk Prediction

DisasterGuard AI uses a **Random Forest Classifier** to estimate flood risk from environmental conditions.

### Model Inputs

| Feature | Description |
|---|---|
| 🌡️ Temperature | Current temperature |
| 🌧️ Rainfall | Rainfall amount |
| 💨 Max Wind | Maximum wind speed |

### Prediction Output

The model classifies the situation as:

- 🟢 **NORMAL**
- 🔴 **FLOOD RISK**

Example:

```json
{
  "prediction": 1,
  "result": "FLOOD RISK",
  "probability": 78.4
}
🌦️ 2. Live Weather Intelligence

The system uses live weather information to analyse current environmental conditions.

It considers factors such as:

Temperature
Rainfall
Wind speed
Weather conditions
Lightning indicators
Storm indicators
Severe weather conditions

Weather information is used together with the project's risk-analysis logic to generate understandable hazard information.

⚡ 3. Lightning Risk Analysis

The platform analyses environmental conditions to identify potential lightning-related risk.

The dashboard provides an easy-to-understand risk status such as:

🟢 Low Risk
🟡 Caution
🟠 High Risk
🔴 Critical
🌪️ 4. Storm & Severe Weather Monitoring

DisasterGuard AI also monitors conditions related to:

🌪️ Storms
💨 Strong Winds
⛈️ Severe Weather
🌧️ Heavy Rainfall
⚡ Lightning

This allows multiple hazards to be considered instead of focusing only on floods.

📊 5. Historical Disaster Analysis

The platform analyses historical disaster records to understand the risk pattern of a particular city.

Historical Risk API
GET /historical-risk?city=Lucknow

The system considers factors such as:

Total disaster incidents
High-severity incidents
Medium-severity incidents

and generates an overall historical risk level:

LOW
MEDIUM
HIGH
CRITICAL
🗺️ 6. Interactive Disaster Risk Map

The project includes an interactive map powered by:

Leaflet
OpenStreetMap

The map can display:

📍 Monitoring location
🌊 Flood-risk information
⚡ Lightning-risk areas
🌪️ Storm information
🚗 Route alternatives
🛡️ Recommended safer routes
⚠️ Hazard information

This provides a visual representation of disaster risk.

🚗 7. AI-Assisted Safe Route Analysis

Users can enter a destination and analyse the safety of travelling there.

The system considers environmental hazard information including:

Overall risk
Flood risk
Lightning risk
Storm risk
Severe weather risk

The route can be classified as:

🟢 LOW RISK
🟡 CAUTION
🟠 HIGH RISK
🔴 CRITICAL

The system also provides a human-readable recommendation.

🔀 8. Alternative Route Comparison

DisasterGuard AI can compare available driving routes and analyse their potential hazard exposure.

Route Comparison API
GET /compare-routes

The system uses:

📍 Destination geocoding
🛣️ Driving route generation
🌦️ Environmental risk information
🗺️ Route geometry

Route results can include:

Distance
Estimated duration
Risk level
Safety status
Recommendation
Route geometry

This allows users to compare routes instead of simply selecting the shortest route.

🚨 9. Emergency Action Center

The platform includes an Emergency Action Center to help users quickly access important assistance.

Possible emergency assistance includes:

🏥 Nearby Hospitals
🚓 Police Assistance
🛟 Shelters
📞 Emergency Services
📍 Nearby Help
🗺️ Navigation Support

The objective is to provide useful emergency resources from one place.

📍 10. Location-Based Monitoring

The system supports location-based disaster monitoring.

Users can monitor a selected location and receive information about:

Current Weather
       ↓
Hazard Analysis
       ↓
Flood Risk
       ↓
Lightning Risk
       ↓
Storm Risk
       ↓
Overall Risk
       ↓
Safety Recommendation
🧠 System Intelligence

DisasterGuard AI combines multiple information sources to generate an overall safety picture.

              ┌─────────────────────┐
              │   Weather Data      │
              └──────────┬──────────┘
                         ↓
              ┌─────────────────────┐
              │  Hazard Analysis    │
              └──────────┬──────────┘
                         ↓
        ┌────────────────────────────────┐
        │                                │
        ↓                                ↓
 ┌───────────────┐                ┌───────────────┐
 │ ML Flood Risk │                │ Historical     │
 │ Prediction    │                │ Risk Analysis  │
 └───────┬───────┘                └───────┬───────┘
         │                                │
         └──────────────┬─────────────────┘
                        ↓
              ┌─────────────────────┐
              │ Overall Risk Engine │
              └──────────┬──────────┘
                         ↓
        ┌────────────────────────────────┐
        │                                │
        ↓                                ↓
 ┌───────────────┐                ┌───────────────┐
 │ Risk Map      │                │ Safe Route    │
 │ & Alerts      │                │ Analysis      │
 └───────────────┘                └───────────────┘
🧪 Machine Learning Model
Algorithm

Random Forest Classifier

Dataset

The main ML dataset contains approximately:

4,228 records
9 columns

Important fields include:

Field	Purpose
Date	Observation date
District	District name
State	State
Latitude	Geographic latitude
Longitude	Geographic longitude
Temperature	Temperature value
Rainfall	Rainfall value
Max_Wind	Maximum wind speed
Flood	Flood target
Training Process
Historical Dataset
       ↓
Data Preparation
       ↓
Feature Selection
       ↓
Train/Test Split
       ↓
Random Forest Training
       ↓
Model Evaluation
       ↓
flood_model.pkl
       ↓
Flask API
       ↓
Web Dashboard
📁 Dataset & Data Sources

The project contains multiple datasets for analysis and modelling.

data/
│
├── ml_dataset.csv
├── historical_weather_dataset.csv
├── flood_data.csv
├── flood_cleaned.csv
├── disaster_ml_dataset.csv
├── historical_disasters.json
├── district_coordinates.csv
├── district_coordinates_test.csv
└── district_list_cleaned.csv
Main Data Used
ml_dataset.csv

Used for machine-learning-based flood prediction.

historical_weather_dataset.csv

Used for historical weather analysis.

flood_data.csv

Contains historical disaster/flood information including:

Date
Location
District
State
Latitude
Longitude
Severity
Area affected
Human casualties
Damage information
Event source
historical_disasters.json

Used for historical disaster-risk analysis.

🌐 API Endpoints
Endpoint	Purpose
/	Main dashboard
/predict-flood	Predict flood risk
/historical-risk	Analyse historical city risk
/safe-route	Analyse route safety
/compare-routes	Compare alternative routes
/geocode	Convert location into coordinates
Flood Prediction Example
/predict-flood?temperature=30&rainfall=120&wind=25

Example response:

{
  "prediction": 1,
  "result": "FLOOD RISK",
  "probability": 78.4
}
Historical Risk Example
/historical-risk?city=Lucknow
🗺️ Mapping & Routing Technology
Leaflet

Used to create the interactive disaster monitoring map.

OpenStreetMap

Provides map data.

Nominatim

Used for destination/location geocoding.

OSRM

Used for driving route generation and route comparison.

Google Maps

Can be used for navigation/search assistance from the application.

🛠️ Technology Stack
Technology	Usage
🐍 Python	Backend & ML
🌐 Flask	Web application
🤖 Scikit-learn	Machine Learning
🌲 Random Forest	Flood prediction
🐼 Pandas	Data processing
🔢 NumPy	Numerical operations
💾 Joblib	Model saving/loading
🎨 HTML	Frontend structure
🎨 CSS	UI styling
⚡ JavaScript	Frontend logic
🗺️ Leaflet	Interactive maps
🌍 OpenStreetMap	Map data
📍 Nominatim	Geocoding
🚗 OSRM	Route generation
🌦️ Open-Meteo	Weather data
📂 Project Structure
DISASTERGUARD_AI/
│
├── app.py
├── train_model.py
├── prepare_dataset.py
├── check_dataset.py
├── check_historical_weather_dataset.py
├── clean_district_list.py
├── clean_flood_data.py
├── create_normal_samples.py
├── district_list.py
├── get_district_coordinates.py
├── historical_weather_batch_test.py
├── historical_weather_dataset.py
├── historical_weather_test.py
├── inspect_weather_data.py
│
├── data/
│   ├── ml_dataset.csv
│   ├── historical_weather_dataset.csv
│   ├── flood_data.csv
│   ├── flood_cleaned.csv
│   ├── disaster_ml_dataset.csv
│   ├── historical_disasters.json
│   ├── district_coordinates.csv
│   ├── district_coordinates_test.csv
│   └── district_list_cleaned.csv
│
├── models/
│   └── flood_model.pkl
│
├── static/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── dashboard.js
│
├── templates/
│   └── index.html
│
├── database/
│
├── requirements.txt
│
└── README.md
⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/Krisha933/DISASTERGUARD_AI.git
cd DISASTERGUARD_AI
2️⃣ Create Virtual Environment
Windows
python -m venv venv
venv\Scripts\activate
macOS / Linux
python3 -m venv venv
source venv/bin/activate
3️⃣ Install Dependencies
pip install flask pandas numpy scikit-learn joblib

Or, if the project has a complete requirements.txt:

pip install -r requirements.txt
🧠 Train the ML Model

To train the flood prediction model:

python train_model.py

The trained model will be saved as:

models/flood_model.pkl
▶️ Run the Application

Start the Flask server:

python app.py

The application will normally run at:

http://127.0.0.1:5000

or:

http://localhost:5000

Open the URL in your browser.

📊 Current Capabilities

DisasterGuard AI currently combines multiple levels of disaster intelligence.

Phase 1 — Core Intelligence
✅ AI flood prediction
✅ Random Forest model
✅ Live weather monitoring
✅ Historical disaster analysis
✅ Interactive risk mapping
Phase 2 — Advanced Intelligence
✅ Lightning risk analysis
✅ Storm risk analysis
✅ Severe weather analysis
✅ Safe route analysis
✅ Alternative route comparison
✅ Location-based monitoring
✅ Real-time map information
Phase 3 — Emergency & Safety Network
✅ Emergency Action Center
✅ Nearby hospitals
✅ Police assistance
✅ Shelter information
✅ Safe-zone identification
✅ Emergency-service support
✅ Notification/alert architecture
✅ Multi-hazard monitoring
✅ Community-oriented disaster assistance

These capabilities are part of the current project implementation and are not listed as future-only features.

🎯 Why DisasterGuard AI?

Traditional disaster information systems often provide information from separate sources.

DisasterGuard AI aims to bring important safety information together:

Weather
   +
Machine Learning
   +
Historical Data
   +
Hazard Analysis
   +
Maps
   +
Route Intelligence
   +
Emergency Assistance
        ↓
DisasterGuard AI
        ↓
Better Safety Awareness
Key Advantages
🔹 Multi-hazard monitoring
🔹 AI-based flood prediction
🔹 Historical risk analysis
🔹 Interactive map visualization
🔹 Route safety analysis
🔹 Alternative route comparison
🔹 Emergency assistance
🔹 User-friendly dashboard
🔹 Location-based intelligence
🔮 Future Enhancements

The current system can be further enhanced with:

📱 Dedicated Android/iOS application
🌐 Multi-language support
📡 IoT sensor integration
🛰️ Satellite imagery analysis
🧠 Advanced deep-learning models
📱 SMS-based emergency alerts
🏘️ Community disaster reporting
📈 More advanced predictive analytics
☁️ Cloud deployment
🔔 Push notifications
⚠️ Limitations & Responsible Use

DisasterGuard AI is currently an educational/research and hackathon prototype.

It should not be treated as an official emergency-warning or life-safety system.

Risk predictions may be affected by:

Data quality
Dataset size
Weather-data availability
Model limitations
API availability
Geographic coverage
Real-world environmental uncertainty

For actual emergencies, users should always follow instructions from:

Government authorities
Disaster-management agencies
Local emergency services
Official weather authorities
🔐 Privacy & Safety

The project is designed to use environmental, geographical and publicly available information for disaster analysis.

No sensitive personal information is required for the core ML prediction system.

👩‍💻 Author
<div align="center">
Krisha Singh

B.Tech Computer Science & Engineering

🌪️ DisasterGuard AI

</div>
⭐ Support the Project

If you find DisasterGuard AI useful or interesting:

⭐ Star the repository
🍴 Fork the project
🛠️ Experiment with the code
💡 Suggest improvements
🤝 Contribute new ideas

📜 License

This project is intended for educational, research and hackathon purposes.

<div align="center">
🛡️ DisasterGuard AI
Predict Early. Understand Risk. Choose Safer Routes.

🌦️ Predict • 🗺️ Monitor • 🤖 Analyse • 🚗 Navigate • 🛡️ Stay Safe

</div> ```
✅ README में ये version क्यों बेहतर है?
Professional GitHub structure है
Features को clearly अलग-अलग sections में दिखाया गया है
Phase 1, Phase 2, Phase 3 को current capabilities रखा गया है
ML model और dataset properly explain किए हैं
APIs भी दिए हैं
Project structure दिया है
Installation + run commands दिए हैं
Architecture diagram है
Safety disclaimer है
Hackathon presentation के लिए भी अच्छा लगेगा
Future roadmap में सिर्फ genuinely future improvements रखे गए हैं

बस एक चीज़ check करना: अगर आपकी actual GitHub repository का URL DISASTERGUARD_AI वाला नहीं है, तो README में clone URL को अपनी actual repository URL से replace कर देना।

🌪️ DisasterGuard AI

🚨 AI-Powered Multi-Hazard Disaster Risk Monitoring & Safe Route Assistant

<p>
<img src="https://img.shields.io/badge/AI%20%26%20ML-Random%20Forest-8B5CF6?style=for-the-badge" />
<img src="https://img.shields.io/badge/Weather-Live%20Intelligence-06B6D4?style=for-the-badge" />
<img src="https://img.shields.io/badge/Maps-Leaflet%20%2B%20OSM-22C55E?style=for-the-badge" />
<img src="https://img.shields.io/badge/Routing-OSRM-F97316?style=for-the-badge" />
</p>

<p>
<img src="https://img.shields.io/badge/Python-3.x-3776AB?style=flat-square&logo=python&logoColor=white" />
<img src="https://img.shields.io/badge/Flask-Web%20App-000000?style=flat-square&logo=flask&logoColor=white" />
<img src="https://img.shields.io/badge/Scikit--learn-Machine%20Learning-F7931E?style=flat-square&logo=scikit-learn&logoColor=white" />
<img src="https://img.shields.io/badge/OpenStreetMap-Mapping-7EBC6F?style=flat-square&logo=openstreetmap&logoColor=white" />
</p>

🌦️ Predict • 🗺️ Monitor • 🤖 Analyse • 🚗 Navigate • 🛡️ Stay Safe

</div>

<p align="center">
🌦️ Weather Intelligence  • 
🌊 Flood Prediction  • 
⚡ Lightning Risk  • 
🌪️ Storm Risk  • 
🗺️ Risk Map  • 
🚗 Safe Route Analysis
</p>

<p align="center">
<img src="https://img.shields.io/badge/Python-3.x-blue?style=for-the-badge&logo=python" alt="Python">
<img src="https://img.shields.io/badge/Flask-Web%20App-black?style=for-the-badge&logo=flask" alt="Flask">
<img src="https://img.shields.io/badge/Machine%20Learning-Random%20Forest-16a34a?style=for-the-badge" alt="Machine Learning">
<img src="https://img.shields.io/badge/Maps-Leaflet%20%2B%20OpenStreetMap-orange?style=for-the-badge&logo=leaflet" alt="Maps">
</p>

<div align="center">

🌈 What is DisasterGuard AI?

</div>

DisasterGuard AI is a web-based disaster monitoring and decision-support system designed to help users understand current environmental risks and make safer travel decisions.

The project combines:

🤖 Machine Learning for flood-risk prediction

🌦️ Live weather data for environmental monitoring

📚 Historical disaster analysis

🗺️ Interactive risk mapping

🚗 Alternative route comparison

🚨 Emergency and safety guidance

📍 Location-based monitoring

Instead of showing only weather information, DisasterGuard AI brings multiple hazard indicators together in one dashboard and converts them into an easy-to-understand safety view.

<div align="center">

🌊 Flood

⚡ Lightning

🌪️ Storm

🚗 Route

AI Prediction

Risk Monitoring

Hazard Analysis

Safe Route

</div>

⚠️ Important: DisasterGuard AI is an educational/research project and should not be treated as an official emergency-warning or life-safety system.

✨🌟 Key Features

<div align="center">

🚀 Feature

💡 What it does

|---|---|
| 🌦️ Weather Risk | Monitors weather conditions and converts them into a risk indicator. |
| 🌊 AI Flood Prediction | Uses a trained Random Forest model with temperature, rainfall and maximum wind as inputs. |
| ⚡ Lightning Risk | Displays lightning-related risk information on the dashboard. |
| 🌪️ Storm Risk | Tracks storm-related environmental risk. |
| 🗺️ Multi-Hazard Risk Map | Visualizes the monitoring area and hazard zones on an interactive map. |
| 📚 Historical Risk | Calculates a city-level historical disaster risk score from stored disaster records. |
| 🔮 Risk Prediction | Combines available hazard information into an overall risk view. |
| 🚗 AI Safe Route Analysis | Analyses the current risk level and gives travel recommendations. |
| 🛣️ Route Comparison | Finds available driving alternatives and compares route exposure. |
| 🚨 Emergency Action Center | Provides emergency-oriented safety guidance and navigation options. |
| 🏥 Nearby Help | Provides links/workflows for locating shelters, hospitals and police assistance. |
| 📊 Dashboard Analytics | Presents risk cards, status indicators and map-based information in one interface. |

<div align="center">

🤖🧠 Artificial Intelligence

Random Forest Flood-Risk Prediction

</div>

The project includes a Random Forest Classifier for flood prediction.

Model inputs

The current trained model uses three features:

Temperature
Rainfall
Max_Wind

Target

Flood

The prediction endpoint returns:

{
"prediction": 0,
"result": "NORMAL",
"probability": 12.5
}

or:

{
"prediction": 1,
"result": "FLOOD RISK",
"probability": 78.4
}

Training process

The training script:

Loads data/ml_dataset.csv

Selects Temperature, Rainfall, and Max_Wind

Splits the dataset into training and testing sets

Trains a RandomForestClassifier

Evaluates the model using accuracy and classification report

Saves the trained model as:

models/flood_model.pkl

<div align="center">

📊📚 Dataset & Historical Intelligence

</div>

The repository contains several data sources used by the application.

Main ML dataset

data/ml_dataset.csv

Current dataset size in the supplied project:

4,228 records

9 columns

Important fields include:

Date
District
State
Latitude
Longitude
Temperature
Rainfall
Max_Wind
Flood

Historical weather dataset

data/historical_weather_dataset.csv

Contains historical weather records prepared for the project.

Flood/disaster data

data/flood_data.csv

Contains disaster/flood records with fields such as:

Date

Location

District

State

Latitude / Longitude

Severity

Area affected

Human casualties

Damage information

Event source

Historical disaster records

data/historical_disasters.json

The application uses these records for the Historical Risk calculation.

🔬 Historical Risk Analysis

DisasterGuard AI contains a dedicated historical-risk API:

GET /historical-risk?city=<city>

The application checks stored disaster records for the requested city and calculates a score based on:

Number of incidents

High-severity incidents

Medium-severity incidents

The result is converted into:

LOW
MEDIUM
HIGH
CRITICAL

This historical score is intended to provide additional context alongside current environmental conditions.

<div align="center">

🌦️⚡ Live Weather Intelligence

</div>

The dashboard uses weather information to support the current risk assessment.

The frontend connects to Open-Meteo for weather/forecast information and derives hazard indicators for the dashboard.

The system considers environmental signals related to:

🌧️ Rainfall
🌡️ Temperature
💨 Wind
⚡ Lightning
🌪️ Storm / Severe Weather

<div align="center">

🗺️🌍 Interactive Multi-Hazard Risk Map

</div>

The dashboard contains an interactive map powered by:

Leaflet + OpenStreetMap

The map can display:

📍 Monitoring location

🌊 Flood-risk zones

⚡ Lightning-risk zones

🌪️ Hazard information

🛣️ Route alternatives

🟢 Recommended route

⚪ Alternative routes

The map is designed to make complex risk information easier to understand visually.

<div align="center">

🚗🛣️ AI Safe Route Analysis

</div>

One of the main features of DisasterGuard AI is its Safe Route system.

The user can provide a destination and the system analyses the current environmental risk.

The route analysis considers:

Overall Risk
Flood Risk
Lightning Risk
Storm Risk
Severe Weather Risk

The system then produces a status such as:

🟢 LOW RISK
🟡 CAUTION
🟠 HIGH RISK
🔴 CRITICAL

It also generates a human-readable recommendation.

Example:

High Flood risk detected.
Avoid unnecessary travel and high-risk areas.
Avoid waterlogged roads, drainage areas and low-lying locations.

<div align="center">

🧭🛣️ Alternative Route Comparison

</div>

The /compare-routes endpoint provides route comparison.

How it works

Your Location
↓
Destination Geocoding
↓
Find Driving Routes
↓
Calculate Route Distance
↓
Estimate Environmental Exposure
↓
Compare Route Risk
↓
Recommend Safer Route

The project uses:

Nominatim / OpenStreetMap for destination geocoding

OSRM for driving-route generation

Project hazard-risk values for route exposure analysis

The route response can include:

Route distance
Estimated duration
Route risk
Route status
Recommendation
Route geometry

<div align="center">

🔄⚙️ How DisasterGuard AI Works

</div>

🌦️ Weather Data
│
▼
┌─────────────────────┐
│ Environmental Risk │
│ Processing │
└──────────┬──────────┘
│
┌───────────┼───────────┐
▼ ▼ ▼
🌊 Flood ⚡ Lightning 🌪️ Storm
│ │ │
└───────────┼───────────┘
▼
📊 Overall Risk
│
┌───────────┴───────────┐
▼ ▼
🤖 ML Flood Model 📚 Historical Data
│ │
└───────────┬───────────┘
▼
🛡️ DisasterGuard AI
│
┌───────────┼───────────┐
▼ ▼ ▼
🗺️ Risk Map 🚗 Safe Route 🚨 Safety

<div align="center">

🖥️📊 Smart Disaster Dashboard

</div>

The web dashboard is designed like a lightweight disaster-monitoring center.

Main dashboard sections

Current Safety Status

Weather Risk

Flood Risk

Lightning Risk

Storm Risk

Multi-Hazard Risk Map

Risk Prediction

Why This Risk?

Historical vs Current

Safe Route

Emergency Help

Safety Instructions

Emergency Action Center

Current Risk Alert

AI Safe Route Analysis

The interface uses a dark blue security-style sidebar with risk cards, maps, alerts and visual indicators.

<div align="center">

🧩💻 Technology Stack

</div>

Backend

🐍 Python

🌐 Flask

📦 Joblib

Machine Learning

🤖 Scikit-learn

🌲 Random Forest

🐼 Pandas

🔢 NumPy / numerical processing

Frontend

HTML5

CSS3

JavaScript

Leaflet.js

Maps & Routing

🗺️ OpenStreetMap

📍 Nominatim

🛣️ OSRM

Weather

🌦️ Open-Meteo

Model/Data Files

models/flood_model.pkl
data/ml_dataset.csv
data/historical_weather_dataset.csv
data/flood_data.csv
data/historical_disasters.json

<div align="center">

📁🗂️ Project Structure

</div>

DISASTERGUARD_AI/
│
├── app.py
├── train_model.py
├── prepare_dataset.py
├── check_dataset.py
├── check_historical_weather_dataset.py
├── clean_district_list.py
├── clean_flood_data.py
├── create_normal_samples.py
├── district_list.py
├── get_district_coordinates.py
├── historical_weather_batch_test.py
├── historical_weather_dataset.py
├── historical_weather_test.py
├── inspect_weather_data.py
│
├── data/
│ ├── ml_dataset.csv
│ ├── historical_weather_dataset.csv
│ ├── flood_data.csv
│ ├── flood_cleaned.csv
│ ├── disaster_ml_dataset.csv
│ ├── historical_disasters.json
│ ├── district_coordinates.csv
│ ├── district_coordinates_test.csv
│ └── district_list_cleaned.csv
│
├── models/
│ └── flood_model.pkl
│
├── static/
│ ├── css/
│ │ └── style.css
│ └── js/
│ └── dashboard.js
│
├── templates/
│ └── index.html
│
├── database/
│
└── requirements.txt

The supplied ZIP also contains a local venv/ directory. It is recommended not to commit a virtual environment to GitHub. Create a fresh virtual environment locally instead.

<div align="center">

🚀⚡ Installation & Setup

</div>

1️⃣ Clone the repository

git clone 
Krisha933/DISASTERGUARD_AI.git
cd DISASTERGUARD_AI

If your repository uses a different URL/name, replace the command with your repository URL.

2️⃣ Create a virtual environment

Windows

python -m venv venv

Activate it:

venv\Scripts\activate

macOS / Linux

python3 -m venv venv
source venv/bin/activate

3️⃣ Install dependencies

The current supplied requirements.txt contains Flask, but the project also imports packages required by the ML model and data-processing scripts.

For a complete local setup, install:

pip install flask pandas scikit-learn joblib

You can then freeze the working environment:

pip freeze > requirements.txt

▶️🔥 Run the Application

From the project root:

python app.py

You should see Flask start the development server.

Open the local address shown by Flask, commonly:

http://127.0.0.1:5000

or:

http://localhost:5000

🤖🌊 Train the Flood Model

If you want to retrain the model:

python train_model.py

The script reads:

data/ml_dataset.csv

and saves the trained model to:

models/flood_model.pkl

<div align="center">

🔌🌐 Main API Endpoints

</div>

Endpoint

Purpose

GET /

Loads the DisasterGuard AI dashboard

GET /predict-flood

Predicts flood risk from temperature, rainfall and wind

GET /historical-risk

Calculates historical disaster risk for a city

GET /safe-route

Analyses destination travel risk

GET /compare-routes

Finds and compares alternative routes

GET /geocode

Geocodes a location for map/routing workflows

Example flood prediction

/predict-flood?temperature=30&rainfall=120&wind=25

Example historical risk

/historical-risk?city=Lucknow

<div align="center">

📡🌐 External Services

</div>

DisasterGuard AI uses publicly accessible services for some functionality:

Service

Use

Open-Meteo

Weather data

OpenStreetMap

Map tiles

Nominatim

Destination geocoding

OSRM

Driving route generation

Google Maps

Navigation/search links from the dashboard

Availability and usage limits of external services can change.

<div align="center">

🎯🌍 Real-World Applications

</div>

DisasterGuard AI can demonstrate how technology could support:

🏙️ Smart Cities

Monitor environmental conditions and present location-based risk information.

🚗 Safer Travel

Help users understand whether current conditions may make a journey risky.

🏫 Educational Institutions

Demonstrate the practical use of Machine Learning, APIs, maps and disaster-data analysis.

🚨 Disaster Awareness

Present hazard information and safety recommendations through one interface.

🏢 Emergency Planning

Provide a prototype dashboard for studying multi-hazard monitoring workflows.

🗺️ Location-Based Risk Analysis

Combine geographic, weather and historical information for a selected area.

<div align="center">

🏆💎 Why This Project Is Different

</div>

DisasterGuard AI is not only a simple weather application.

It combines:

MACHINE LEARNING
+
WEATHER DATA
+
HISTORICAL DATA
+
RISK ANALYSIS
+
INTERACTIVE MAP
+
ROUTE COMPARISON
+
SAFETY GUIDANCE

This makes it suitable as a college project, hackathon prototype, AI/ML demonstration, and disaster-management concept project.

<div align="center">

⚠️🔎 Limitations

</div>

The current project is a prototype and has important limitations:

The flood model uses a limited set of input features.

Historical disaster data is limited compared with real-world disaster databases.

ML predictions can produce false positives or false negatives.

A model probability is not proof that a disaster will occur.

Route risk is an estimation based on the available hazard values and route exposure.

External APIs depend on network connectivity and third-party availability.

The project is not an official government emergency-warning system.

Production deployment would require authentication, logging, monitoring, stronger validation and reliable disaster-data sources.

<div align="center">

🔮🚀 Future Improvements

</div>

Possible upgrades include:

🧠 Deep Learning models

🌊 More advanced flood forecasting

🌎 Live GIS hazard layers

🛰️ Satellite/weather-data integration

📍 Real-time GPS tracking

🚨 SMS / Email / Push notifications

📱 Android mobile application

🗄️ Database-backed event history

👤 User authentication

🧭 More advanced route-risk scoring

🗺️ Live flood-zone overlays

🔥 Wildfire and heatwave prediction

🌍 More disaster categories

📈 Historical trend analytics

☁️ Cloud deployment

🐳 Docker support

🧪 Automated ML model evaluation

💡 Explainable AI for understanding predictions

<div align="center">

🔐🛡️ Safety & Responsible Use

</div>

DisasterGuard AI should be used only for authorized, educational, research and safety-awareness purposes.

Do not rely on this prototype as the sole source of information during an actual emergency.

During a real disaster, always follow instructions from official authorities and emergency services.

<div align="center">

👩‍💻✨ Meet the Developer

Krisha933

GitHub:

https://github.com/Krisha933

Project:

Krisha933/CyberShield_Ai

If the repository name has been changed to DISASTERGUARD_AI, update the project link above to the final repository URL.

<div align="center">

📜⚖️ License

</div>

This project is intended for educational and research use.

If you want others to legally use, modify and distribute the project, add an appropriate open-source license such as MIT License to the repository.

<div align="center">

⭐🏁 Conclusion

</div>

DisasterGuard AI demonstrates how Machine Learning, weather intelligence, historical disaster data, interactive maps and route analysis can be combined into a single disaster-risk dashboard.

The project provides:

🌦️ Environmental Monitoring
↓
🤖 ML Flood Prediction
↓
📚 Historical Risk Analysis
↓
🗺️ Multi-Hazard Visualization
↓
🚗 Safe Route Analysis
↓
🚨 Safety Recommendations

The goal is to make disaster-related information easier to understand and demonstrate how AI and modern web technologies can support smarter, safer and more informed decision-making.

<div align="center">

🛡️ DisasterGuard AI

Predict • Monitor • Analyse • Navigate • Stay Safe

<p>
<img src="https://img.shields.io/badge/🌦️%20Weather-Smart%20Monitoring-06B6D4?style=for-the-badge" />
<img src="https://img.shields.io/badge/🤖%20AI-Risk%20Prediction-8B5CF6?style=for-the-badge" />
<img src="https://img.shields.io/badge/🚗%20Routes-Safer%20Navigation-22C55E?style=for-the-badge" /> </p> Made with ❤️ for AI, ML & Disaster-Safety Innovation </div ye accha h essha ko rakha da rha h readme ma purana delete kr karna ja rha h

Haan 👍 overall README ka content kaafi accha hai aur hackathon/college project ke liye professional bhi lagega. Purana README delete karke ye wala rakh sakti ho.

Bas ek important correction zaroor karna:

⚠️ 1. GitHub Project Link change karo

Tumhare README me abhi ye hai:

Project:

https://github.com/Krisha933/CyberShield_Ai

Agar tumhara current project DisasterGuard AI hai aur repository bhi DISASTERGUARD_AI hai, to ise:

Project:

https://github.com/Krisha933/DISASTERGUARD_AI

kar do.

⚠️ 2. Markdown formatting

Jo content tumne yahan paste kiya hai, usme kuch jagah:

\<p>

aur

\</div>

dikh raha hai. Actual README.md me backslash \ nahi hona chahiye.

Correct:

<p align="center">
  ...
</p>

<div align="center">
  ...
</div>

Similarly tables ko proper Markdown format me rakhna:

| 🚀 Feature | 💡 What it does |
|---|---|
| 🌦️ Weather Risk | Monitors weather conditions and converts them into a risk indicator. |
| 🌊 AI Flood Prediction | Uses Random Forest for flood-risk prediction. |
| ⚡ Lightning Risk | Displays lightning-related risk information. |
⭐ 3. Ek aur important point

Tumhare README me Future Improvements ke andar ye features hain:

SMS / Email / Push notifications
Android mobile application
Live GIS hazard layers
More disaster categories
Database-backed history

Agar inme se koi feature already tumhare current project me implemented hai, to usko Future Improvements se hata kar Current Features me rakhna.

Tumne pehle jo Phase 2/Phase 3 features bataye the, unhe future nahi dikhana chahiye.

🏆 Final recommendation

Haan, purana README completely replace kar do.

Tumhara new README structure roughly ye hona chahiye:

🌪️ DisasterGuard AI
        ↓
About Project
        ↓
✨ Key Features
        ↓
🤖 AI / Random Forest
        ↓
📊 Dataset
        ↓
🌦️ Weather Intelligence
        ↓
🗺️ Risk Map
        ↓
🚗 Safe Route
        ↓
🛣️ Route Comparison
        ↓
🔄 System Architecture
        ↓
🖥️ Dashboard
        ↓
🧩 Technology Stack
        ↓
📁 Project Structure
        ↓
🚀 Installation
        ↓
🔌 APIs
        ↓
🌐 External Services
        ↓
🎯 Real-World Applications
        ↓
🏆 Why This Project Is Different
        ↓
⚠️ Limitations
        ↓
🔮 Future Improvements
        ↓
🔐 Safety
        ↓
👩‍💻 Developer

Ye README hackathon judges ko project ka purpose + AI + features + technical implementation + setup sab clearly explain karega.

बस पुराने README को हटाकर इसे final README बनाओ, और CyberShield_Ai वाला link जरूर बदल देना.

ok bhejo

Bilkul 👍 yeh final cleaned, professional, GitHub-ready README.md hai. Isme broken Markdown formatting fix kar diya hai aur CyberShield_Ai wala old link bhi hata diya hai.

Purane README.md ko completely delete karke neeche wala content paste kar do.

<div align="center">

# 🌪️ DisasterGuard AI

### 🚨 AI-Powered Multi-Hazard Disaster Risk Monitoring & Safe Route Assistant

<p>
  <img src="https://img.shields.io/badge/AI%20%26%20ML-Random%20Forest-8B5CF6?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Weather-Live%20Intelligence-06B6D4?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Maps-Leaflet%20%2B%20OSM-22C55E?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Routing-OSRM-F97316?style=for-the-badge" />
</p>

<p>
  <img src="https://img.shields.io/badge/Python-3.x-3776AB?style=flat-square&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/Flask-Web%20App-000000?style=flat-square&logo=flask&logoColor=white" />
  <img src="https://img.shields.io/badge/Scikit--learn-Machine%20Learning-F7931E?style=flat-square&logo=scikit-learn&logoColor=white" />
  <img src="https://img.shields.io/badge/OpenStreetMap-Mapping-7EBC6F?style=flat-square&logo=openstreetmap&logoColor=white" />
</p>

### 🌦️ Predict • 🗺️ Monitor • 🤖 Analyse • 🚗 Navigate • 🛡️ Stay Safe

</div>

---

<p align="center">

🌦️ **Weather Intelligence** &nbsp;•&nbsp;
🌊 **Flood Prediction** &nbsp;•&nbsp;
⚡ **Lightning Risk** &nbsp;•&nbsp;
🌪️ **Storm Risk** &nbsp;•&nbsp;
🗺️ **Risk Map** &nbsp;•&nbsp;
🚗 **Safe Route Analysis**

</p>

---

## 🌈 What is DisasterGuard AI?

**DisasterGuard AI** is a web-based disaster monitoring and decision-support system designed to help users understand current environmental risks and make safer travel decisions.

The project combines:

- 🤖 Machine Learning for flood-risk prediction
- 🌦️ Live weather intelligence
- 📚 Historical disaster analysis
- 🗺️ Interactive multi-hazard mapping
- ⚡ Lightning risk analysis
- 🌪️ Storm and severe-weather analysis
- 🚗 Safe route analysis
- 🛣️ Alternative route comparison
- 🚨 Emergency and safety guidance
- 📍 Location-based monitoring

Instead of showing only weather information, DisasterGuard AI combines multiple hazard indicators into a single dashboard and converts them into an easy-to-understand safety view.

> ⚠️ **Important:** DisasterGuard AI is an educational/research and hackathon prototype. It should not be treated as an official emergency-warning or life-safety system.

---

# ✨ Key Features

| 🚀 Feature | 💡 What it does |
|---|---|
| 🌦️ Weather Intelligence | Monitors current weather conditions and derives environmental risk indicators. |
| 🌊 AI Flood Prediction | Uses a trained Random Forest model with temperature, rainfall and maximum wind as inputs. |
| ⚡ Lightning Risk | Provides lightning-related risk information. |
| 🌪️ Storm Risk | Analyses storm and severe-weather conditions. |
| 🗺️ Multi-Hazard Risk Map | Visualizes monitoring locations and hazard information on an interactive map. |
| 📚 Historical Risk | Calculates city-level historical disaster risk from stored disaster records. |
| 🔮 Overall Risk Analysis | Combines available hazard information into an overall risk view. |
| 🚗 Safe Route Analysis | Analyses current environmental risk and provides travel recommendations. |
| 🛣️ Route Comparison | Generates and compares available driving routes based on risk exposure. |
| 🚨 Emergency Action Center | Provides emergency-oriented safety guidance and assistance options. |
| 🏥 Nearby Help | Supports locating hospitals, shelters and police assistance. |
| 📊 Dashboard Analytics | Presents risk cards, status indicators, maps and safety information in one interface. |

---

# 🤖🧠 Artificial Intelligence

## Random Forest Flood-Risk Prediction

DisasterGuard AI includes a **Random Forest Classifier** for flood-risk prediction.

### 📥 Model Inputs

The current trained model uses three features:

```text
Temperature
Rainfall
Max_Wind
🎯 Target
Flood
📤 Prediction Output

The prediction endpoint can return:

{
  "prediction": 0,
  "result": "NORMAL",
  "probability": 12.5
}

or:

{
  "prediction": 1,
  "result": "FLOOD RISK",
  "probability": 78.4
}
🧪 Model Training Process

The training script:

Loads data/ml_dataset.csv
Selects Temperature, Rainfall, and Max_Wind
Splits the dataset into training and testing sets
Trains a RandomForestClassifier
Evaluates the model using accuracy and classification report
Saves the trained model
models/flood_model.pkl
ML Pipeline
Historical Dataset
       ↓
Data Preparation
       ↓
Feature Selection
       ↓
Train / Test Split
       ↓
Random Forest Training
       ↓
Model Evaluation
       ↓
flood_model.pkl
       ↓
Flask API
       ↓
Web Dashboard
📊📚 Dataset & Historical Intelligence

The project contains multiple datasets used for machine learning, historical analysis and disaster-risk monitoring.

Main ML Dataset
data/ml_dataset.csv

Current dataset in the supplied project:

4,228 records
9 columns

Important fields include:

Date
District
State
Latitude
Longitude
Temperature
Rainfall
Max_Wind
Flood
Historical Weather Dataset
data/historical_weather_dataset.csv

Contains historical weather records prepared for project analysis.

Flood / Disaster Dataset
data/flood_data.csv

Contains disaster and flood records with information such as:

Date
Location
District
State
Latitude
Longitude
Severity
Area affected
Human casualties
Damage information
Event source
Historical Disaster Records
data/historical_disasters.json

These records are used by the application's historical-risk analysis.

🔬 Historical Risk Analysis

DisasterGuard AI provides a dedicated historical-risk API.

Endpoint
GET /historical-risk?city=<city>

The application analyses stored disaster records for the requested city.

The calculation considers:

Number of incidents
High-severity incidents
Medium-severity incidents

The result is converted into:

🟢 LOW
🟡 MEDIUM
🟠 HIGH
🔴 CRITICAL

This historical risk provides additional context alongside current environmental conditions.

🌦️⚡ Live Weather Intelligence

The dashboard uses live weather information to support current risk assessment.

The frontend connects to Open-Meteo for weather and forecast information and derives hazard indicators for the dashboard.

The system considers environmental signals related to:

🌧️ Rainfall
🌡️ Temperature
💨 Wind
⚡ Lightning
🌪️ Storm
⛈️ Severe Weather
🗺️🌍 Interactive Multi-Hazard Risk Map

The dashboard contains an interactive map powered by:

Leaflet + OpenStreetMap

The map can display:

📍 Monitoring location
🌊 Flood-risk information
⚡ Lightning-risk information
🌪️ Hazard information
🛣️ Route alternatives
🟢 Recommended route
⚪ Alternative routes

The purpose of the map is to make complex disaster-risk information easier to understand visually.

🚗🛣️ AI Safe Route Analysis

One of the main features of DisasterGuard AI is the Safe Route Analysis system.

The user can provide a destination and the system analyses the current environmental risk.

The analysis considers:

Overall Risk
Flood Risk
Lightning Risk
Storm Risk
Severe Weather Risk

The system can generate statuses such as:

🟢 LOW RISK
🟡 CAUTION
🟠 HIGH RISK
🔴 CRITICAL

It also provides a human-readable safety recommendation.

Example
High Flood Risk detected.

Avoid unnecessary travel and high-risk areas.

Avoid waterlogged roads, drainage areas
and low-lying locations.
🧭🛣️ Alternative Route Comparison

The /compare-routes endpoint provides route comparison.

How It Works
Your Location
      ↓
Destination Geocoding
      ↓
Driving Route Generation
      ↓
Route Distance Calculation
      ↓
Environmental Risk Analysis
      ↓
Route Risk Comparison
      ↓
Safer Route Recommendation
Technologies Used
Nominatim / OpenStreetMap — destination geocoding
OSRM — driving-route generation
Project hazard-risk values — route exposure analysis

The route response can include:

Route distance
Estimated duration
Route risk
Route status
Recommendation
Route geometry
🔄⚙️ How DisasterGuard AI Works
                 🌦️ Weather Data
                       │
                       ▼
            ┌─────────────────────┐
            │ Environmental Risk  │
            │     Processing      │
            └──────────┬──────────┘
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
      🌊 Flood     ⚡ Lightning   🌪️ Storm
          │            │            │
          └────────────┼────────────┘
                       ▼
                📊 Overall Risk
                       │
          ┌────────────┴────────────┐
          ▼                         ▼
   🤖 ML Flood Model        📚 Historical Data
          │                         │
          └────────────┬────────────┘
                       ▼
              🛡️ DisasterGuard AI
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
      🗺️ Risk Map   🚗 Safe Route  🚨 Safety
🖥️📊 Smart Disaster Dashboard

The web dashboard works as a lightweight disaster-monitoring center.

Main Dashboard Sections
🛡️ Current Safety Status
🌦️ Weather Risk
🌊 Flood Risk
⚡ Lightning Risk
🌪️ Storm Risk
🗺️ Multi-Hazard Risk Map
🔮 Risk Prediction
❓ Why This Risk?
📚 Historical vs Current Risk
🚗 Safe Route
🚨 Emergency Help
🆘 Safety Instructions
📍 Emergency Action Center

The interface uses a security-style dashboard design with risk cards, maps, alerts and visual indicators.

🧩💻 Technology Stack
Backend
🐍 Python
🌐 Flask
📦 Joblib
Machine Learning
🤖 Scikit-learn
🌲 Random Forest
🐼 Pandas
🔢 NumPy
Frontend
HTML5
CSS3
JavaScript
Leaflet.js
Maps & Routing
🗺️ OpenStreetMap
📍 Nominatim
🛣️ OSRM
Weather
🌦️ Open-Meteo
Model & Data Files
models/flood_model.pkl
data/ml_dataset.csv
data/historical_weather_dataset.csv
data/flood_data.csv
data/historical_disasters.json
📁🗂️ Project Structure
DISASTERGUARD_AI/
│
├── app.py
├── train_model.py
├── prepare_dataset.py
├── check_dataset.py
├── check_historical_weather_dataset.py
├── clean_district_list.py
├── clean_flood_data.py
├── create_normal_samples.py
├── district_list.py
├── get_district_coordinates.py
├── historical_weather_batch_test.py
├── historical_weather_dataset.py
├── historical_weather_test.py
├── inspect_weather_data.py
│
├── data/
│   ├── ml_dataset.csv
│   ├── historical_weather_dataset.csv
│   ├── flood_data.csv
│   ├── flood_cleaned.csv
│   ├── disaster_ml_dataset.csv
│   ├── historical_disasters.json
│   ├── district_coordinates.csv
│   ├── district_coordinates_test.csv
│   └── district_list_cleaned.csv
│
├── models/
│   └── flood_model.pkl
│
├── static/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── dashboard.js
│
├── templates/
│   └── index.html
│
├── database/
│
├── requirements.txt
│
└── README.md

💡 The local venv/ directory should not be committed to GitHub. Create a fresh virtual environment on your own machine instead.

🚀⚡ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/Krisha933/DISASTERGUARD_AI.git
cd DISASTERGUARD_AI
2️⃣ Create a Virtual Environment
Windows
python -m venv venv

Activate it:

venv\Scripts\activate
macOS / Linux
python3 -m venv venv
source venv/bin/activate
3️⃣ Install Dependencies

Install the required packages:

pip install flask pandas numpy scikit-learn joblib

Or, if your requirements.txt is complete:

pip install -r requirements.txt

After confirming that the project works, you can update the requirements file:

pip freeze > requirements.txt
▶️🔥 Run the Application

From the project root:

python app.py

Flask should start the development server.

Open:

http://127.0.0.1:5000

or:

http://localhost:5000

in your browser.

🤖🌊 Train the Flood Model

To retrain the Random Forest model:

python train_model.py

The script reads:

data/ml_dataset.csv

and saves the trained model to:

models/flood_model.pkl
🔌🌐 Main API Endpoints
Endpoint	Purpose
GET /	Loads the DisasterGuard AI dashboard
GET /predict-flood	Predicts flood risk
GET /historical-risk	Calculates historical disaster risk
GET /safe-route	Analyses destination travel risk
GET /compare-routes	Finds and compares alternative routes
GET /geocode	Geocodes a location
Example: Flood Prediction
/predict-flood?temperature=30&rainfall=120&wind=25
Example: Historical Risk
/historical-risk?city=Lucknow
📡🌐 External Services
Service	Purpose
🌦️ Open-Meteo	Weather and forecast data
🗺️ OpenStreetMap	Map data
📍 Nominatim	Destination geocoding
🛣️ OSRM	Driving route generation
🧭 Google Maps	Navigation/search links

External services may have their own availability, usage limits and terms.

🎯🌍 Real-World Applications

DisasterGuard AI demonstrates how technology could support:

🏙️ Smart Cities

Monitor environmental conditions and present location-based risk information.

🚗 Safer Travel

Help users understand whether current environmental conditions may make a journey risky.

🏫 Educational Institutions

Demonstrate the practical use of:

Machine Learning
APIs
Maps
Data analysis
Web development
🚨 Disaster Awareness

Present multiple hazard indicators and safety recommendations through one interface.

🏢 Emergency Planning

Provide a prototype dashboard for studying multi-hazard monitoring workflows.

🗺️ Location-Based Risk Analysis

Combine geographic, weather and historical information for a selected area.

🏆💎 Why This Project Is Different

DisasterGuard AI is not just a simple weather application.

It combines:

        🤖 MACHINE LEARNING
                 +
           🌦️ WEATHER DATA
                 +
         📚 HISTORICAL DATA
                 +
          ⚠️ RISK ANALYSIS
                 +
         🗺️ INTERACTIVE MAP
                 +
         🛣️ ROUTE COMPARISON
                 +
         🚨 SAFETY GUIDANCE
                 ↓
          🛡️ DISASTERGUARD AI

This makes the project suitable for:

🏆 Hackathons
🎓 College projects
🤖 AI/ML demonstrations
🌍 Disaster-management concepts
💻 Full-stack web development projects
⚠️🔎 Limitations

The current project is a prototype and has important limitations:

The flood model uses a limited set of input features.
Historical disaster data is limited compared with real-world disaster databases.
ML predictions can produce false positives or false negatives.
A model probability is not proof that a disaster will occur.
Route risk is an estimation based on available hazard values and route exposure.
External APIs depend on network connectivity and third-party availability.
Geographic coverage may vary depending on available data.
The project is not an official government emergency-warning system.

A production-grade system would require:

Reliable real-time disaster data
Stronger model validation
Authentication
Logging
Monitoring
Better data pipelines
Scalable infrastructure
Official emergency-data integrations
🔮🚀 Future Improvements

Possible future enhancements include:

🧠 Advanced Deep Learning models
🌊 More advanced flood forecasting
🛰️ Satellite imagery integration
📡 IoT sensor integration
📍 Real-time GPS tracking
🚨 SMS / Email / Push notifications
📱 Dedicated Android/iOS application
🗄️ Database-backed event history
👤 User authentication
🧭 Advanced route-risk scoring
🗺️ Live flood-zone overlays
🔥 Wildfire and heatwave prediction
🌍 Additional disaster categories
📈 Historical trend analytics
☁️ Cloud deployment
🐳 Docker support
🧪 Automated ML model evaluation
💡 Explainable AI for predictions
🔐🛡️ Safety & Responsible Use

DisasterGuard AI is designed for educational, research, hackathon and safety-awareness purposes.

Do not rely on this prototype as the sole source of information during an actual emergency.

During a real disaster, always follow instructions from:

Government authorities
Official disaster-management agencies
Local emergency services
Official weather authorities
👩‍💻✨ Developer
<div align="center">
Krisha Singh
B.Tech Computer Science & Engineering

🌪️ DisasterGuard AI

</div>
📜 License

This project is intended for educational and research purposes.

If you want to allow others to legally use, modify and distribute the project, consider adding an open-source license such as the MIT License.

⭐🏁 Conclusion

DisasterGuard AI demonstrates how Machine Learning, weather intelligence, historical disaster data, interactive maps and route analysis can be combined into a single disaster-risk monitoring platform.

🌦️ Environmental Monitoring
          ↓
🤖 ML Flood Prediction
          ↓
📚 Historical Risk Analysis
          ↓
🗺️ Multi-Hazard Visualization
          ↓
🚗 Safe Route Analysis
          ↓
🚨 Safety Recommendations
🎯 Project Goal

Make disaster-related information easier to understand and demonstrate how AI and modern web technologies can support smarter, safer and more informed decision-making.

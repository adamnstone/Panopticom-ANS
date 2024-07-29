import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AINav from './AINav.jsx'
import AIDashboard from './AIDashboard.jsx'
import Dashboard from './Dashboard.jsx'
import About from './About.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const LayerType = {
  STANDARD: 0,
  CUSTOM: 1
}

const layerData = [
  {
    title: "Expert Network Map",
    dataPath: '../datasets/formatted_datasets/exnm.jsonl',
    id: "exnm",
    layerType: LayerType.STANDARD
  },
  {
    title: "FabLabs",
    dataPath: '../datasets/formatted_datasets/labs.jsonl',
    id: "labs",
    layerType: LayerType.STANDARD
  },
  {
    title: "Individual Stories",
    dataPath: "../datasets/formatted_datasets/individual_stories.jsonl",
    id: "individual_stories",
    layerType: LayerType.STANDARD
  },
  {
    title: "Music Narrative Summaries",
    dataPath: "../datasets/formatted_datasets/music_narrative.jsonl",
    id: "music_narrative",
    layerType: LayerType.STANDARD
  },
  {
    title: "Radio Station Geo",
    dataPath: '../datasets/formatted_datasets/radio_hex.jsonl',
    id: "radio_hex",
    layerType: LayerType.STANDARD
  },
  {
    title: "Traditional Dance",
    dataPath: '../datasets/formatted_datasets/dance.jsonl',
    id: "dance",
    layerType: LayerType.STANDARD
  },
  {
    title: "Radio Stations",
    dataPath: '../datasets/radio_garden_data/radio_garden.jsonl',
    id: "radio_garden",
    layerType: LayerType.CUSTOM
  },
  {
    title: "Gender Inequality",
    dataPath: '../datasets/formatted_datasets/gender_inequality.jsonl',
    id: 'gender_inequality',
    layerType: LayerType.STANDARD
  },
  {
    title: "Humor",
    dataPath: '../datasets/formatted_datasets/humor.jsonl',
    id: 'humor',
    layerType: LayerType.STANDARD
  }
];

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
    // <App />
    <Router basename={import.meta.env.BASE_URL}>     
            <Routes>
                <Route exact path="/" element={<App layerData={layerData} LayerType={LayerType} />} />
                {/*<Route path="/ai-nav" element={<AINav />} />
                <Route path="/ai-dashboard" element={<AIDashboard />} />
                <Route path="/dashboard" element={<Dashboard layerData={layerData} LayerType={LayerType} />} />*/}
                <Route path="/about" element={<About />} />
            </Routes>
        </Router>
  //</React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import About from './About.jsx'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'

// enum for whether a dataset follows the JSONL Schema
const LayerType = {
  STANDARD: 0, // dataset follows the JSONL Schema
  CUSTOM: 1 // dataset doesn't follow the schema and requires custom behavior (e.g., radio garden)
}

// defines the details of each dataset to be included in the website
const layerData = [
  {
    title: "Expert Network Map",
    dataPath: './datasets/formatted_datasets/exnm.jsonl',
    id: "exnm",
    layerType: LayerType.STANDARD
  },
  {
    title: "FabLabs",
    dataPath: './datasets/formatted_datasets/labs.jsonl',
    id: "labs",
    layerType: LayerType.STANDARD
  },
  {
    title: "Individual Stories",
    dataPath: "./datasets/formatted_datasets/individual_stories.jsonl",
    id: "individual_stories",
    layerType: LayerType.STANDARD
  },
  {
    title: "Music Narrative Summaries",
    dataPath: "./datasets/formatted_datasets/music_narrative.jsonl",
    id: "music_narrative",
    layerType: LayerType.STANDARD
  },
  {
    title: "Radio Station Geo",
    dataPath: './datasets/formatted_datasets/radio_hex.jsonl',
    id: "radio_hex",
    layerType: LayerType.STANDARD
  },
  {
    title: "Traditional Dance",
    dataPath: './datasets/formatted_datasets/dance.jsonl',
    id: "dance",
    layerType: LayerType.STANDARD
  },
  {
    title: "Radio Stations",
    dataPath: './datasets/radio_garden_data/radio_garden.jsonl',
    id: "radio_garden",
    layerType: LayerType.CUSTOM
  },
  {
    title: "Gender Inequality",
    dataPath: './datasets/formatted_datasets/gender_inequality.jsonl',
    id: 'gender_inequality',
    layerType: LayerType.STANDARD
  },
  {
    title: "Humor",
    dataPath: './datasets/formatted_datasets/humor.jsonl',
    id: 'humor',
    layerType: LayerType.STANDARD
  }
];

// setup router component and define routes to the main visualization and the about page
ReactDOM.createRoot(document.getElementById('root')).render(
    <Router basename={import.meta.env.BASE_URL}>
        <Routes>
            <Route exact path="/" element={<App layerData={layerData} LayerType={LayerType} />} />
            <Route path="/about" element={<About />} />
        </Routes>
    </Router>
)

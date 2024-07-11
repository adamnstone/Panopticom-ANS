import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AINav from './AINav.jsx'
import AIDashboard from './AIDashboard.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
    // <App />
    <Router>     
            <Routes>
                <Route exact path="/" element={<App />} />
                <Route path="/ai-nav" element={<AINav />} />
                <Route path="/ai-dashboard" element={<AIDashboard />} />
            </Routes>
        </Router>
  //</React.StrictMode>,
)

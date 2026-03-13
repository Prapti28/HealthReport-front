import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UploadReport from './pages/UploadReport';
import ReportAnalysis from './pages/ReportAnalysis';
import DietPlan from './pages/DietPlan';
import HealthInsights from './pages/HealthInsights';
import HealthHistory from './pages/HealthHistory';
import AIHealthAssistant from './pages/AIHealthAssistant';
import Profile from './pages/Profile';

const App = () => {
  return (
    
      <Router>
        <Routes>
          <Route path= "/" element={<Home/>}/>
          <Route path= "/register" element={<Register/>}/>
          <Route path= "/login" element={<Login/>}/>
          <Route path= "/dashboard" element={<Dashboard/>}/>
          <Route path= "/upload-report" element={<UploadReport/>}/>
          <Route path="/report-analysis/:id" element={<ReportAnalysis/>}/>
          <Route path= "/dietplan" element={<DietPlan/>}/>
          <Route path= "/insights" element={<HealthInsights/>}/>         
          <Route path= "/history" element={<HealthHistory/>}/>         
          <Route path= "/assistant" element={<AIHealthAssistant/>}/>         
          <Route path= "/profile" element={<Profile/>}/>
        </Routes>
      </Router>
    
  )
}

export default App
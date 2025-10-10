import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import existing pages
import LandingPage from '../pages/LandingPage';
import OnboardingPage from '../pages/OnboardingPage';
import DashboardPage from '../pages/DashboardPage';
import TestHubPage from '../pages/TestHubPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/tests" element={<TestHubPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
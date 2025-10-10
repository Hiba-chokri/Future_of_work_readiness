import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, CheckCircle, TrendingUp, Users, Target } from 'lucide-react';

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Navigate to Page 2: Onboarding
    navigate('/onboarding');
  };

  const handleLogin = () => {
    // Navigate to Page 3: Dashboard after login
    navigate('/dashboard');
    setShowLogin(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
                FutureReady
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowLogin(true)}
                className="text-gray-700 hover:text-blue-600 font-semibold transition-colors px-4 py-2"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Are You Ready for the{' '}
                <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  Future of Work?
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed">
                Test your skills, get your readiness score, and prepare for tomorrow's jobs.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={handleGetStarted}
                className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>Get Started for Free</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-600">No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-600">Free forever</span>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-orange-400/20 rounded-3xl blur-3xl"></div>
            
            {/* Main visual card */}
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 lg:p-10 border border-gray-100">
              <div className="space-y-8">
                {/* Score Display */}
                <div className="text-center pb-6 border-b border-gray-100">
                  <div className="inline-flex items-center justify-center w-40 h-40 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 mb-4 relative">
                    <div className="absolute inset-0 rounded-full border-8 border-blue-600 border-t-transparent animate-spin" style={{ animationDuration: '3s' }}></div>
                    <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent z-10">
                      85%
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Future Readiness Score</h3>
                  <p className="text-gray-500 mt-1">Your personalized career metric</p>
                </div>

                {/* Feature highlights */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 rounded-xl bg-blue-50 border border-blue-100">
                    <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Skill Assessment</h4>
                      <p className="text-sm text-gray-600 mt-1">Industry-specific tests and simulations</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 rounded-xl bg-orange-50 border border-orange-100">
                    <div className="w-10 h-10 rounded-lg bg-orange-600 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Track Progress</h4>
                      <p className="text-sm text-gray-600 mt-1">Monitor improvement over time</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 rounded-xl bg-blue-50 border border-blue-100">
                    <div className="w-10 h-10 rounded-lg bg-blue-700 flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Compare & Learn</h4>
                      <p className="text-sm text-gray-600 mt-1">Benchmark against peers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform transition-all">
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h3>
              <p className="text-gray-600">Login to continue your journey</p>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <input 
                  type="password" 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="••••••••"
                />
              </div>
              
              <button 
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                Login to Dashboard
              </button>
              
              <div className="text-center pt-4">
                <button 
                  onClick={() => setShowLogin(false)}
                  className="text-gray-500 hover:text-gray-700 font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
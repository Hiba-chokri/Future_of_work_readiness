import React from 'react';

export default function TestHubPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Test Hub</h1>
        <p className="text-gray-600 mb-6">Explore available tests</p>
        <div className="space-y-4">
          <div className="w-full bg-purple-100 rounded-lg p-4">
            <p className="text-purple-800">Test hub under development!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

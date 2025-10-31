import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, XCircle, Clock, Trophy, ArrowLeft, RotateCcw, Target } from 'lucide-react';

const TestResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { 
    test, 
    answers, 
    score, 
    timeSpent, 
    result, 
    autoSubmit = false 
  } = location.state || {};

  if (!test || !result) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No test results found.</p>
          <button
            onClick={() => navigate('/test-hub')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Back to Test Hub
          </button>
        </div>
      </div>
    );
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 90) return 'bg-green-100 border-green-200';
    if (score >= 70) return 'bg-blue-100 border-blue-200';
    if (score >= 50) return 'bg-yellow-100 border-yellow-200';
    return 'bg-red-100 border-red-200';
  };

  const getPerformanceMessage = (score) => {
    if (score >= 90) return { message: "Excellent work!", icon: Trophy };
    if (score >= 70) return { message: "Great job!", icon: CheckCircle };
    if (score >= 50) return { message: "Good effort!", icon: Target };
    return { message: "Keep practicing!", icon: RotateCcw };
  };

  const performance = getPerformanceMessage(score);
  const Icon = performance.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <button
              onClick={() => navigate('/test-hub')}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Test Results</h1>
              <p className="text-gray-600 mt-1">{test.title}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {autoSubmit && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-yellow-600 mr-2" />
              <p className="text-yellow-800">
                Time's up! Your test was automatically submitted.
              </p>
            </div>
          </div>
        )}

        {/* Score Overview */}
        <div className={`bg-white rounded-xl shadow-lg p-8 mb-8 border-2 ${getScoreBgColor(score)}`}>
          <div className="text-center">
            <Icon className={`h-16 w-16 mx-auto mb-4 ${getScoreColor(score)}`} />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{performance.message}</h2>
            <div className={`text-6xl font-bold mb-4 ${getScoreColor(score)}`}>
              {score}%
            </div>
            <p className="text-gray-600 text-lg">
              {result.passed ? 'You passed the test!' : 'You need 70% to pass. Try again!'}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {Object.keys(answers).length}/{test.questions.length}
            </div>
            <div className="text-sm text-gray-600">Questions Answered</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {formatTime(timeSpent)}
            </div>
            <div className="text-sm text-gray-600">Time Taken</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {test.difficulty}
            </div>
            <div className="text-sm text-gray-600">Difficulty Level</div>
          </div>
        </div>

        {/* Question Review */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Question Review</h3>
          <div className="space-y-6">
            {test.questions.map((question, index) => {
              const userAnswer = answers[question.id];
              const isCorrect = userAnswer === question.correct;
              
              return (
                <div key={question.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-start gap-3 mb-3">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-2">
                        Question {index + 1}: {question.question}
                      </h4>
                      
                      {question.type === 'multiple-choice' && question.options && (
                        <div className="space-y-2">
                          {question.options.map((option, optionIndex) => {
                            const isUserAnswer = userAnswer === optionIndex;
                            const isCorrectAnswer = question.correct === optionIndex;
                            
                            return (
                              <div 
                                key={optionIndex}
                                className={`p-2 rounded border ${
                                  isCorrectAnswer 
                                    ? 'bg-green-50 border-green-200 text-green-800'
                                    : isUserAnswer && !isCorrectAnswer
                                    ? 'bg-red-50 border-red-200 text-red-800'
                                    : 'bg-gray-50 border-gray-200'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  {isUserAnswer && (
                                    <span className="text-xs font-medium">Your answer:</span>
                                  )}
                                  {isCorrectAnswer && (
                                    <span className="text-xs font-medium">Correct:</span>
                                  )}
                                  <span>{option}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      
                      {question.type === 'true-false' && (
                        <div className="space-y-2">
                          <div className={`p-2 rounded border ${
                            question.correct === true
                              ? 'bg-green-50 border-green-200 text-green-800'
                              : userAnswer === true && question.correct !== true
                              ? 'bg-red-50 border-red-200 text-red-800'
                              : 'bg-gray-50 border-gray-200'
                          }`}>
                            <div className="flex items-center gap-2">
                              {userAnswer === true && <span className="text-xs font-medium">Your answer:</span>}
                              {question.correct === true && <span className="text-xs font-medium">Correct:</span>}
                              <span>True</span>
                            </div>
                          </div>
                          <div className={`p-2 rounded border ${
                            question.correct === false
                              ? 'bg-green-50 border-green-200 text-green-800'
                              : userAnswer === false && question.correct !== false
                              ? 'bg-red-50 border-red-200 text-red-800'
                              : 'bg-gray-50 border-gray-200'
                          }`}>
                            <div className="flex items-center gap-2">
                              {userAnswer === false && <span className="text-xs font-medium">Your answer:</span>}
                              {question.correct === false && <span className="text-xs font-medium">Correct:</span>}
                              <span>False</span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {question.explanation && (
                        <div className="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400">
                          <p className="text-sm text-blue-800">
                            <strong>Explanation:</strong> {question.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/test-hub')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Browse More Tests
          </button>
          
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
          >
            Back to Dashboard
          </button>
          
          {!result.passed && (
            <button
              onClick={() => navigate('/test-taking', { state: { testId: test.id } })}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Retake Test
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestResultsPage;

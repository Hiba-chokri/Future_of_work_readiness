// Comprehensive test library - available to all users
export const testLibrary = [
  {
    id: 'business-ethics-scenarios',
    title: 'Business Ethics Scenarios',
    description: 'Navigate complex ethical dilemmas in professional settings',
    category: 'Business',
    difficulty: 'Intermediate',
    estimatedTime: 20,
    tags: ['ethics', 'decision-making', 'professional'],
    questions: [
      {
        id: 1,
        type: 'scenario',
        scenario: 'You discover that your company is overcharging a major client due to a billing error. Your manager tells you to ignore it since the client hasn\'t noticed.',
        question: 'What should you do?',
        options: [
          'Follow your manager\'s instruction and ignore the error',
          'Privately inform the client about the overcharge',
          'Report the issue to higher management or HR',
          'Discuss the ethical concerns with your manager first'
        ],
        correct: 3,
        explanation: 'The best approach is to first address ethical concerns with your manager, giving them a chance to correct the situation before escalating.'
      },
      {
        id: 2,
        type: 'scenario',
        scenario: 'During a job interview, you\'re asked about a skill you don\'t actually possess but could potentially learn quickly.',
        question: 'How should you respond?',
        options: [
          'Claim you have the skill to get the job',
          'Admit you don\'t have it but express willingness to learn',
          'Deflect the question and talk about other skills',
          'Say you have "some experience" to avoid lying directly'
        ],
        correct: 1,
        explanation: 'Honesty builds trust. Admitting you don\'t have a skill but showing eagerness to learn demonstrates integrity and growth mindset.'
      }
    ]
  },
  {
    id: 'digital-communication-essentials',
    title: 'Digital Communication Essentials',
    description: 'Master the fundamentals of effective online communication',
    category: 'Communication',
    difficulty: 'Beginner',
    estimatedTime: 15,
    tags: ['communication', 'digital', 'professional'],
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'What is the most important factor in professional email communication?',
        options: [
          'Using complex vocabulary to sound intelligent',
          'Writing long detailed explanations',
          'Being clear, concise, and respectful',
          'Using lots of emojis to be friendly'
        ],
        correct: 2,
        explanation: 'Professional emails should prioritize clarity, conciseness, and respectful tone to ensure effective communication.'
      },
      {
        id: 2,
        type: 'true-false',
        question: 'It\'s appropriate to use "Reply All" when your response is only relevant to the original sender.',
        correct: false,
        explanation: '"Reply All" should only be used when your response is relevant to everyone on the email thread.'
      }
    ]
  },
  {
    id: 'data-analysis-fundamentals',
    title: 'Data Analysis Fundamentals',
    description: 'Essential concepts for working with data in any field',
    category: 'Technology',
    difficulty: 'Intermediate',
    estimatedTime: 25,
    tags: ['data', 'analysis', 'statistics'],
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'What does it mean when data is "normally distributed"?',
        options: [
          'The data contains no errors',
          'The data follows a bell-shaped curve pattern',
          'The data is randomly arranged',
          'The data has been cleaned and processed'
        ],
        correct: 1,
        explanation: 'Normal distribution refers to data that follows a bell-shaped curve, with most values clustering around the mean.'
      },
      {
        id: 2,
        type: 'scenario',
        scenario: 'You\'re analyzing customer satisfaction scores and notice that 90% of responses are either 1 (very dissatisfied) or 5 (very satisfied), with very few 2s, 3s, or 4s.',
        question: 'What might this pattern suggest?',
        options: [
          'The survey is working perfectly',
          'Customers have polarized opinions',
          'There might be a survey design issue',
          'The sample size is too small'
        ],
        correct: 2,
        explanation: 'This bi-modal distribution might indicate survey design issues, such as unclear rating scales or forced choices.'
      }
    ]
  },
  {
    id: 'project-management-basics',
    title: 'Project Management Basics',
    description: 'Core principles of managing projects effectively',
    category: 'Management',
    difficulty: 'Beginner',
    estimatedTime: 18,
    tags: ['project-management', 'planning', 'leadership'],
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'What is the primary purpose of a project timeline?',
        options: [
          'To impress stakeholders with detailed planning',
          'To track progress and manage dependencies',
          'To estimate the total project cost',
          'To assign blame when delays occur'
        ],
        correct: 1,
        explanation: 'A project timeline helps track progress, identify dependencies, and ensure tasks are completed in the right order.'
      }
    ]
  },
  {
    id: 'remote-work-skills',
    title: 'Remote Work Skills',
    description: 'Essential skills for effective remote collaboration',
    category: 'Professional Skills',
    difficulty: 'Beginner',
    estimatedTime: 12,
    tags: ['remote-work', 'collaboration', 'productivity'],
    questions: [
      {
        id: 1,
        type: 'scenario',
        scenario: 'You\'re working from home and having trouble staying focused due to household distractions.',
        question: 'What\'s the most effective strategy?',
        options: [
          'Work late at night when it\'s quiet',
          'Create a dedicated workspace and set boundaries',
          'Take frequent breaks to handle distractions',
          'Play background music to mask noise'
        ],
        correct: 1,
        explanation: 'Creating a dedicated workspace and setting clear boundaries with household members is most effective for maintaining focus.'
      }
    ]
  }
];

// Legacy test questions for backward compatibility
export const testQuestions = {
  // Technology Tests
  'technology-data-data-science': {
    title: 'Data Science Fundamentals',
    description: 'Test your knowledge of data science concepts and techniques',
    difficulty: 'Intermediate',
    duration: 15, // minutes
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'Which Python library is primarily used for data manipulation and analysis?',
        options: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn'],
        correct: 1, // Pandas
        explanation: 'Pandas is the primary library for data manipulation and analysis in Python, built on top of NumPy.'
      },
      {
        id: 2,
        type: 'multiple-choice',
        question: 'What does "overfitting" mean in machine learning?',
        options: [
          'Model performs well on training data but poorly on new data',
          'Model performs poorly on all data',
          'Model is too simple to capture patterns',
          'Model training takes too long'
        ],
        correct: 0,
        explanation: 'Overfitting occurs when a model learns the training data too well, including noise, making it perform poorly on unseen data.'
      },
      {
        id: 3,
        type: 'true-false',
        question: 'Cross-validation is used to assess how well a model will generalize to unseen data.',
        correct: true,
        explanation: 'Cross-validation is a technique to evaluate model performance by training and testing on different subsets of data.'
      },
      {
        id: 4,
        type: 'multiple-choice',
        question: 'Which of the following is NOT a supervised learning algorithm?',
        options: ['Linear Regression', 'K-Means Clustering', 'Decision Trees', 'Random Forest'],
        correct: 1, // K-Means is unsupervised
        explanation: 'K-Means Clustering is an unsupervised learning algorithm used for grouping data without labeled examples.'
      },
      {
        id: 5,
        type: 'multiple-choice',
        question: 'What is the purpose of feature scaling in machine learning?',
        options: [
          'To reduce the number of features',
          'To normalize feature values to similar ranges',
          'To create new features',
          'To remove outliers'
        ],
        correct: 1,
        explanation: 'Feature scaling ensures all features contribute equally to the model by normalizing their ranges.'
      }
    ]
  },

  'technology-web-development-frontend': {
    title: 'Frontend Development Essentials',
    description: 'Test your knowledge of modern frontend technologies',
    difficulty: 'Beginner to Intermediate',
    duration: 12,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'Which of the following is NOT a JavaScript framework?',
        options: ['React', 'Vue.js', 'Angular', 'Laravel'],
        correct: 3, // Laravel is PHP
        explanation: 'Laravel is a PHP framework for backend development, not JavaScript.'
      },
      {
        id: 2,
        type: 'true-false',
        question: 'CSS Grid is better than Flexbox for all layout scenarios.',
        correct: false,
        explanation: 'CSS Grid and Flexbox serve different purposes. Grid is for 2D layouts, Flexbox for 1D layouts.'
      },
      {
        id: 3,
        type: 'multiple-choice',
        question: 'What does "responsive web design" mean?',
        options: [
          'Websites that load quickly',
          'Websites that work on different screen sizes',
          'Websites with animations',
          'Websites that respond to user clicks'
        ],
        correct: 1,
        explanation: 'Responsive web design ensures websites adapt and work well on various devices and screen sizes.'
      },
      {
        id: 4,
        type: 'multiple-choice',
        question: 'Which HTML5 element is used for navigation links?',
        options: ['<navigation>', '<nav>', '<menu>', '<links>'],
        correct: 1,
        explanation: 'The <nav> element represents a section of navigation links in HTML5.'
      }
    ]
  },

  'business-management-project-management': {
    title: 'Project Management Fundamentals',
    description: 'Test your understanding of project management principles',
    difficulty: 'Intermediate',
    duration: 18,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'What does "MVP" stand for in project management?',
        options: [
          'Most Valuable Player',
          'Minimum Viable Product',
          'Maximum Value Proposition',
          'Multi-Version Platform'
        ],
        correct: 1,
        explanation: 'MVP stands for Minimum Viable Product - the simplest version that provides value to users.'
      },
      {
        id: 2,
        type: 'true-false',
        question: 'Agile methodology emphasizes comprehensive documentation over working software.',
        correct: false,
        explanation: 'Agile values working software over comprehensive documentation, though documentation is still important.'
      },
      {
        id: 3,
        type: 'multiple-choice',
        question: 'In Scrum, what is a "Sprint"?',
        options: [
          'A running exercise for the team',
          'A fixed time period for completing work',
          'A type of software bug',
          'A project milestone'
        ],
        correct: 1,
        explanation: 'A Sprint is a fixed time period (usually 1-4 weeks) during which specific work must be completed.'
      }
    ]
  },

  'healthcare-clinical-nursing': {
    title: 'Digital Health in Nursing',
    description: 'Explore how technology impacts modern nursing practice',
    difficulty: 'Intermediate',
    duration: 20,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'What is telemedicine?',
        options: [
          'Medicine delivered by telephone',
          'Remote healthcare services using technology',
          'Television programs about medicine',
          'Automated medication dispensing'
        ],
        correct: 1,
        explanation: 'Telemedicine involves providing healthcare services remotely using telecommunications technology.'
      },
      {
        id: 2,
        type: 'true-false',
        question: 'Electronic Health Records (EHRs) improve patient safety by reducing medication errors.',
        correct: true,
        explanation: 'EHRs help reduce errors through drug interaction checking, allergy alerts, and improved legibility.'
      },
      {
        id: 3,
        type: 'multiple-choice',
        question: 'What is the primary benefit of wearable health devices for patients?',
        options: [
          'Entertainment during hospital stays',
          'Continuous health monitoring',
          'Fashion accessory',
          'Communication with family'
        ],
        correct: 1,
        explanation: 'Wearable devices enable continuous monitoring of vital signs and health metrics.'
      }
    ]
  }
};

// Skill-based practical exercises
export const skillExercises = {
  'technology-data-data-science': {
    title: 'Data Analysis Challenge',
    description: 'Complete a hands-on data analysis task',
    type: 'practical',
    duration: 30,
    tasks: [
      {
        id: 1,
        title: 'Data Cleaning',
        description: 'You have a dataset with missing values. What steps would you take to handle them?',
        type: 'scenario',
        scenario: 'Customer dataset with 20% missing age values and 10% missing income values.',
        options: [
          'Remove all rows with missing data',
          'Fill missing ages with median, missing income with mean',
          'Use machine learning to predict missing values',
          'Replace all missing values with zero'
        ],
        correct: 1,
        explanation: 'For numerical data, median (age) and mean (income) are typically good imputation strategies.'
      },
      {
        id: 2,
        title: 'Algorithm Selection',
        description: 'You need to predict customer churn (yes/no). Which algorithm would you choose?',
        type: 'scenario',
        options: [
          'Linear Regression',
          'K-Means Clustering',
          'Logistic Regression',
          'Principal Component Analysis'
        ],
        correct: 2,
        explanation: 'Logistic Regression is ideal for binary classification problems like predicting churn (yes/no).'
      }
    ]
  },

  'technology-web-development-frontend': {
    title: 'Frontend Development Challenge',
    description: 'Build a responsive component',
    type: 'practical',
    duration: 45,
    tasks: [
      {
        id: 1,
        title: 'CSS Layout Challenge',
        description: 'Create a responsive navigation bar that collapses on mobile devices.',
        type: 'coding',
        startingCode: `
<!-- HTML -->
<nav class="navbar">
  <div class="nav-brand">Logo</div>
  <div class="nav-menu">
    <a href="#" class="nav-link">Home</a>
    <a href="#" class="nav-link">About</a>
    <a href="#" class="nav-link">Contact</a>
  </div>
</nav>

/* CSS - Complete the responsive styles */
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}

/* Add your mobile-first responsive styles here */
        `,
        evaluation: 'manual', // Would be evaluated manually or with automated testing
        points: 25
      }
    ]
  }
};

// Helper functions for test management
export const getTestForSpecialization = (industry, branch, specialization) => {
  const key = `${industry}-${branch}-${specialization}`;
  return testQuestions[key] || null;
};

export const getSkillExerciseForSpecialization = (industry, branch, specialization) => {
  const key = `${industry}-${branch}-${specialization}`;
  return skillExercises[key] || null;
};

// Test result calculation
export const calculateTestScore = (answers, correctAnswers) => {
  let correct = 0;
  answers.forEach((answer, index) => {
    if (answer === correctAnswers[index]) {
      correct++;
    }
  });
  return Math.round((correct / correctAnswers.length) * 100);
};

// Save test results to localStorage
export const saveTestResult = (userId, testId, score, answers, timeSpent) => {
  const results = getTestResults(userId);
  const newResult = {
    id: Date.now().toString(),
    testId,
    score,
    answers,
    timeSpent,
    completedAt: new Date().toISOString(),
    passed: score >= 70 // 70% passing grade
  };
  
  results.push(newResult);
  localStorage.setItem(`testResults_${userId}`, JSON.stringify(results));
  
  return newResult;
};

// Get all test results for a user
export const getTestResults = (userId) => {
  try {
    const results = localStorage.getItem(`testResults_${userId}`);
    return results ? JSON.parse(results) : [];
  } catch {
    return [];
  }
};

// Get user's test statistics
export const getUserTestStats = (userId) => {
  const results = getTestResults(userId);
  
  if (results.length === 0) {
    return {
      totalTests: 0,
      averageScore: 0,
      passedTests: 0,
      failedTests: 0,
      totalTimeSpent: 0
    };
  }
  
  const totalScore = results.reduce((sum, result) => sum + result.score, 0);
  const passedTests = results.filter(result => result.passed).length;
  const totalTime = results.reduce((sum, result) => sum + (result.timeSpent || 0), 0);
  
  return {
    totalTests: results.length,
    averageScore: Math.round(totalScore / results.length),
    passedTests,
    failedTests: results.length - passedTests,
    totalTimeSpent: totalTime
  };
};

// Get all available tests with filtering and sorting options
export const getAvailableTests = (filterOptions = {}) => {
  let tests = [...testLibrary];
  
  // Apply filters
  if (filterOptions.category) {
    tests = tests.filter(test => test.category === filterOptions.category);
  }
  
  if (filterOptions.difficulty) {
    tests = tests.filter(test => test.difficulty === filterOptions.difficulty);
  }
  
  if (filterOptions.maxTime) {
    tests = tests.filter(test => test.estimatedTime <= filterOptions.maxTime);
  }
  
  if (filterOptions.search) {
    const searchTerm = filterOptions.search.toLowerCase();
    tests = tests.filter(test => 
      test.title.toLowerCase().includes(searchTerm) ||
      test.description.toLowerCase().includes(searchTerm) ||
      test.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }
  
  // Apply sorting
  if (filterOptions.sortBy) {
    switch (filterOptions.sortBy) {
      case 'title':
        tests.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'difficulty':
        const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
        tests.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
        break;
      case 'time':
        tests.sort((a, b) => a.estimatedTime - b.estimatedTime);
        break;
      case 'category':
        tests.sort((a, b) => a.category.localeCompare(b.category));
        break;
      default:
        break;
    }
  }
  
  return tests;
};

// Get a specific test by ID
export const getTestById = (testId) => {
  return testLibrary.find(test => test.id === testId) || null;
};

// Get available categories for filtering
export const getTestCategories = () => {
  const categories = [...new Set(testLibrary.map(test => test.category))];
  return categories.sort();
};

// Get available difficulty levels
export const getDifficultyLevels = () => {
  return ['Beginner', 'Intermediate', 'Advanced'];
};

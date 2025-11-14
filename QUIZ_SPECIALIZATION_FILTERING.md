# Quiz Specialization Filtering - Implementation Guide

## Problem Solved

Previously, when a user selected a specialization (e.g., "Data Analytics"), they would see quizzes from ALL specializations including Frontend Development, Data Science, Cybersecurity, etc.

**Now Fixed**: Each specialization shows ONLY its own specific quizzes.

## Changes Made

### Backend Changes

1. **Updated `/api/quizzes` endpoint** (`Backend/app/api/quizzes.py`):
   - Added optional `specialization_id` query parameter
   - Filters quizzes by specialization when parameter is provided
   - Returns all quizzes if no filter is specified

```python
@router.get("/quizzes", response_model=schemas.QuizzesResponse)
def get_all_quizzes(specialization_id: int = None, db: Session = Depends(get_db)):
    """
    Get all quizzes, optionally filtered by specialization_id
    """
    quizzes = crud.get_all_quizzes(db)
    
    # Filter by specialization if provided
    if specialization_id:
        quizzes = [q for q in quizzes if q.specialization_id == specialization_id]
    
    # ... rest of the code
```

### Frontend Changes

2. **Updated `TestHubPage.jsx`** (`Frontend/pages/TestHubPage.jsx`):
   - Extracts user's `specializationId` from their profile
   - Adds `?specialization_id=X` query parameter when fetching quizzes
   - User only sees quizzes for their chosen specialization

```javascript
const loadTests = async () => {
  // Get user's specialization ID
  const specializationId = user?.specializationId || user?.specialization_id;
  
  // Build URL with filter
  let url = 'http://localhost:8000/api/quizzes';
  if (specializationId) {
    url += `?specialization_id=${specializationId}`;
  }
  
  const response = await fetch(url);
  // ... transform and display
};
```

## How It Works Now

1. User logs in and has a specialization (e.g., "QA Automation Engineer", ID: 6)
2. User navigates to Test Hub page
3. Frontend fetches: `GET /api/quizzes?specialization_id=6`
4. Backend returns ONLY quizzes where `quiz.specialization_id == 6`
5. User sees only QA Automation quizzes (no Frontend, Data Science, etc.)

## Example Quiz Added

**QA Automation Fundamentals - Level 1**
- Specialization: Software Engineering in Test (SET) / QA Automation (ID: 6)
- 20 questions covering:
  - QA basics (what is QA, bugs, defects)
  - Testing types (black-box, white-box, functional, non-functional)
  - Test concepts (test cases, bug reports, severity, priority)
  - SDLC and STLC
  - Positive/negative testing
  - Regression and acceptance testing

## Specialization IDs Reference

```
Technology Sector:
├─ Software Development & Engineering
│  ├─ 1: Frontend Development
│  ├─ 2: Backend Development
│  ├─ 3: Full-Stack Development
│  ├─ 4: Mobile Development
│  ├─ 5: Game Development
│  └─ 6: Software Engineering in Test (SET) / QA Automation ✓ (1 quiz added)
│
├─ Data & Artificial Intelligence
│  ├─ 7: Data Analytics
│  ├─ 8: Data Science
│  ├─ 9: Data Engineering
│  ├─ 10: AI / Machine Learning Engineering
│  └─ 11: Database Administration (DBA)
│
├─ Cybersecurity
│  ├─ 12: Cybersecurity Analyst / InfoSec Analyst
│  ├─ 13: Penetration Tester / Ethical Hacker
│  ├─ 14: Security Engineering
│  └─ 15: Governance, Risk & Compliance (GRC)
│
└─ ... (more branches and specializations)
```

## How to Add Quizzes for Other Specializations

### Step 1: Create Quiz JSON File

Create a file like `Backend/data/your_specialization_quizzes.json`:

```json
{
  "specialization_name": "Data Analytics",
  "specialization_id": 7,
  "quizzes": [
    {
      "title": "Data Analytics Fundamentals - Level 1",
      "description": "Core concepts of data analysis, visualization, and reporting",
      "difficulty_level": 1,
      "time_limit_minutes": 30,
      "passing_score": 70.0,
      "questions": [
        {
          "question_text": "What is the primary goal of Data Analytics?",
          "question_type": "multiple_choice",
          "points": 1,
          "explanation": "Data Analytics focuses on examining historical data to find trends and answer business questions.",
          "options": [
            {"option_text": "To build predictive models", "is_correct": false},
            {"option_text": "To interpret historical data and find trends", "is_correct": true},
            {"option_text": "To write frontend code", "is_correct": false},
            {"option_text": "To manage databases", "is_correct": false}
          ]
        }
        // ... more questions
      ]
    }
  ]
}
```

### Step 2: Run the Population Script

```bash
cd /home/hiba/Desktop/new_future/Backend

docker-compose exec -T backend python << 'EOF'
import json
import sys
sys.path.insert(0, '/app')

from app.database import SessionLocal
from app import models_hierarchical as models

# Load your quiz data
with open('/app/data/your_specialization_quizzes.json', 'r') as f:
    data = json.load(f)

db = SessionLocal()

try:
    specialization_id = data['specialization_id']
    
    for quiz_data in data['quizzes']:
        # Create quiz
        quiz = models.Quiz(
            title=quiz_data['title'],
            description=quiz_data['description'],
            specialization_id=specialization_id,
            difficulty_level=quiz_data['difficulty_level'],
            time_limit_minutes=quiz_data['time_limit_minutes'],
            passing_score=quiz_data['passing_score']
        )
        db.add(quiz)
        db.commit()
        db.refresh(quiz)
        
        # Add questions and options
        for idx, q_data in enumerate(quiz_data['questions']):
            question = models.Question(
                quiz_id=quiz.id,
                question_text=q_data['question_text'],
                question_type=q_data['question_type'],
                points=q_data['points'],
                order_index=idx + 1,
                explanation=q_data.get('explanation', '')
            )
            db.add(question)
            db.commit()
            db.refresh(question)
            
            for opt_idx, opt in enumerate(q_data['options']):
                option = models.QuestionOption(
                    question_id=question.id,
                    option_text=opt['option_text'],
                    is_correct=opt['is_correct'],
                    order_index=opt_idx + 1
                )
                db.add(option)
            db.commit()
        
        print(f"✓ Created quiz: {quiz.title}")
    
    print(f"✅ Success!")
    
finally:
    db.close()
EOF
```

### Step 3: Verify

```bash
# Check quizzes for your specialization
curl "http://localhost:8000/api/quizzes?specialization_id=7" | python3 -m json.tool
```

## Testing the Solution

### Test 1: User with QA Automation Specialization

1. Login as a user with "Software Engineering in Test (SET) / QA Automation" specialization
2. Navigate to Test Hub
3. **Expected**: Only see "QA Automation Fundamentals - Level 1"
4. **Should NOT see**: Frontend Development, Data Science, Cybersecurity quizzes

### Test 2: User with Data Analytics Specialization

1. Login as a user with "Data Analytics" specialization
2. Navigate to Test Hub
3. **Expected**: No quizzes shown (none created yet for Data Analytics)
4. **Should NOT see**: QA Automation, Frontend, or other specialization quizzes

### Test 3: API Direct Testing

```bash
# QA Automation quizzes only
curl "http://localhost:8000/api/quizzes?specialization_id=6"

# Data Analytics quizzes only (should be empty for now)
curl "http://localhost:8000/api/quizzes?specialization_id=7"

# Frontend Development quizzes only
curl "http://localhost:8000/api/quizzes?specialization_id=1"
```

## Files Modified

1. `Backend/app/api/quizzes.py` - Added specialization filtering
2. `Frontend/pages/TestHubPage.jsx` - Added specialization_id parameter to API calls
3. `Backend/data/qa_automation_quizzes.json` - QA Automation quiz data (NEW)

## Next Steps

To complete the quiz system, create quiz JSON files for all specializations:

- [ ] Data Analytics (ID: 7)
- [ ] Data Engineering (ID: 9)
- [ ] Cybersecurity Analyst (ID: 12)
- [ ] Cloud Engineering (ID: 16)
- [ ] DevOps Engineering (ID: 17)
- [ ] UX Designer (ID: 25)
- [ ] And all other specializations...

Each specialization should have quizzes for different difficulty levels (1-4) covering topics specific to that field.

## Summary

✅ **Problem**: All users saw all quizzes regardless of their specialization
✅ **Solution**: Quiz filtering by specialization ID
✅ **Result**: Each user sees only quizzes relevant to their chosen career path

This creates a personalized learning experience where users focus on mastering skills specific to their specialization!

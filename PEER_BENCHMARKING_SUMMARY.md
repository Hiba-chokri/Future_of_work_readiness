# Peer Benchmarking Feature - Technical Summary

## Overview
The Peer Benchmarking feature allows users to compare their performance against other users in the same specialization. It provides statistical insights, percentile rankings, and identifies common strengths and gaps across peer groups.

---

## Architecture

### 1. **Database Layer** (`models_hierarchical.py`)

#### PeerBenchmark Table
```python
class PeerBenchmark(Base):
    __tablename__ = "peer_benchmarks"
    
    id = Integer (Primary Key)
    specialization_id = Integer (Foreign Key → specializations.id)
    avg_readiness_score = Float (default: 0.0)
    avg_technical_score = Float (default: 0.0)
    avg_soft_skills_score = Float (default: 0.0)
    avg_leadership_score = Float (default: 0.0)
    total_users = Integer (default: 0)
    median_readiness_score = Float (default: 0.0)
    common_strengths = Text (JSON string)
    common_gaps = Text (JSON string)
    last_updated = DateTime (auto-updated)
```

**Purpose**: Stores aggregated benchmark statistics for each specialization, acting as a cached/pre-computed data source for quick comparisons.

---

## 2. **Backend Logic** (`crud.py`)

### Core Functions

#### A. `calculate_peer_benchmarks(db, specialization_id)`
**Purpose**: Calculate and store/update benchmark statistics for a specialization

**Algorithm**:
1. **Query Users**: Get all users with `preferred_specialization_id == specialization_id`
2. **Validation**: Require minimum 2 users for meaningful comparison
3. **Calculate Averages**:
   ```python
   avg_readiness = sum(user.readiness_score) / total_users
   avg_technical = sum(user.technical_score) / total_users
   avg_soft_skills = sum(user.soft_skills_score) / total_users
   avg_leadership = sum(user.leadership_score) / total_users
   ```
4. **Calculate Median**:
   ```python
   sorted_scores = sorted([u.readiness_score for u in users])
   median_readiness = sorted_scores[len(sorted_scores) // 2]
   ```
5. **Identify Common Strengths** (areas where avg ≥ 70%):
   ```python
   if avg_technical >= 70:
       strengths.append({
           "area": "Technical Skills",
           "percentage": round(avg_technical, 1),
           "description": "Most peers excel in technical competencies"
       })
   ```
6. **Identify Common Gaps** (areas where avg < 60%):
   ```python
   if avg_technical < 60:
       gaps.append({
           "area": "Technical Skills",
           "percentage": round(avg_technical, 1),
           "description": "Many peers need to strengthen technical foundations"
       })
   ```
7. **Store/Update**: Create new record or update existing benchmark in database

**When Called**: 
- On-demand when a user requests benchmark data (if not exists)
- Can be scheduled via cron job for regular updates

---

#### B. `get_peer_benchmark(db, user_id)`
**Purpose**: Retrieve peer comparison data for a specific user

**Algorithm**:
1. **Get User**: Query user and their preferred_specialization_id
2. **Get/Calculate Benchmark**: Fetch existing benchmark or calculate new one
3. **Validation**: Ensure minimum 2 users in specialization
4. **Build Comparisons** for each category:
   
   For each skill area (Readiness, Technical, Soft Skills, Leadership):
   ```python
   {
       "category": "Technical Skills",
       "your_score": user.technical_score,
       "peer_average": benchmark.avg_technical,
       "difference": user.technical_score - benchmark.avg_technical,
       "percentile": calculate_percentile(...),
       "status": "above" | "average" | "below"
   }
   ```
   
   **Status Logic**:
   - `"above"`: difference > 5 points
   - `"below"`: difference < -5 points
   - `"average"`: -5 ≤ difference ≤ 5

5. **Return Data**:
   ```python
   {
       "specialization_name": "Frontend Development",
       "total_peers": 42,  # Excludes the user themselves
       "comparisons": [...],
       "overall_percentile": 75,
       "common_strengths": [...],
       "common_gaps": [...],
       "last_updated": "2025-11-15T10:30:00"
   }
   ```

---

#### C. `calculate_percentile(db, specialization_id, score, category)`
**Purpose**: Calculate what percentile a user's score falls into

**Algorithm**:
1. **Get All Scores**: Query all users in specialization for specified category
   ```python
   if category == "readiness":
       scores = [u.readiness_score or 0 for u in users]
   elif category == "technical":
       scores = [u.technical_score or 0 for u in users]
   # etc.
   ```

2. **Count Lower Scores**:
   ```python
   below_count = sum(1 for s in scores if s < user_score)
   ```

3. **Calculate Percentile**:
   ```python
   percentile = int((below_count / len(scores)) * 100)
   ```

**Example**:
- If user scores 85
- Out of 20 peers: 15 scored below 85
- Percentile = (15/20) × 100 = **75th percentile**
- Means: "You score higher than 75% of your peers"

---

## 3. **API Endpoint** (`api/users.py`)

```python
@router.get("/users/{user_id}/peer-benchmark", response_model=PeerBenchmarkResponse)
def get_peer_benchmark_endpoint(user_id: int, db: Session):
    data = crud.get_peer_benchmark(db, user_id)
    
    # Error handling for insufficient data
    if "error" in data:
        raise HTTPException(status_code=400, detail=data["message"])
    
    return {"success": True, "data": data}
```

**URL**: `http://localhost:8000/api/users/{user_id}/peer-benchmark`

---

## 4. **Frontend** (`PeerBenchmarkingPage.jsx`)

### Components

#### A. Overall Percentile Card
- Displays "Top X%" ranking (100 - percentile)
- Example: 75th percentile = "Top 25%"
- Gradient background (blue-to-purple)

#### B. Score Comparison Cards
For each of 4 categories:
- **Your Score**: Blue progress bar
- **Peer Average**: Gray progress bar
- **Difference**: Text description ("+5.2 points above average")
- **Status Icon**: 
  - 🟢 TrendingUp (above)
  - 🔴 TrendingDown (below)
  - ⚪ Minus (average)
- **Percentile**: "75th percentile"

#### C. Common Strengths Section
- Green-themed cards
- Shows areas where avg_score ≥ 70%
- Example: "Technical Skills: 78% - Most peers excel in technical competencies"

#### D. Common Gaps Section
- Orange-themed cards
- Shows areas where avg_score < 60%
- Example: "Leadership: 52% - Leadership capabilities require attention"

---

## 5. **Data Schemas** (`schemas.py`)

```python
class PeerComparison(BaseModel):
    category: str              # "Technical Skills"
    your_score: float          # 85.0
    peer_average: float        # 72.5
    difference: float          # +12.5
    percentile: int            # 75
    status: str                # "above", "average", "below"

class CommonInsight(BaseModel):
    area: str                  # "Technical Skills"
    percentage: float          # 78.0
    description: str           # "Most peers excel..."

class PeerBenchmarkData(BaseModel):
    specialization_name: str
    total_peers: int
    comparisons: List[PeerComparison]
    overall_percentile: int
    common_strengths: List[CommonInsight]
    common_gaps: List[CommonInsight]
    last_updated: str
```

---

## Calculations Breakdown

### 1. **Average Scores**
```
avg_score = sum(all_user_scores) / count(users)
```
**Example**: If 10 users have scores [85, 90, 75, 80, 95, 70, 88, 92, 78, 82]:
```
avg_score = (85+90+75+80+95+70+88+92+78+82) / 10 = 83.5
```

### 2. **Median Score**
```
median = sorted_scores[len(scores) // 2]
```
**Example**: Sorted [70, 75, 78, 80, 82, 85, 88, 90, 92, 95]
```
median = scores[5] = 85
```

### 3. **Percentile**
```
percentile = (count_below / total_count) × 100
```
**Example**: User scores 88, out of 10 peers, 6 scored below 88:
```
percentile = (6 / 10) × 100 = 60th percentile
```

### 4. **Difference**
```
difference = user_score - peer_average
```
**Example**: User = 88, Average = 83.5
```
difference = 88 - 83.5 = +4.5 points
```

### 5. **Status Classification**
```python
if difference > 5:
    status = "above"
elif difference < -5:
    status = "below"
else:
    status = "average"
```

### 6. **Strength/Gap Identification**
```python
# Strengths
if avg_score >= 70:
    add_to_strengths()

# Gaps
if avg_score < 60:
    add_to_gaps()
```

---

## Key Features

### ✅ Privacy-Focused
- All comparisons are **aggregated and anonymized**
- Individual scores are never shared with other users
- Only statistical summaries are shown

### ✅ Real-Time Updates
- Benchmarks recalculate when accessed (if stale)
- `last_updated` timestamp shown to users

### ✅ Minimum Data Requirements
- Requires **minimum 2 users** per specialization
- Shows friendly error message if insufficient data

### ✅ Multi-Dimensional Comparison
- **4 skill categories**:
  1. Overall Readiness
  2. Technical Skills
  3. Soft Skills
  4. Leadership

### ✅ Contextual Insights
- **Strengths**: Areas where peers collectively excel
- **Gaps**: Areas where peers collectively need improvement

---

## User Flow

1. **User completes quizzes** → Scores are stored in User table
2. **User clicks "Peer Benchmarking"** on dashboard
3. **Frontend requests**: `GET /api/users/{id}/peer-benchmark`
4. **Backend**:
   - Checks if benchmark exists for user's specialization
   - If not, calls `calculate_peer_benchmarks()`
   - Calculates user's percentiles for each category
   - Returns comparison data
5. **Frontend displays**:
   - Overall percentile card ("Top 25%")
   - 4 comparison cards with progress bars
   - Common strengths and gaps
6. **User sees**:
   - How they rank vs peers
   - Which areas to improve
   - What peers struggle with

---

## Example Data Flow

### Input (User Profile):
```json
{
  "id": 123,
  "preferred_specialization_id": 1,
  "readiness_score": 85,
  "technical_score": 90,
  "soft_skills_score": 75,
  "leadership_score": 80
}
```

### Calculation (for Technical Skills):
- Peer average: 72.5
- User score: 90
- Difference: +17.5
- 8 out of 10 peers scored below 90
- Percentile: 80th

### Output (Comparison Object):
```json
{
  "category": "Technical Skills",
  "your_score": 90.0,
  "peer_average": 72.5,
  "difference": 17.5,
  "percentile": 80,
  "status": "above"
}
```

### Frontend Display:
```
Technical Skills
17.5 points above average

Your Score: 90% ████████████████████ [blue bar]
Peer Average: 72.5% ██████████████      [gray bar]

Your Percentile: 80th percentile
```

---

## Performance Optimizations

1. **Pre-computed Benchmarks**: Results are cached in `peer_benchmarks` table
2. **Lazy Calculation**: Only compute when user requests data
3. **Efficient Queries**: Single query to get all users in specialization
4. **JSON Storage**: Strengths/gaps stored as JSON strings (no extra tables)

---

## Future Enhancements (from TODO.md)

- [ ] Improve percentile visualization (graphs/charts)
- [ ] Add trend tracking (compare percentile over time)
- [ ] Scheduled background jobs for regular benchmark updates
- [ ] Add filtering by industry/location/experience level
- [ ] Historical percentile tracking

---

## Testing

### Manual Test Steps:
1. Create 2+ users in same specialization
2. Have both complete quizzes
3. Navigate to `/peer-benchmark`
4. Verify:
   - Percentile calculations are correct
   - Comparison cards show accurate differences
   - Strengths/gaps appear based on thresholds
   - "Total peers" count excludes the viewing user

### Edge Cases Handled:
- ✅ Less than 2 users → Shows friendly error
- ✅ User has no specialization → 404 error
- ✅ No benchmark exists → Auto-calculates on first request
- ✅ Null scores → Treated as 0 in calculations

---

## Files Modified/Created

### Backend:
- `app/models_hierarchical.py` - PeerBenchmark model
- `app/crud.py` - Benchmark calculation logic (3 functions)
- `app/schemas.py` - Response schemas
- `app/api/users.py` - API endpoint

### Frontend:
- `pages/PeerBenchmarkingPage.jsx` - Full UI component
- `pages/DashboardPage.jsx` - Added navigation card
- `src/App.jsx` - Added route

### Database:
- `peer_benchmarks` table with 12 columns
- Foreign key to `specializations`
- Auto-updating timestamp

---

## Summary

The Peer Benchmarking feature provides users with **statistical, anonymized comparisons** against peers in their specialization across 4 skill dimensions. It uses **simple statistical calculations** (averages, medians, percentiles) to show:

1. **Where users stand** (percentile ranking)
2. **How much they differ** from the average
3. **What peers excel at** (strengths)
4. **What peers struggle with** (gaps)

All data is **privacy-focused**, **efficiently cached**, and designed to **motivate improvement** through peer comparison without revealing individual identities.

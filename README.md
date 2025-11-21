# Future of Work Readiness Platform

A comprehensive career readiness assessment platform that helps users evaluate their skills and prepare for the future of work across various technology sectors and specializations.

## Features

- **Hierarchical Industry Structure**: Sectors → Branches → Specializations
- **Adaptive Assessments**: Multi-level difficulty quizzes for various specializations
- **User Progress Tracking**: Track readiness scores and quiz attempts
- **RESTful API**: FastAPI backend with full CRUD operations
- **Modern UI**: React frontend with responsive design

##Prerequisites

Before you begin, ensure you have the following installed:

- **Docker** (version 20.10+) and **Docker Compose** (version 2.0+)
- **Node.js** (version 18+) and **npm** (version 9+)
- **Git**
- **(Optional) Python 3.9+** if you want to run backend locally without Docker

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Hiba-chokri/Future_of_work_readiness.git
cd Future_of_work_readiness
```

### 2. Configure Environment Variables

#### Backend Configuration

Create a `.env` file in the `Backend/` directory:

```bash
cd Backend
touch .env
```

Add the following content to `Backend/.env`:

```env
# Database Configuration
DATABASE_URL=postgresql://fw_user:fw_password_123@localhost:5432/futurework


### 3. Start the Application with Docker

#### Option A: Using Docker Compose (Recommended)

This will start all services (Database, Backend, Frontend) in containers:

```bash
# From the project root directory
docker-compose up -d
```

**What this does:**
- Starts PostgreSQL database on port 5432
-  Builds and starts FastAPI backend on port 8000
- Builds and starts React frontend on port 3000
- Automatically creates database tables and populates initial data

**Check container status:**
```bash
docker-compose ps
```

**View logs:**
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

**Stop services:**
```bash
docker-compose down
```

**Stop and remove volumes (clean slate):**
```bash
docker-compose down -v
```

#### Option B: Run Services Individually

If you prefer more control:

```bash
# Start only the database
docker-compose up -d postgres

# Start backend (in a new terminal)
docker-compose up backend

# Start frontend (in another terminal)
docker-compose up frontend
```

### 4. Verify Installation

After starting the services, verify everything is running:

1. **Backend API Documentation**: http://localhost:8000/docs
2. **Frontend Application**: http://localhost:3000
3. **Database**: localhost:5432 (use any PostgreSQL client)

**Test the backend API:**
```bash
curl http://localhost:8000/api/health
```

**Expected response:**
```json
{"status": "healthy", "database": "connected"}
```

## Running Locally (Without Docker)

### Backend Setup

```bash
# Navigate to backend directory
cd Backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r app/requirements.txt

# Install additional dependencies for quiz generation
pip install python-dotenv google-generativeai

# Ensure PostgreSQL is running (either via Docker or locally)
docker run -d \
  --name futurework_db \
  -e POSTGRES_USER=fw_user \
  -e POSTGRES_PASSWORD=fw_password_123 \
  -e POSTGRES_DB=futurework \
  -p 5432:5432 \
  postgres:15

# Create database tables
python3 -c "from app.models import Base; from app.database import engine; Base.metadata.create_all(bind=engine)"

# Populate initial data
python3 -c "from app.db_init import auto_populate_if_empty; auto_populate_if_empty()"

# Start the FastAPI server
cd app
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd Frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at http://localhost:3000

## 📁 Project Structure

```
Future_of_work_readiness/
├── Backend/
│   ├── app/
│   │   ├── main.py              # FastAPI application entry point
│   │   ├── models.py            # SQLAlchemy database models
│   │   ├── database.py          # Database connection setup
│   │   ├── schemas.py           # Pydantic schemas
│   │   ├── crud.py              # Database operations
│   │   ├── db_init.py           # Database initialization
│   │   ├── generate_quiz.py     # AI quiz generation (Gemini API)
│   │   ├── replace_frontend_questions.py  # DB integration script
│   │   └── api/                 # API route handlers
│   │       ├── auth.py
│   │       ├── quizzes.py
│   │       └── users.py
│   ├── data/                    # Initial data (sectors, quizzes)
│   ├── alembic/                 # Database migrations
│   ├── Dockerfile
│   └── requirements.txt
├── Frontend/
│   ├── src/
│   │   ├── main.jsx            # React app entry point
│   │   ├── App.jsx             # Main app component
│   │   └── index.css           # Global styles
│   ├── pages/                  # Page components
│   ├── components/             # Reusable components
│   ├── utils/                  # API utilities
│   ├── package.json
│   └── vite.config.js
├── docker-compose.yml          # Docker orchestration
└── README.md                   # This file
```

## 🔧 Common Commands

### Docker Commands

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# Rebuild containers after code changes
docker-compose up -d --build

# View logs
docker-compose logs -f [service-name]

# Access backend container shell
docker exec -it futurework_backend bash

# Access database
docker exec -it futurework_db psql -U fw_user -d futurework

# Restart a specific service
docker-compose restart backend
```

### Database Commands

```bash
# Inside backend container or with local setup
cd Backend

# Create new migration
alembic revision --autogenerate -m "description"

# Run migrations
alembic upgrade head

# Rollback migration
alembic downgrade -1

# Populate database with initial data
python3 -c "from app.db_init import auto_populate_if_empty; auto_populate_if_empty()"
```

### AI Quiz Generation

```bash
# Generate sample quiz questions
cd Backend
python3 -m app.generate_quiz

# Replace Frontend Development questions with AI-generated ones
python3 -m app.replace_frontend_questions
```

## Testing the Application

### Test Backend API

```bash
# Get all specializations
curl http://localhost:8000/api/specializations

# Get quizzes for a specialization
curl http://localhost:8000/api/specializations/1/quizzes

# Get quiz by ID
curl http://localhost:8000/api/quizzes/20
```

### Test Frontend

1. Open http://localhost:3000
2. Sign up or log in
3. Complete the onboarding to select your specialization
4. Take a quiz and view results

##  AI Quiz Generation

The platform uses Google Gemini 2.5 Flash API to generate high-quality quiz questions.

### Features:
- Generates questions for any specialization/topic
- Supports multiple difficulty levels (1-5)
- Creates detailed explanations for each answer
- Cost-efficient: ~$0.001 per 6 questions

### Usage:

```python
from app.generate_quiz import generate_quiz_question

result = generate_quiz_question(
    specialization="Frontend Development",
    topic="React Hooks",
    difficulty=3  # 1=Beginner, 5=Expert
)
```

## Troubleshooting

### Port Already in Use

```bash
# Find process using port 8000
lsof -i :8000

# Kill the process
kill -9 <PID>

# Or change the port in docker-compose.yml
```

### Database Connection Issues

```bash
# Check if PostgreSQL container is running
docker ps | grep futurework_db

# Check database logs
docker logs futurework_db

# Restart database
docker-compose restart postgres
```

### Frontend Not Loading

```bash
# Clear npm cache and reinstall
cd Frontend
rm -rf node_modules package-lock.json
npm install

# Rebuild frontend container
docker-compose up -d --build frontend
```

### Permission Issues (Linux)

```bash
# Fix Docker permissions
sudo usermod -aG docker $USER
newgrp docker

# Fix file permissions
sudo chown -R $USER:$USER .
```

## Database Schema

The platform uses a hierarchical structure:

- **Sectors** (e.g., Technology, Healthcare)
  - **Branches** (e.g., Software Development, Data Science)
    - **Specializations** (e.g., Frontend Development, Machine Learning)
      - **Quizzes** (difficulty levels 1-4)
        - **Questions** (multiple choice, with explanations)
          - **QuestionOptions** (A, B, C, D)

## Security Notes

- Change the `SECRET_KEY` in production
- Use environment variables for sensitive data
- Keep your Gemini API key secure (don't commit to Git)
- Use HTTPS in production
- Implement rate limiting for API endpoints

## Future Enhancements

- [ ] Add more assessment types (coding challenges, projects)
- [ ] Implement skill gap analysis
- [ ] Add learning resources recommendations
- [ ] Create mobile app version
- [ ] Add social features (leaderboards, peer comparison)
- [ ] Integrate with job market data APIs

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.



## Support

For issues and questions:
- Create an issue on GitHub
- Contact: hebachokri7@gmail.com

---

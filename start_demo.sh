#!/bin/bash

# Future of Work Readiness Platform - Demo Script
# Run this script to start everything for tomorrow's presentation

echo "🚀 Starting Future of Work Readiness Platform..."
echo "================================================"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to check if a port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        return 0
    else
        return 1
    fi
}

echo -e "${BLUE}📋 System Check...${NC}"

# Check if Python is available
if command -v python &> /dev/null; then
    echo -e "${GREEN}✅ Python is available${NC}"
else
    echo -e "${RED}❌ Python not found${NC}"
    exit 1
fi

# Check if Node.js is available
if command -v node &> /dev/null; then
    echo -e "${GREEN}✅ Node.js is available${NC}"
else
    echo -e "${RED}❌ Node.js not found${NC}"
    exit 1
fi

# Check PostgreSQL
if command -v psql &> /dev/null; then
    echo -e "${GREEN}✅ PostgreSQL is available${NC}"
else
    echo -e "${YELLOW}⚠️  PostgreSQL CLI not found (database might still work)${NC}"
fi

echo ""
echo -e "${BLUE}🔧 Starting Backend Server...${NC}"

# Start Backend
cd Backend
if [ -f "app/main.py" ]; then
    echo -e "${GREEN}✅ Backend files found${NC}"
    
    # Kill any existing backend processes
    if check_port 8000; then
        echo -e "${YELLOW}⚠️  Port 8000 already in use, killing existing process...${NC}"
        pkill -f "uvicorn.*8000" 2>/dev/null || true
        sleep 2
    fi
    
    echo "Starting FastAPI server on port 8000..."
    python -m uvicorn app.main:app --reload --port 8000 &
    BACKEND_PID=$!
    
    # Wait for backend to start
    sleep 5
    
    if check_port 8000; then
        echo -e "${GREEN}✅ Backend running on http://localhost:8000${NC}"
    else
        echo -e "${RED}❌ Backend failed to start${NC}"
        exit 1
    fi
else
    echo -e "${RED}❌ Backend files not found${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}🎨 Starting Frontend Server...${NC}"

# Start Frontend
cd ../Frontend
if [ -f "package.json" ]; then
    echo -e "${GREEN}✅ Frontend files found${NC}"
    
    # Install dependencies if needed
    if [ ! -d "node_modules" ]; then
        echo "Installing frontend dependencies..."
        npm install
    fi
    
    echo "Starting React development server..."
    npm run dev &
    FRONTEND_PID=$!
    
    # Wait for frontend to start
    sleep 5
    
    echo -e "${GREEN}✅ Frontend should be running (check output above for port)${NC}"
else
    echo -e "${RED}❌ Frontend files not found${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}🧪 Testing API Endpoints...${NC}"

# Wait a bit more for servers to be fully ready
sleep 3

# Test API endpoints
echo "Testing backend connection..."
if curl -s http://localhost:8000/health > /dev/null; then
    echo -e "${GREEN}✅ Backend health check passed${NC}"
else
    echo -e "${RED}❌ Backend health check failed${NC}"
fi

echo "Testing sectors endpoint..."
SECTORS_RESPONSE=$(curl -s http://localhost:8000/api/sectors)
if [ $? -eq 0 ] && [ ! -z "$SECTORS_RESPONSE" ]; then
    echo -e "${GREEN}✅ Sectors API working${NC}"
    echo "Sample sectors data: $SECTORS_RESPONSE" | head -c 100
    echo "..."
else
    echo -e "${RED}❌ Sectors API failed${NC}"
fi

echo "Testing quizzes endpoint..."
QUIZZES_RESPONSE=$(curl -s http://localhost:8000/api/quizzes)
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Quizzes API working${NC}"
else
    echo -e "${RED}❌ Quizzes API failed${NC}"
fi

echo ""
echo -e "${GREEN}🎉 DEMO READY!${NC}"
echo "================================================"
echo -e "${BLUE}📱 Frontend:${NC} Check the terminal output above for the frontend URL (likely http://localhost:3010/)"
echo -e "${BLUE}🔧 Backend:${NC} http://localhost:8000/"
echo -e "${BLUE}📚 API Docs:${NC} http://localhost:8000/docs"
echo ""
echo -e "${YELLOW}💡 Demo Flow for Presentation:${NC}"
echo "1. 🏠 Show landing page with navigation buttons"
echo "2. 🎯 Click 'Try Onboarding' - demonstrate sector selection"
echo "3. 📊 Complete onboarding and go to dashboard"
echo "4. 🔧 Show API documentation at /docs"
echo "5. 💾 Mention database integration and data persistence"
echo ""
echo -e "${BLUE}📋 Press Ctrl+C to stop all servers${NC}"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo -e "${YELLOW}🛑 Stopping servers...${NC}"
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    pkill -f "uvicorn.*8000" 2>/dev/null
    pkill -f "vite" 2>/dev/null
    echo -e "${GREEN}✅ Cleanup complete${NC}"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Keep script running
echo -e "${GREEN}✅ All systems running! Press Ctrl+C to stop.${NC}"
wait

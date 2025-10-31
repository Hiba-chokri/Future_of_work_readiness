"""
Pydantic schemas for API request/response models
"""

from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# Base schemas
class SectorBase(BaseModel):
    name: str
    description: Optional[str] = None

class SectorCreate(SectorBase):
    pass

class Sector(SectorBase):
    id: int
    
    class Config:
        from_attributes = True

class SpecializationBase(BaseModel):
    name: str
    description: Optional[str] = None
    sector_id: int

class SpecializationCreate(SpecializationBase):
    pass

class Specialization(SpecializationBase):
    id: int
    
    class Config:
        from_attributes = True

# User schemas
class UserBase(BaseModel):
    email: str
    name: str

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class User(UserBase):
    id: int
    specialization_id: Optional[int] = None
    readiness_score: Optional[float] = None
    technical_score: Optional[float] = None
    soft_skills_score: Optional[float] = None
    created_at: datetime
    
    class Config:
        from_attributes = True

class UserUpdate(BaseModel):
    specialization_id: Optional[int] = None

# Quiz schemas
class AnswerOptionBase(BaseModel):
    option_text: str

class AnswerOption(AnswerOptionBase):
    id: int
    question_id: int
    
    class Config:
        from_attributes = True

class QuestionBase(BaseModel):
    question_text: str
    correct_answer: str
    order: int

class Question(QuestionBase):
    id: int
    quiz_id: int
    answer_options: List[AnswerOption] = []
    
    class Config:
        from_attributes = True

class QuizBase(BaseModel):
    title: str
    description: Optional[str] = None
    duration: int
    difficulty: str
    specialization_id: int

class Quiz(QuizBase):
    id: int
    questions: List[Question] = []
    
    class Config:
        from_attributes = True

class QuizSummary(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    duration: int
    difficulty: int  # Changed from str to int to match database
    question_count: int
    specialization_name: Optional[str] = None
    
    class Config:
        from_attributes = True

# Quiz attempt schemas
class QuizAnswer(BaseModel):
    question_id: int
    selected_answer: str

class QuizSubmission(BaseModel):
    answers: List[QuizAnswer]

class QuizAttemptBase(BaseModel):
    user_id: int
    quiz_id: int

class QuizAttempt(QuizAttemptBase):
    id: int
    started_at: datetime
    completed_at: Optional[datetime] = None
    score: Optional[float] = None
    is_completed: bool = False
    
    class Config:
        from_attributes = True

class QuizResult(BaseModel):
    success: bool
    score: float
    correct: int
    total: int
    passed: bool
    message: str

# Response schemas
class UserResponse(BaseModel):
    success: bool
    user: User

class LoginResponse(BaseModel):
    success: bool
    user: User

class SectorsResponse(BaseModel):
    sectors: List[Sector]

class SpecializationsResponse(BaseModel):
    specializations: List[Specialization]

class QuizzesResponse(BaseModel):
    quizzes: List[QuizSummary]

class QuizStartResponse(BaseModel):
    attempt_id: int
    quiz_id: int
    message: str

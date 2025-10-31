"""
Updated Database models for the Future of Work Readiness platform
With proper 3-level hierarchy: Sectors → Branches → Specializations
"""
from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text, ForeignKey, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base


class Sector(Base):
    """Main sectors (e.g., Technology, Healthcare, etc.)"""
    __tablename__ = "sectors"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False, index=True)
    description = Column(Text, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    branches = relationship("Branch", back_populates="sector")


class Branch(Base):
    """Branches within sectors (e.g., Software Development & Engineering under Technology)"""
    __tablename__ = "branches"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False, index=True)
    description = Column(Text, nullable=True)
    sector_id = Column(Integer, ForeignKey("sectors.id"), nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    sector = relationship("Sector", back_populates="branches")
    specializations = relationship("Specialization", back_populates="branch")


class Specialization(Base):
    """Specializations within branches (e.g., Frontend Development under Software Development)"""
    __tablename__ = "specializations"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False, index=True)
    description = Column(Text, nullable=True)
    branch_id = Column(Integer, ForeignKey("branches.id"), nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    branch = relationship("Branch", back_populates="specializations")
    quizzes = relationship("Quiz", back_populates="specialization")


class Quiz(Base):
    """Quizzes for each specialization with difficulty levels"""
    __tablename__ = "quizzes"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    specialization_id = Column(Integer, ForeignKey("specializations.id"), nullable=False)
    difficulty_level = Column(Integer, nullable=False)  # 1, 2, 3, or 4
    is_active = Column(Boolean, default=True)
    time_limit_minutes = Column(Integer, default=30)
    passing_score = Column(Float, default=70.0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    specialization = relationship("Specialization", back_populates="quizzes")
    questions = relationship("Question", back_populates="quiz")
    attempts = relationship("QuizAttempt", back_populates="quiz")


class Question(Base):
    """Questions within quizzes"""
    __tablename__ = "questions"
    
    id = Column(Integer, primary_key=True, index=True)
    quiz_id = Column(Integer, ForeignKey("quizzes.id"), nullable=False)
    question_text = Column(Text, nullable=False)
    question_type = Column(String(50), nullable=False)  # 'multiple_choice', 'true_false', 'short_answer'
    points = Column(Integer, default=1)
    order_index = Column(Integer, nullable=False)
    is_active = Column(Boolean, default=True)
    explanation = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    quiz = relationship("Quiz", back_populates="questions")
    options = relationship("QuestionOption", back_populates="question")


class QuestionOption(Base):
    """Options for multiple choice questions"""
    __tablename__ = "question_options"
    
    id = Column(Integer, primary_key=True, index=True)
    question_id = Column(Integer, ForeignKey("questions.id"), nullable=False)
    option_text = Column(Text, nullable=False)
    is_correct = Column(Boolean, default=False)
    order_index = Column(Integer, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    question = relationship("Question", back_populates="options")


class User(Base):
    """User accounts and profiles"""
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(100), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    name = Column(String(100), nullable=False)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    
    # Profile information
    preferred_specialization_id = Column(Integer, ForeignKey("specializations.id"), nullable=True)
    
    # Scores and progress
    readiness_score = Column(Float, default=0.0)
    technical_score = Column(Float, default=0.0)
    soft_skills_score = Column(Float, default=0.0)
    leadership_score = Column(Float, default=0.0)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    last_login = Column(DateTime(timezone=True), nullable=True)
    
    # Relationships
    preferred_specialization = relationship("Specialization")
    quiz_attempts = relationship("QuizAttempt", back_populates="user")


class QuizAttempt(Base):
    """User attempts at quizzes"""
    __tablename__ = "quiz_attempts"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    quiz_id = Column(Integer, ForeignKey("quizzes.id"), nullable=False)
    score = Column(Float, nullable=False)
    max_score = Column(Float, nullable=False)
    percentage = Column(Float, nullable=False)
    time_taken_minutes = Column(Integer, nullable=True)
    is_passed = Column(Boolean, nullable=False)
    started_at = Column(DateTime(timezone=True), nullable=False)
    completed_at = Column(DateTime(timezone=True), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="quiz_attempts")
    quiz = relationship("Quiz", back_populates="attempts")

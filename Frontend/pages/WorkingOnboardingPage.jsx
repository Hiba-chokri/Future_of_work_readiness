import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSectors, getSpecializations } from '../utils/api';

export default function WorkingOnboardingPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedSector, setSelectedSector] = useState('');
    const [selectedSpecialization, setSelectedSpecialization] = useState('');
    const [sectors, setSectors] = useState([]);
    const [specializations, setSpecializations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Simple emoji icons instead of lucide-react
    const sectorIcons = {
        'Technology': '💻',
        'Healthcare': '❤️',
        'Finance': '💼',
        'Education': '🎓',
        'Retail': '🛒'
    };

    // Load sectors on component mount
    useEffect(() => {
        const loadSectors = async () => {
            try {
                setLoading(true);
                setError('');
                const sectorsData = await getSectors();
                setSectors(sectorsData.sectors || []);
            } catch (error) {
                console.error('Failed to load sectors:', error);
                setError('Failed to load sectors. Please check if the backend is running.');
            } finally {
                setLoading(false);
            }
        };
        
        loadSectors();
    }, []);

    // Load specializations when sector is selected
    useEffect(() => {
        const loadSpecializations = async () => {
            if (selectedSector) {
                try {
                    setError('');
                    const specsData = await getSpecializations(selectedSector);
                    setSpecializations(specsData.specializations || []);
                } catch (error) {
                    console.error('Failed to load specializations:', error);
                    setError('Failed to load specializations.');
                    setSpecializations([]);
                }
            }
        };
        
        loadSpecializations();
    }, [selectedSector]);

    const handleSectorSelect = (sectorId) => {
        setSelectedSector(sectorId);
        setSelectedSpecialization('');
        setCurrentStep(2);
    };

    const handleSpecializationSelect = (specializationId) => {
        setSelectedSpecialization(specializationId);
    };

    const handleComplete = async () => {
        if (!selectedSpecialization) {
            setError('Please select a specialization');
            return;
        }

        try {
            // Here you would typically save the user's selections
            // For now, we'll just navigate to dashboard
            navigate('/dashboard');
        } catch (error) {
            setError('Failed to save selections');
        }
    };

    const handleBack = () => {
        if (currentStep === 2) {
            setCurrentStep(1);
            setSelectedSpecialization('');
        } else {
            navigate('/');
        }
    };

    if (loading) {
        return (
            <div style={{ 
                minHeight: '100vh', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: '#f8f9fa'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
                    <div>Loading sectors...</div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ 
            minHeight: '100vh', 
            backgroundColor: '#f8f9fa',
            padding: '2rem 1rem'
        }}>
            <div style={{ 
                maxWidth: '800px', 
                margin: '0 auto',
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '3rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 style={{ 
                        fontSize: '2.5rem', 
                        fontWeight: 'bold', 
                        color: '#1f2937',
                        marginBottom: '1rem'
                    }}>
                        Welcome to Your Journey
                    </h1>
                    <p style={{ 
                        fontSize: '1.125rem', 
                        color: '#6b7280'
                    }}>
                        {currentStep === 1 
                            ? "Let's start by selecting your industry sector"
                            : "Now choose your specialization within this sector"
                        }
                    </p>
                </div>

                {/* Progress Indicator */}
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginBottom: '3rem'
                }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold'
                    }}>
                        1
                    </div>
                    <div style={{
                        width: '4rem',
                        height: '2px',
                        backgroundColor: currentStep === 2 ? '#3b82f6' : '#d1d5db',
                        margin: '0 1rem'
                    }}></div>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: currentStep === 2 ? '#3b82f6' : '#d1d5db',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold'
                    }}>
                        2
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div style={{
                        backgroundColor: '#fee2e2',
                        border: '1px solid #fecaca',
                        color: '#dc2626',
                        padding: '1rem',
                        borderRadius: '6px',
                        marginBottom: '2rem'
                    }}>
                        {error}
                    </div>
                )}

                {/* Step 1: Sector Selection */}
                {currentStep === 1 && (
                    <div>
                        <h2 style={{ 
                            fontSize: '1.5rem', 
                            fontWeight: '600', 
                            marginBottom: '2rem',
                            color: '#1f2937'
                        }}>
                            Choose Your Industry Sector
                        </h2>
                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '1rem'
                        }}>
                            {sectors.map((sector) => (
                                <button
                                    key={sector.id}
                                    onClick={() => handleSectorSelect(sector.id)}
                                    style={{
                                        padding: '2rem 1rem',
                                        border: '2px solid #e5e7eb',
                                        borderRadius: '8px',
                                        backgroundColor: 'white',
                                        cursor: 'pointer',
                                        textAlign: 'center',
                                        transition: 'all 0.2s',
                                        fontSize: '1rem'
                                    }}
                                    onMouseOver={(e) => {
                                        e.target.style.borderColor = '#3b82f6';
                                        e.target.style.backgroundColor = '#eff6ff';
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.style.borderColor = '#e5e7eb';
                                        e.target.style.backgroundColor = 'white';
                                    }}
                                >
                                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                                        {sectorIcons[sector.name] || '📂'}
                                    </div>
                                    <div style={{ fontWeight: '600', color: '#1f2937' }}>
                                        {sector.name}
                                    </div>
                                    <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>
                                        {sector.description}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 2: Specialization Selection */}
                {currentStep === 2 && (
                    <div>
                        <h2 style={{ 
                            fontSize: '1.5rem', 
                            fontWeight: '600', 
                            marginBottom: '2rem',
                            color: '#1f2937'
                        }}>
                            Choose Your Specialization
                        </h2>
                        <div style={{ marginBottom: '2rem' }}>
                            {specializations.map((spec) => (
                                <label
                                    key={spec.id}
                                    style={{
                                        display: 'block',
                                        padding: '1rem',
                                        margin: '0.5rem 0',
                                        border: `2px solid ${selectedSpecialization == spec.id ? '#3b82f6' : '#e5e7eb'}`,
                                        borderRadius: '8px',
                                        backgroundColor: selectedSpecialization == spec.id ? '#eff6ff' : 'white',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <input
                                        type="radio"
                                        name="specialization"
                                        value={spec.id}
                                        checked={selectedSpecialization == spec.id}
                                        onChange={(e) => handleSpecializationSelect(e.target.value)}
                                        style={{ marginRight: '0.75rem' }}
                                    />
                                    <span style={{ fontWeight: '600', color: '#1f2937' }}>
                                        {spec.name}
                                    </span>
                                    <div style={{ 
                                        fontSize: '0.875rem', 
                                        color: '#6b7280', 
                                        marginTop: '0.25rem',
                                        marginLeft: '1.5rem'
                                    }}>
                                        {spec.description}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    marginTop: '3rem'
                }}>
                    <button
                        onClick={handleBack}
                        style={{
                            padding: '0.75rem 1.5rem',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            backgroundColor: 'white',
                            color: '#374151',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        ← Back
                    </button>
                    
                    {currentStep === 2 && (
                        <button
                            onClick={handleComplete}
                            disabled={!selectedSpecialization}
                            style={{
                                padding: '0.75rem 1.5rem',
                                border: 'none',
                                borderRadius: '6px',
                                backgroundColor: selectedSpecialization ? '#3b82f6' : '#9ca3af',
                                color: 'white',
                                cursor: selectedSpecialization ? 'pointer' : 'not-allowed',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            Complete →
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

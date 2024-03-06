import React, { useEffect, useState } from 'react';
import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import axios from 'axios';

const ParticleBoardForm = ({ onHideLines, setParticles, particles, originalParticlesRef, particleBoardWidth, particleBoardHeight }: ParticleBoardForm) => {
    const [name, setName] = useState('');
    const [userId, setUserId] = useState<string | null>(null);
    const [userHasSubmitted, setUserHasSubmitted] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        // Check if the user has already submitted their name
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
            setUserHasSubmitted(true);
        }
    }, []);

    const handleSubmit = async () => {
        if (userHasSubmitted && userId) {
            // Update existing name
            try {
                // Update particle in MongoDB
                await axios.put(`${apiUrl}/api/particles/${userId}`, { name });

                // Retrieve updated particle from MongoDB
                const getNewParticleResponse = await axios.get<Particle>(`${apiUrl}/api/particles/${userId}`);
                let updatedParticle = getNewParticleResponse.data;

                debugger;

                // Merge with existing particle data
                setParticles((prevParticles: any) => prevParticles.map((p: any) => {
                    return p._id === updatedParticle?._id ? { ...p, ...updatedParticle } : p;
                }));
            } catch (err) {
                console.log("Error updating particle!");
            }
        } else {
            // Submit new name
            try {
                const response = await axios.post(`${apiUrl}/api/particles`, { name });
                const newParticle = response.data.particle;

                debugger;

                if (newParticle) {
                    localStorage.setItem('userId', newParticle._id);
                    setUserId(newParticle._id);
                    setUserHasSubmitted(true);

                    // Add new particle with additional properties
                    setParticles((prevParticles: any) => [
                        ...prevParticles,
                        {
                            ...newParticle,
                            x: Math.random() * particleBoardWidth,
                            y: Math.random() * particleBoardHeight,
                            vx: (Math.random() - 0.5) * 2,
                            vy: (Math.random() - 0.5) * 2,
                            color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`
                        }
                    ]);
                }
            } catch (err) {
                console.log("Error in CreateParticle!");
            }
        }
    };

    const handleDelete = async () => {
        if (userId) {
            try {
                await axios.delete(`${apiUrl}/api/particles/${userId}`);
                localStorage.removeItem('userId');
                setUserHasSubmitted(false);
                setUserId(null);
    
                // Remove the deleted particle from the current particles state
                setParticles((prevParticles: Particle[]) => prevParticles.filter(particle => particle._id !== userId));
    
                // Automatically show all particles if 'Hide all but your name' was active
                setParticles(originalParticlesRef.current);
    
            } catch (err) {
                console.log("Error deleting particle!", err);
            }
        }
    };        

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setName(e.target.value);
    };

    const toggleHideAllButYourName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;

        if (isChecked) {
            const userId = localStorage.getItem('userId');
            setParticles(particles.filter((particle: Particle) => particle._id === userId));
        } else {
            // When showing all particles, merge the original list with any updates or new additions
            setParticles((prevParticles: Particle[]) => {
                const updatedOriginals = originalParticlesRef.current.map((originalParticle: { _id: string; }) => {
                    const updatedParticle = prevParticles.find((p: { _id: string; }) => p._id === originalParticle._id);
                    return updatedParticle || originalParticle;
                });
                const newParticles = prevParticles.filter((p: { _id: string; }) => !originalParticlesRef.current.some((original: { _id: string; }) => original._id === p._id));
                return [...updatedOriginals, ...newParticles];
            });
        }
    };

    const toggleHideLines = (e: React.ChangeEvent<HTMLInputElement>) => {
        onHideLines(e.target.checked);
    };  

    return (
        <div className='particle-form-container particle-board-input'>
            <TextField
                label={userHasSubmitted ? 'Update your name' : 'Enter your name'}
                variant="outlined"
                value={name}
                onChange={(e) => handleNameChange(e)}
            />
            <div className='form-controls-container'>
                <Button variant="contained" color="warning" onClick={handleSubmit}>Submit</Button>
                {userHasSubmitted && (
                    <Button variant="contained" color="warning" onClick={handleDelete}>Delete name</Button>
                )}
                {userHasSubmitted && (
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox onChange={toggleHideAllButYourName} />}
                            label="Hide all but your name"
                        />
                    </FormGroup>
                )}
                <div>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox onChange={toggleHideLines} />}
                            label="Hide lines"
                        />
                    </FormGroup>
                </div>
            </div>
        </div>
    );
};

export default ParticleBoardForm;
import React, { useEffect, useState } from 'react';
import { Button, Checkbox, CircularProgress, FormControlLabel, FormGroup, TextField, Dialog, DialogTitle, DialogActions } from '@mui/material';
import axios from 'axios';

const ParticleBoardForm = ({ onHideLines, setParticles, particles, originalParticlesRef, particleBoardWidth, particleBoardHeight, particleSpeedFactor }: ParticleBoardForm) => {
    const [name, setName] = useState('');
    const [userId, setUserId] = useState<string | null>(null);
    const [userHasSubmitted, setUserHasSubmitted] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [errors, setErrors] = useState({ name: '' });
    const [dialogContent, setDialogContent] = useState('');
    const [isUpdateToNameLoading, setIsUpdateToNameLoading] = useState(false);
    const [isDeletingLoading, setIsDeletingLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        // Check if the user has already submitted their name
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
            setUserHasSubmitted(true);
        }
    }, []);

    const validateForm = () => {
        let tempErrors = { name: '' };
        let formIsValid = true;

        if (!name.trim()) {
            tempErrors.name = 'Name is required';
            formIsValid = false;
        }

        setErrors(tempErrors);
        return formIsValid;
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsUpdateToNameLoading(true);

        if (userHasSubmitted && userId) {
            // Update existing name
            try {
                // Update particle in MongoDB
                await axios.put(`${apiUrl}/api/particles/${userId}`, { name });

                // Retrieve updated particle from MongoDB
                const getNewParticleResponse = await axios.get<Particle>(`${apiUrl}/api/particles/${userId}`);
                let updatedParticle = getNewParticleResponse.data;

                // Merge with existing particle data
                setParticles((prevParticles: any) => prevParticles.map((p: any) => {
                    return p._id === updatedParticle?._id ? { ...p, ...updatedParticle } : p;
                }));

                setDialogContent('Your name has been updated successully!');
            } catch (err) {
                console.log("Error updating particle!");
                setDialogContent('Failed to update name. Please try again.');
            } finally {
                setIsUpdateToNameLoading(false);
                setOpenDialog(true);
            }
        } else {
            // Submit new name
            try {
                const response = await axios.post(`${apiUrl}/api/particles`, { name });
                const newParticle = response.data.particle;

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
                            vx: (Math.random() - 0.5) * 2 * particleSpeedFactor,
                            vy: (Math.random() - 0.5) * 2 * particleSpeedFactor,
                            color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`
                        }
                    ]);
                }

                setDialogContent(`Success! Your name is now showcased on the board.<br /><br />Please keep in mind: each device can add one unique name. If you'd like, you have the option to update your existing name or remove it to add a new one.`);
            } catch (err) {
                console.log("Error in CreateParticle!");
                setDialogContent('Failed to add name. Please try again.');
            } finally {
                setIsUpdateToNameLoading(false);
                setOpenDialog(true);
            }
        }
    };

    const handleDelete = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        setIsDeletingLoading(true);

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

                setDialogContent('Your name has been deleted successully!');
            } catch (err) {
                console.log("Error deleting particle!", err);
                setDialogContent('Failed to delete name. Please try again.');
            } finally {
                setIsDeletingLoading(false);
                setOpenDialog(true);
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

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <div className='particle-form-container particle-board-input'>
            <TextField
                label={userHasSubmitted ? 'Change your name' : 'Enter your name'}
                variant="outlined"
                error={!!errors.name}
                helperText={errors.name}
                value={name}
                onChange={(e) => handleNameChange(e)}
            />
            <div className='form-controls-container'>
                <Button
                    variant="contained"
                    color="warning"
                    disabled={isUpdateToNameLoading}
                    onClick={handleSubmit}
                >
                    {isUpdateToNameLoading ? <CircularProgress size={24} /> : (userHasSubmitted ? 'Change your name' : 'Submit name')}
                </Button>

                {userHasSubmitted && (
                    <Button
                        variant="contained"
                        color="warning"
                        disabled={isDeletingLoading}
                        onClick={handleDelete}
                    >
                        {isDeletingLoading ? <CircularProgress size={24} /> : 'Delete name'}
                    </Button>
                )}

                {userHasSubmitted && (
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox onChange={toggleHideAllButYourName} />}
                            label="Hide all but your name"
                        />
                    </FormGroup>
                )}

                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox onChange={toggleHideLines} />}
                        label="Hide lines"
                    />
                </FormGroup>
            </div>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle dangerouslySetInnerHTML={{ __html: dialogContent }}></DialogTitle>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ParticleBoardForm;
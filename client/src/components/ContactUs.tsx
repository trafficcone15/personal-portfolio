import React, { useEffect, useRef, useState } from 'react';
import { TextField, Button, Box, Dialog, DialogTitle, DialogActions } from '@mui/material';
import { CircularProgress } from '@mui/material';
import '../styles/ContactUs.scss';
import axios from 'axios';
import { animateOnScrollTo } from '../utils/generalUtilities';

const ContactUs = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formState, setFormState] = useState<FormState>({ name: '', email: '', message: '' });
    const [openDialog, setOpenDialog] = useState(false);
    const [errors, setErrors] = useState({ name: '', email: '', message: '' });
    const [dialogContent, setDialogContent] = useState('');    
    const apiUrl = import.meta.env.VITE_API_URL;

    const hiddenElementsRef = useRef<NodeListOf<HTMLElement> | null>(null);

    useEffect(() => {
        hiddenElementsRef.current = document.querySelectorAll('h1, .welcome-section');
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        animateOnScrollTo(hiddenElementsRef);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let tempErrors = { name: '', email: '', message: '' };
        let formIsValid = true;

        if (!formState.name.trim()) {
            tempErrors.name = 'Name is required';
            formIsValid = false;
        }

        if (!formState.email.trim()) {
            tempErrors.email = 'Email is required';
            formIsValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
            tempErrors.email = 'Email is not valid';
            formIsValid = false;
        }

        if (!formState.message.trim()) {
            tempErrors.message = 'Message is required';
            formIsValid = false;
        }

        setErrors(tempErrors);
        return formIsValid;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }
        
        setIsLoading(true);

        try {
            await axios.post(`${apiUrl}/api/contact/send-email`, formState);
            await axios.post(`${apiUrl}/api/contact/upload-contact`, formState);
            setDialogContent('Message sent successfully!');
        } catch (error) {
            setDialogContent('Failed to send message. Please try again.');
        } finally {
            setIsLoading(false);
            setOpenDialog(true);
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <div className="contact-us-section-container" id="contact-me">
            <h1>Contact</h1>
            <div className='form-section'>
                <div className='contact-us-text'>
                    If you wish to contact me please feel free to enter your details here and I'll get back to you as soon as possible.
                    <br />
                    Or, if you'd like to get in touch sooner flick me an email at <i><u>showellross@gmail.com</u></i>
                </div>
                <form onSubmit={handleSubmit}>
                    <Box marginBottom={2}>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            variant="outlined"
                            error={!!errors.name}
                            helperText={errors.name}
                            value={formState.name}
                            onChange={handleInputChange}
                        />
                    </Box>
                    <Box marginBottom={2}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            variant="outlined"
                            error={!!errors.email}
                            helperText={errors.email}
                            value={formState.email}
                            onChange={handleInputChange}
                        />
                    </Box>
                    <Box marginBottom={2}>
                        <TextField
                            fullWidth
                            label="Message"
                            name="message"
                            variant="outlined"
                            error={!!errors.message}
                            helperText={errors.message}
                            multiline
                            rows={4}
                            value={formState.message}
                            onChange={handleInputChange}
                        />
                    </Box>
                    <Box marginBottom={2}>
                        <Button variant="contained" color="primary" type="submit" disabled={isLoading}>
                            {isLoading ? <CircularProgress size={24} /> : 'Send Message'}
                        </Button>
                    </Box>
                </form>
                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>{dialogContent}</DialogTitle>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};

export default ContactUs;

import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import AnimatedText from './AnimatedText';
import BackgroundWaves from './BackgroundWaves';
import rubiksCubeAnimationData from '../assets/svg-animations/rubiks-cube.json';
import '../styles/HeroSection.scss';

const HeroSection = () => {
    const [showLink, setShowLink] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowLink(true), 4600); 
        return () => clearTimeout(timer);
    }, []);

    const animatedTextSubText = `I am a software developer.<br />
I designed and crafted this site using the MERN stack,<br />
utilizing MongoDB, Express.js, React (with TypeScript), and Node.js.<br />
Featured here is a unique mini project - a Digital Welcome Board.<br />
It's a creative application of the MERN stack and RESTful API,<br />
where visitors can leave their mark in real-time.<br />
Explore below to see more of my skills and projects.<br /><br />

Feel free to take a look at the code for this site on my GitHub.
`;

    return (
        <div className="hero-section-container" id="top">
            <BackgroundWaves light='#c9bdeb' medium='#a592df' dark='#8067d0' lightest='#eae4f7' backgroundColourOne='#e1ecbd' backgroundColourTwo='#88af1a' />
            <div className='section-container'>
                <div>
                    <AnimatedText className='welcome-text' heading='Hi my name is Rostyn Showell' subText={animatedTextSubText} />
                    <a href='https://github.com/trafficcone15/personal-portfolio'
                        target='_blank'
                        className={`source-link ${showLink ? 'visible' : ''}`}>Source Code Here!</a>
                </div>
                <Lottie className='coding-lottie-animation' animationData={rubiksCubeAnimationData} loop={true} />
            </div>
        </div>
    );
};

export default HeroSection;

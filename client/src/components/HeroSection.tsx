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

    const animatedTextSubText = `
I'm a passionate software developer.<br />
This site represents a dynamic full stack web application, complete with its own dedicated server.<br /><br />

Crafted meticulously from scratch, this application harnesses the power of the MERN stack, integrating MongoDB, Express.js, React (augmented with TypeScript), and Node.js.<br /><br />

Built and operating without burdensome fees or subscriptions. The sole expense? The domain name.<br /><br />

Dive below to uncover a showcase of my technical abilities and inventive projects. Each project is a unique brainchild, crafted from the ground up and free to operate.<br /><br />

Curious about the inner workings? Take a peek at the source code on my GitHub.
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

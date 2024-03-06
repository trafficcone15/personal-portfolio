import Lottie from 'lottie-react';
import AnimatedText from './AnimatedText';
import BackgroundWaves from './BackgroundWaves';
import rubiksCubeAnimationData from '../assets/svg-animations/rubiks-cube.json';
import '../styles/HeroSection.scss';

const HeroSection = () => {
    const animatedTextSubText = `I am a software developer.<br />
I designed and crafted this site using the MERN stack,<br />
utilizing MongoDB, Express.js, React (with TypeScript), and Node.js.<br />
Featured here is a unique mini project - a Digital Welcome Board.<br />
It's a creative application of the MERN stack and RESTful API,<br />
where visitors can leave their mark in real-time.<br />
Explore below to see more of my skills and projects.`;

    return (
        <div className="hero-section-container" id="top">
            <BackgroundWaves light='#c9bdeb' medium='#a592df' dark='#8067d0' lightest='#eae4f7' backgroundColourOne='#e1ecbd' backgroundColourTwo='#88af1a' />
            <div className='section-container'>
                <AnimatedText className='welcome-text' heading='Hi my name is Rostyn Showell' subText={animatedTextSubText} />
                <Lottie className='coding-lottie-animation' animationData={rubiksCubeAnimationData} loop={true} />
            </div>
        </div>
    );
};

export default HeroSection;
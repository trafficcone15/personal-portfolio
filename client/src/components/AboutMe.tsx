import React, { useEffect, useRef } from 'react';
import '../styles/AboutMe.scss';
import profilePic from '../assets/images/profile-pic.jpg';
import GetSVG from './GetSVG';
import { animateOnScrollTo } from '../utils/generalUtilities';

const AboutMe: React.FC = () => {
    const hiddenElementsRef = useRef<NodeListOf<HTMLElement> | null>(null);

    useEffect(() => {
        hiddenElementsRef.current = document.querySelectorAll('h1, .icon-container');
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        animateOnScrollTo(hiddenElementsRef);
    };

    return (
        <div className='about-me-container section-container' id="about-me">
            <div className='text-column'>
                <h1>About Me</h1>
                <p>Hi! I'm Rostyn Showell, but you can call me Ross for short. I'm a passionate software developer with a diverse background and a love for all things tech and music.</p> 
                <br />
                <p>I was born in South Africa but raised in New Zealand since early childhood. My journey into technology began in high school, where I discovered my passion for programming.</p>
                <p>Music has also been a constant companion throughout my life. I've been immersed in the world of guitar since my early years, achieving high grades in Trinity College Music for Classical Guitar, which further fueled my love for music and the arts.</p> 
                <br />
                <p>In my late teens, I ventured back to my birth city in South Africa to pursue higher education at university. However, my thirst for exploration and adventure led me to Australia, where I delved into the vibrant culture and dynamic cities. It was during this time that I discovered the art of coffee making and honed my skills as a barista in iconic locations such as the Gold Coast, Melbourne, and Byron Bay.</p> 
                <br />
                <p>Returning to my roots in Auckland, New Zealand, I continued my quest for knowledge and excellence by furthering my studies in web development. Later, I began developing for an Online Job Management Software Company based in Auckland, as well as pursuing further web-based projects for other companies in my free time.</p>
            </div>
            <div className='text-column'>
                <p>With a robust skill set encompassing TypeScript, JavaScript, Firebase, React, C#, ASP.NET, SQL, SASS, and Telerik Reporting, I embarked on projects that pushed the boundaries of innovation and creativity.</p>
                <br />
                <p>In addition to mastering the full MERN stack (MongoDB, Express.js, React, Node.js), I've also developed expertise in Angular, a versatile framework for building dynamic web applications.</p>
                <br />
                <p>Outside the realm of coding, I find joy in pursuing a diverse array of hobbies and interests. Whether I'm strumming the strings of my classical guitar, embarking on leisurely walks amidst nature's beauty, perfecting my craft as a home barista, or immersing myself in captivating content on YouTube and Twitch, I'm always eager to explore new avenues of creativity and discovery.</p> 
                <br />
                <p>Thank you for taking the time to get to know a bit about me. I'm thrilled at the prospect of connecting with fellow enthusiasts and collaborators as we embark on this exciting journey together.</p>
            </div>
            <div className='text-column'>
                <div className='image-column'>
                    <img src={profilePic} alt='Ross Showell' />
                </div>
                <div className='icon-container'>
                    <GetSVG svgName='typescript' svgClassName='icons' />
                    <GetSVG svgName='javascript' svgClassName='icons' />
                    <GetSVG svgName='firebase' svgClassName='icons' />
                    <GetSVG svgName='react' svgClassName='icons' />
                    <GetSVG svgName='c-sharp' svgClassName='icons' />
                    <GetSVG svgName='microsoft-sql-server' svgClassName='icons' />
                    <GetSVG svgName='mongodb' svgClassName='icons' />
                    <GetSVG svgName='node-js' svgClassName='icons' />
                    <GetSVG svgName='angular' svgClassName='icons' />
                    <GetSVG svgName='sass' svgClassName='icons' />
                </div>
            </div>
        </div>
    );
}

export default AboutMe;
import { useEffect, useRef, useState } from 'react';
import useParticleBoard from '../hooks/useParticleBoard';
import ParticleBoardCanvas from './ParticleBoardCanvas';
import ParticleBoardForm from './ParticleBoardForm';
import '../styles/ParticleBoardSection.scss';
import { animateOnScrollTo } from '../utils/generalUtilities';

const ParticleBoardSection = () => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [showLines, setShowLines] = useState<boolean>(true);
    const { particles, setParticles, originalParticlesRef, particleBoardWidth, particleBoardHeight } = useParticleBoard('http://localhost:8082/api/particles', svgRef);

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

    return (
        <div className="particle-board-section-container section-container" id="mern-board">
            <h1>Particle Welcome Board</h1>
            <ParticleBoardCanvas
                particles={particles}
                showLines={showLines}
                particleBoardWidth={particleBoardWidth}
                particleBoardHeight={particleBoardHeight}
                svgRef={svgRef}
            />
            <ParticleBoardForm
                onHideLines={(isChecked) => { isChecked ? setShowLines(false) : setShowLines(true)}}
                setParticles={setParticles}
                particles={particles}
                originalParticlesRef={originalParticlesRef}
                particleBoardWidth={particleBoardWidth}
                particleBoardHeight={particleBoardHeight}
            />
            <div className="welcome-section">
                <h2>A Twist on the Classic Welcome Board</h2>
                <p>Imagine walking into a cozy cafe and seeing a welcome board with names of patrons and their greetings. The Particle Board is a digital version of this experience, powered by the robust MERN (MongoDB, Express.js, React, Node.js) stack technology. It's an interactive canvas where each visitor can become a part of the welcoming display by adding their name as a dynamic particle.</p>
                <p><strong>MERN Stack Magic:</strong> This board is built on the MERN stack, combining MongoDB's flexible database, Express.js's efficient server operations, React's dynamic interfaces, and Node.js's solid runtime environment.</p>
                <p><strong>RESTful API Integration:</strong> The board operates through a RESTful API, managing all interactions with the server. Whether you're viewing, adding, updating, or removing your name, the API ensures smooth data handling.</p>
            </div>
        </div>
    );
};

export default ParticleBoardSection;
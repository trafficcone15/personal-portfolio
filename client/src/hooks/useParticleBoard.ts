import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const useParticleBoard = (apiUrl: string, svgContainerRef: React.RefObject<HTMLDivElement>) => {
    const [particles, setParticles] = useState<Particle[]>([]);
    const originalParticlesRef = useRef<Particle[]>([]);
    const [particleBoardWidth, setParticleBoardWidth] = useState<number>(0);
    const [particleBoardHeight, setParticleBoardHeight] = useState<number>(0);
    const [userId, setUserId] = useState<string | null>(null);
    // Adjust particleSpeedFactor to control particle speed (1 = normal, >1 = faster, <1 = slower)
    const particleSpeedFactor = 2;

    const debounce = <F extends (...args: any[]) => void>(
        func: F,
        delay: number
    ): ((...args: Parameters<F>) => void) => {
        let debounceTimer: ReturnType<typeof setTimeout>;
        return function (this: any, ...args: Parameters<F>) {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(this, args), delay);
        };
    };
    
    useEffect(() => {
        // This hook will make the board responsive

        const setBoardSize = () => {
            if (svgContainerRef.current) {
                setParticleBoardWidth(svgContainerRef.current.clientWidth);
                setParticleBoardHeight(svgContainerRef.current.clientHeight);
            }
        };

        // Debounce function to help prevent performance issues when testing responsivess and consistently resizing browser 
        const handleResize = debounce(setBoardSize, 250);

        // Set initial size
        setBoardSize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [svgContainerRef]);

    useEffect(() => {
        const fetchParticles = async () => {
            try {
                const response = await axios.get<Particle[]>(apiUrl);
                const fetchedParticles = response.data.map((particle) => ({
                    ...particle,
                    x: Math.random() * particleBoardWidth,
                    y: Math.random() * particleBoardHeight,
                    vx: (Math.random() - 0.5) * 2 * particleSpeedFactor,
                    vy: (Math.random() - 0.5) * 2 * particleSpeedFactor,
                    color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`
                }));

                if (fetchedParticles)
                    setParticles(fetchedParticles);
                originalParticlesRef.current = fetchedParticles;
            } catch (error) {
                console.error('Error fetching particles:', error);
            }
        };

        if (particleBoardWidth && particleBoardHeight) {
            fetchParticles();
        }
    }, [apiUrl, particleBoardWidth, particleBoardHeight]);

    return {
        particles,
        setParticles,
        originalParticlesRef,
        particleBoardWidth,
        setParticleBoardWidth,
        particleBoardHeight,
        particleSpeedFactor,
        setParticleBoardHeight,
        userId,
        setUserId
    };
};

export default useParticleBoard;
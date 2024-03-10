import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { setupNodes, moveNodes, handleCollisions, generateLines } from '../utils/particleBoardUtilities';

const ParticleBoardCanvas: React.FC<ParticleBoardCanvas> = ({ particles, showLines, particleBoardWidth, particleBoardHeight, svgContainerRef, onParticlesRendered, particleSpeedFactor }) => {
    const animationRef = useRef<number>(0);

    useEffect(() => {
        if (particles.length === 0) {
            return; // Don't proceed if particles are not loaded
        }

        const svg = d3.select(svgContainerRef.current).select('svg');
        svg.selectAll('*').remove(); // Clear previous SVG elements
        let nodes = setupNodes(svg, particles);
        let hasRenderedParticles = false;

        const updateNodePositions = () => {
            if (!nodes) return;

            moveNodes(nodes, particleBoardWidth, particleBoardHeight, particleSpeedFactor);
            handleCollisions(particles);
            if (showLines) {
                generateLines(particles, svg);
            } else {
                svg.selectAll('.line').remove();
            }

            if (!hasRenderedParticles) {
                onParticlesRendered(true);
                hasRenderedParticles = true;
            }

            animationRef.current = requestAnimationFrame(updateNodePositions); // Continue the animation loop
        };
        // Start the animation loop
        animationRef.current = requestAnimationFrame(updateNodePositions);

        // Clean up function to cancel the animation frame when unmounting
        return () => {
            cancelAnimationFrame(animationRef.current);
        };
    }, [particles, particleBoardWidth, particleBoardHeight, showLines, onParticlesRendered]);

    return (
        <svg
            className='svg-particle-board' style={{ visibility: 'hidden' }}
        ></svg>
    );
};

export default ParticleBoardCanvas;
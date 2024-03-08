import React, { useEffect } from 'react';

import * as d3 from 'd3';
import { setupNodes, moveNodes, handleCollisions, generateLines } from '../utils/particleBoardUtilities';

const ParticleBoardCanvas: React.FC<ParticleBoardCanvas> = ({ particles, showLines, particleBoardWidth, particleBoardHeight, svgContainerRef, onParticlesRendered }) => {
    
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

            moveNodes(nodes, particleBoardWidth, particleBoardHeight);
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

            requestAnimationFrame(updateNodePositions); // Continue the animation loop
        };

        requestAnimationFrame(updateNodePositions); // Start the animation loop
    }, [particles, particleBoardWidth, particleBoardHeight, showLines, onParticlesRendered]);

    return (
        <svg
            className='svg-particle-board' style={{ visibility: 'hidden' }}
        ></svg>
    );
};

export default ParticleBoardCanvas;
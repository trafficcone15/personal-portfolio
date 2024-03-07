import React, { useEffect } from 'react';

import * as d3 from 'd3';
import { setupNodes, moveNodes, handleCollisions, generateLines } from '../utils/particleBoardUtilities';

const ParticleBoardCanvas: React.FC<ParticleBoardCanvas> = ({ particles, showLines, particleBoardWidth, particleBoardHeight, svgContainerRef, onParticlesRendered }) => {
    
    useEffect(() => {
        const svg = d3.select(svgContainerRef.current).select('svg');
        svg.selectAll('*').remove(); // Clear previous SVG elements
        let nodes = setupNodes(svg, particles);
        let firstRender = true;

        const updateNodePositions = () => {
            if (!nodes)
                return

            moveNodes(nodes, particleBoardWidth, particleBoardHeight);
            handleCollisions(particles);
            if (showLines) {
                generateLines(particles, svg);
            } else {
                svg.selectAll('.line').remove();
            }

            if (firstRender) {
                onParticlesRendered(true);
                firstRender = false;
            }

            requestAnimationFrame(updateNodePositions); // Continue the animation loop
        };

        requestAnimationFrame(updateNodePositions); // Continue the animation loop
    }, [particles, particleBoardWidth, particleBoardHeight, showLines]);

    return (
        <svg
            className='svg-particle-board' style={{ visibility: 'hidden' }}
        ></svg>
    );
};

export default ParticleBoardCanvas;
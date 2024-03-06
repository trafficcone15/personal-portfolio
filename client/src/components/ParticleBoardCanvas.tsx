import React, { useEffect } from 'react';

import * as d3 from 'd3';
import { setupNodes, moveNodes, handleCollisions, generateLines } from '../utils/particleBoardUtilities';

const ParticleBoardCanvas: React.FC<ParticleBoardCanvas> = ({ particles, showLines, particleBoardWidth, particleBoardHeight, svgRef }) => {

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove(); // Clear previous SVG elements
        let nodes = setupNodes(svg, particles);

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

            requestAnimationFrame(updateNodePositions); // Continue the animation loop
        };

        requestAnimationFrame(updateNodePositions); // Continue the animation loop

    }, [particles, particleBoardWidth, particleBoardHeight, showLines]);

    return (
        <div className="particle-board-wrapper section-container">
            <svg
                className='svg-particle-board'
                ref={svgRef}
            ></svg>
        </div>
    );
};

export default ParticleBoardCanvas;
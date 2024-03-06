import * as d3 from 'd3';

export const setupNodes = (svg: d3.Selection<any, unknown, null, undefined>, particles: Particle[]) => {
  const nodes = svg.selectAll('.node')
    .data(particles)
    .enter().append('g')
    .attr('class', 'node')
    .attr('transform', (d: any) => `translate(${d.x}, ${d.y})`);

  nodes.append('circle')
    .attr('r', 5) // Radius of particles
    .attr('fill', () => `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`);

  nodes.append('text')
    .text(d => d.name)
    .attr('text-anchor', 'middle')
    .attr('dy', 25)
    .style('fill', 'black')
    .style('font-size', '12px');

  return nodes;
};

export const moveNodes = (nodes: d3.Selection<SVGGElement, Particle, any, unknown>, particleBoardWidth: number, particleBoardHeight: number) => {
  nodes.each(function (this: SVGElement, d: Particle) {
    const transformAttr = this.getAttribute('transform');
    if (transformAttr) {
      const [x, y] = transformAttr.substring(10, transformAttr.length - 1).split(',').map(Number);
      d.x = x + d.vx;
      d.y = y + d.vy;

      // Adjust position and reverse velocity if node hits boundaries
      if (d.x <= 0 || d.x >= particleBoardWidth) d.vx *= -1;
      if (d.y <= 0 || d.y >= particleBoardHeight) d.vy *= -1;

      // Update node position
      d3.select(this).attr('transform', `translate(${d.x}, ${d.y})`);
    }
  });
}

export const handleCollisions = (particles: Particle[]) => {
  const nodes = particles;
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[j].x - nodes[i].x;
      const dy = nodes[j].y - nodes[i].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const minDistance = 5; // Particle radius

      if (distance < minDistance) {
        const angle = Math.atan2(dy, dx);
        const vx1 = nodes[i].vx * Math.cos(angle) - nodes[i].vy * Math.sin(angle);
        const vy1 = nodes[i].vx * Math.sin(angle) + nodes[i].vy * Math.cos(angle);
        const vx2 = nodes[j].vx * Math.cos(angle) - nodes[j].vy * Math.sin(angle);
        const vy2 = nodes[j].vx * Math.sin(angle) + nodes[j].vy * Math.cos(angle);

        nodes[i].vx = vx2 * Math.cos(angle) + vy1 * Math.sin(angle);
        nodes[i].vy = vx2 * Math.sin(angle) - vy1 * Math.cos(angle);
        nodes[j].vx = vx1 * Math.cos(angle) + vy2 * Math.sin(angle);
        nodes[j].vy = vx1 * Math.sin(angle) - vy2 * Math.cos(angle);
      }
    }
  }
};

export const generateLines = (particles: Particle[], svg: d3.Selection<any, unknown, null, undefined>) => {
  const updateLines = generatePairs(particles);
  const lines = svg.selectAll('.line')
    .data(updateLines, (d: any) => d[0].id + "-" + d[1].id);

  lines.enter().append('line')
    .attr('class', 'line')
    .style('stroke', (d: {
      x: any; y: number;
    }[]) => {
      const dx = d[0].x - d[1].x;
      const dy = d[0].y - d[1].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      // Adjust the opacity based on the distance
      return `rgba(213, 170, 47, ${1 - distance / 300})`;
    })
    .style('stroke-width', (d: {
      x: any; y: number;
    }[]) => {
      const dx = d[0].x - d[1].x;
      const dy = d[0].y - d[1].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      // Adjust the line width based on the distance
      return Math.max(0.5, 5 - distance / 10);
    });

  const linesUpdate = svg.selectAll('.line').data(updateLines);
  lines.merge(linesUpdate as any)
    .attr('x1', (d: any) => d[0].x)
    .attr('y1', (d: any) => d[0].y)
    .attr('x2', (d: any) => d[1].x)
    .attr('y2', (d: any) => d[1].y);
  linesUpdate.exit().remove();
}

const generatePairs = (nodes: Particle[]) => {
  const maxDistance = 100; // Define a maximum distance for connection
  let pairs = [];

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[j].x - nodes[i].x;
      const dy = nodes[j].y - nodes[i].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= maxDistance) {
        pairs.push([nodes[i], nodes[j]]);
      }
    }
  }

  return pairs;
};
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Timeline: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const data = [
      { year: 1895, event: 'Kenya becomes British East Africa Protectorate' },
      { year: 1963, event: 'Kenya gains independence' },
      // Add more events
    ];

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 90 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear().domain([1890, 2023]).range([0, width]);
    const y = d3.scaleBand().domain(data.map(d => d.event)).range([0, height]).padding(0.1);

    g.append('g').call(d3.axisLeft(y));
    g.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x));

    g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', 0)
      .attr('y', d => y(d.event)!)
      .attr('width', d => x(d.year))
      .attr('height', y.bandwidth())
      .attr('fill', 'steelblue');
  }, []);

  return (
    <div className="timeline-container p-4">
      <h1 className="text-2xl font-bold mb-4">Historical Timeline</h1>
      <svg ref={svgRef} width={800} height={400}></svg>
    </div>
  );
};

export default Timeline;

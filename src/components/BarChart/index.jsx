import React, { useRef, useEffect } from "react";
import "./index.scss";
import * as d3 from "d3";

const BarChart = ({ width, height, data }) => {
  const svgRef = useRef();

  const drawBarGraph = () => {
    // setting up svg container
    const w = width;
    const h = height;
    const svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .style("overflow", "visible")
      .style("margin", "75px 0");

    // setting the scaling
    let yDomainUpperBound = 400 ?? Math.max(...data) + 50;
    const xScale = d3
      .scaleBand()
      .domain(data.map((val, i) => i))
      .range([0, w])
      .padding(0.5);
    const yScale = d3
      .scaleLinear()
      .domain([0, yDomainUpperBound])
      .range([h, 0]);
    // setting the axes
    const xAxis = d3.axisBottom(xScale).ticks(data.length);
    const yAxis = d3.axisLeft(yScale).ticks(7);
    svg
      .append("g")
      .call(xAxis)
      .attr("transform", `translate(0,${h})`)
      .append("text")
      .attr("y", 50)
      .attr("x", width / 2)
      .attr("text-anchor", "end")
      .attr("fill", "black")
      .attr("font-size", "14px")
      .text("Company");

    svg
      .append("g")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "-5.1em")
      .attr("text-anchor", "end")
      .attr("fill", "black")
      .attr("font-size", "14px")
      .text("Profit");

    // setting the svg data
    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("x", (v, i) => xScale(i))
      .attr("y", yScale)
      .attr("width", xScale.bandwidth())
      .attr("height", (val) => h - yScale(val));
    // .attr("fill", "steelblue");

    // chart name
    svg
      .append("text")
      .attr("transform", "translate(100,0)")
      .attr("x", 50)
      .attr("y", 0)
      .attr("font-size", "24px")
      .text("Company Profit Gain");
  };

  useEffect(() => {
    drawBarGraph();
  }, [data]);

  return (
    <div className="chart">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default BarChart;

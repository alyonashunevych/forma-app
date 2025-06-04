import React, { useState } from "react";
import "./Graph.scss";

export function Graph({ y, yTickStep = 2 }) {
  const [hovered, setHovered] = useState(null);

  if (!Array.isArray(y) || y.length === 0) {
    return <div className="custom-graph__label">No data</div>;
  }

  const width = 220;
  const height = 150;
  const paddingLeft = 32;
  const paddingBottom = 28;
  const paddingRight = 20;
  const paddingTop = 30;
  const axisOverflow = 20;

  const xLabels = y.map((_, i) => i + 1);
  const minY = Math.min(...y);
  const maxY = Math.max(...y);

  const yStart = Math.floor(minY / yTickStep) * yTickStep;
  const yEnd = Math.ceil(maxY / yTickStep) * yTickStep;

  const yTicks = [];
  for (let v = yStart; v <= yEnd; v += yTickStep) {
    yTicks.push(v);
  }
  const yRange = yEnd - yStart || 1;

  const getX = (i) =>
    paddingLeft +
    (i * (width - paddingLeft - paddingRight)) / (y.length - 1 || 1);
  const getY = (val) =>
    height -
    paddingBottom -
    ((val - yStart) * (height - paddingTop - paddingBottom)) / yRange;

  const points = y.map((val, i) => `${getX(i)},${getY(val)}`).join(" ");
  const arrowLen = 12;
  const arrowAngle = 8;

  const originX = getX(0);
  const originY = getY(y[0]);

  return (
    <div className="custom-graph" style={{ position: "relative" }}>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%">
        {/* Y grid and labels */}
        {yTicks.map((val) => (
          <g key={val}>
            <text
              x={paddingLeft - 8}
              y={getY(val) + 4}
              fill="#aaa"
              className="custom-graph__label"
              textAnchor="end"
            >
              {val}
            </text>
            <line
              x1={paddingLeft}
              x2={width - paddingRight}
              y1={getY(val)}
              y2={getY(val)}
              stroke="#eee"
              strokeWidth="1"
            />
          </g>
        ))}
        {/* X labels */}
        {xLabels.map((label, i) => (
          <text
            key={label}
            x={getX(i)}
            y={height - paddingBottom + 18}
            fill="#aaa"
            textAnchor="middle"
            className="custom-graph__label"
          >
            {label}
          </text>
        ))}
        {/* Y axis */}
        <line
          x1={originX}
          y1={originY}
          x2={originX}
          y2={paddingTop - axisOverflow}
          stroke="#ccc"
          strokeWidth="1.5"
        />
        {/* Y axis arrow (дві лінії під кутом) */}
        <line
          x1={originX}
          y1={paddingTop - axisOverflow}
          x2={originX - arrowAngle}
          y2={paddingTop + arrowLen - axisOverflow}
          stroke="#bbb"
          strokeWidth="2"
        />
        <line
          x1={originX}
          y1={paddingTop - axisOverflow}
          x2={originX + arrowAngle}
          y2={paddingTop + arrowLen - axisOverflow}
          stroke="#bbb"
          strokeWidth="2"
        />
        {/* X axis */}
        <line
          x1={originX}
          y1={originY}
          x2={width - paddingRight + axisOverflow}
          y2={originY}
          stroke="#ccc"
          strokeWidth="1.5"
        />
        {/* X axis arrow (дві лінії під кутом) */}
        <line
          x1={width - paddingRight + axisOverflow}
          y1={originY}
          x2={width - paddingRight + axisOverflow - arrowLen}
          y2={originY - arrowAngle}
          stroke="#bbb"
          strokeWidth="2"
        />
        <line
          x1={width - paddingRight + axisOverflow}
          y1={originY}
          x2={width - paddingRight + axisOverflow - arrowLen}
          y2={originY + arrowAngle}
          stroke="#bbb"
          strokeWidth="2"
        />
        {/* Graph line */}
        <polyline
          fill="none"
          strokeWidth="5"
          points={points}
          className="custom-graph__line"
        />
        {/* Точки з підказкою */}
        {y.map((val, i) => (
          <g key={i}>
            <circle
              cx={getX(i)}
              cy={getY(val)}
              r={4}
              fill={hovered === i ? "#c7e59e" : "#fff"}
              strokeWidth="2"
              className="custom-graph__point"
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            />
            {hovered === i && (
              <g>
                <rect
                  x={getX(i) - 18}
                  y={getY(val) - 32}
                  width="36"
                  height="22"
                  rx="6"
                  fill="#fff"
                  className="custom-graph__line"
                  strokeWidth="2"
                  opacity="0.95"
                />
                <text
                  x={getX(i)}
                  y={getY(val) - 16}
                  textAnchor="middle"
                  className="custom-graph__label"
                >
                  {val}
                </text>
              </g>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
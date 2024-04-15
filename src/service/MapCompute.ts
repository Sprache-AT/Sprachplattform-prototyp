import { circleDiagramData } from '../types';

const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

const describeArc = (
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
) => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const arcSweep = endAngle - startAngle <= 180 ? '0' : '1';
  const d = [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    0,
    arcSweep,
    0,
    end.x,
    end.y,
    'L',
    x,
    y,
    'L',
    start.x,
    start.y,
  ].join(' ');
  return d;
};

export const determineSize = (
  numValues: number,
  brackets: number[]
): number => {
  if (!brackets || brackets.length < 1) return 1;
  for (let i = 0; i < brackets.length - 1; i++) {
    if ((numValues - brackets[i]) * (brackets[i + 1] - numValues) >= 0) {
      return i > 0 ? Math.pow(i, 0.5716) : 1; // Apparent Scaling by Flannery
    }
  }
  return brackets.length;
};

export const drawCircleDiagram = (
  size: number,
  border: number,
  borderColor: string,
  color: string,
  data: Array<circleDiagramData>,
  encoded: boolean,
  padding: number = 1,
  background: boolean = true,
  pathBorder: boolean = false
) => {
  const viewport = size * padding;
  const hSize = size * 0.5 * padding;
  const ihSize = (size - border * 2) * 0.5;
  let out = '';
  out = `<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" 
    version="1.1" id="graph" width="${viewport}" height="${viewport}" viewBox="0 0 ${viewport} ${viewport}">`;
  if (background) {
    out += `<circle cx="${hSize}" cy="${hSize}" r="${hSize}" fill="${borderColor}" />`;
    out += `<circle class="hover" id="${data[0].id}" cx="${hSize}" cy="${hSize}" r="${ihSize}" fill="${color}" />`;
  }
  const max: number = data
    .flat(Infinity)
    .reduce((a: any, b: any) => Number(a) + (Number(b.v) || 0), 0);
  const angMulti = 360 / max;
  let lAng = 0;
  data.forEach((el: any) => {
    const nAng = lAng + el.v * angMulti;
    out += `<path class="hover" 
      d="${describeArc(hSize, hSize, ihSize, lAng, nAng)}"
      stroke-width="${pathBorder ? 1 : 0}" fill="${el.c || '#f00'}" id="${
      el.id
    }" stroke="${pathBorder ? 'black' : 'none'}"/>`;
    lAng = nAng;
  });

  out += '</svg>';
  return encoded
    ? `data:image/svg+xml;base64, ${window.btoa(encodeURIComponent(out))}`
    : out;
};

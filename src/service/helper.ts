let colorid: number = 0;

/**
 * Generates a single color based on the golden angle approximation. Based on the number provided
 * the function will return a color in HSL format. The returned color has a saturation of (1) 100% and a
 * lightness of (0.75) 75% with an alpha value of (1) 100%. The hue is provided in degrees and not in radians.
 * @param num Multiplier for the golden angle approximation
 * @returns A object containing the HSL color (h, s, l, a). The Hue is provided in degrees.
 */
export const generateSingleColor = (num: number | null) => {
  let angle = 0;
  if (num !== null) {
    angle = num * 137.508; // use golden angle approximation
    colorid += num;
  } else {
    angle = colorid++ * 137.508;
  }
  //return `hsl(${angle},100%,75%)`;
  return {
    h: angle,
    s: 1,
    l: 0.75,
    a: 1,
  };
};

/*
 * Takes a HSL color (All three components seperate) and converts it to a hex notation (#FFFFFF)
 * h is provided as an angle in degrees
 * s and l are to be provided as numbers between 0 and 100
 */
export const hslToHex = (h: number, s: number, l: number) => {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: any) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0'); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

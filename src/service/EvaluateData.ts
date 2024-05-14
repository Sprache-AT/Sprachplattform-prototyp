import {
  answerCount,
  evaluatedAnswer,
  featureAnswer,
  question,
} from '../types';
import { generateSingleColor, hslToHex } from './helper';

// Evaluate the question data and return an array of answerCount
// Answer Count contains the values (v) with a color (c) and an identifier (id) organized in an array
// Is organized at a location level
export const evaluateQuestion = (
  inputData: question,
  colors: Array<string>
): { data: Array<evaluatedAnswer>; colors: Map<string, string> } => {
  const res = [] as Array<evaluatedAnswer>;
  const questionResults = [] as Array<evaluatedAnswer>;
  const colorMap = new Map<string, string>();
  inputData.features.map((feat) => {
    // const singleLocation = evaluateSingleLocation(feat, colorMap, colors);
    const resInputData = [] as Array<evaluatedAnswer>;
    const singleLocation: answerCount[] = [];
    feat.properties.map((prop) => {
      prop.answers.map((ans) => {
        const findIndx = singleLocation.findIndex(
          (el) => el.id === ans.anno && el.reg === ans.reg
        );
        const anno = ans.anno;
        if (findIndx !== -1) {
          if (
            feat.location === 'Lauterach' &&
            feat.title === 'STREICHHOLZ' &&
            ans.anno === 'Streichholz' &&
            ans.reg === 'Ihr Hochdeutsch'
          ) {
            console.log(ans);
            console.log(singleLocation[findIndx]);
          }
          singleLocation[findIndx].v += 1;
        } else {
          let colorFromMap = colorMap.get(anno);
          if (!colorFromMap) {
            // If it does not exist, generate a new color
            // Generate Color as HSL and convert it to a Hex RGB String
            // Check if there is a color in the existing colors
            if (colors.length > 0) {
              // We know that there is a color in the array
              colorFromMap = colors.pop() as string;
            } else {
              const hslColor = generateSingleColor(null);
              colorFromMap = hslToHex(
                hslColor.h,
                hslColor.s * 100,
                hslColor.l * 100
              );
            }
            // Add it to the map for later use
            colorMap.set(anno, colorFromMap);
          }
          singleLocation.push({
            v: 1,
            c: colorFromMap,
            id: ans.anno,
            answer: ans.answer,
            reg: ans.reg,
          });
        }
      });
      if (feat.location === 'Lauterach' && feat.title === 'STREICHHOLZ') {
        console.log(singleLocation);
      }
    });
    questionResults.push({
      location: feat.location,
      PLZ: feat.PLZ,
      answers: singleLocation,
      geometry: feat.geometry,
    });
    //res.push(...resInputData);
  });
  return { data: questionResults, colors: colorMap };
};

const evaluateSingleLocation = (
  data: featureAnswer,
  colors: Map<string, string>,
  existingColors: Array<string>
): Array<answerCount> => {
  const res = [] as Array<answerCount>;
  data.properties.map((prop) => {
    // Count the answers for each person
    prop.answers.map((ans) => {
      // Check if anno contains more than one answer => has a comma?
      const annos = checkIfDouble(ans.anno);
      // Check if the answer is already in the result array
      annos.map((elAnno) => {
        const found = res.find((el) => el.id === elAnno && el.reg === ans.reg);
        if (found) {
          // If the answer is already in the array, increase the value
          found.v += 1;
        } else {
          // If the answer is not in the array, add it
          // Check if the color is already in the map
          let color = colors.get(elAnno);
          if (!color) {
            // If it does not exist, generate a new color
            // Generate Color as HSL and convert it to a Hex RGB String
            // Check if there is a color in the existing colors
            if (existingColors.length > 0) {
              // We know that there is a color in the array
              color = existingColors.pop() as string;
            } else {
              const hslColor = generateSingleColor(null);
              color = hslToHex(hslColor.h, hslColor.s * 100, hslColor.l * 100);
            }
            // Add it to the map for later use
            colors.set(elAnno, color);
          }
          // Generate Color as HSL and convert it to a Hex RGB String
          res.push({
            v: 1,
            c: color,
            id: elAnno,
            answer: ans.answer,
            reg: ans.reg,
          });
        }
      });
    });
  });

  // Return the result
  return res;
};

const checkIfDouble = (answer: string): string[] => {
  const results = answer.split(',').map((el) => el.trim());
  return results;
};

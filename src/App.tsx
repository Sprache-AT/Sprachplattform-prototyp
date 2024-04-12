import { useEffect, useState } from 'react';
import './App.css';

import MapAnalysis from './MapAnalysis.tsx';

import * as dataFr41 from './data/fr41.json';
import * as dataFr3 from './data/fr3.json';
import { evaluatedAnswer, question } from './types.ts';
import { evaluateQuestion } from './service/EvaluateData.ts';

function App() {
  const dataListFr41: question = dataFr41 as question;
  const dataListFr3: question = dataFr3 as question;
  const dataList = [dataListFr41, dataListFr3];

  const [evaluatedData, setEvaluatedData] = useState<
    Array<evaluatedAnswer> | undefined
  >(undefined);
  const [usedColors, setUsedColors] = useState<Map<string, string>>();
  useEffect(() => {
    dataList.map((content, idx) => {
      const { data, colors } = evaluateQuestion(content);
      if (idx === 0) {
        // Set the data for the first element with color
        setEvaluatedData(data);
        setUsedColors(colors);
      }
    });
  }, []);
  return (
    <>
      <MapAnalysis evaluatedData={evaluatedData} usedColors={usedColors} />
    </>
  );
}

export default App;

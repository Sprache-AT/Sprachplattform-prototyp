import { createContext, useEffect, useState } from 'react';
import './App.css';

import MapAnalysis from './MapAnalysis.tsx';

import * as dataFr41 from './data/fr41.json';
import * as dataFr3 from './data/fr3.json';
import { dropDownEntry, evaluatedAnswer, question } from './types.ts';
import { evaluateQuestion } from './service/EvaluateData.ts';

export const QuestionContext = createContext<Array<evaluatedAnswer> | null>(
  null
);

function App() {
  const dataListFr41: question = dataFr41 as question;
  const dataListFr3: question = dataFr3 as question;
  const dataList = [dataListFr41, dataListFr3];

  const [evaluatedData, setEvaluatedData] =
    useState<Array<evaluatedAnswer> | null>(null);
  const [usedColors, setUsedColors] = useState<Map<string, string>>();

  const [questionData, setQuestionData] = useState<
    Array<dropDownEntry<evaluatedAnswer[]>>
  >([]);

  useEffect(() => {
    const res: Array<dropDownEntry<evaluatedAnswer[]>> = [];
    dataList.map((content, idx) => {
      const { data, colors } = evaluateQuestion(
        content,
        Array.from(usedColors ? usedColors.values() : [])
      );
      res.push({
        name: `Frage ${content.features[0].title}`,
        value: idx,
        entries: data,
      });
      if (idx === 0) {
        // Set the data for the first element with color
        setEvaluatedData(data);
        setUsedColors(colors);
      }
    });
    setQuestionData(res);
  }, []);

  return (
    <>
      <QuestionContext.Provider value={evaluatedData}>
        <MapAnalysis questionData={questionData} usedColors={usedColors} />
      </QuestionContext.Provider>
    </>
  );
}

export default App;

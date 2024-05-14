import { createContext, useEffect, useState } from 'react';
import './App.css';

import MapAnalysis from './MapAnalysis.tsx';

import * as dataFr41 from './data/fr41.json';
import * as dataFr3 from './data/fr3.json';
import {
  dropDownEntry,
  evaluatedAnswer,
  question,
  questionColors,
} from './types.ts';
import { evaluateQuestion } from './service/EvaluateData.ts';
import WorkBox from './WorkBox.tsx';
import Article from './Article.tsx';

export const QuestionContext = createContext<Array<evaluatedAnswer> | null>(
  null
);

function App() {
  const dataListFr41: question = dataFr41 as question;
  const dataListFr3: question = dataFr3 as question;
  const dataList = [dataListFr41, dataListFr3];

  const [evaluatedData, setEvaluatedData] =
    useState<Array<evaluatedAnswer> | null>(null);
  const [usedColors, setUsedColors] = useState<Array<questionColors>>();

  const [questionData, setQuestionData] = useState<
    Array<dropDownEntry<evaluatedAnswer[]>>
  >([]);

  useEffect(() => {
    const res: Array<dropDownEntry<evaluatedAnswer[]>> = [];
    const questionColors = [] as Array<questionColors>;
    const currColors: Array<string> = [];

    dataList.map((content, idx) => {
      const { data, colors } = evaluateQuestion(content, currColors);
      questionColors.push({ qId: idx, colors: colors });
      currColors.push(...colors.values());
      res.push({
        name: `Frage ${content.features[0].title}`,
        value: idx,
        entries: data,
      });
      if (idx === 0) {
        // Set the data for the first element with color
        setEvaluatedData(data);
      }
    });
    setUsedColors(questionColors);
    setQuestionData(res);
  }, []);

  return (
    <>
      <div className='columns-1 pb-20'>
        <div>
          <QuestionContext.Provider value={evaluatedData}>
            {questionData.length > 0 && usedColors ? (
              <MapAnalysis
                questionData={questionData}
                usedColors={usedColors}
              ></MapAnalysis>
            ) : (
              'Loading...'
            )}
          </QuestionContext.Provider>
        </div>
        <div className='h-full mt-10'>
          <WorkBox Element={() => <Article />} />
        </div>
      </div>
    </>
  );
}

export default App;

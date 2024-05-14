import { createContext } from 'react';
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
import { countAnswersinQuestion } from './service/EvaluateData.ts';
import WorkBox from './WorkBox.tsx';
import Article from './Article.tsx';

export const QuestionContext = createContext<
  dropDownEntry<evaluatedAnswer[]>[] | undefined
>(undefined);

function initalizeData(dataList: question[]) {
  console.log('starting init');
  const res: Array<dropDownEntry<evaluatedAnswer[]>> = [];
  const questionColors = [] as Array<questionColors>;
  const currColors: Array<string> = [];

  dataList.forEach((content, idx) => {
    const { data, colors } = countAnswersinQuestion(content, currColors);
    questionColors.push({ qId: idx, colors: colors });
    currColors.push(...colors.values());
    res.push({
      name: `Frage ${content.features[0].title}`,
      value: idx,
      entries: data,
    });
  });

  return { calculatedData: res, colors: questionColors };
}

function App() {
  const dataListFr41: question = dataFr41 as question;
  const dataListFr3: question = dataFr3 as question;
  const dataList = [dataListFr41, dataListFr3];

  const { calculatedData, colors } = initalizeData(dataList);

  return (
    <>
      <div className='columns-1 pb-20'>
        <div>
          <QuestionContext.Provider value={calculatedData}>
            {calculatedData.length > 0 && colors ? (
              <MapAnalysis usedColors={colors}></MapAnalysis>
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

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
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';

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
  const { isLoading, error, data } = useQuery({
    queryKey: ['data'],
    queryFn: async () => {
      const dataListFr41 = await fetch('./src/data/fr41.json').then((res) =>
        res.json()
      );
      const dataListFr3 = await fetch('./src/data/fr3.json').then((res) =>
        res.json()
      );
      const dataList = [dataListFr41, dataListFr3];
      return initalizeData(dataList);
    },
  });

  // const { calculatedData, colors } = initalizeData(dataList);

  if (error) {
    return <>Ein Fehler ist aufgetreten: {error.message}</>;
  }

  return (
    <>
      <div className='columns-1 pb-20'>
        {isLoading ? (
          'Loading...'
        ) : data && data.calculatedData.length > 0 && data.colors ? (
          <div>
            <div>
              <QuestionContext.Provider value={data.calculatedData}>
                {data.calculatedData.length > 0 && data.colors ? (
                  <MapAnalysis usedColors={data.colors}></MapAnalysis>
                ) : (
                  'Data does not contain any results...'
                )}
              </QuestionContext.Provider>
            </div>
            <div className='h-full mt-10'>
              <WorkBox Element={() => <Article />} />
            </div>
          </div>
        ) : (
          'Ein Fehler ist aufgetreten bitte neu laden...'
        )}
      </div>
    </>
  );
}

export default App;

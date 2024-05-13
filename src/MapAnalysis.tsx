import { createContext, useContext, useState } from 'react';
import { dropDownEntry, evaluatedAnswer, questionColors } from './types';
import WorkBox from './WorkBox';
import Map from './Map';
import MapDropdown from './MapDropdown';
import CheckboxComp from './CheckboxComp';

import 'leaflet/dist/leaflet.css';
import Table from './Table';

const SelectedContext = createContext<dropDownEntry<undefined> | null>(null);
const SelectedQuestion = createContext<{
  question: dropDownEntry<evaluatedAnswer[]>;
  selectedReg: dropDownEntry<undefined>;
} | null>(null);

function useSelection() {
  const context = useContext(SelectedContext);
  if (context === null) {
    throw new Error('useSelection must be used within a SelectedContext');
  }
  return context;
}

function useSelectedQuestion() {
  const context = useContext(SelectedQuestion);
  if (context === null) {
    throw new Error(
      'useSelectedQuestion must be used within a SelectedQuestion'
    );
  }
  let entries = context.question.entries;
  if (context.selectedReg.value !== '') {
    entries = filterQuestionByReg(context.question, context.selectedReg.name);
  }

  return {
    question: {
      name: context.question.name,
      value: context.question.value,
      entries: entries,
    },
    selectedReg: context.selectedReg,
  };
}

function filterQuestionByReg(
  question: dropDownEntry<evaluatedAnswer[]>,
  reg: string
): evaluatedAnswer[] {
  if (question.entries) {
    return question.entries.map((entry) => {
      const res = entry.answers.filter((ans) => ans.reg === reg);
      return { ...entry, answers: res };
    });
  }
  return [];
}

const TableComponent = (
  tableHeads: Array<{ title: string; isSortable: boolean }>
) => {
  const selectedQuestion = useSelectedQuestion();
  const tableContent: Array<Array<string>> = [];
  if (selectedQuestion.question.entries) {
    selectedQuestion.question.entries.map((entry) => {
      let variants: Array<string> = [];
      const location = `${entry.location}, ${entry.PLZ}`;
      entry.answers.map((answer) => {
        const variant = answer.answer;
        const num = answer.v.toString();
        const reg = answer.reg;
        variants = [variant, num, reg];
      });
      tableContent.push([location, ...variants]);
    });
  }
  return (
    <Table
      headerTitle={selectedQuestion.question.name}
      headerDesc={'Beispielbeschreibung'}
      tableHeads={tableHeads}
      tableContent={tableContent}
    />
  );
};

const MapComponent = (
  showDialects: boolean,
  usedColors: Array<questionColors>
) => {
  const selected = useSelection();
  const selectedQuestion = useSelectedQuestion();

  return (
    <Map
      mapLayer={selected.value as string}
      showDialect={showDialects}
      usedColors={usedColors[selectedQuestion.question.value as number].colors}
      selectedQuestion={selectedQuestion.question}
    ></Map>
  );
};

const Dropdown = (
  layerEntries: dropDownEntry<undefined>[],
  setSelected: (arg0: dropDownEntry<undefined>) => void
) => {
  const selected = useSelection();
  return (
    <MapDropdown
      entries={layerEntries}
      selected={selected}
      setSelected={(val: dropDownEntry<undefined>) => setSelected(val)}
    ></MapDropdown>
  );
};

const Checkbox = (
  showDialect: boolean,
  setShowDialects: (arg0: boolean) => void
) => (
  <CheckboxComp
    label={'Dialektregionen anzeigen'}
    onChange={(val: boolean) => setShowDialects(val)}
    isChecked={showDialect}
  ></CheckboxComp>
);

const DataDropdown = (
  questionData: dropDownEntry<evaluatedAnswer[]>[],
  setSelectedQ: (arg0: dropDownEntry<evaluatedAnswer[]>) => void
) => {
  const selectedQuestion = useSelectedQuestion();
  return (
    <MapDropdown
      entries={questionData}
      selected={selectedQuestion.question}
      setSelected={(val: dropDownEntry<evaluatedAnswer[]>) => setSelectedQ(val)}
    ></MapDropdown>
  );
};

const RegDropDown = (
  regDropdown: Array<dropDownEntry<undefined>>,
  selectedReg: dropDownEntry<undefined>,
  setSelectedReg: (arg0: dropDownEntry<undefined>) => void
) => {
  return (
    <MapDropdown
      entries={regDropdown}
      selected={selectedReg}
      setSelected={(val: dropDownEntry<undefined>) => setSelectedReg(val)}
    ></MapDropdown>
  );
};

interface MapAnalysisProps {
  usedColors: Array<questionColors>;
  questionData: Array<dropDownEntry<evaluatedAnswer[]>>;
}

export default function MapAnalysis({
  usedColors,
  questionData,
}: MapAnalysisProps) {
  const layerEntries: Array<dropDownEntry<undefined>> = [
    { name: 'OpenStreetMap Tileset', value: 'osm' },
    { name: 'Bundesländer GeoJSON', value: 'geojson' },
  ];

  const regDropdown: Array<dropDownEntry<undefined>> = [
    {
      name: 'Alle anzeigen',
      value: '',
    },
    {
      name: 'Dialekt (Mundart)',
      value: 'dia',
    },
    {
      name: 'Ihr Hochdeutsch',
      value: 'hd',
    },
    {
      name: 'Ihr österreichisches Hochdeutsch',
      value: 'oehd',
    },
    {
      name: 'bestes Hochdeutsch',
      value: 'bhd',
    },
    {
      name: 'Umgangssprache oder Alltagssprache',
      value: 'usas',
    },
  ];

  const variationDropdown: Array<dropDownEntry<undefined>> = [
    {
      name: 'Alle anzeigen',
      value: '',
    },
    {
      name: 'Register Dialekt',
      value: 'dia',
    },
    {
      name: 'Register Standard',
      value: 'st',
    },
    {
      name: 'Sonstige',
      value: 'sons',
    },
  ];

  const [selected, setSelected] = useState(
    layerEntries && layerEntries.length > 0
      ? layerEntries[0]
      : { name: '', value: '' }
  );

  const [selectedQ, setSelectedQ] = useState<dropDownEntry<evaluatedAnswer[]>>(
    questionData[0]
  );

  const [selectedReg, setSelectedReg] = useState<dropDownEntry<undefined>>(
    regDropdown[0]
  );

  const [showDialects, setShowDialects] = useState(false);
  return (
    <SelectedQuestion.Provider
      value={{ question: selectedQ, selectedReg: selectedReg }}
    >
      <SelectedContext.Provider value={selected}>
        <WorkBox
          Element={() => MapComponent(showDialects, usedColors)}
          UiElements={[
            () => Dropdown(layerEntries, setSelected),
            () => Checkbox(showDialects, setShowDialects),
            () => DataDropdown(questionData, setSelectedQ),
            () => RegDropDown(regDropdown, selectedReg, setSelectedReg),
          ]}
        ></WorkBox>
        <div className='mt-10'>
          <WorkBox
            Element={() =>
              TableComponent([
                { title: 'Ort', isSortable: true },
                { title: 'Variante', isSortable: false },
                { title: 'Anzahl', isSortable: true },
                { title: 'Registerbezeichnung', isSortable: true },
              ])
            }
          ></WorkBox>
        </div>
      </SelectedContext.Provider>
    </SelectedQuestion.Provider>
  );
}

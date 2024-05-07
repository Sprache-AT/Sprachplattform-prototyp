import { createContext, useContext, useState } from 'react';
import { dropDownEntry, evaluatedAnswer, questionColors } from './types';
import WorkBox from './WorkBox';
import Map from './Map';
import MapDropdown from './MapDropdown';
import CheckboxComp from './CheckboxComp';

import 'leaflet/dist/leaflet.css';
import Table from './Table';

const SelectedContext = createContext<dropDownEntry<undefined> | null>(null);
const SelectedQuestion = createContext<dropDownEntry<evaluatedAnswer[]> | null>(
  null
);

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
  return context;
}

const TableComponent = (
  tableHeads: Array<{ title: string; isSortable: boolean }>
) => {
  const selectedQuestion = useSelectedQuestion();
  const tableContent: Array<Array<string>> = [];
  if (selectedQuestion.entries) {
    selectedQuestion.entries.map((entry) => {
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
      headerTitle={selectedQuestion.name}
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
      usedColors={usedColors[selectedQuestion.value as number].colors}
      selectedQuestion={selectedQuestion}
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

const Checkbox = (setShowDialects: (arg0: boolean) => void) => (
  <CheckboxComp
    label={'Dialektregionen anzeigen'}
    onChange={(val: boolean) => setShowDialects(val)}
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
      selected={selectedQuestion}
      setSelected={(val: dropDownEntry<evaluatedAnswer[]>) => setSelectedQ(val)}
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

  const [selected, setSelected] = useState(
    layerEntries && layerEntries.length > 0
      ? layerEntries[0]
      : { name: '', value: '' }
  );

  const [selectedQ, setSelectedQ] = useState<dropDownEntry<evaluatedAnswer[]>>(
    questionData[0]
  );
  const [showDialects, setShowDialects] = useState(false);
  return (
    <SelectedQuestion.Provider value={selectedQ}>
      <SelectedContext.Provider value={selected}>
        <WorkBox
          Element={() => MapComponent(showDialects, usedColors)}
          UiElements={[
            () => Dropdown(layerEntries, setSelected),
            () => Checkbox(setShowDialects),
            () => DataDropdown(questionData, setSelectedQ),
          ]}
        ></WorkBox>
        <div className='mt-10'>
          <WorkBox
            Element={() =>
              TableComponent([
                { title: 'Ort', isSortable: true },
                { title: 'Variante', isSortable: false },
                { title: 'Anzahl', isSortable: true },
                { title: 'Registerbezeichnung', isSortable: false },
              ])
            }
          ></WorkBox>
        </div>
      </SelectedContext.Provider>
    </SelectedQuestion.Provider>
  );
}

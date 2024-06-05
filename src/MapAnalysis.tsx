import { createContext, useContext, useState } from 'react';
import {
  colors,
  dropDownEntry,
  evaluatedAnswer,
  questionColors,
} from './types';
import WorkBox from './WorkBox';
import Map from './Map';
import MapDropdown from './MapDropdown';
import CheckboxComp from './CheckboxComp';

import 'leaflet/dist/leaflet.css';
import Table from './Table';
import { QuestionContext } from './App';
import DropdownMultiple from './DropdownMultiple';

import Select from 'react-select';

interface IVariant {
  [key: string]: {
    dia: number;
    sta: number;
    total: number;
  };
}

const register = [
  {
    name: 'dia',
    values: ['Dialekt (Mundart)', 'Umgangssprache oder Alltagssprache'],
  },
  {
    name: 'st',
    values: [
      'Ihr Hochdeutsch',
      'bestes Hochdeutsch',
      'Ihr österreichisches Hochdeutsch',
    ],
  },
];

const SelectedContext = createContext<dropDownEntry<undefined> | null>(null);
const SelectedQuestion = createContext<{
  question: dropDownEntry<evaluatedAnswer[]>;
  selectedReg: dropDownEntry<undefined>;
  selectedVar: dropDownEntry<undefined>;
  selectedAnswer: dropDownEntry<undefined>[];
} | null>(null);

function useQuestionContext() {
  const context = useContext(QuestionContext);
  if (context === null) {
    throw new Error('useQuestionContext must be used within a QuestionContext');
  }
  return context;
}

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

  if (context.selectedReg.value !== '' && context.selectedVar.value === '') {
    entries = filterQuestionByReg(context.question, context.selectedReg.name);
  } else if (context.selectedVar.value !== '') {
    context.selectedReg.value = '';
    entries = filterQuestionByVar(
      context.question,
      context.selectedVar.value as string
    );
  } else if (context.selectedAnswer.length > 0) {
    entries = filterQuestionByAnswer(
      context.question,
      context.selectedAnswer.map((el) => el.value) as string[]
    );
  }
  return {
    question: {
      name: context.question.name,
      value: context.question.value,
      entries: entries,
    },
    selectedReg: context.selectedReg,
    selectedVar: context.selectedVar,
    selectedAnswer: context.selectedAnswer,
  };
}

function useSelectedQuestionForVariants() {
  const context = useContext(SelectedQuestion);
  if (context === null) {
    throw new Error(
      'useSelectedQuestion must be used within a SelectedQuestion'
    );
  }
  const entries = context.question.entries;
  return {
    question: {
      name: context.question.name,
      value: context.question.value,
      entries: entries,
    },
  };
}

function filterQuestionByVar(
  question: dropDownEntry<evaluatedAnswer[]>,
  reg: string
): evaluatedAnswer[] {
  if (question.entries) {
    return question.entries.map((entry) => {
      const registryDescription = register.filter(
        (variant) => variant.name === reg
      )[0].values;
      const res = entry.answers.filter((ans) =>
        registryDescription.includes(ans.reg)
      );
      return { ...entry, answers: res };
    });
  }
  return [];
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

function filterQuestionByAnswer(
  question: dropDownEntry<evaluatedAnswer[]>,
  reg: string[]
): evaluatedAnswer[] {
  if (question.entries) {
    return question.entries.map((entry) => {
      const res = entry.answers.filter((ans) => reg.includes(ans.id));
      return { ...entry, answers: res };
    });
  }
  return [];
}

const TableComponent = (
  tableHeads: Array<{ title: string; isSortable: boolean }>,
  registerName: string
) => {
  const selectedQuestion = useSelectedQuestion();
  const tableContent: Array<Array<string | number>> = [];
  if (selectedQuestion.question.entries) {
    selectedQuestion.question.entries.forEach((entry) => {
      let variants: Array<string | number> = [];
      const location = `${entry.location}, ${entry.PLZ}`;
      entry.answers.forEach((answer) => {
        const variant = answer.answer;
        const num = answer.v;
        const reg = answer.reg;
        variants = [variant, num, reg];
        tableContent.push([location, ...variants]);
      });
    });
  }
  return (
    <Table
      headerTitle={selectedQuestion.question.name}
      headerDesc={'Beispielbeschreibung'}
      tableHeads={tableHeads}
      tableContent={tableContent}
      registerName={registerName}
      variants={false}
    />
  );
};

const VariantTableComponent = (
  tableHeads: Array<{ title: string; isSortable: boolean }>,
  registerName: string
) => {
  const selectedQuestion = useSelectedQuestionForVariants();
  const tableContent: Array<Array<string | number>> = [];
  const variants: IVariant = {};
  if (selectedQuestion.question.entries) {
    selectedQuestion.question.entries.forEach((entry) => {
      entry.answers.forEach((answer) => {
        if (!variants[answer.id]) {
          variants[answer.id] = { dia: 0, sta: 0, total: 0 };
        }
        if (register[0].values.includes(answer.reg)) {
          variants[answer.id].dia += answer.v;
        } else if (register[1].values.includes(answer.reg)) {
          variants[answer.id].sta += answer.v;
        }
        variants[answer.id].total += answer.v;
      });
    });
    for (const [key, value] of Object.entries(variants)) {
      tableContent.push([key, value.dia, value.sta, value.total]);
    }
  }
  return (
    <Table
      headerTitle={selectedQuestion.question.name}
      headerDesc={'Quantitative Analyse der Varianten'}
      tableHeads={tableHeads}
      tableContent={tableContent}
      registerName={registerName}
      variants={true}
    />
  );
};

const MapComponent = (
  showDialects: boolean,
  usedColors: Array<questionColors>,
  selectedAnswer: dropDownEntry<undefined>[]
) => {
  const selected = useSelection();
  const selectedQuestion = useSelectedQuestion();

  let filteredColors =
    usedColors[selectedQuestion.question.value as number].colors;
  let mapColors: Array<colors> = [];
  filteredColors.forEach((value, key) => {
    if (
      selectedAnswer.some((item) => item.value === key) ||
      selectedAnswer.length === 0
    ) {
      mapColors.push({ name: key, color: value });
    }
  });
  return (
    <Map
      mapLayer={selected.value as string}
      showDialect={showDialects}
      usedColors={mapColors}
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
  setSelectedQ: (arg0: dropDownEntry<evaluatedAnswer[]>) => void
) => {
  const selectedQuestion = useSelectedQuestion();
  const questionContext = useQuestionContext();
  return (
    questionContext && (
      <MapDropdown
        entries={questionContext}
        selected={selectedQuestion.question}
        setSelected={(val: dropDownEntry<evaluatedAnswer[]>) =>
          setSelectedQ(val)
        }
      ></MapDropdown>
    )
  );
};

const DropdownMultipleSelect = (
  entries: Array<questionColors>,
  selected: dropDownEntry<undefined>[],
  setSelectedVar: (arg0: dropDownEntry<undefined>[]) => void
) => {
  const selectedQuestion = useSelectedQuestion();
  const selectedColor =
    entries[selectedQuestion.question.value as number].colors;
  const colorKeyArray = Array.from(selectedColor.keys());
  const dropDownValues = colorKeyArray.map((colors) => {
    return { name: colors, value: colors };
  }) as Array<dropDownEntry<undefined>>;
  return (
    <Select
      isMulti
      name='Antworten'
      value={selected}
      options={dropDownValues}
      className='w-72 rounded-lg basic-multi-select'
      classNamePrefix='select'
      getOptionLabel={(option) => option.name}
      getOptionValue={(option) => option.value as string}
      onChange={(id) => {
        const res = [] as dropDownEntry<undefined>[];
        id.map((el) => {
          res.push({ name: el.name, value: el.value });
        });
        setSelectedVar(res);
      }}
    />
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

const VariationDropdown = (
  varDropdown: Array<dropDownEntry<undefined>>,
  selectedVar: dropDownEntry<undefined>,
  setSelectedVar: (arg0: dropDownEntry<undefined>) => void
) => {
  return (
    <MapDropdown
      entries={varDropdown}
      selected={selectedVar}
      setSelected={(val: dropDownEntry<undefined>) => setSelectedVar(val)}
    ></MapDropdown>
  );
};

const AnswerDropdown = (
  usedColors: Array<questionColors>,
  selected: dropDownEntry<undefined>[],
  setSelectedVar: (arg0: dropDownEntry<undefined>[]) => void
) => {
  const selectedQuestion = useSelectedQuestion();
  const selectedColor =
    usedColors[selectedQuestion.question.value as number].colors;
  const colorKeyArray = Array.from(selectedColor.keys());
  const dropDownValues = colorKeyArray.map((colors) => {
    return { name: colors, value: colors };
  }) as Array<dropDownEntry<undefined>>;
  return (
    <DropdownMultiple
      entries={dropDownValues}
      selected={selected}
      setSelected={(val: dropDownEntry<undefined>[]) => setSelectedVar(val)}
    />
  );
};

interface MapAnalysisProps {
  usedColors: Array<questionColors>;
}

export default function MapAnalysis({ usedColors }: MapAnalysisProps) {
  const questionContext = useQuestionContext();
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
      name: 'Alle Register anzeigen',
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

  const [selectedQ, setSelectedQ] = useState<
    dropDownEntry<evaluatedAnswer[]> | undefined
  >(questionContext ? questionContext[0] : undefined);

  const [selectedReg, setSelectedReg] = useState<dropDownEntry<undefined>>(
    regDropdown[0]
  );

  const [selectedVar, setSelectedVar] = useState<dropDownEntry<undefined>>(
    variationDropdown[0]
  );

  const [selectedAnswer, setSelectedAnswer] = useState<
    dropDownEntry<undefined>[]
  >([]);

  const [showDialects, setShowDialects] = useState(false);

  console.log(selectedAnswer);
  return (
    <SelectedQuestion.Provider
      value={{
        question: selectedQ
          ? selectedQ
          : ({} as dropDownEntry<evaluatedAnswer[]>),
        selectedReg: selectedReg,
        selectedVar: selectedVar,
        selectedAnswer: selectedAnswer,
      }}
    >
      <SelectedContext.Provider value={selected}>
        <WorkBox
          Element={() => MapComponent(showDialects, usedColors, selectedAnswer)}
          UiElements={[
            () => Dropdown(layerEntries, setSelected),
            //() => Checkbox(showDialects, setShowDialects),
            () => DataDropdown(setSelectedQ),
            //() => RegDropDown(regDropdown, selectedReg, setSelectedReg),
            () =>
              VariationDropdown(variationDropdown, selectedVar, setSelectedVar),
            () =>
              DropdownMultipleSelect(
                usedColors,
                selectedAnswer,
                setSelectedAnswer
              ),
          ]}
        ></WorkBox>
        <div className='mt-10'>
          <WorkBox
            Element={() =>
              TableComponent(
                [
                  { title: 'Ort', isSortable: true },
                  { title: 'Variante', isSortable: false },
                  { title: 'Anzahl', isSortable: true },
                  { title: 'Registerbezeichnung', isSortable: true },
                ],
                selectedReg.value === ''
                  ? selectedVar.value === ''
                    ? 'Alle Register'
                    : selectedVar.name
                  : selectedReg.name
              )
            }
          ></WorkBox>
        </div>
        <div className='mt-10'>
          <WorkBox
            Element={() =>
              VariantTableComponent(
                [
                  { title: 'Variante', isSortable: true },
                  { title: 'Dialekt+UG', isSortable: true },
                  { title: 'Standard', isSortable: true },
                  { title: 'Gesamt', isSortable: true },
                ],
                ''
              )
            }
          ></WorkBox>
        </div>
      </SelectedContext.Provider>
    </SelectedQuestion.Provider>
  );
}

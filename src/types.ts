export type question = {
  type: string;
  features: Array<featureAnswer>;
};

export type geometry = {
  type: string;
  coordinates: Array<number>;
};

export type featureAnswer = {
  type: string;
  id: number;
  title: string;
  geometry: geometry;
  location: string;
  PLZ: string;
  properties: Array<{
    gender: string;
    age: string;
    under50: boolean;
    answers: Array<{
      reg: string;
      answer: string;
      anno: string;
    }>;
  }>;
};

export interface circleDiagramData {
  // Value of the answer
  v: number;
  // color which will be used
  c: string;
  // Identifier
  id: string;
}

export interface answerCount extends circleDiagramData {
  // answer String
  answer: string;
  // Annotation
  reg: string;
}

export type evaluatedAnswer = {
  location: string;
  PLZ: string;
  answers: Array<answerCount>;
  geometry: geometry;
};

export type dropDownEntry = {
  name: string;
  value: string;
};

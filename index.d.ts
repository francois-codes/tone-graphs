declare interface DataPoint {
  frequency: number;
  db: number;
  gain?: string;
  tone?: string;
  pedalName?: string;
}

declare type DataPointResponse = {
  id: string;
  datapoints: DataPoint[];
};

declare type ToneGraph = DataPoint[];

declare type ToneGraphData = Record<string, Record<string, DataPoint[]>>;
declare interface Pedal {
  id: string;
  color: string;
  name: string;
  brand: string;
  image?: string;
  datapoints: DataPoint[];
  selected: boolean;
  visible: boolean;
}

declare type PedalState = {
  id: string;
  selected: boolean;
  visible: boolean;
  color: string;
}[];

declare type ResponsiveSpecs<T> = {
  mobile: T;
  tablet?: T;
  desktop: T;
};

type RawDataPoints = [number, number][];

type XValsAndYVals = [number[], number[]];

type ObjectDataRow = {
  frequency: number;
  db: number;
  tone: string;
  gain: string;
};

type ObjectData = ObjectDataRow[];

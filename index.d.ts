declare interface DataPoint {
  frequency: number;
  db: number;
  gain?: string;
  tone?: string;
  pedalName?: string;
}

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

declare type ResponsiveSpecs<T> = {
  mobile: T;
  tablet?: T;
  desktop: T;
};

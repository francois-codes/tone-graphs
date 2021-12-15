declare interface DataPoint {
  frequency: number;
  db: number;
  gain?: string;
  tone?: string;
  pedalName: string;
}

declare type ToneGraph = DataPoint[];

declare interface Pedal {
  id: string;
  color: string;
  name: string;
  brand: string;
  image?: string;
  datapoints: ToneGraph;
}

declare type ResponsiveSpecs<T> = {
  mobile: T;
  tablet?: T;
  desktop: T;
};

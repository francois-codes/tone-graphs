declare interface DataPoint {
  frequency: number;
  db: number;
  gain?: string;
  tone?: string;
  pedalName: string;
}

declare type ToneGraph = DataPoint[];

declare interface Pedal {
  name: string;
  brand: string;
  tags?: string;
  image?: string;
  filePath: string;
}

declare type ResponsiveSpecs<T> = {
  mobile: T;
  tablet?: T;
  desktop: T;
};

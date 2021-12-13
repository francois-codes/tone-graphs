import {
  bluesDriverImage,
  distPlusImage,
  dmDriveImage,
  fuzzBenderImage,
  greenBigMuffImage,
  morningGloryImage,
  ord1Image,
  ts808Image,
} from "src/assets";

const Pedals: Pedal[] = [
  {
    name: "TS808",
    brand: "Ibanez",
    filePath: "./src/data/TS808.csv",
    image: ts808Image,
  },
  {
    name: "Blues Driver BD-2w",
    brand: "Boss",
    filePath: "./src/data/TS808.csv",
    image: bluesDriverImage,
  },
  {
    name: "Green Big Muff",
    brand: "Electro-Harmonix",
    filePath: "./src/data/TS808.csv",
    image: greenBigMuffImage,
  },
  {
    name: "Morning Glory v4",
    brand: "JHS",
    filePath: "./src/data/TS808.csv",
    image: morningGloryImage,
  },
  {
    name: "D&M drive",
    brand: "Keeley Electronics",
    filePath: "./src/data/TS808.csv",
    image: dmDriveImage,
  },
  {
    name: "Fuzz Bender",
    brand: "Keeley Electronics",
    filePath: "./src/data/TS808.csv",
    image: fuzzBenderImage,
  },
  {
    name: "Distortion+",
    brand: "MXR",
    filePath: "./src/data/TS808.csv",
    image: distPlusImage,
  },
  {
    name: "ODR-1",
    brand: "Nobels",
    filePath: "./src/data/TS808.csv",
    image: ord1Image,
  },
];

export default Pedals;

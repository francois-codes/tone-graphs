import { useRef } from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";

const toneRange = atom({ key: "toneRange", default: 50 });
const gainRange = atom({ key: "gainRange", default: 50 });

type Range = "tone" | "gain";

const rangeMaps = {
  tone: toneRange,
  gain: gainRange,
};

export function useRange(range: Range): [number, (value: number) => void] {
  const rangeState = rangeMaps[range];
  const [rangeValue, setRangeFn] = useRecoilState(rangeState);
  const previous = useRef(rangeValue);

  const setRange = (newValue) => {
    if (newValue !== previous.current) {
      setRangeFn(newValue);
      previous.current = newValue;
    }
  };

  return [rangeValue, setRange];
}

export function useClampedRange(range: Range) {
  const rangeState = rangeMaps[range];

  const value = useRecoilValue(rangeState);

  if (value < 25) return 0;
  if (value < 50) return 25;
  if (value < 75) return 50;
  if (value < 100) return 75;
  return 100;
}

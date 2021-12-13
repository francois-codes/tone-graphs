import { atom, useRecoilState } from "recoil";

const toneRange = atom({ key: "toneRange", default: 50 });

export function useToneRange() {
  return useRecoilState(toneRange);
}

import * as R from "ramda";
import { atom, selector, useSetRecoilState } from "recoil";
import { visiblePedalsSelector } from "./pedals";

export const datapointsAtom = atom({ key: "datapoints", default: {} });

export function useSetDatapoints() {
  const setDatapoints = useSetRecoilState(datapointsAtom);

  const setDatapointsForPedal = (pedal, datapoints) => {
    setDatapoints((oldDatapoints) => {
      return {
        ...oldDatapoints,
        [pedal.id]: datapoints,
      };
    });
  };

  return { setDatapointsForPedal };
}

export const selectedDataPoints = selector({
  key: "selectDataPoints",
  get: ({ get }) => {
    const visiblePedals = get(visiblePedalsSelector);
    const datapoints = get(datapointsAtom);

    return R.pick(R.map(R.prop("id"), visiblePedals), datapoints);
  },
});

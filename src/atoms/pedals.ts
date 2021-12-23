import * as R from "ramda";
import { atom, selector, useSetRecoilState } from "recoil";

export const pedalsAtom = atom({ key: "pedals", default: [] });

export const selectedPedalsSelector = selector({
  key: "selectedPedals",
  get: ({ get }) => {
    return R.compose(R.filter(R.prop("selected")), get)(pedalsAtom);
  },
});

export const visiblePedalsSelector = selector({
  key: "visiblePedals",
  get: ({ get }) => {
    return R.compose(R.filter(R.prop("visible")), get)(pedalsAtom);
  },
});

const updatePedal = (pedals, pedal, newProps) => {
  const index = R.findIndex(R.propEq("id", pedal.id), pedals);
  return R.update(index, R.mergeRight(pedal, newProps), pedals);
};

export function useSetPedalState() {
  const setPedals = useSetRecoilState(pedalsAtom);

  const setPedalSelected = (pedal, selected) => {
    setPedals((oldPedals) => {
      return updatePedal(oldPedals, pedal, { selected, visible: selected });
    });
  };

  const setPedalVisible = (pedal, visible) => {
    setPedals((oldPedals) => {
      return updatePedal(oldPedals, pedal, { visible });
    });
  };

  const setPedalColor = (pedal, color) => {
    setPedals((oldPedals) => {
      return updatePedal(oldPedals, pedal, { color });
    });
  };

  return { setPedalSelected, setPedalVisible, setPedalColor };
}

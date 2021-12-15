import * as R from "ramda";
import { atom, useRecoilState, useSetRecoilState, selector, useRecoilValue } from "recoil";

const visiblePedals = atom({ key: "visiblePedals", default: [] });

export function useVisiblePedals() {
  const [state] = useRecoilState(visiblePedals);

  return state;
}

export function useSetVisiblePedals() {
  const innerSetVisiblePedals = useSetRecoilState(visiblePedals);

  const setVisiblePedal = (pedal, visible) => {
    innerSetVisiblePedals((oldPedals) => {
      const newPedals = visible ? R.append(pedal, oldPedals) : R.without([pedal], oldPedals);

      return R.uniq(newPedals);
    });
  };

  return setVisiblePedal;
}

export function useIsPedalVisible(pedal) {
  return useRecoilValue(
    selector({
      key: "visiblePedalsSelector",
      get: ({ get }) => {
        const pedals = get(visiblePedals);

        return R.contains(pedal, pedals);
      },
    }),
  );
}

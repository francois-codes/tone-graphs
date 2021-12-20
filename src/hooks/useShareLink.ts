import * as R from "ramda";
import { useRecoilValue } from "recoil";
import { pedalsAtom } from "src/atoms/pedals";
import { encodeState } from "src/data/utils";

export function useShareLink() {
  const pedals = useRecoilValue(pedalsAtom);

  const payload = R.map(R.pick(["id", "selected", "visible", "color"]))(pedals);

  const encodedPayload = encodeState(payload);

  return `${window.location.origin}?p=${encodedPayload}`;
}

import * as R from "ramda";
import { useRecoilValue } from "recoil";
import { pedalsAtom } from "src/atoms/pedals";

export function useShareLink() {
  const pedals = useRecoilValue(pedalsAtom);

  const payload = R.map(R.pick(["id", "selected", "visible", "color"]))(pedals);

  const encodedPayload = encodeURIComponent(Buffer.from(JSON.stringify(payload)).toString("base64"));

  return `${window.location.origin}?p=${encodedPayload}`;
}

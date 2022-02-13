import * as R from "ramda";
import { useRecoilValue } from "recoil";
import { pedalsAtom } from "src/atoms/pedals";

export function useShareLinkData() {
  const pedals = useRecoilValue(pedalsAtom);

  const payload = R.compose(
    R.project(["id", "selected", "visible", "color"]),
    R.filter(R.propEq("selected", true)),
  )(pedals);

  if (window.location.search.includes("preview=true")) {
    payload.preview = true;
  }

  return payload;
}

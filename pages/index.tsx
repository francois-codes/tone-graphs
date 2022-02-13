// @generated: @expo/next-adapter@2.1.52
import React from "react";
import { RecoilRoot } from "recoil";
import { getPayload } from "src/data/urlShortener";
import { Home } from "../src/Home";

type Props = {
  state: PedalState;
  preview: boolean;
};

export default function App({ state, preview }: Props) {
  return (
    <RecoilRoot>
      <Home state={state} preview={preview} />
    </RecoilRoot>
  );
}

export async function getServerSideProps(ctx) {
  const pId = ctx.query.p;

  if (pId) {
    const { preview = false, ...payload } = await getPayload(pId);

    return {
      props: { state: Object.values(payload) || [], preview },
    };
  }

  return {
    props: { state: [], preview: ctx.query.preview || false },
  };
}

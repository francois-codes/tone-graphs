// @generated: @expo/next-adapter@2.1.52
import React from "react";
import { RecoilRoot } from "recoil";
import { decodeState } from "src/data/utils";
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
  const state = decodeState(ctx.query.p) || {};
  const preview = ctx.query.preview || false;

  return {
    props: { state, preview },
  };
}

// @generated: @expo/next-adapter@2.1.52
import React from "react";
import { RecoilRoot } from "recoil";

import { getPedals } from "src/Pedals";
import { Home } from "../src/Home";

type Props = {
  pedals: Pedal[];
};

export default function App({ pedals }: Props) {
  return (
    <RecoilRoot>
      <Home pedals={pedals} />
    </RecoilRoot>
  );
}

function decodeState(string) {
  if (typeof string === "undefined") return null;

  try {
    const rawState = decodeURIComponent(string);
    const decodedRawState = Buffer.from(rawState, "base64").toString("utf8");
    return JSON.parse(decodedRawState);
  } catch (e) {
    return null;
  }
}

export async function getServerSideProps(ctx) {
  const state = decodeState(ctx.query.p);

  return {
    props: { pedals: await getPedals(state) },
  };
}

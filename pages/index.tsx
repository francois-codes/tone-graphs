// @generated: @expo/next-adapter@2.1.52
import React from "react";
import { getPedals } from "src/Pedals";
import { Home } from "../src/Home";

type Props = {
  pedals: Pedal[];
};

export default function App({ pedals }: Props) {
  return <Home pedals={pedals} />;
}

export async function getServerSideProps() {
  return {
    props: { pedals: await getPedals() },
  };
}

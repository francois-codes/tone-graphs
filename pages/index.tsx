// @generated: @expo/next-adapter@2.1.52
import React from "react";
import { Home } from "../src/Home";

type Props = {
  pedals: Record<string, Pedal>;
};

export default function App({ pedals }: Props) {
  return <Home pedals={pedals} />;
}

export async function getStaticProps() {
  return {
    props: { pedals: await fetch("http://localhost:3000/api/pedals").then((res) => res.json()) },
  };
}

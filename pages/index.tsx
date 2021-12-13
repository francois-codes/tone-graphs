// @generated: @expo/next-adapter@2.1.52
import React from "react";
import { Home } from "../src/Home";

type Props = {
  pedals: Record<string, Pedal>;
};

export default function App({ pedals }: Props) {
  return <Home pedals={pedals} />;
}

export async function getServerSideProps(context) {
  const url = `${context.req.headers.referer}api/pedals`;

  return {
    props: { pedals: await fetch(url).then((res) => res.json()) },
  };
}

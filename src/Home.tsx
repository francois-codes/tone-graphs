import React from "react";

import { Chart } from "./components/Chart";
import { Container } from "./components/Container";
import { Loader } from "./components/Loader/Loader";
import { Header } from "./components/Header";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Layout } from "./components/Layout/Layout";
import { PedalsList } from "./components/PedalsList";
import { InfoText } from "./components/InfoText";
import { TopLinks } from "./components/TopLinks";
import { Share } from "./components/Share";
import { Modal } from "./components/Modal";

type Props = {
  state: PedalState;
  preview: boolean;
};

export function Home({ state, preview }: Props) {
  return (
    <SafeAreaProvider>
      <Loader state={state} preview={preview}>
        <Container>
          <Header />
          <TopLinks />
          <Share />
          <Layout>
            <Chart />
            <PedalsList />
          </Layout>
          <InfoText />
        </Container>
        <Modal />
      </Loader>
    </SafeAreaProvider>
  );
}

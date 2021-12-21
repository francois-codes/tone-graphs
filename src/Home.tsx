import React, { useEffect } from "react";
import * as R from "ramda";

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
import { useSetDatapoints } from "src/atoms/datapoints";
import { fetchDataPoints } from "src/Pedals/fetch";

type Props = {
  state: PedalState;
  preview: boolean;
};

export function Home({ state, preview }: Props) {
  const { setDatapointsForPedal } = useSetDatapoints();

  useEffect(() => {
    if (!R.isEmpty(state)) {
      state
        .filter((pedal) => pedal.selected)
        .forEach(async (pedal) => {
          const datapoints = await fetchDataPoints(pedal);
          setDatapointsForPedal(pedal, datapoints);
        });
    }
  }, []);

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

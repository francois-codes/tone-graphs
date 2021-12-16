import React, { useEffect } from "react";
import { Chart } from "./components/Chart";

import { Container } from "./components/Container";
import { Loader } from "./components/Loader/Loader";
import { Header } from "./components/Header";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Layout } from "./components/Layout/Layout";
import { PedalsList } from "./components/PedalsList";
import { useSetVisiblePedals } from "src/hooks/useVisiblePedals";

type Props = {
  pedals: Pedal[];
};

export function Home({ pedals }: Props) {
  const pedalsPreview = pedals.filter((pedal) => pedal?.datapoints?.length > 0);
  const setPedalVisible = useSetVisiblePedals();

  useEffect(() => {
    pedalsPreview.forEach((pedal) => {
      setPedalVisible(pedal, true);
    });
  }, []);

  return (
    <SafeAreaProvider>
      <Loader>
        <Container>
          <Header />
          <Layout>
            <Chart />
            <PedalsList pedals={pedals} />
          </Layout>
        </Container>
      </Loader>
    </SafeAreaProvider>
  );
}

import React from "react";
import { Chart } from "./components/Chart";

import { Container } from "./components/Container";
import { Loader } from "./components/Loader/Loader";
import { Header } from "./components/Header";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RecoilRoot } from "recoil";
import { Layout } from "./components/Layout/Layout";
import { PedalsList } from "./components/PedalsList";

type Props = {
  pedals: Pedal[];
};

export function Home({ pedals }: Props) {
  const pedalsPreview = pedals.filter((pedal) => pedal.name.includes("808") || pedal.name.includes("Muff"));

  return (
    <RecoilRoot>
      <SafeAreaProvider>
        <Loader>
          <Container>
            <Header />
            <Layout>
              <Chart data={pedals[1].datapoints} pedals={pedalsPreview} />
              <PedalsList pedals={pedals} />
            </Layout>
          </Container>
        </Loader>
      </SafeAreaProvider>
    </RecoilRoot>
  );
}

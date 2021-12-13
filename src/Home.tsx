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
  pedals: Record<string, Pedal>;
};

export function Home({ pedals }: Props) {
  const { ts808 } = pedals;
  return (
    <RecoilRoot>
      <SafeAreaProvider>
        <Loader>
          <Container>
            <Header />
            <Layout>
              <Chart data={ts808.data} />
              <PedalsList />
            </Layout>
          </Container>
        </Loader>
      </SafeAreaProvider>
    </RecoilRoot>
  );
}

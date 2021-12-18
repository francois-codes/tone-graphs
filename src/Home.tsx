import React, { useEffect } from "react";
import { Chart } from "./components/Chart";

import { Container } from "./components/Container";
import { Loader } from "./components/Loader/Loader";
import { Header } from "./components/Header";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Layout } from "./components/Layout/Layout";
import { PedalsList } from "./components/PedalsList";
import { InfoText } from "./components/InfoText";
import { TopLinks } from "./components/TopLinks";
import { Modal } from "./components/Modal";
import { useSetRecoilState } from "recoil";
import { pedalsAtom } from "./atoms/pedals";

type Props = {
  pedals: Pedal[];
};

export function Home({ pedals }: Props) {
  const setPedals = useSetRecoilState(pedalsAtom);

  useEffect(() => {
    setPedals(pedals);
  }, []);

  return (
    <SafeAreaProvider>
      <Loader>
        <Container>
          <Header />
          <TopLinks />
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

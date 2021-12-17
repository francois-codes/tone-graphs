import React from "react";

import { Container } from "./components/Container";
import { Loader } from "./components/Loader/Loader";
import { Header } from "./components/Header";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Layout } from "./components/Layout/Layout";
import { usePreviewData } from "./hooks/usePreviewState";
import { PreviewForm } from "./components/PreviewForm";
import { Chart } from "./components/Chart";

export function Preview() {
  const previewState = usePreviewData();

  return (
    <SafeAreaProvider>
      <Loader>
        <Container>
          <Header />
          <Layout>
            <Chart pedal={previewState.state} />
            <PreviewForm {...previewState} />
          </Layout>
        </Container>
      </Loader>
    </SafeAreaProvider>
  );
}

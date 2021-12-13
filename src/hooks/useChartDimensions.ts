import { useWindowDimensions } from "react-native";

export function useChartDimensions() {
  const { width } = useWindowDimensions();

  const chartWidth = Math.min(width - 50, 600);
  const chartHeight = (chartWidth * 2) / 3;

  return {
    width: chartWidth,
    height: chartHeight,
  };
}

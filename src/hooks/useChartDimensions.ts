import { useResponsiveValue } from "@/components/Theme";
import { useWindowDimensions } from "react-native";

export function useChartDimensions() {
  const { width } = useWindowDimensions();

  const chartWidth = useResponsiveValue({
    mobile: width - 50,
    tablet: Math.min(width - 50, 600),
    desktop: Math.min(width - 50, 800),
  });

  const chartHeight = (chartWidth * 2) / 3;

  return {
    width: chartWidth,
    height: chartHeight,
  };
}

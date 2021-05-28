import { colors } from '../logic';

export * from "../logic";

// export interface DataSet {
//   label: string
//   data: number[]
//   backgroundColor: string[]
// }

// export interface ChartData {
//   labels: string[]
//   datasets: DataSet[]
// }

export function formatChartData(x, labels, colorIds) {
  return {
    labels,
    datasets: [
      {
        label: 'Net Sales £',
        data: x,
        backgroundColor: colors(colorIds),
      },
    ],
  };
}

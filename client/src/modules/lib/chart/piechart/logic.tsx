import {colors} from '../logic'
export * from "../logic"

export interface DataSet {
  label: string
  data: number[]
  backgroundColor: string[]
}

export interface ChartData {
  labels: string[]
  datasets: DataSet[]
}


export function formatChartData(x: number[], labels: string[], colorIds: number[]): ChartData {
  return {
    labels: labels,
    datasets: [
      {
        label: 'Net Sales £',
        data: x,
        backgroundColor: colors(colorIds)
      }
    ]
  };
}

export function viewport(small: number, large: number) {
  return (window.innerWidth > 1024) ? small : large;
}

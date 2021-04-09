// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import { RadarChart } from 'echarts/charts';
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import {
  RadarComponentOption,
  TitleComponent,
  TitleComponentOption,
} from 'echarts/components';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';
import { FunctionComponent, useState } from 'react';
import { useEffect } from 'react';
import './index.less';

// 注册必须的组件
echarts.use([TitleComponent, RadarChart, CanvasRenderer]);

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  TitleComponentOption | RadarComponentOption
>;

export interface ChartProps {
  nameList: { name: string }[];
  valueList: number[];
}

const Chart: FunctionComponent<ChartProps> = (props) => {
  const { nameList, valueList } = props;
  console.log(nameList, valueList);

  const initOptions: any = {
    legend: {
      data: ['得分'],
    },
    radar: {
      // shape: 'circle',
      name: {
        show: true,
        textStyle: {
          color: '#fff',
          backgroundColor: '#999',
          borderRadius: 3,
          padding: [2, 5],
        },
      },
      indicator: nameList,
    },
    series: [
      {
        type: 'radar',
        // areaStyle: {normal: {}},
        data: [
          {
            value: valueList,
            name: '得分',
          },
        ],
      },
    ],
  };

  let myChart: echarts.ECharts;

  useEffect(() => {
    if (!myChart && nameList.length !== 0 && valueList.length !== 0) {
      myChart = echarts.init(
        document.getElementById('chart-container') as HTMLElement,
      );
      myChart.setOption(initOptions);
    }
  }, [props]);

  useEffect(() => {
    console.log(nameList, valueList);
  });

  return <div id="chart-container"></div>;
};

export default Chart;

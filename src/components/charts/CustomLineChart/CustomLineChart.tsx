import { useEffect, useState } from 'react';
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
} from 'recharts';

export interface CustomLineChartProps {
  dataKey?: string;
  data: Object[];
  width?: number | string;
  height?: number | string;
}

const COLORS = ['#8884d8', '#82ca9d', 'red'];

const renderElement = (element: string, color: string) => (
  <Line key={element} type='monotone' dataKey={element} stroke={color} />
);

const CustomLineChart: React.FunctionComponent<CustomLineChartProps> = ({
  data,
  dataKey,
  width,
  height,
}) => {
  const [domain, setDomain] = useState([1000, 1]);

  const defaultWidth = '100%';
  const defaultHeight = '100%';
  const defaultDataKey = Object.keys(data[0])[0];
  const defaultMargin = {
    top: 5,
    right: 30,
    left: 5,
    bottom: 5,
  };

  const getLines = () => {
    const lineNames = Object.keys(data[0]);
    if (dataKey) {
      return lineNames.map((el, i) =>
        el === dataKey ? null : renderElement(el, COLORS[i])
      );
    } else {
      return lineNames.splice(1).map((el, i) => renderElement(el, COLORS[i]));
    }
  };

  useEffect(() => {
    const _lineNames = Object.keys(data[0]);
    let [_domainLow, _domainHigh] = [99999, -99999];
    _lineNames.forEach((line) => {
      data.forEach((dataItem: any) => {
        const item = dataItem[line];
        if (item < _domainLow) _domainLow = item;
        if (item > _domainHigh) _domainHigh = item;
      });
    });
    setDomain([_domainLow, _domainHigh]);
  }, [data]);

  return (
    <ResponsiveContainer width={width || defaultWidth} height={height || defaultHeight}>
      <LineChart data={data} margin={defaultMargin}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey={dataKey || defaultDataKey} />
        <YAxis domain={domain} />
        <Tooltip />
        {getLines()}
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;

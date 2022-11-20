import { showStore } from '../zustandState/showCoin';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const ChartComp = () => {
  const store = showStore();
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <AreaChart
        data={store.coinData}
        margin={{
          top: 50,
          right: 30,
          left: 0,
          bottom: 7,
        }}
        style={{ fontSize: '1.4rem' }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis />
        <Tooltip />
        <Area type='monotone' dataKey='price' stroke='#8884d8' fill='#8884d8' />
      </AreaChart>
    </ResponsiveContainer>
  );
};

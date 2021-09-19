import { Container } from '@mui/material';
import CustomLineChart from './components/charts/CustomLineChart';

const initState = {
  date: new Date(2021, 9, 19),
  value: 19.7,
};

const goalState = {
  date: new Date(2021, 9, 30),
  value: 15.0,
};

interface OKRItem {
  date: Date;
  value: number;
}

const intermediateStates: OKRItem[] = [];

const diff = goalState.date.getDate() - initState.date.getDate();
for (let i = 1; i <= diff; i++) {
  const date = new Date(initState.date.valueOf());
  date.setDate(date.getDate() + i);

  const absValueDiff = (Math.abs(goalState.value - initState.value) / diff) * i;

  const diffValue = goalState.value > initState.value ? absValueDiff : -absValueDiff;

  const value: number = +(initState.value + diffValue).toFixed(2);
  const item: OKRItem = {
    date,
    value,
  };
  intermediateStates.push(item);
}

const valueName = 'bodyFat';
const newIntermediateStates = intermediateStates.map((item) => ({
  date: item.date,
  [valueName]: item.value,
}));

export function App() {
  return (
    <Container>
      <h1>Hello world</h1>
      <CustomLineChart height={500} data={newIntermediateStates} />
    </Container>
  );
}

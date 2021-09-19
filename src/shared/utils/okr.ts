import { OkrItem } from '../types/okrItem';

export const generateIntermediateStates = ({
  initState,
  goalState,
  okrValueName,
}: {
  initState: OkrItem;
  goalState: OkrItem;
  okrValueName: string;
}): any[] => {
  const intermediateStates: OkrItem[] = [];

  const daysDiff = goalState.date.getDate() - initState.date.getDate();
  for (let i = 1; i <= daysDiff; i++) {
    const date = new Date(initState.date.valueOf());
    date.setDate(date.getDate() + i);

    const absDiffValue = (Math.abs(goalState.value - initState.value) / daysDiff) * i;

    const diffValue = goalState.value > initState.value ? absDiffValue : -absDiffValue;

    const value: number = +(initState.value + diffValue).toFixed(2);
    const item: OkrItem = {
      date,
      value,
    };

    intermediateStates.push(item);
  }

  const newIntermediateStates = intermediateStates.map((item) => ({
    date: item.date.toLocaleDateString(),
    [okrValueName]: item.value,
  }));

  return newIntermediateStates;
};

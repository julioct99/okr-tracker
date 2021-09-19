import moment from 'moment';

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
  console.log(initState, goalState);

  const intermediateStates: OkrItem[] = [];

  const initMoment = moment(initState.date);
  const goalMoment = moment(goalState.date);

  const daysDiff = Math.abs(initMoment.diff(goalMoment, 'days'));
  intermediateStates.push(initState);

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

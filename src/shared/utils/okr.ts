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
  const initMoment = moment(initState.date);
  const goalMoment = moment(goalState.date);
  const daysDiff = Math.abs(initMoment.diff(goalMoment, 'days'));

  const intermediateStates = [];
  for (let i = 0; i <= daysDiff; i++) {
    const date = new Date(initState.date.valueOf());
    date.setDate(date.getDate() + i);
    const absDiffValue = (Math.abs(goalState.value - initState.value) / daysDiff) * i;
    const diffValue = goalState.value > initState.value ? absDiffValue : -absDiffValue;
    const value = +(initState.value + diffValue).toFixed(2);
    intermediateStates.push({
      date: date.toLocaleDateString(),
      [`goal ${okrValueName}`]: value,
    });
  }

  return intermediateStates;
};

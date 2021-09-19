import { useState } from 'react';
import { Container, Typography } from '@mui/material';
import CustomLineChart from '../charts/CustomLineChart/CustomLineChart';
import { OkrItem } from '../../shared/types/okrItem';
import { GoalInput } from '../GoalInput/GoalInput';
import { ProgressInput } from '../ProgressInput/ProgressInput';

export function App() {
  const [intermediateStates, setIntermediateStates] = useState<any[]>([]);

  const handleGoalSet = (okrItems: OkrItem[]) => {
    setIntermediateStates(okrItems);
  };

  const handleProgressAdded = (okrItem: any) => {
    addProgressState(okrItem);
  };

  const addProgressState = (newState: any) => {
    const states = [...intermediateStates];
    const foundState = intermediateStates.find((state) => state.date === newState.date);
    if (!foundState) return;

    const okrValueName = Object.keys(foundState)
      .find((key) => key !== 'date')
      ?.split(' ')[1];
    foundState[`${okrValueName}`] = newState.value;
    setIntermediateStates(states);
  };

  return (
    <Container style={{ marginBottom: 50 }}>
      <Typography marginTop={5} marginBottom={5} variant='h1' textAlign='center'>
        OKR Tracker
      </Typography>
      <GoalInput onGoalSet={handleGoalSet} />
      <ProgressInput onProgressAdded={handleProgressAdded} />
      {intermediateStates.length > 1 && (
        <CustomLineChart height={400} data={intermediateStates} />
      )}
    </Container>
  );
}

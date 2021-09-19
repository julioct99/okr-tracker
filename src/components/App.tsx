import { useState } from 'react';
import { Container, Typography } from '@mui/material';
import CustomLineChart from './charts/CustomLineChart';
import { OkrItem } from '../shared/types/okrItem';
import { GoalInput } from './GoalInput';

export function App() {
  const [intermediateStates, setIntermediateStates] = useState<any[]>([]);

  const handleGoalSet = (okrItems: OkrItem[]) => {
    setIntermediateStates(okrItems);
  };

  return (
    <Container>
      <Typography marginTop={5} marginBottom={5} variant='h1' textAlign='center'>
        OKR Tracker
      </Typography>
      <GoalInput onGoalSet={handleGoalSet} />
      {intermediateStates.length > 1 && (
        <CustomLineChart height={400} data={intermediateStates} />
      )}
    </Container>
  );
}

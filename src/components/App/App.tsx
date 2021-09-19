import { useState } from 'react';
import { Button, Container, Typography } from '@mui/material';
import CustomLineChart from '../charts/CustomLineChart/CustomLineChart';
import { OkrItem } from '../../shared/types/okrItem';
import { GoalInput } from '../GoalInput/GoalInput';
import { ProgressInput } from '../ProgressInput/ProgressInput';

const LOCAL_STORAGE_KEY = 'localStorageStates';

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
      ?.split(' ')
      .splice(1)
      .join(' ');
    foundState[`${okrValueName}`] = newState.value;
    setIntermediateStates(states);
  };

  const saveToLocalStorage = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(intermediateStates));
  };

  const clearLocalStorage = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const loadFromLocalStorage = () => {
    const localStorageStates = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (localStorageStates) {
      setIntermediateStates(JSON.parse(localStorageStates));
    }
  };

  return (
    <Container style={{ marginBottom: 50 }}>
      <Typography marginTop={5} marginBottom={5} variant='h1' textAlign='center'>
        OKR Tracker
      </Typography>
      <GoalInput onGoalSet={handleGoalSet} />
      <ProgressInput onProgressAdded={handleProgressAdded} />
      <div style={{ marginBottom: 15 }}>
        <Button variant='contained' onClick={saveToLocalStorage}>
          Save to local storage
        </Button>
        <Button
          variant='contained'
          onClick={clearLocalStorage}
          style={{ marginLeft: 15 }}
        >
          Clear local storage
        </Button>
        <Button
          variant='contained'
          onClick={loadFromLocalStorage}
          style={{ marginLeft: 15 }}
        >
          Load from local storage
        </Button>
      </div>
      {intermediateStates.length > 1 && (
        <CustomLineChart height={400} data={intermediateStates} />
      )}
    </Container>
  );
}

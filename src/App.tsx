import { Button, Container, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import CustomLineChart from './components/charts/CustomLineChart';

interface OkrItem {
  date: Date;
  value: number;
}

const OkrInput = styled('div')`
  margin-bottom: 50px;
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

export function App() {
  const okrValueNameInputRef = useRef<HTMLInputElement>();
  const [okrValueName, setOkrValueName] = useState('bodyFat');
  const [intermediateStates, setIntermadiateStates] = useState<any[]>([]);

  useEffect(() => {
    const initState = {
      date: new Date(2021, 9, 19),
      value: 19.7,
    };

    const goalState = {
      date: new Date(2021, 9, 30),
      value: 15.0,
    };

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

    setIntermadiateStates(newIntermediateStates);
  }, [okrValueName]);

  return (
    <Container>
      <Typography variant='h1' textAlign='center'>
        OKR Tracker
      </Typography>
      <OkrInput>
        <TextField
          label='Objective name'
          placeholder='Example: weight, dollars...'
          variant='filled'
          inputRef={okrValueNameInputRef}
          style={{ width: '400px' }}
        />
        <Button
          onClick={() => {
            if (okrValueNameInputRef.current)
              setOkrValueName(okrValueNameInputRef.current.value);
          }}
          variant='contained'
        >
          Set objective
        </Button>
      </OkrInput>
      {intermediateStates.length > 0 ? (
        <CustomLineChart height={400} data={intermediateStates} />
      ) : null}
    </Container>
  );
}

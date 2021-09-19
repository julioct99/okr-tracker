import { Button, Container, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import CustomLineChart from './charts/CustomLineChart';
import { generateIntermediateStates } from '../shared/utils/okr';

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

    const newIntermediateStates = generateIntermediateStates({
      goalState,
      initState,
      okrValueName,
    });

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

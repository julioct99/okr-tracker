import React, { useEffect, useRef, useState } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';
import styled from 'styled-components';
import CustomLineChart from './charts/CustomLineChart';
import { generateIntermediateStates } from '../shared/utils/okr';
import { OkrItem, defaultOkrItem } from '../shared/types/okrItem';

const OkrInput = styled('div')`
  margin-bottom: 50px;
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
`;

export function App() {
  const [initState, setInitState] = useState<OkrItem>(defaultOkrItem);
  const [goalState, setGoalState] = useState<OkrItem>(defaultOkrItem);

  const [okrValueName, setOkrValueName] = useState('bodyFat');
  const [intermediateStates, setIntermadiateStates] = useState<any[]>([]);

  const okrValueNameInputRef = useRef<HTMLInputElement>();
  const okrInitValueInputRef = useRef<HTMLInputElement>();
  const okrValueInputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    const newIntermediateStates = generateIntermediateStates({
      goalState,
      initState,
      okrValueName,
    });

    setIntermadiateStates(newIntermediateStates);
  }, [okrValueName, initState, goalState]);

  const updateOkr = () => {
    setOkrValueName(okrValueNameInputRef.current!.value);
    setInitState((prevState) => ({
      ...prevState,
      value: +okrInitValueInputRef.current!.value,
    }));
    setGoalState((prevState) => ({
      ...prevState,
      value: +okrValueInputRef.current!.value,
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter') updateOkr();
  };

  const handleInitDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInitState((prevState) => ({
      ...prevState,
      date: new Date(e.target.value),
    }));
  };

  const handleGoalDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoalState((prevState) => ({
      ...prevState,
      date: new Date(e.target.value),
    }));
  };

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
          onKeyDown={handleKeyDown}
        />
        <TextField
          label='Initial value'
          placeholder='Example: 80, 40...'
          variant='filled'
          inputRef={okrInitValueInputRef}
          onKeyDown={handleKeyDown}
        />
        <TextField
          label='Objective value'
          placeholder='Example: 45, 100...'
          variant='filled'
          inputRef={okrValueInputRef}
          onKeyDown={handleKeyDown}
        />
        <label htmlFor='initDate'>Initial Date</label>
        <input type='date' name='initDate' onChange={handleInitDateInputChange} />
        <label htmlFor='goalDate'>Goal Date</label>
        <input type='date' name='goalDate' onChange={handleGoalDateInputChange} />
        <Button onClick={updateOkr} variant='contained'>
          Set
        </Button>
      </OkrInput>
      {intermediateStates.length > 0 && (
        <CustomLineChart height={400} data={intermediateStates} />
      )}
    </Container>
  );
}

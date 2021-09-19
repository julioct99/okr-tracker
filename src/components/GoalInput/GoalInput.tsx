import React, { useEffect, useRef, useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { defaultOkrItem, OkrItem } from '../../shared/types/okrItem';
import { generateIntermediateStates } from '../../shared/utils/okr';
import styled from 'styled-components';

const StyledContainer = styled('div')`
  margin-bottom: 50px;
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
`;

interface GoalInputProps {
  onGoalSet: (okrItems: OkrItem[]) => void;
}

export const GoalInput: React.FunctionComponent<GoalInputProps> = ({ onGoalSet }) => {
  const [initState, setInitState] = useState<OkrItem>(defaultOkrItem);
  const [goalState, setGoalState] = useState<OkrItem>(defaultOkrItem);

  const [initDate, setInitDate] = useState<Date>(new Date());
  const [goalDate, setGoalDate] = useState<Date>(new Date());

  const [okrValueName, setOkrValueName] = useState('value');

  const [intermediateStates, setIntermediateStates] = useState<any[]>([]);

  const okrValueNameInputRef = useRef<HTMLInputElement>();
  const okrInitValueInputRef = useRef<HTMLInputElement>();
  const okrValueInputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    setIntermediateStates(
      generateIntermediateStates({
        goalState,
        initState,
        okrValueName,
      })
    );
  }, [okrValueName, initState, goalState]);

  useEffect(() => {
    onGoalSet(intermediateStates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intermediateStates]);

  const updateOkr = () => {
    setOkrValueName(okrValueNameInputRef.current!.value);
    setInitState({ date: initDate, value: +okrInitValueInputRef.current!.value });
    setGoalState({ date: goalDate, value: +okrValueInputRef.current!.value });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter') updateOkr();
  };

  const handleInitDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInitDate(new Date(e.target.value));
  };

  const handleGoalDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoalDate(new Date(e.target.value));
  };

  return (
    <StyledContainer>
      <Typography variant='h4'>Goal</Typography>
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
    </StyledContainer>
  );
};

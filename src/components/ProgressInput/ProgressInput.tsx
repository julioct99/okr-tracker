import React, { useRef, useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import styled from 'styled-components';

const StyledContainer = styled('div')`
  margin-bottom: 50px;
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
`;

interface ProgressInputProps {
  onProgressAdded: (okrItem: any) => void;
}

export const ProgressInput: React.FunctionComponent<ProgressInputProps> = ({
  onProgressAdded,
}) => {
  const [progressDate, setProgressDate] = useState(new Date());

  const progressInputRef = useRef<HTMLInputElement>();

  const createProgressItem = () => {
    if (!progressInputRef.current || !progressInputRef.current?.value) return;
    onProgressAdded({
      date: progressDate.toLocaleDateString(),
      value: progressInputRef.current.value,
    });
  };

  const handleProgressDateChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgressDate(new Date(e.target.value));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter') createProgressItem();
  };

  return (
    <StyledContainer>
      <Typography variant='h4'>Progress</Typography>
      <TextField
        label='Progress value'
        placeholder='Example: 80, 40...'
        variant='filled'
        inputRef={progressInputRef}
        onKeyDown={handleKeyDown}
      />
      <label htmlFor='progressDate'>Progress date</label>
      <input type='date' name='progressDate' onChange={handleProgressDateChanged} />
      <Button onClick={createProgressItem} variant='contained'>
        Add
      </Button>
    </StyledContainer>
  );
};

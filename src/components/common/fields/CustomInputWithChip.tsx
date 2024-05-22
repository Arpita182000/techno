import React, { useState } from 'react';
import { Chip, TextField, InputAdornment } from '@mui/material';
import { Cancel } from '@mui/icons-material';

const CustomInputWithChip = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [chips, setChips] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      setChips(prevChips => [...prevChips, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleChipDelete = (chipToDelete: string) => {
    setChips(prevChips => prevChips.filter(chip => chip !== chipToDelete));
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      // label="Type and press enter"
      value={inputValue}
      onChange={handleInputChange}
      onKeyPress={handleInputKeyPress}
      InputProps={{
        startAdornment: chips.map((chip, index) => (
          <Chip
            key={index}
            label={chip}
            onDelete={() => handleChipDelete(chip)}
            deleteIcon={<Cancel />}
            variant="outlined"
            size="small"
            sx={{ marginRight: '5px', marginBottom: '5px' }}
          />
        )),
      }}
    />
  );
};

export default CustomInputWithChip;

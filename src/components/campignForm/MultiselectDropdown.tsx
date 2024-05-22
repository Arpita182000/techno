import React, { useState } from 'react';
import { Chip, MenuItem, Select } from '@mui/material';
import { Cancel } from '@mui/icons-material';
import { AnyRecord } from 'dns';

const MultiSelectChipDropdown = ({ handleSelectChange, options, selectedValues, keyName, handleDeleteChip }:any) => {
    console.log("calling key1", keyName);
//   const [selectedValues, setSelectedValues] = useState([]);

//   const handleSelectChange = (event:any) => {
//     const { value } = event.target;
//     setSelectedValues(value);
//   };

//   const handleDeleteChip = (e:any,value:any) => {
//    e.preventDefault();
//    setSelectedValues(selectedValues.filter((chipToDelete: any)=> chipToDelete !== value))
//   };
const [open, setOpen] = useState(false);
  return (
    <div>
      <Select
      fullWidth
      key={keyName}
      size='small'
        multiple
        value={selectedValues}
        onChange={(e: any) => {
            handleSelectChange(keyName, e.target.value);
            setOpen(false)
          }}
        renderValue={(selected) => (
          <div>
            {selected.map((value: any) => (
              <Chip
                key={value}
                label={value}
                deleteIcon={
                    <Cancel onMouseDown ={(e:any) =>e.stopPropagation()}/>
                }
                onDelete={(e) => {
                    e.preventDefault();
                    handleDeleteChip(keyName, value)
                }}
              />
            ))}
          </div>
        )}
        open={open}
        onClose={() => setOpen(false)} 
        onOpen={() => setOpen(true)}
      >
        {options.map((option:any) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default MultiSelectChipDropdown;
import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';

const DependentDropdown = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const states = [
    { name: 'Karnataka', cities: ['Bangalore', 'Mysore', 'Hubli'], districts: ['Bangalore', 'Mysore'] },
    { name: 'Maharashtra', cities: ['Mumbai', 'Pune', 'Nagpur'], districts: ['Mumbai', 'Pune'] },
    // Add more states, cities, and districts as needed
  ];

  const handleStateChange = (event:any) => {
    setSelectedState(event.target.value);
    setSelectedCity('');
    setSelectedDistrict('');
  };

  const handleCityChange = (event:any) => {
    setSelectedCity(event.target.value);
    setSelectedDistrict('');
  };

  const handleDistrictChange = (event:any) => {
    setSelectedDistrict(event.target.value);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel>State</InputLabel>
          <Select
            value={selectedState}
            onChange={handleStateChange}
          >
            <MenuItem value="">
              <em>Select a state</em>
            </MenuItem>
            {states.map((state, index) => (
              <MenuItem key={index} value={state.name}>{state.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <FormControl fullWidth disabled={!selectedState}>
          <InputLabel>City</InputLabel>
          <Select
            value={selectedCity}
            onChange={handleCityChange}
          >
            <MenuItem value="">
              <em>Select a city</em>
            </MenuItem>
            {selectedState && states.find(state => state.name === selectedState)?.cities.map((city, index) => (
              <MenuItem key={index} value={city}>{city}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <FormControl fullWidth disabled={!selectedCity}>
          <InputLabel>District</InputLabel>
          <Select
            value={selectedDistrict}
            onChange={handleDistrictChange}
          >
            <MenuItem value="">
              <em>Select a district</em>
            </MenuItem>
            {selectedCity && states.find(state => state.name === selectedState)?.districts.map((district, index) => (
              <MenuItem key={index} value={district}>{district}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default DependentDropdown;

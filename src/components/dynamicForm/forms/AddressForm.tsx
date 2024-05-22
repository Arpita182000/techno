import React, { useEffect, useState } from 'react';
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';

const AddressForm = ({ addressFormData, setAddressFormData, errors }: any) => {


  const [selectedState, setSelectedState] = useState('');
  const [districts, setDistricts] = useState<any>([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  // const states = [
  //   { 
  //    name: 'Karnataka',
  //    cities: ['Bangalore', 'Mysore', 'Hubli'], 
  //    districts: ['Bangalore', 'Mysore'] 
  //   },
  //   {
  //   name: 'Maharashtra', 
  //   cities: ['Mumbai', 'Pune', 'Nagpur'], 
  //   districts: ['Mumbai', 'Pune'] },
  //   // Add more states, cities, and districts as needed
  // ];

  const states = [
    {
      name: 'Karnataka',
      districts: [
        {
          name: 'Bangalore',
          cities: ['Bangalore City', 'Electronic City', 'Whitefield'],
        },
        {
          name: 'Mysore',
          cities: ['Mysore City', 'Vijayanagar', 'Kuvempunagar'],
        },
      ],
    },
    {
      name: 'Maharashtra',
      districts: [
        {
          name: 'Mumbai',
          cities: ['Mumbai City', 'Thane', 'Navi Mumbai'],
        },
        {
          name: 'Pune',
          cities: ['Pune City', 'Pimpri-Chinchwad', 'Hinjewadi'],
        },
      ],
    },
    // Add more states, districts, and cities as needed
  ];

  useEffect(() => {
    let districtsList: any;
    if (addressFormData?.state) {
      districtsList = handleStateChange(addressFormData?.state ?? '');
    }
    if(addressFormData?.district) {
      handleDistrictChange(addressFormData.district, districtsList);
    }
    if(addressFormData?.city) {
      handleCityChange(addressFormData.city);
    }
  }, []);

  function getSelectedCity() {
    // handleStateChange(addressFormData?.state)
  }

  // function getSelectedDistrict(stateName: any) {
  //   return stateName ? handleStateChange(stateName) : '';
  // }

  const handleStateChange = (stateName: any) => {
    // const stateName = event.target.value;
    setSelectedState(stateName);
    const districts = states.find((state) => state.name === stateName)?.districts ?? [];
    setDistricts(districts)
    setSelectedCity('');
    setSelectedDistrict('');
    setAddressFormData({ ...addressFormData, state: stateName })
    return districts;
  };

  const handleCityChange = (cityName: any) => {
    setSelectedCity(cityName);
    setAddressFormData({ ...addressFormData, city: cityName })
    // setSelectedDistrict('');
  };

  const handleDistrictChange = (districtName: any, districtsList = undefined) => {
    setSelectedDistrict(districtName);
    const cities = (districtsList ?? districts).find((district: any) => district.name === districtName)?.cities ?? [];
    setCities(cities);
    setSelectedCity('');
    setAddressFormData({ ...addressFormData, district: districtName })
  };
  return (
    <div className='address-class'>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography variant='body2'>
            Address Line 1<span style={{ color: 'red' }}>*</span>
          </Typography>
          <TextField
            size='small'
            fullWidth
            variant="outlined"
            value={addressFormData.line1}
            onChange={(e) => setAddressFormData({ ...addressFormData, line1: e.target.value })}

            sx={{
              ...(errors.line1 && {
                "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {

                  borderColor: "red",
                }
              })
            }}
          />
          {errors.line1 && <Typography variant="caption" color="error">{errors.line1}</Typography>}
        </Grid>

        <Grid item xs={6}>
          <Typography variant='body2'>
            Address Line 2
          </Typography>
          <TextField
            size='small'
            fullWidth
            variant="outlined"
            value={addressFormData.address2}
            onChange={(e) => setAddressFormData({ ...addressFormData, address2: e.target.value })}

          />
          {/* Add error message display if needed for address2 */}
        </Grid>
      </Grid>

      <Grid container spacing={3} py={2}>
        <Grid item xs={6}>
          {/* <Typography variant='body2'>
                        City<span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <TextField
                        size='small'
                        fullWidth
                        variant="outlined"
                        value={addressFormData.city}
                        onChange={(e) => setAddressFormData({ ...addressFormData, city: e.target.value })}
                        sx={{
                            ...(errors.city &&  {
                              "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                textAlign: "left",
                                borderColor: "red",
                              }
                            })
                          }}

                    />
                    {errors.city && <Typography variant="caption" color="error">{errors.city}</Typography>} */}
          
          <FormControl fullWidth>
            <Typography variant='body2'>
              State<span style={{ color: 'red' }}>*</span>
            </Typography>
            <Select
              size='small'
              value={selectedState}
              onChange={(e) => handleStateChange(e.target.value)}
              sx={{
                ...(errors.state && {
                  "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {

                    borderColor: "red",
                  }
                })
              }}
            >
              <MenuItem value="">
                <p>Select a state</p>
              </MenuItem>
              {states.map((state, index) => (
                <MenuItem key={index} value={state.name}>{state.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {errors.state && <Typography variant="caption" color="error">{errors.state}</Typography>}
        </Grid>

        <Grid item xs={6}>
          {/* <Typography variant='body2'>
                        District<span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        size='small'
                        value={addressFormData.district}
                        onChange={(e) => setAddressFormData({ ...addressFormData, district: e.target.value })}
                          
                        sx={{
                            ...(errors.district &&{
                              "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                
                                borderColor: "red",
                              }
                            })
                          }}
                    />
                    {errors.district && <Typography variant="caption" color="error">{errors.district}</Typography>} */}
          <FormControl fullWidth disabled={!selectedState}>
            <Typography variant='body2'>
              District<span style={{ color: 'red' }}>*</span>
            </Typography>
            <Select
           size='small'
            value={selectedDistrict}
            onChange={(e) => handleDistrictChange(e.target.value)}
            sx={{
                ...(errors.district && {
                  "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                    
                    borderColor: "red",
                  }
                })
              }}
          >
            <MenuItem value="">
              <em>Select a district</em>
            </MenuItem>
            {districts.map((district: any, index: any) => (
              <MenuItem key={index} value={district.name}>{district.name}</MenuItem>
            ))}
          </Select>
          </FormControl>
          {errors.district && <Typography variant="caption" color="error">{errors.district}</Typography>}
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={6}>
          {/* <Typography variant='body2'>
                        State<span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <TextField
                        size='small'
                        fullWidth
                        variant="outlined"
                        value={addressFormData.state}
                        onChange={(e) => setAddressFormData({ ...addressFormData, state: e.target.value })}
                          
                        sx={{
                            ...(errors.state &&{
                              "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                
                                borderColor: "red",
                              }
                            })
                          }}
                    />
                    {errors.state && <Typography variant="caption" color="error">{errors.state}</Typography>} */}
        
          <FormControl fullWidth
            disabled={!selectedDistrict}
          >
            <Typography variant='body2'>
              City<span style={{ color: 'red' }}>*</span>
            </Typography>
            <Select
          size='small'
            value={selectedCity}
            onChange={(e) => handleCityChange(e.target.value)}
            sx={{
                ...(errors.city &&{
                  "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                    
                    borderColor: "red",
                  }
                })
              }}
          >
            <MenuItem value="">
              <p>Select a city</p>
            </MenuItem>
            {cities.map((city, index) => (
              <MenuItem key={index} value={city}>{city}</MenuItem>
            ))}
         
          </Select>
          </FormControl>
          {errors.city && <Typography variant="caption" color="error">{errors.city}</Typography>}
        </Grid>

        <Grid item xs={6}>
          <Typography variant='body2'>
            Zipcode<span style={{ color: 'red' }}>*</span>
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            size='small'
            value={addressFormData.zipcode}
            onChange={(e) => setAddressFormData({ ...addressFormData, zipcode: e.target.value })}

            sx={{
              ...(errors.zipcode && {
                "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {

                  borderColor: "red",
                }
              })
            }}
          />
          {errors.zipcode && <Typography variant="caption" color="error">{errors.zipcode}</Typography>}
        </Grid>
      </Grid>
    </div>
  )
}

export default AddressForm;
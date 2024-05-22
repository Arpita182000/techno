// import { Box, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
// import React, { useState } from 'react'
// import colorConfigs from '../../configs/colorConfigs'
// import CustomInputWithChip from '../common/fields/CustomInputWithChip'

// const ProductDetailsForm = () => {

//     const [formData, setFormData] = useState<any>([{}]);
//     const formJson: any = [
//     {
//       key: 'campaing_overview',
//       name: 'Campaing Overview'
//     },
//     {
//       key: 'test1',
//       name: 'Test1',
//       dependsOn: 'campaing_overview',
//       dependingValue: "20"
//     },
//     {
//         key: 'test2',
//         name: 'Test2',
//         dependsOn: 'test1',
//         dependingValue: "30"
//     }
//   ]

//   const formDropdownValue: any = {
//     campaing_overview: [
//       {
//         key: '10',
//         value: 'Ten'
//       },
//       {
//         key: '20',
//         value: 'Twenty'
//       }
//     ],
//     test1: [
//       {
//         key: '30',
//         value: 'Thirty'
//       },
//       {
//         key: '40',
//         value: 'Fourty'
//       }
//     ],
//     test2: [
//         {
//           key: '50',
//           value: 'Fifty'
//         },
//         {
//           key: '60',
//           value: 'Sixty'
//         }
//       ]
//   }

//   const handleChange = (key: any, value: any) => {
//     setFormData({...formData, [key]: value})
//     console.log(formData);
//   }

//     return (
//         <Box p={3}>
//             <Grid container rowGap={2}>
//                 {
//                 formJson.map((item: any) => {
//                     if(item.dependsOn && item.dependingValue !== formData[item.dependsOn]) {
//                         return null;
//                       } else {
//                         return <Grid item xs={12}>
//                         <InputLabel id="demo-simple-select-label">{item.name}</InputLabel>
//                         <Select
//                             labelId="demo-simple-select-label"
//                             id={item.key}
//                             label={item.name}
//                             onChange={(e) => handleChange(item.key, e.target.value)}
//                         >
//                             {formDropdownValue[item.key].map((obj: any) => <MenuItem value={obj.key}>{obj.key}</MenuItem>)}
//                         </Select>
//                     </Grid>

//                       }
//                 })
//                 }
//             </Grid>

//         </Box>
//     )
// }

// export default ProductDetailsForm

import React, { useState } from 'react';
import { TextField, Autocomplete, Button, Container } from '@mui/material';

const suggestionsMap: { [key: string]: string[] } = {
  digital: ['TV', 'Fridge', 'Laptop', 'Smartphone'],
  
};

const MyComponent: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<any>(null);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);

  const handleDomainChange = (event: React.ChangeEvent<{}>, value: string | null) => {
    setSelectedDomain(value);
    setSelectedSuggestion(null);
  };

  const handleSuggestionChange = (event: React.ChangeEvent<{}>, value: string | null) => {
    setSelectedSuggestion(value);
  };

  const handleSubmit = () => {
    if (selectedDomain && selectedSuggestion) {
      // Do something with the selected domain and suggestion
      console.log(`Selected Domain: ${selectedDomain}, Selected Suggestion: ${selectedSuggestion}`);
    }
  };

  return (
    <Container maxWidth="sm">
      <Autocomplete
        options={Object.keys(suggestionsMap)}
        value={selectedDomain}
        onChange={handleDomainChange}
        renderInput={(params) => <TextField {...params} label="Select Domain" />}
      />
      {/* {selectedDomain && */}
      {/* ( */}
        <Autocomplete
          options={suggestionsMap?.[selectedDomain]}
          value={selectedSuggestion}
          onChange={handleSuggestionChange}
          renderInput={(params) => <TextField {...params} label="Select Suggestion" />}
        />
      {/* ) */}
      {/* } */}
      <Button variant="contained" onClick={handleSubmit}>Submit</Button>
    </Container>
  );
};

export default MyComponent;


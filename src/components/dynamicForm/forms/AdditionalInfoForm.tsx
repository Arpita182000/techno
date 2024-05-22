import { Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import CustomInput from '../../common/fields/CustomInput'

const AdditionalInfoForm = ({setAdditionalFormData,additonalFormData,errors}:any) => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
            <Typography variant='body2' sx={{fontWeight:'bold'}}>
                Store Sale
                </Typography>
                <Typography variant='body2' fontSize= '12px'mt={1} >
                    Total Yearly Sales<span style={{ color: 'red' }}>*</span>
                </Typography>
                <TextField  size='small'
                 fullWidth
                 variant="outlined"
                 value={additonalFormData.avgSale}
            onChange={(e) => setAdditionalFormData({...additonalFormData, avgSale: e.target.value})}
            required
              
            sx={{
              ...(errors.avgSale &&{
                "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                  
                  borderColor: "red",
                }
              })
            }}
           
                />
                {errors.avgSale && <Typography variant="caption" color="error">{errors.avgSale}</Typography>}
              

                
        </Grid>
        
        <Grid item xs={6}>
        <Typography variant='body2' sx={{fontWeight:'bold'}}>
                Tags
                </Typography>
                <Typography variant='body2' fontSize= '12px' mt={1} >
                    Selected Tags<span style={{ color: 'red' }}>*</span>
                </Typography>
                <TextField  size='small'
                 fullWidth
                 variant="outlined"
                 value={additonalFormData.tags}
            onChange={(e) => setAdditionalFormData({...additonalFormData, tags: e.target.value})}
            required
              
            sx={{
              ...(errors.tags &&{
                "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                  
                  borderColor: "red",
                }
              })
            }}
           
                />
                {errors.tags && <Typography variant="caption" color="error">{errors.tags}</Typography>}
              
        </Grid>


      </Grid>
    </div>
  )
}

export default AdditionalInfoForm

import { Grid, TextField, Typography } from '@mui/material'
import React from 'react';

interface ICustomField {
    heading: string,
    xs: number,
};
//value, onchange, placeholder
const CustomInput = ({ heading, xs }: ICustomField) => {
    return (
        <Grid item xs={xs}>
            <Typography variant='body2'>
                {heading}
            </Typography>
            <TextField
                fullWidth
                variant="outlined"
                size='small'
            />
        </Grid>
    )
}

export default CustomInput;

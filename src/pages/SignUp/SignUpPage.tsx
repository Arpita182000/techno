import { Box, Button, Checkbox, Grid, Paper, TextField, Typography } from '@mui/material'
import React from 'react'
import colorConfigs from '../../configs/colorConfigs';
import './signUp.css';
import CustomInput from '../../components/common/fields/CustomInput';
import logo from '../../assets/images/logo 3.png'

const SignUpPage = () => {
  return (
    <Grid container justifyContent="center" alignItems="center" className='sign-up' style={{ height: '100vh', width: '100%' }}>
      <Grid item xs={10} sm={10} md={8} >
        <Paper elevation={2}
        // style={{ padding: 20 }}
        >
          <Grid container >
            <Grid item xs={4} sx={{ bgcolor: colorConfigs.primaryColor.red[600] }}>
              
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center',paddingTop:'5rem' }}>
                <img src={logo} alt="Logo" style={{ width:'40%', height: '50' ,}}  />
                <Typography variant="body2" p='0.5rem'  color='whitesmoke'sx={{opacity:'0.9', textAlign: 'center',fontSize:'11px'}}>
                  with the power of clicy,you can now focus only on functionaries for your digital products,while leaving the UI design on us!  
                </Typography>
                {/* <div>
                with the power of clicy,you can now focus only on functionaries for your digital products,while leaving the UI design on us! 
                </div> */}
              </div>
              </Grid>
            <Grid item xs={8} rowSpacing={2}>
              <Box p='2rem'>
                <Typography variant="h5" fontWeight='bold' sx={{ color: colorConfigs.primaryColor.red[600] }} >
                  Register
                </Typography>
                <form>
                  <Grid container spacing={2}>

                    <Grid item xs={12} sx={{ color:'#1A1A1A' }}>
                      {/* <Typography>
                        Name
                    </Typography>
                    <TextField fullWidth  size='small' variant="outlined"  /> */}
                      <CustomInput heading={'Name'} xs={12} />
                    </Grid>
                    <Grid item xs={12} sx={{ color: '#1A1A1A' }}>
                      <Typography >
                        Email
                      </Typography>
                      <TextField fullWidth size='small' variant="outlined" />
                    </Grid>

                    <Grid item xs={6} sx={{ color: '#1A1A1A' }}>
                      Password
                      <TextField fullWidth size='small' variant="outlined" />

                    </Grid>
                    <Grid item xs={6} sx={{ color: '#1A1A1A' }}>
                      Confirm Password
                      <TextField sx={{ color: '#1A1A1A', }} fullWidth size='small' variant="outlined" />

                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                      <Checkbox size='small' sx={{ color: colorConfigs.primaryColor.red[600] }} />
                      <Typography sx={{ color: '#1A1A1A' }}>
                        I accept the terms and privacy policy
                      </Typography>
                    </Grid>


                    <Grid item xs={12} >
                      <Button variant="contained" fullWidth sx={{ bgcolor: colorConfigs.primaryColor.red[600], borderRadius: '1rem' }}>
                        Register
                      </Button>
                    </Grid>
                  </Grid>
                </form>

              </Box>

            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};





export default SignUpPage

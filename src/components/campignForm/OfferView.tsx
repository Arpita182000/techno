import React, { useEffect, useState } from 'react'
import { ApiService, getURL } from '../../api';
import { Divider, Grid, Typography } from '@mui/material';
import { API_ADDRESS } from '../../api/apiConfig';

const OfferView = () => {
    const[data,setData] = useState<any>({});
    useEffect(() => {
        handleChooseOfferTitle();
    },[])
    
    const handleChooseOfferTitle = async() => {
        console.log("it is calling api");
        
        const response = await ApiService.callPostApi(
            // 'http://localhost:9001/api/campaign/offer',
            getURL(API_ADDRESS.addOffer),
            
            
            { campaignId : localStorage.getItem("campaignId")
        })
        setData(response?.data)

    }
  return (
    <Grid container >
        <Grid item xs={12}>
            <Typography>
                Offer Details
            </Typography>
            <Divider sx={{ p: ".2rem 0 0 0", marginBottom: ".5rem" }} />
            <Typography>Offer title : <span>
                {data?.title}
                </span></Typography>

        </Grid>

    </Grid>
  )
}

export default OfferView

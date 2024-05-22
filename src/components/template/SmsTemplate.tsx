import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { ApiService } from '../../api';
import image from '../../assets/images/offer.jpg';

const SmsTemplate = ({ smsData, handleSmsClick }: any) => {
  // useEffect(() =>{
  //         fetchSmsData();
  //     },[])
  //     const fetchSmsData = async () => {
  //         try {
  //           const result = await ApiService.callGetApi('http://localhost:9001/api/templates/sms?skip=0&limit=10');
  //           console.log("result111", result);
  //           setSmsData(result);

  //         } catch (error: any) {
  //           console.error('Error fetching data:', error.message);
  //         }
  //       };
  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        {smsData.map((item: any, index: any) =>
          <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 2, border: '1px solid grey' }} onClick={() => handleSmsClick(item)}>
            <img src={image} alt='Image' style={{ width: '100%', height: '300px', padding: '1rem' }} className="image" />
            <Typography sx={{ cursor: 'pointer', mt: 1 }}
              //  onClick={() => handleWhatsAppClick(item)} 
              key={index}>
              {item.subject}
            </Typography>
          </Box>
        )}
      </Box>






    </div>
  )
}

export default SmsTemplate
import { Box, Typography } from '@mui/material'
import React from 'react'
import image from '../../assets/images/offer.jpg';
// import './campign.style.css';

const WhatsAppTemplate = ({ whatsAppData, handleWhatsAppClick }: any) => {
  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        {whatsAppData.map((item: any, index: any) =>
          <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 2, border: '1px solid grey' }} onClick={() => handleWhatsAppClick(item)}>
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

export default WhatsAppTemplate

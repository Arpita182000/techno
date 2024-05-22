import { Box, Typography } from '@mui/material';
import React from 'react';
import { ApiService } from '../../api';

const EmailTemplate = ({ handleEmailClick, setSelectedTemplate, selectedTemplate, setSelectedEmail, templateType, setOpenDialog, setEmailTemplateData, emailTemplateData }: any) => {
  console.log("emailTemplateData", emailTemplateData);
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      {emailTemplateData.map((item: any, index: any) => (
        <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 2,border:'1px solid grey' }} onClick={() => handleEmailClick(item)}>
          <img src={item.image} alt={`Image ${index}`} style={{ width: '250px', height: '300px',  }} />
          <Typography sx={{ cursor: 'pointer', mt: 1 }}>{item.subject}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default EmailTemplate;
import { Box, Button, Checkbox, Container, Grid, Typography } from "@mui/material";
import FormSection from "./FormSection";
import colorConfigs from "../../configs/colorConfigs";
import { ReactNode } from "react";

interface IDynamicFormProps {
  children: ReactNode;
  // onSubmit: Function;
}

const DynamicForm = ({ children, 
  // onSubmit 
}: IDynamicFormProps) => {

  return (
    <Box sx={{ mt: 2}} 
    component="form"
      // onSubmit={(e) => {
      //   e.preventDefault();
      //   onSubmit(e);
      // }}
      noValidate
    >
      <Box>
        {children}
      </Box>
      {/* <Box sx={{display: 'flex', justifyContent: 'space-between', marginTop: '1rem'}}>
        <Box sx={{display: 'flex', justifyContent: 'start', alignItems: 'center'}}>
        <Checkbox sx={{ color: colorConfigs.primaryColor.red[600] }} />
          <Typography sx={{ color: colorConfigs.primaryColor.red[600] }}>
            I accept the terms and privacy policy
          </Typography>
        </Box>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
        <Button 
        type='submit'
         variant="contained" sx={{ alignItems: 'center', color: 'white', bgcolor: colorConfigs.primaryColor.red[600], px: '5px' }}>ADD</Button>
        </Box>
      </Box> */}
    </Box>
  );
};

export default DynamicForm;
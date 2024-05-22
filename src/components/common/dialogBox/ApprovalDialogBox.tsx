import React from 'react'
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import colorConfigs from '../../../configs/colorConfigs';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
      display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
    "& .MuiPaper-root": {
        width: '80%', 
        maxHeight: '80vh', 
      },
  }));
  


const ApprovalDialogBox = ({handleModalClose,open,customButton,handleSubmit}:any) => {
  return (
    <div >



    <React.Fragment >
      
      <BootstrapDialog
        onClose={handleModalClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        PaperProps={{
          sx: {
            borderRadius: "15px",
          },
        }}
        
      >
        <DialogTitle sx={{ m: 0, p: 2,fontSize:'16px',backgroundColor:colorConfigs.primaryColor.red[600],color:'whitesmoke' }} id="customized-dialog-title">
         Campaign Foreclosure
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleModalClose}
          size='small'
          sx={{
            position: "absolute",
            right: 8,
            top: 3,
            color: 'whitesmoke',            
          }}
        >
          <CloseIcon  />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom fontWeight='bold' sx={{marginTop:"3rem"}}>
            I want to send request for campaign approval
          </Typography>
          <div style={{padding:'10px',display:'flex',marginTop:"2rem",marginBottom:"3rem",}}>
            <div style={{padding:'10px'}}>
            <Button variant='contained'size='small'sx={{
                alignItems: "center",
                paddingX: "2rem",
                borderRadius: "20px",
                paddingY: "8px",
                border: `1px solid ${colorConfigs.primaryColor.red[600]}`,
                color: colorConfigs.primaryColor.red[600],
                background: "white",
                }} 
                 onClick={handleModalClose}>
                    Cancle
                    </Button>

            </div>
            <div style={{padding:'10px'}}>
            {customButton && <Button variant='contained'sx={{
                alignItems: "center",
                color: "white",
                paddingX: "2rem",
                borderRadius: "20px",
                paddingY: "8px",
                background: colorConfigs.primaryColor.red[600],

              }} size='small' onClick={handleSubmit}>{customButton}</Button>}

            </div>
           
            
           
            </div>
         
        </DialogContent>
       
      </BootstrapDialog>
    </React.Fragment>
  


    </div>
  )
}

export default ApprovalDialogBox

import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'
import colorConfigs from "../../../configs/colorConfigs";
const CustomDialogBox = ({ children, open, title, handleClose, customButton, handleCustomClick, height, width }: any) => {
  const isFullScreen = !height && !width; // Check if height and width props are not provided

  return (
    <div>
      <Dialog
        fullScreen={isFullScreen}
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth={width}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent style={{ height: height ? height : 'auto' }}>
          {children}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={handleClose} sx={{ alignItems: "center",
                      paddingX: "3rem",
                      borderRadius: "20px",
                      paddingY: "10px",
                      border: `1px solid ${colorConfigs.primaryColor.red[600]}`,
                      color: colorConfigs.primaryColor.red[600],
                      background: "white",}}>Close</Button>
            {customButton && <Button onClick={handleCustomClick}  sx={{
                      alignItems: "center",
                      color: "white",
                      paddingX: "3rem",
                      borderRadius: "20px",
                      paddingY: "10px",
                      background: colorConfigs.primaryColor.red[600],
                      "&:hover": {
                        color: "white",
                        background: colorConfigs.primaryColor.red[600],
                         
                      },
                    }}>{customButton}</Button>}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CustomDialogBox

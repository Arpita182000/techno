import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DoneIcon from "@mui/icons-material/Done";
import colorConfigs from "../../configs/colorConfigs";
import ApiService from "../../api/services/ApiService";
import { getURL } from "../../api";
import { API_ADDRESS } from "../../api/apiConfig";
import "./campign.style.css";
import { Stepper, Step, StepLabel } from "@mui/material";

const steps = ["Setup completed", "Configured", "Send for Approval"];

const CampaignSubmit = () => {
  const [activeStep, setActiveStep] = useState(steps.length);
  const [submitData,setSubmitData]=useState<any>({});

  const submitCampaign = async () => {
    const response = await ApiService.callPostApi(
      // 'http://localhost:9001/api/campaign/create'
      getURL(API_ADDRESS.campaignSubmit),

      { campaignId: localStorage.getItem("campaignId") }
    );
    setSubmitData(response?.data);
    // let id = response.data._id; // Assuming the ID is in the response data
    // localStorage.setItem("campaignId", id);
  };

  useEffect(() => {
    submitCampaign();
  }, []);
  console.log(submitData.name)
  const circleStyle = {
    // width: '100px',
    // height: '100px',
    // borderRadius: '50%',
    // backgroundColor: 'green',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const iconStyle = {
    fontSize: "50px",
    color: "white",
    borderRadius: "50%",
    backgroundColor: "#00B65E",
    padding: "0.5rem",
  };

  const messageStyle = {
    marginTop: "16px",
    color: "#00B65E",
    fontSize: "18px",
    fontWeight: "bold",
  };

  return (
    <Box p={6} sx={{ background: "white", borderRadius: "10px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <svg
          className="checkmark"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          <circle
            className="checkmark__circle"
            cx="26"
            cy="26"
            r="25"
            fill="none"
          />
          <path
            className="checkmark__check"
            fill="none"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
          />
        </svg>
        {/* <div style={circleStyle}>
          <DoneIcon style={iconStyle} sx={{}} />
        </div> */}
        <Typography style={messageStyle} variant="h6">
          Request Sent Sucessfully
        </Typography>
        <Typography sx={{ fontSize: "15px", fontWeight: "200" }}>
          You have sucessfully send request for campaign Approval.please wait
          for Approver's feedback
        </Typography>
      </div>
      {submitData && (
        <Grid
        container
        px={6}
        py={4}
        mt={6}
        sx={{ border: "1px solid grey", borderRadius: "5px" }}
      >
        <Grid item xs={1.2} >
          <div style={{ width: "100%" }}>
            <img src="" alt="logo" />
          </div>
        </Grid>
        <Grid item xs={3} sx={{ textAlign: "left" }}>
          {/* <div style={{width:'100%'}}> */}
          <Typography sx={{ color: colorConfigs.primaryColor.red[600] }}>
            {submitData?.name}
          </Typography>
          <Typography sx={{ fontSize: "16px" }}>{submitData?._id}</Typography>
          {/* </div> */}
        </Grid>
        <Grid item xs={3}>
          <Box>
            <Typography
              sx={{
                color: colorConfigs.primaryColor.red[600],
                fontSize: "16px",
                textAlign: "left",
              }}
              variant="body1"
            >
              Requested by
            </Typography>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  
                }}
              >
                <img
                  src=""
                  alt="DD"
                  style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                />
              </div>
              <div style={{ width: "100%" }}>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "600",
                    
                  }}
                >
                  Debalina Dhar
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: colorConfigs.primaryColor.red[600],
                    
                  }}
                >
                  example@email.com
                </Typography>
              </div>
            </div>
          </Box>
        </Grid>
        <Grid item xs={2.3} sx={{ textAlign: "left" }}>
          <Box>
            <Typography
              variant="body1"
              sx={{ color: colorConfigs.primaryColor.red[600] }}
              gutterBottom
            >
              Designation
            </Typography>
            <Typography className="roleBox" style={{maxWidth:"120px"}}  textAlign="center">
              Employee
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={2.5} sx={{ textAlign: "left" }}>
          <Box>
            <Typography
              variant="body1"
              sx={{ color: colorConfigs.primaryColor.red[600] }}
              gutterBottom
            >
              Requested submitted
            </Typography>
            <Typography variant="body2" fontWeight={600} fontSize={19}>
              {/* {submitData.createdAt} */}
              {submitData?.createdAt && new Date(submitData.createdAt).toISOString().split("T")[0].split("-").reverse().join("-")}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      )}
      

      <Grid
        container
        sx={{ border: "1px solid grey", borderRadius: "5px", marginTop: "3%" }}
      >
        <Box
          sx={{
            borderBottom: "1px gray solid",
            width: "100%",
            padding: "1rem",
          }}
        >
          <Typography sx={{}} variant="body1" fontWeight="600">
            Campaign status
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            padding: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="campSubmit-stepper">
            <Stepper
              activeStep={activeStep}
              orientation="vertical"
              style={{ backgroundColor: "transparent" }}
            >
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>
          <div style={{ color: "green" }}>
            <Typography sx={{ marginY: "2rem", fontWeight: "bold" }}>
              11-03-2024
            </Typography>
            <Typography sx={{ marginY: "2rem", fontWeight: "bold" }}>
              1-03-2024
            </Typography>
            <Typography sx={{ marginY: "2rem", fontWeight: "bold" }}>
              21-03-2024
            </Typography>
          </div>
        </Box>
      </Grid>
    </Box>
  );
};

export default CampaignSubmit;

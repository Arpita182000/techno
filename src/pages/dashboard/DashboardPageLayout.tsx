import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  Box,
  styled,
  InputAdornment,
} from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { Typography } from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import { Select, MenuItem } from "@mui/material";
import whFilterpng from "../../assets/images/PNG/Filter (1).png";
import StateWiseCampaignStatitics from "./StateWiseCampaignStatitics";
import { LineChart } from "@mui/x-charts/LineChart";
import all from "../../assets/images/bargraph_1370907 1.png";
import email from "../../assets/images/email_1370907 1.png";
import messenger from "../../assets/images/messenger_1370907 1.png";
import whatsapp from "../../assets/images/whatsapp_1370907 1.png";
import { getURL } from "../../api";
import ApiService from "../../api/services/ApiService";
import { API_ADDRESS } from "../../api/apiConfig";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

type Props = {};

const DashboardPageLayout = (props: Props, onChange?:any, onSearch?:any) => {
  const [viewData, setViewData] = useState<any>({});

  const viewUserfunc = async () => {
    const response = await ApiService.callGetApi(
      getURL(API_ADDRESS.dashBoardApi)
    );
    setViewData(response);
  };

  useEffect(() => {
    viewUserfunc();
  }, []);

  return (
    <div style={{ maxWidth: "100%", paddingLeft: "10px" }}>
      <div className="header">
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Dashboard
        </Typography>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
              padding:"10px",
              paddingTop:"10%",
              paddingLeft: "10%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                gap: "16px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "10px",
                  background: "#C8E3F1",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img alt="Arpita's Profile" src={all} width={31} height={31} />
              </div>
              <Typography>Total Campaign Run</Typography>
            </Box>
            <div style={{margin:"15px 0px"}}>
            <Typography >Total Store </Typography>
            <Typography sx={{color:"#149CE0",fontSize:"20px"}}>{viewData?.all?.totalStore}</Typography>
            </div>
            <Box sx={{}}>
              <Typography>Total Campaign </Typography>
              <Typography sx={{color:"#149CE0",fontSize:"36px"}}>{viewData?.all?.totoalCampaign} </Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
              padding:"10px",
              paddingTop:"10%",
              paddingLeft: "10%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                gap: "16px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "10px",
                  background: "#C8E3F1",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  alt="Arpita's Profile"
                  src={email}
                  width={31}
                  height={31}
                />
              </div>
              <Typography>Email Campaign</Typography>
            </Box>
            <div style={{margin:"15px 0px"}}>
            <Typography >Total Store </Typography>
            <Typography sx={{color:"#149CE0",fontSize:"20px"}}>{viewData?.email?.totalStore}</Typography>
            </div>
            <Box sx={{}}>
              <Typography>Total Campaign </Typography>
              <Typography sx={{color:"#149CE0",fontSize:"36px"}}>{viewData?.email?.totoalCampaign} </Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
              padding:"10px",
              paddingTop:"10%",
              paddingLeft: "10%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                gap: "16px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "10px",
                  background: "#C8E3F1",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  alt="Arpita's Profile"
                  src={whatsapp}
                  width={31}
                  height={31}
                />
              </div>
              <Typography>Whatsapp Campaign</Typography>
            </Box>
            <div style={{margin:"15px 0px"}}>
            <Typography >Total Store </Typography>
            <Typography sx={{color:"#149CE0",fontSize:"20px"}}>{viewData?.whatsapp?.totalStore}</Typography>
            </div>
            <Box sx={{}}>
              <Typography>Total Campaign </Typography>
              <Typography sx={{color:"#149CE0",fontSize:"36px"}}>{viewData?.whatsapp?.totoalCampaign} </Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
              padding:"10px",
              paddingTop:"10%",
              paddingLeft: "10%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                gap: "16px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "10px",
                  background: "#C8E3F1",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  alt="Arpita's Profile"
                  src={messenger}
                  width={31}
                  height={31}
                />
              </div>
              <Typography>SMS Campaign</Typography>
            </Box>
            <div style={{margin:"15px 0px"}}>
            <Typography >Total Store </Typography>
            <Typography sx={{color:"#149CE0",fontSize:"20px"}}>{viewData?.sms?.totalStore}</Typography>
            </div>
            <Box >
              <Typography>Total Campaign </Typography>
              <Typography sx={{color:"#149CE0",fontSize:"36px"}}>{viewData?.sms?.totoalCampaign} </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>

      <Grid item xs={12} sx={{ marginY: "5%" }}>
        <div style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
          <Box sx={{ border: "none" }}>
            <Box
              sx={{
                background: colorConfigs.primaryColor.red[600],
                fontWeight: "600",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: "10px 10px 0 0",
                padding: "8px",
              }}
            >
              <div
                style={{
                  width: "80%",
                  color: "white",
                  fontSize: "18px",
                }}
              >
                Weekly Basis Campaign Run
              </div>
              <Box
                sx={{
                  width: "20%", // Set the width of the Box container
                  color: "white",
                  fontSize: "18px",
                }}
              >
                <Box
                  sx={{
                    fontWeight: "600",
                    display:"flex",
                    justifyContent:"space-between",
                    alignItems:"center",
                    borderRadius: "10px",
                  }}
                >
                  <div
                    style={{
                      width: "70%",
                      height: "40px",
                      background: "white",
                      borderRadius: "10px",
                      outline: "none",
                      border: "none",
                    }}
                  >
                    <Select
                      label="last 7 days"
                      variant="outlined"
                      defaultValue=""
                      style={{
                        width: "100% ",
                        height: "100%",
                        outline: "none",
                        border: "none",
                      }}
                    >
                      
                      <MenuItem value={1}>last 7days</MenuItem>
                      <MenuItem value={2}>Last 6 months</MenuItem>
                      <MenuItem value={3}>Last 12 months</MenuItem>
                      <MenuItem value={4}>Last quarter</MenuItem>
                      <MenuItem value={5}>Last Month</MenuItem>
                    </Select>
                  </div>

                  {/* <div>
                    <img
                      src={whFilterpng}
                      alt="filter"
                      width={27}
                      height={27}
                    />
                  </div> */}
                </Box>
              </Box>
            </Box>
          </Box>
          <div style={{ maxWidth: "100%", overflowX: "auto" }}>
            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: ["SUN", "MON", "TUE", "WED", "THUS", "FRI", "SAT"],
                },
              ]}
              series={[
                { data: [8000, 3000, 5000, 4000, 6000, 7000, 2000] }, // Data for the first series
                { data: [6000, 6000, 3000, 4080, 2000, 9000, 5080] }, // Data for the second series
                { data: [3000, 6200, 3800, 4000, 2000, 900, 5000] },
              ]}
              height={300}
            />
          </div>
        </div>
      </Grid>
      <Box sx={{width:"100%"}}>
      <div style={{ display: 'flex', alignItems: 'center',justifyContent:"center" }}>
      <TextField
        placeholder="Search..."
        // onChange={onChange}
        variant="outlined"
        sx={{width:"700px",borderEndEndRadius:"0"}}
        // InputProps={{
        //   endAdornment: (
        //     <SearchIcon color="action" />
        //   ),
        // }}
        
      />
      <Button
        variant="contained"
        color="primary"
        onClick={onSearch}
        sx={{ alignItems: "center",
        color: "white",
        paddingX: "3rem",
        paddingY: "15px",
        background: colorConfigs.primaryColor.red[600],}}
      >
        Choose State/UT
      </Button>
    </div>
      </Box>
      <StateWiseCampaignStatitics whFilterpng={whFilterpng} />
      <Grid item xs={12} sx={{ marginY: "5%" }}>
        <div style={{}}>
          <Box sx={{ border: "none" }}>
            <Box
              sx={{
                background: colorConfigs.primaryColor.red[600],
                fontWeight: "600",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: "10px 10px 0 0",
                padding: "8px",
              }}
            >
              <div
                style={{
                  width: "70%",
                  color: "white",
                  fontSize: "18px",
                }}
              >
                Region wise Average sales performance.
              </div>
              <Box
                sx={{
                  width: "30%", // Set the width of the Box container
                  color: "white",
                  fontSize: "18px",
                }}
              >
                <Box
                  sx={{
                    fontWeight: "600",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "16px",
                    alignItems: "center",
                    borderRadius: "10px",
                  }}
                >
                  <div
                    style={{
                      width: "70%",
                      height: "40px",
                      background: "white",
                      borderRadius: "10px",
                      outline: "none",
                      border: "none",
                    }}
                  >
                    <Select
                      label="last 7 days"
                      variant="outlined"
                      defaultValue=""
                      style={{
                        width: "100% ",
                        height: "100%",
                        outline: "none",
                        border: "none",
                      }}
                    >
                      <MenuItem value={1}>Last Month</MenuItem>
                      <MenuItem value={2}>Last quarter</MenuItem>
                      <MenuItem value={3}>Last 6 months</MenuItem>
                      <MenuItem value={4}>Last 12 months</MenuItem>
                    </Select>
                  </div>
                 
                </Box>
              </Box>
            </Box>
          </Box>
          <div style={{ maxWidth: "100%", background: "white" }}>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                alignContent: "center",
                padding: "1rem 1rem",
              }}
            >
              <Typography variant="body1">Company Name: SoleMate</Typography>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  alignContent: "center",
                }}
              >
                <Typography variant="body1">(In INR) </Typography>
                <Typography variant="body1">Year: 2024</Typography>
              </div>
            </div>

            <div style={{ maxWidth: "100%", overflowX: "auto" }}>
              <LineChart
                xAxis={[
                  { data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] },
                ]}
                series={[
                  {
                    data: [2, 3, 5, 8, 1, 5, 1, 4, 3, 8, 8, 1, 5, 1],
                    showMark: ({ index }) => index % 2 === 0,
                  },
                ]}
                height={400}
                grid={{ vertical: true, horizontal: true }}
              />
            </div>
          </div>
        </div>
      </Grid>
    </div>
  );
};

export default DashboardPageLayout;

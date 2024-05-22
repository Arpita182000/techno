import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Box,
  styled,
  InputAdornment,
} from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { Typography } from "@mui/material";
import { Select, MenuItem } from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  useGaugeState,
} from "@mui/x-charts/Gauge";

function GaugePointer() {
  const { valueAngle, outerRadius, cx, cy } = useGaugeState();

  if (valueAngle === null) {
    // No value to display
    return null;
  }

  const target = {
    x: cx + outerRadius * Math.sin(valueAngle),
    y: cy - outerRadius * Math.cos(valueAngle),
  };
  return (
    <g>
      <path
        d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
        stroke="#FFFFFF"
        strokeWidth={25}
        strokeLinecap="round"
        fill="none"
      />
      {/* Inner stroke */}
      <path
        d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
        stroke="#1F2B4D"
        strokeWidth={10}
        strokeLinecap="round"
        fill="none"
      />
      <circle cx={cx} cy={cy} r={10} fill="#1F2B4D" />
    </g>
  );
}
type Props = {
  whFilterpng: string;
};

export default function StateWiseCampaignStatitics({ whFilterpng }: Props) {
  return (
    <>
      <Grid container spacing={6} sx={{ marginY: "5%" }}>
        <Grid item md={6} xs={12}>
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
                    width: "70%",
                    color: "white",
                    fontSize: "18px",
                  }}
                >
                  State wise campaign statistics
                </div>
                <Box
                  sx={{
                    width: "30%", // Set th7 width of the Box container
                    color: "white",
                    fontSize: "18px",
                    display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
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
                  <Box
                    sx={{
                      fontWeight: "600",
                      display: "flex",
                      justifyContent: "end",
                      alignItems: "center",
                      borderRadius: "10px",
                    }}
                  >
                  </Box>
                </Box>
              </Box>
            </Box>
            <div
              style={{
                padding: "1rem",
                background: "white",
                borderRadius:"0px 0px 10px 10px"
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "1rem",
                }}
              >
                <div
                  style={{
                    marginTop: "1rem",
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "3rem",
                    }}
                  >
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{ fontWeight: "500", fontSize: "1rem" }}
                    >
                      Email Campaign
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "500",
                        fontSize: "4rem",
                        color: "#156A94",
                      }}
                    >
                      60
                      <span style={{ fontSize: "2rem", display: "inline" }}>
                        %
                      </span>
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                      fontSize: "3rem",
                    }}
                  >
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{ fontWeight: "500", fontSize: "1rem" }}
                    >
                      Whatsapp Campaign
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "500",
                        display: "inline",
                        fontSize: "4rem",
                        color: "#7C9AD4",
                      }}
                    >
                      30
                      <span style={{ fontSize: "2rem", display: "inline" }}>
                        %
                      </span>
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      fontSize: "3rem",
                    }}
                  >
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{ fontWeight: "500", fontSize: "1rem" }}
                    >
                      SMS Campaign
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "500",
                        display: "inline",
                        fontSize: "4rem",
                        color: "#6EC0E8",
                      }}
                    >
                      10
                      <span style={{ fontSize: "2rem", display: "inline" }}>
                        %
                      </span>
                    </Typography>
                  </div>
                </div>
                <div
                  style={{
                    marginTop: "20px",
                    marginLeft: "3rem",
                    // border: "none",
                  }}
                >
                  <PieChart
                    sx={{ border: "none" }}
                    series={[
                      {
                        data: [
                          { id: 0, value: 60, color: "#156A94" },
                          { id: 1, value: 30, color: "#7C9AD4" },
                          { id: 2, value: 10, color: "#6EC0E8" },
                        ],
                      },
                    ]}
                    width={530}
                    height={330}
                  />
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item md={6} xs={12}>
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
                    width: "60%",
                    color: "white",
                    fontSize: "18px",
                  }}
                >
                  State wise store volume
                </div>
                <Box
                  sx={{
                    width: "40%", // Set the width of the Box container
                    color: "white",
                    fontSize: "18px",
                    display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
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
                  <Box
                    sx={{
                      fontWeight: "600",
                      display: "flex",
                      justifyContent: "end",
                      alignItems: "center",
                      borderRadius: "10px",
                    }}
                  >
                  </Box>
                </Box>
              </Box>
            </Box>
            <div
              style={{
                padding: "1rem",
                background: "white",
                borderRadius:"0px 0px 10px 10px"
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "1rem",
                 
                }}
              >
                <div
                  style={{
                    // marginTop: "1rem",
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "3rem",
                      
                    }}
                  >
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{ fontWeight: "500", fontSize: "1rem" }}
                    >
                      Achived Store
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "500",
                        fontSize: "3rem",
                        color: "#156A94",
                      }}
                    >
                      750
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      fontSize: "3rem",

                    }}
                  >
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{ fontWeight: "500", fontSize: "1rem" }}
                    >
                      Total Target Store
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "500",
                        display: "inline",
                        fontSize: "3rem",
                        color: "#604D8B",
                      }}
                    >
                      1000
                    </Typography>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  
                }}
              >
                <GaugeContainer
                  width={500}
                  height={300}
                  startAngle={-90}
                  endAngle={90}
                  value={70}
                >
                  <GaugeReferenceArc />
                  <GaugeValueArc />
                  <GaugePointer />
                  <text x="6%" y="96%" textAnchor="left" fill="black" fontSize="12px">
                    0
                  </text>
                  {/* Text under endAngle */}
                  <text x="93%" y="96%" textAnchor="right" fill="black" fontSize="12px">
                    1000
                  </text>
                  {/* Text under the strike */}
                  <text x="50%" y="100%" textAnchor="middle" fill="black" fontSize="22px">
                    75%
                  </text>
                </GaugeContainer>
              </div>
              <div style={{ width:"100%",display: "flex", alignItems: "center" ,justifyContent:"space-between",alignContent:"center", padding: "2rem 1rem",}}>
                <div style={{ display: "flex", alignItems: "center" ,justifyContent:"space-between",alignContent:"center"}}>
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    backgroundColor: "#156A94",
                    marginRight: 1,
                  }}
                />

                <Typography variant="body1">Achieved</Typography>
                </div>
                <div style={{ display: "flex", alignItems: "center" ,justifyContent:"space-between",alignContent:"center"}}>
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    backgroundColor: "red",
                    marginRight: 1,
                  }}
                />

                <Typography variant="body1">Target</Typography>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

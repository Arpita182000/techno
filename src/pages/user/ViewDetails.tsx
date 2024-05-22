import React, { useEffect, useState } from "react";
import { Form, Field } from "formik";
import {
  Box,
  Grid,
  TextField,
  Container,
  Button,
  Checkbox,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import image1 from "../../assets/images/PNG/images (3).jpg";
import EditIcon from "../../assets/images/PNG/edit.png";
import "./AddUser.css";
import { getURL } from "../../api";
import ApiService from "../../api/services/ApiService";
import { API_ADDRESS } from "../../api/apiConfig";
import { Link, useParams } from "react-router-dom";
import colorConfigs from "../../configs/colorConfigs";

export default function ViewDetails() {
  const { id } = useParams();
  console.log(id)
  const [viewData, setViewData] = useState<any>({});

  const viewUserfunc = async () => {
    const response = await ApiService.callPostApi(
      getURL(API_ADDRESS.userDetails),
      {
        userid: id,
      }
    );
    setViewData(response?.data);
  };

  useEffect(() => {
    viewUserfunc();
  }, []);
  return (
    <div className="overviewClass">
      <div className="header">
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          View User
        </Typography>
      </div>
      {viewData && (
        <Box
          sx={{
            width: "maxWidth",
            borderRadius: "10px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            padding: "30px",
            paddingTop: "5%",
            background: "white",
          }}
        >
          {/* Parent Box */}
          <Grid container spacing={3}>
            {/* First Child Box */}

            <Grid item xs={12} md={8} sx={{ marginLeft: "5%" }}>
              <Grid container spacing={2}>
                {/* First Div with Image */}
                <Grid item xs={12} md={5}>
                  <div >
                    <img
                      src={viewData?.imageUrl}
                      alt="Your Image"
                      style={{
                        
                        height: "100px",
                        width: "100px",
                        borderRadius: "10px",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  </div>
                </Grid>

                {/* Second Div with 3 Columns of Paragraphs */}
                <Grid item xs={12} md={6}>
                  <Grid container spacing={2} sx={{ }}>
                    {/* First Column */}
                    <Grid item xs={12}>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: "600", fontSize: "30px" }}
                      >
                        {`${viewData?.firstName} ${viewData?.lastName}`}
                      </Typography>
                      <Typography variant="body1">
                        {viewData?.email1}
                      </Typography>
                      <Typography variant="body1" sx={{ marginTop: "5px" }}>
                        <div
                          className={
                            viewData?.accountType?.role === "employee"
                              ? "roleBox"
                              : "managerBox"
                          }
                        >
                          {viewData?.accountType?.role}
                        </div>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <hr style={{ border: "1px #C9C9C9 solid" }} />
              <Grid container spacing={2}>
                {/* First Div */}
                <Grid item xs={12} sm={5} >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start", 
                      alignItems: "flex-start", 
                      padding: "1rem",
                      marginBottom: "2rem",
                    }}
                  >
                    <div>Employee ID</div>
                    <div style={{ fontWeight: "600" }}>{viewData._id}</div>
                  </div>
                </Grid>
                {/* Second Div */}
                <Grid item xs={12} sm={6} sx={{ }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start", 
                      alignItems: "flex-start", 
                      padding: "1rem",
                      marginBottom: "2rem",
                    }}
                  >
                    <div>Status</div>
                    <div style={{ fontWeight: "600", color: "#00B65E" }}>
                      Active
                    </div>
                  </div>
                </Grid>
              </Grid>

              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Detail Information
              </Typography>
              <hr style={{ border: "1px #C9C9C9 solid" }} />
              <Box
                sx={{
                  padding: "10px",

                  display: "flex",
                  justifyContent: "space-between",
                  gap: "20px",
                  marginBottom: "1.5rem",
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        borderRadius: "3%",
                        width: "100%",
                      }}
                    >
                      <TextField
                        id="search"
                        label="Email"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={viewData?.email1}
                        InputLabelProps={{
                          shrink: true,
                          style: {
                            position: "absolute",
                            top: -3,
                            background: "white",
                          },
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        borderRadius: "3%",

                        width: "100%",
                      }}
                    >
                      <TextField
                        id="search"
                        label="City"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={viewData?.city}
                        InputLabelProps={{
                          shrink: true,
                          style: {
                            position: "absolute",
                            top: -3,
                            background: "white",
                          },
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Box
                sx={{
                  padding: "10px",

                  display: "flex",
                  justifyContent: "space-between",
                  gap: "20px",
                  marginBottom: "1.5rem",
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        borderRadius: "3%",
                        width: "100%",
                      }}
                    >
                      <TextField
                        id="search"
                        label="Phone Number"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={viewData?.phone}
                        InputLabelProps={{
                          shrink: true,
                          style: {
                            position: "absolute",
                            top: -3,
                            background: "white",
                          },
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        borderRadius: "3%",

                        width: "100%",
                      }}
                    >
                      <TextField
                        id="search"
                        label="Dist."
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={viewData?.district}
                        InputLabelProps={{
                          shrink: true,
                          style: {
                            position: "absolute",
                            top: -3,
                            background: "white",
                          },
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Box
                sx={{
                  padding: "10px",

                  display: "flex",
                  justifyContent: "space-between",
                  gap: "20px",
                  marginBottom: "1.5rem",
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        borderRadius: "3%",
                        width: "100%",
                      }}
                    >
                      <TextField
                        id="search"
                        label="WhatsApp Number"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={viewData?.whatsapp}
                        InputLabelProps={{
                          shrink: true,
                          style: {
                            position: "absolute",
                            top: -3,
                            background: "white",
                          },
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        borderRadius: "3%",

                        width: "100%",
                      }}
                    >
                      <TextField
                        id="search"
                        label="State"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={viewData?.state}
                        InputLabelProps={{
                          shrink: true,
                          style: {
                            position: "absolute",
                            top: -3,
                            background: "white",
                          },
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Box
                sx={{
                  padding: "10px",

                  display: "flex",
                  justifyContent: "space-between",
                  gap: "20px",
                  marginBottom: "1.5rem",
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        borderRadius: "3%",
                        width: "100%",
                      }}
                    >
                      <TextField
                        id="search"
                        label="Address Line 1"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={viewData?.address1}
                        InputLabelProps={{
                          shrink: true,
                          style: {
                            position: "absolute",
                            top: -3,
                            background: "white",
                          },
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        borderRadius: "3%",

                        width: "100%",
                      }}
                    >
                      <TextField
                        id="search"
                        label="Zip Code"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={viewData?.zipcode}
                        InputLabelProps={{
                          shrink: true,
                          style: {
                            position: "absolute",
                            top: -3,
                            background: "white",
                          },
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Box
                sx={{
                  padding: "10px",

                  display: "flex",
                  justifyContent: "space-between",
                  gap: "20px",
                  marginBottom: "1.5rem",
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        borderRadius: "3%",
                        width: "100%",
                      }}
                    >
                      <TextField
                        id="search"
                        label="Address Line 2"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={viewData?.address2}
                        InputLabelProps={{
                          shrink: true,
                          style: {
                            position: "absolute",
                            top: -3,
                            background: "white",
                          },
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    color: "white",
                    paddingX: "3rem",
                    borderRadius: "20px",
                    paddingY: "10px",
                    background: colorConfigs.primaryColor.red[600],
                  }}
                >
                  <Link to={`/user/edit-user-details/${viewData._id}`}>
                   
                    Edit Details
                    <span>
                      <img
                        src={EditIcon}
                        style={{ filter: "brightness(0) invert(1)" }}
                        alt="edit"
                        width="16"
                        height="16"
                      />
                    </span>
                  </Link>
                </Button>
              </div>
            </Grid>
          </Grid>
        </Box>
      )}
    </div>
  );
}

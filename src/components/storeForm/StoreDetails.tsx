import React, { useEffect, useState } from "react";
// import { Select, SelectChangeEvent} from "@mui/material";
import { Grid, Box, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DoneIcon from "@mui/icons-material/Done";
import colorConfigs from "../../configs/colorConfigs";
import ApiService from "../../api/services/ApiService";
import { getURL } from "../../api";
import { API_ADDRESS } from "../../api/apiConfig";
import arrow from '../../assets/images/Mask group.png'
import image1 from "../../assets/images/PNG/images (1).jpg";
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import { useLocation, useNavigate } from "react-router-dom";

export default function StoreDetails() {


    const [showContactDetails, setShowContactDetails] = useState(true);
    const [showLocationDetails, setShowLocationDetails] = useState(true);
    const navigate = useNavigate();
    const[storeData,setStoreData] = useState<any>({});
  const location = useLocation();
  const storeIdValue = location?.state?.storeId ?? "";
  const [storeId, setStoreId] = useState<any>(storeIdValue);
//   console.log("calling response of api",storeData);

  useEffect(() => {
    getStoreData(storeId);
  }, []);

  const getStoreData = async (storeId: any) => {
    
    
    try {
      const result = await ApiService.callPostApi(
        getURL(API_ADDRESS.editStore), 
        {
          "storeId": storeId
        }
      );
    
    setStoreData(result?.data)
    } catch (error: any) {
        console.error('Error fetching data:', error.message);
      }
    }


    const handleChange = (section: string) => {
        if (section === "contact") {
            setShowContactDetails(!showContactDetails);
        } else if (section === "location") {
            setShowLocationDetails(!showLocationDetails);
        }
    };

    return (
        <div style={{ margin: "20px" }}>
            <div className="header">
                <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "20px" }}>
                    Store Details
                </Typography>
            </div>


            <Box p={6} sx={{ background: "white", borderRadius: "10px" }}>
                <Grid item xs={3} sx={{ textAlign: "left", borderBottom: "1px gray solid", marginBottom: "20px" }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "10px",
                            padding: "10px"
                        }}
                    >
                        <div
                            style={{
                                width: "80px",
                                height: "80px",
                            }}
                        >
                            <img
                                src={storeData?.profileImg}
                                alt="Dp"
                                style={{ width: "100%", height: "100%", borderRadius: "50%", }}
                            />
                        </div>
                        <div style={{ width: "100%" }}>
                            <Typography
                                sx={{
                                    fontSize: "32px",
                                    fontWeight: "500",

                                }}
                            >
                               {storeData?.name}
                            </Typography>

                        </div>
                    </div>
                </Grid>
                <Grid container spacing={3} sx={{ padding: "15px", paddingLeft: "2rem" }}>
                    <Grid item xs={4}>
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: "16px",
                                    textAlign: "left",
                                }}
                                variant="body1"
                            >
                                Store Id
                            </Typography>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                }}
                            >
                                <div style={{ width: "100%" }}>
                                    <Typography
                                        sx={{
                                            fontSize: "19px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {storeData?._id}
                                    </Typography>
                                </div>
                            </div>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: "16px",
                                    // textAlign: "left",
                                    alignItems:'center'
                                }}
                                variant="body1"
                            >
                                Store Tag
                            </Typography>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                }}
                            >
                                <div style={{ width: "100%" }}>
                                    <Typography
                                        sx={{
                                            fontSize: "19px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {storeData?.tags?.join(',')}
                                    </Typography>
                                </div>
                            </div>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: "16px",
                                    textAlign: "left",
                                }}
                                variant="body1"
                            >
                                Average Sale
                            </Typography>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                }}
                            >
                                <div style={{ width: "100%" }}>
                                    <Typography
                                        sx={{
                                            fontSize: "30px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        INR <span style={{ color: "green" }}>{storeData?.avgSale} <img src={arrow} alt="arrow" /></span>
                                    </Typography>
                                </div>
                            </div>
                        </Box>
                    </Grid>
                </Grid>
                <Grid
                    container
                    sx={{ border: "1px solid grey", borderRadius: "5px", marginTop: "1%" }}
                >
                    <Box
                        sx={{
                            borderBottom: "1px gray solid",
                            width: "100%",
                            padding: "10px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant="body1" fontWeight="600" sx={{ color: colorConfigs.primaryColor.red[600], fontSize: "1.5rem" }}>
                            Point of Contact
                        </Typography>

                        <IconButton
                            aria-label="toggle-details"
                            onClick={() => handleChange("contact")}
                        >
                            <ArrowDropDownOutlinedIcon />
                        </IconButton>
                    </Box>

                    {showContactDetails && (
                        <Box
                            sx={{
                                width: "100%",
                                padding: "1.5rem",
                                display: "flex",
                                // justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Grid item xs={3} sx={{ textAlign: "left" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: "10px"
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "40px",
                                            height: "40px",

                                        }}
                                    >
                                        <img
                                            src={image1}
                                            alt="Dp"
                                            style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                                        />
                                    </div>
                                    <div style={{ width: "100%" }}>
                                        <Typography

                                        >
                                            Name
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontSize: "19px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {`${storeData?.firstName} ${storeData?.lastName}`}
                                        </Typography>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={3}>
                                <Box>
                                    <Typography
                                        sx={{
                                            fontSize: "16px",
                                            textAlign: "left",

                                        }}
                                        variant="body2"
                                    >
                                        Email
                                    </Typography>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "flex-start",
                                            color: "#149CE0"
                                        }}
                                    >
                                        <div style={{ width: "100%" }}>
                                            <Typography
                                                sx={{
                                                    fontSize: "19px",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                {storeData?.email}
                                            </Typography>
                                        </div>
                                    </div>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box>
                                    <Typography
                                        sx={{
                                            fontSize: "16px",
                                            textAlign: "left",
                                        }}
                                        variant="body1"
                                    >
                                        Contact No.
                                    </Typography>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "flex-start",
                                        }}
                                    >
                                        <div style={{ width: "100%" }}>
                                            <Typography
                                                sx={{
                                                    fontSize: "19px",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                {storeData?.phone}
                                            </Typography>
                                        </div>
                                    </div>
                                </Box>
                            </Grid>
                            <Grid item xs={3} sx={{ textAlign: "left" }}>
                                <Box>
                                    <Typography
                                        variant="body1"
                                        gutterBottom
                                    >
                                        Whatsapp No.
                                    </Typography>
                                    <Typography variant="body2" fontWeight={500} fontSize={19}>
                                        {storeData?.whatsapp}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Box>
                    )}
                </Grid>


                <Grid
                    container
                    sx={{ border: "1px solid grey", borderRadius: "5px", marginTop: "5%" }}
                >
                    <Box
                        sx={{
                            borderBottom: "1px gray solid",
                            width: "100%",
                            padding: "10px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant="body1" fontWeight="600" sx={{ color: colorConfigs.primaryColor.red[600], fontSize: "1.5rem", }}>
                            Location
                        </Typography>

                        <IconButton
                            aria-label="toggle-details"
                            onClick={() => handleChange("location")}
                        >
                            <ArrowDropDownOutlinedIcon />
                        </IconButton>
                    </Box>

                    {showLocationDetails && (
                        <Box
                            sx={{
                                width: "100%",
                                padding: "2rem",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Grid item xs={3} sx={{ textAlign: "left" }}>
                                <Typography>
                                    Address
                                </Typography>
                                <Typography fontWeight={500} fontSize={19}>{storeData?.address?.line1}</Typography>
                            </Grid>
                            <Grid item xs={3} sx={{ textAlign: "left" }}>
                                <Box>
                                    <Typography
                                        variant="body1"
                                        gutterBottom
                                    >
                                        State/UT
                                    </Typography>
                                    <Typography variant="body2" fontWeight={500} fontSize={19}>
                                        {storeData?.address?.state}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box>
                                    <Typography
                                        sx={{
                                            fontSize: "16px",
                                            textAlign: "left",
                                        }}
                                        variant="body1"
                                    >
                                        District
                                    </Typography>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "flex-start",
                                        }}
                                    >
                                        <div style={{ width: "100%" }}>
                                            <Typography
                                                sx={{
                                                    fontSize: "19px",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                {storeData?.address?.district}
                                            </Typography>
                                        </div>
                                    </div>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box>
                                    <Typography
                                        sx={{
                                            fontSize: "16px",
                                            textAlign: "left",
                                        }}
                                        variant="body1"
                                    >
                                        City
                                    </Typography>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "flex-start",
                                        }}
                                    >
                                        <div style={{ width: "100%" }}>
                                            <Typography
                                                sx={{
                                                    fontSize: "19px",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                {storeData?.address?.city}
                                            </Typography>
                                        </div>
                                    </div>
                                </Box>
                            </Grid>
                            <Grid item xs={3} sx={{ textAlign: "left" }}>
                                <Box>
                                    <Typography
                                        variant="body1"
                                        gutterBottom
                                    >
                                        Zipcode
                                    </Typography>
                                    <Typography variant="body2" fontWeight={500} fontSize={19}>
                                        {storeData?.address?.zipcode}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Box>
                    )}
                </Grid>
            </Box>
        </div>
    )
}


import React, { useEffect, useState } from "react";

import {
  Box,
  Grid,
  TextField,
  Button,
  Checkbox,
  Typography,
} from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import { useNavigate } from "react-router-dom";
import check from "../../assets/images/green tick.png";
import { getURL } from "../../api";
import ApiService from "../../api/services/ApiService";
import { API_ADDRESS } from "../../api/apiConfig";
import { Link, useParams } from "react-router-dom";
import EditIcon from "../../assets/images/PNG/edit.png";

export default function OfferDetails() {
  const { id } = useParams();
  const [viewData, setViewData] = useState<any>({});

  const viewUserfunc = async () => {
    const response = await ApiService.callPostApi(
      getURL(API_ADDRESS.OfferDetails),
      {
        offerId: id,
      }
    );
    console.log(response);
    setViewData(response?.data);
  };

  useEffect(() => {
    viewUserfunc();
  }, []);
  return (
    <div className="overviewClass">
      <div className="header">
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Offer Details
        </Typography>
      </div>
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
          <Grid item xs={12}>
            <Box
              sx={{
                marginBottom: "1.5rem",
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center",
                height: "150px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <Grid item xs={8}>
                <Box
                  style={{
               
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1.5rem",
                      fontWeight: "600",
                      marginBottom: "5px",
                    }}
                  >
                    Offer Created
                  </Typography>
                  <Grid
                    sx={{
                      display: "flex",
                      justifyContent: "start",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        color: colorConfigs.primaryColor.red[600],
                      }}
                    >
                      by Arghyadeep Dey at 02-01-2024
                    </Typography>
                    <img src={check} alt="" style={{ width: "69px" }} />
                  </Grid>
                </Box>
              
              </Grid>
              <Grid item xs={4}>
              <Box sx={{ display: "flex", alignItems: "flex-end",justifyContent:"end",  }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                alignItems: "center",
                color: "white",
                paddingX: "2rem",
                borderRadius: "20px",
                paddingY: "10px",
                background: colorConfigs.primaryColor.red[600],
              }}
            >
               <Link to={`/edit-offer-details/${viewData?._id}`}>
                   
                   Edit Offer &nbsp;
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
          </Box>
              </Grid>
            </Box>

            {/* Second Child Box */}
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                padding: "10px",
                marginBottom: "1.5rem",
                borderRadius: "10px",
              }}
            >
              <Grid item xs={12}>
                <Typography variant="body2" sx={{ margin: "1rem" }}>
                  Detail Information
                </Typography>
                {viewData && (
                  <TableContainer component={Paper}>
                    <Table
                      sx={{
                        border: "none",
                        boxShadow: "0px 4px 6px rgba(5, 5, 5, 0.6)",
                      }}
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell
                            style={{ width: "20%", borderBottom: "none" }}
                          >
                            Offer ID
                          </TableCell>
                          <TableCell
                            style={{ width: "10%", borderBottom: "none" }}
                          >
                            :
                          </TableCell>
                          <TableCell
                            style={{ width: "70%", borderBottom: "none" }}
                          >
                           
                           {viewData._id}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell style={{ borderBottom: "none" }}>
                            Offer Name
                          </TableCell>
                          <TableCell
                            style={{ width: "10%", borderBottom: "none" }}
                          >
                            :
                          </TableCell>
                          <TableCell style={{ borderBottom: "none" }}>
                            {viewData.title}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ borderBottom: "none" }}>
                            Condition
                          </TableCell>
                          <TableCell
                            style={{ width: "10%", borderBottom: "none" }}
                          >
                            :
                          </TableCell>
                          <TableCell style={{ borderBottom: "none" }}>
                            {viewData.condition}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ borderBottom: "none" }}>
                            Note
                          </TableCell>
                          <TableCell
                            style={{ width: "10%", borderBottom: "none" }}
                          >
                            :
                          </TableCell>
                          <TableCell style={{ borderBottom: "none" }}>
                            {viewData.note}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ borderBottom: "none" }}>
                            Created by
                          </TableCell>
                          <TableCell
                            style={{ width: "10%", borderBottom: "none" }}
                          >
                            :
                          </TableCell>
                          <TableCell style={{ borderBottom: "none" }}>
                            <div
                              className="managerBox"
                              //  className={
                              //     viewData.accountType?.role === "employee"
                              //       ? "roleBox"
                              //       : "managerBox"
                              //   }
                              style={{ maxWidth: "160px" }}
                            >
                             Employee
                              {/* {viewData.accountType?.role == null
                               ? "null"
                               : viewData?.accountType?.role} */}
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ borderBottom: "none" }}>
                            Created at
                          </TableCell>
                          <TableCell
                            style={{ width: "10%", borderBottom: "none" }}
                          >
                            :
                          </TableCell>
                          <TableCell
                            style={{ color: "green", fontWeight: "600" }}
                          >
                           {viewData?.createdAt && new Date(viewData.createdAt).toISOString().split("T")[0].split("-").reverse().join("-")}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          ></Box>
         
        </Box>
      </Box>
    </div>
  );
}

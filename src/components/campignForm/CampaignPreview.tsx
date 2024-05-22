import { Box, Button, Checkbox, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./campign.style.css";
import colorConfigs from "../../configs/colorConfigs";
import ApprovalDialogBox from "../common/dialogBox/ApprovalDialogBox";
import { ApiService, getURL } from "../../api";
import { log } from "console";
import { preview } from "jodit/esm/plugins/preview/preview";
import { formatDate } from "../../utils/helperFunctions";
import CustomDialogBox from "../common/dialogBox/CustomDialogBox";
import PreviewDetails from "./PreviewDetails";
import { useNavigate } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import OfferView from "./OfferView";
import { API_ADDRESS } from "../../api/apiConfig";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const CampaignPreview = ({
  setActiveStep,
  activeStep,
  showApprovalButton,
}: any) => {
  const [open, setOpen] = useState(false);
  const [PreviewData, setPreviewData] = useState<any>({});
  const [openDetails, setOpenDetails] = useState<boolean>(false);
  const [openOfferModal, setChooseOfferModal] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState(false);
  const handelCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const handleOpenPreviewDetails = () => {
    setOpenDetails(true);
  };
  const handleClosePreviewDetails = () => {
    setOpenDetails(false);
  };

  const handleOpenChooseOffer = () => {
    setChooseOfferModal(true);
  };

  const handleCloseChooseOffer = () => {
    setChooseOfferModal(false);
  };
  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };
  const handleSubmitPreview = () => {
    handleApproval();
    handleModalClose();
    setActiveStep(activeStep + 1);
  };
  useEffect(() => {
    handleGetCampaignData();
  }, []);

  const handleGetCampaignData = async () => {
    const response = await ApiService.callPostApi(
      // 'http://localhost:9001/api/campaign'
      getURL(API_ADDRESS.getCampaignData),

      { campaignId: localStorage.getItem("campaignId") }
    );
    console.log("calling response", response?.data);
    setPreviewData(response?.data);
  };

  const handleApproval = async () => {
    const response = await ApiService.callPostApi(
      // 'http://localhost:9001/api/campaign/approval'
      getURL(API_ADDRESS.sendApproval),

      { id: localStorage.getItem("campaignId") }
    );
  };

  return (
    <div>
      <Grid container p={3} m={2}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ borderBottom: "none", width: "20%" }}>
                  Campaign ID
                </TableCell>
                <TableCell sx={{ borderBottom: "none" }}>:</TableCell>
                <TableCell sx={{ borderBottom: "none", width: "80%" }}>
                  {PreviewData?._id}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ borderBottom: "none" }}>
                  Campaign Name
                </TableCell>
                <TableCell sx={{ borderBottom: "none" }}>:</TableCell>
                <TableCell sx={{ borderBottom: "none" }}>
                  {PreviewData?.name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ borderBottom: "none" }}>Description</TableCell>
                <TableCell sx={{ borderBottom: "none" }}>:</TableCell>
                <TableCell sx={{ borderBottom: "none" }}>
                  {PreviewData?.description}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ borderBottom: "none" }}>Created By</TableCell>
                <TableCell sx={{ borderBottom: "none" }}>:</TableCell>
                <TableCell sx={{ borderBottom: "none" }}>
                  {" "}
                  Debalina Dhar
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ borderBottom: "none" }}>Start Date</TableCell>
                <TableCell sx={{ borderBottom: "none" }}>:</TableCell>
                <TableCell sx={{ borderBottom: "none" }}>
                  {formatDate(PreviewData?.begin)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ borderBottom: "none" }}> End Date</TableCell>
                <TableCell sx={{ borderBottom: "none" }}>:</TableCell>
                <TableCell sx={{ borderBottom: "none" }}>
                  {" "}
                  {formatDate(PreviewData?.end)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ borderBottom: "none" }}>Product</TableCell>
                <TableCell sx={{ borderBottom: "none" }}>:</TableCell>
                <TableCell sx={{ borderBottom: "none" }}>
                  <span>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        background: "#149CE0",
                        color: "white",
                        paddingX: "1.5rem",
                        borderRadius: "20px",
                        paddingY: "4px",
                        "&:hover": {
                          color: "#149CE0", // Matching the background color on hover
                        },
                      }}
                    >
                      View link &nbsp;{" "}
                      <OpenInNewIcon sx={{ width: 16, height: 16 }} />
                    </Button>
                  </span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ borderBottom: "none" }}>Offer</TableCell>
                <TableCell sx={{ borderBottom: "none" }}>:</TableCell>
                <TableCell sx={{ borderBottom: "none" }}>
                  <span>
                    <Button
                      variant="outlined"
                      sx={{
                        background: "#149CE0",
                        color: "white",
                        paddingX: "1.5rem",
                        borderRadius: "20px",
                        paddingY: "4px",
                        "&:hover": {
                          color: "#149CE0", // Matching the background color on hover
                        },
                      }}
                      size="small"
                      onClick={handleOpenChooseOffer}
                    >
                      View link &nbsp;{" "}
                      <OpenInNewIcon sx={{ width: 16, height: 16 }} />
                    </Button>
                  </span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ borderBottom: "none" }}>
                  Campaign Schedule & TA
                </TableCell>
                <TableCell sx={{ borderBottom: "none" }}>:</TableCell>
                <TableCell sx={{ borderBottom: "none" }}>
                  {" "}
                  <span>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        background: "#00B65E",
                        color: "white",
                        paddingX: "1.5rem",
                        borderRadius: "20px",
                        paddingY: "4px",
                        "&:hover": {
                          color: "#00B65E", // Matching the background color on hover
                        },
                      }}
                      onClick={handleOpenPreviewDetails}
                    >
                      View link &nbsp;{" "}
                      <OpenInNewIcon sx={{ width: 16, height: 16 }} />
                    </Button>
                  </span>
                </TableCell>
              </TableRow>
              {/* Repeat for other fields */}
            </TableHead>
            <TableBody>
              {/* You can add dynamic data in the TableBody if needed */}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Grid for label names */}
        {/* <Grid item xs={2.2} sx={{ fontWeight: "500" }}>
          <Typography sx={{ marginBottom: "12px", fontWeight: "500" }}>
            Campaign ID
          </Typography>
          <Typography sx={{ marginBottom: "12px", fontWeight: "500" }}>
            Campaign Name
          </Typography>
          <Typography sx={{ marginBottom: "12px", fontWeight: "500" }}>
            Description
          </Typography>
          <Typography sx={{ marginBottom: "12px", fontWeight: "500" }}>
            Created By
          </Typography>
          <Typography sx={{ marginBottom: "12px", fontWeight: "500" }}>
            Start Date
          </Typography>
          <Typography sx={{ marginBottom: "12px", fontWeight: "500" }}>
            End Date
          </Typography>
          <Typography sx={{ marginBottom: "12px",  }}>
            Product
          </Typography>
          <Typography sx={{ marginBottom: "12px",  }}>
            Offer
          </Typography>
          <Typography sx={{ marginBottom: "12px", fontWeight: "500" }}>
            Campaign Schedule & TA
          </Typography>
        </Grid> */}

        {/* Grid for dynamic values */}
        {/* <Grid item xs={2}>
          <Typography sx={{ marginBottom: "10px", fontWeight: "500" }}>
            {PreviewData?._id}
          </Typography>
          <Typography sx={{ marginBottom: "10px", fontWeight: "500" }}>
            {PreviewData?.name}
          </Typography>
          <Typography sx={{ marginBottom: "10px", fontWeight: "500" }}>
            {PreviewData?.description}
          </Typography>
          <Typography sx={{ marginBottom: "10px", fontWeight: "500" }}>
            Debalina Dhar
          </Typography>
          <Typography sx={{ marginBottom: "10px", fontWeight: "500" }}>
            {formatDate(PreviewData?.begin)}
          </Typography>
          <Typography sx={{ marginBottom: "10px", fontWeight: "500" }}>
             {formatDate(PreviewData?.end)}
          </Typography>
          <Typography sx={{ marginBottom: "10px", fontWeight: "500" }}>
            <span>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  background: "#149CE0",
                  color: "white",
                  paddingX: "1.5rem",
                  borderRadius: "20px",
                  paddingY: "4px",
                  "&:hover": {
                    color: "#149CE0", // Matching the background color on hover
                  }
                }}
              >
                View link &nbsp; <OpenInNewIcon sx={{ width: 16, height: 16 }} />
              </Button>
            </span>
          </Typography>
          <Typography sx={{ marginBottom: "10px" }}>
            <span>
              <Button
                variant="outlined"
                sx={{
                  background: "#149CE0",
                  color: "white",
                  paddingX: "1.5rem",
                  borderRadius: "20px",
                  paddingY: "4px",
                  "&:hover": {
                    color: "#149CE0", // Matching the background color on hover
                  }
                }}
                size="small"
                onClick={handleOpenChooseOffer}
              >
                View link &nbsp; <OpenInNewIcon sx={{ width: 16, height: 16 }} />
              </Button>
            </span>
          </Typography>
          <Typography sx={{ marginBottom: "10px" }}>
            <span>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  background: "#00B65E",
                  color: "white",
                  paddingX: "1.5rem",
                  borderRadius: "20px",
                  paddingY: "4px",
                  "&:hover": {
                    color: "#00B65E", // Matching the background color on hover
                  }
                }}
                onClick={handleOpenPreviewDetails}
              >
                View link  &nbsp; <OpenInNewIcon sx={{ width: 16, height: 16 }} />
              </Button>
            </span>
          </Typography>
        </Grid> */}
      </Grid>

      <Box
        p={1}
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
        >
          <Checkbox checked={isChecked} onChange={handelCheckbox} />
          <Typography sx={{ fontWeight: "500" }}>
            I declared that the following campaign is configured correctly and
            ready to send for approval
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
            // type='submit'
            onClick={handleModalOpen}
            variant="contained"
            disabled={!isChecked}
            sx={{
              alignItems: "center",
              color: "white",
              bgcolor: colorConfigs.primaryColor.red[500],
              "&:hover": {
                bgcolor: colorConfigs.primaryColor.red[500],
              },
              display: "flex",
              justifyContent: "flex-end",
              paddingX: "2rem",
              borderRadius: "20px",
              paddingY: "8px",
              background: colorConfigs.primaryColor.red[500],
            }}
          >
            Send for Approval
          </Button>
        </Box>
      </Box>
      <ApprovalDialogBox
        open={open}
        handleModalClose={handleModalClose}
        customButton={"Submit"}
        handleSubmit={handleSubmitPreview}
      />

      <CustomDialogBox
        open={openOfferModal}
        handleClose={handleCloseChooseOffer}
        height="400px"
        width="sm"
      >
        <OfferView />
      </CustomDialogBox>

      <CustomDialogBox
        open={openDetails}
        handleClose={handleClosePreviewDetails}
      >
        <PreviewDetails />
      </CustomDialogBox>
    </div>
  );
};

export default CampaignPreview;

import { Box, Button, Divider, Grid, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DoneIcon from '@mui/icons-material/Done';
import ReplayIcon from '@mui/icons-material/Replay';
import ClearIcon from '@mui/icons-material/Clear';
import colorConfigs from '../../configs/colorConfigs';
import CampaignPreview from '../campignForm/CampaignPreview';
import { formatDate } from '../../utils/helperFunctions';
import { ApiService, getURL } from '../../api';
import CustomDialogBox from '../common/dialogBox/CustomDialogBox';
import PreviewDetails from '../campignForm/PreviewDetails';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { API_ADDRESS } from '../../api/apiConfig';

const CampaignViewDetails = () => {
    const navigate = useNavigate();
    const [openDetails, setOpenDetails] = useState<boolean>(false);
    const [PreviewData, setPreviewData] = useState<any>({});
    const [searchParams] = useSearchParams();
    const status = searchParams.get('status');
    const id = searchParams.get('campaignId');
    // const id = searchParams.get('id');
    const [campaignStatus, setCampaignStatus] = useState<any>(status);
    const iconStyle = {
        fontSize: '50px',
        color: 'white',
        borderRadius: '50%',
        backgroundColor: '#00B65E',
        padding: '0.5rem'


    };

    const clearIconStyle = {
        fontSize: '50px',
        color: 'white',
        borderRadius: '50%',
        backgroundColor: '#FF0000',
        padding: '0.5rem'


    }

    const pendingIconStyle = {
        fontSize: '50px',
        color: 'white',
        borderRadius: '50%',
        backgroundColor: '#E06336',
        padding: '0.5rem'
    }
    const handleOpenPreviewDetails = () => {
        setOpenDetails(true);
    }
    const handleClosePreviewDetails = () => {
        setOpenDetails(false);
    }

    useEffect(() => {
        handleGetCampaignData();

    }, [])

    const handleGetCampaignData = async () => {
        const response = await ApiService.callPostApi(
          // 'http://localhost:9001/api/campaign',
          getURL(API_ADDRESS.addCampaignData),

            { campaignId: localStorage.getItem("campaignId") }
        )
        console.log("calling response", response?.data);
        setPreviewData(response?.data)


    }

    const handleDecline = async () => {
        const response = ApiService.callPostApi(
            // 'http://localhost:9001/api/campaign/status',
            getURL(API_ADDRESS.getCampaignStatus),
            {
                campaignId: id,
                "status": "decline"
            }
        )
        response.then((res) =>{
           navigate('/campaign/campaign-overview')
        })
    }


    const handleApprove = async () => {
        const response = ApiService.callPostApi(
            // 'http://localhost:9001/api/campaign/status',
            getURL(API_ADDRESS.getCampaignStatus),
            {
                campaignId: id,
                "status": "active"
            }
        )
        response.then((res) =>{
           navigate('/campaign/campaign-overview')
        })
    }
    return (
        <Box m={2} pt={1}>
            <Paper elevation={3} sx={{ height: 'auto', width: '100%' }} >
                <Grid container p={3} spacing={2}>

                    <Grid item xs={12}>
                        <Box >
                            <Paper elevation={3} sx={{
                                display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
                                padding: '25px', 
                                
                                bgcolor:  campaignStatus === 'active'
                                ? '#E6ECE1'
                                : campaignStatus === 'decline'
                                ? '#F4CFD2'
                                : '#F3E7E2'
                            }}>
                                {
                                    campaignStatus === 'active' ? <>
                                        <DoneIcon style={iconStyle} />
                                        <div style={{ marginLeft: '1rem' }}>
                                            <Typography>Requested Approved</Typography>
                                            <Typography>by debalina dhar</Typography>
                                        </div>
                                    </> : campaignStatus === 'decline' ? <>
                                        <ClearIcon style={clearIconStyle} />
                                        <div style={{ marginLeft: '1rem' }}>
                                            <Typography>Requested Declined</Typography>
                                            <Typography>by debalina dhar</Typography>

                                        </div></> : <>
                                        <ReplayIcon style={pendingIconStyle} />
                                        <div style={{ marginLeft: '1rem' }}>
                                            <Typography>Request Pending</Typography>
                                            <Typography>by debalina dhar</Typography>

                                        </div>
                                    </>
                                }









                            </Paper>

                        </Box>
                    </Grid>
                    {/* Box 2 */}
                    <Grid item xs={12}>
                        <Box sx={{}}>
                            <Paper elevation={3} sx={{ padding: '25px' }}>
                                <Grid container>
                                    <Grid item xs={4}>
                                        <Typography sx={{ color: colorConfigs.primaryColor.red[600], fontSize: '16px', ml: '50px' }} variant='body1'
                                            fontWeight='200' >Requested by</Typography>
                                        <div style={{ display: "flex", alignItems: "center", }} >
                                            <img src='' alt='DD' style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                                            <div>
                                                <Typography sx={{ fontSize: '14px' }}  >Debalina Dhar</Typography>
                                                <Typography variant="body2" sx={{ color: colorConfigs.primaryColor.red[600] }}>example@email.com</Typography>

                                            </div>
                                        </div>

                                    </Grid>
                                    <Divider orientation="horizontal" sx={{ height: '100%', backgroundColor: 'grey' }} />
                                    <Grid item xs={4}>
                                        <Typography>
                                            Requested Submitted
                                        </Typography>
                                        <Typography>
                                            02-01-2024
                                        </Typography>


                                    </Grid>
                                    <Divider />
                                    <Grid item xs={4}>
                                        <Typography sx={{ color: colorConfigs.primaryColor.red[600], fontSize: '16px', ml: '50px' }} variant='body1'
                                            fontWeight='200' >Needs Approval from</Typography>
                                        <div style={{ display: "flex", alignItems: "center", }} >
                                            <img src='' alt='DD' style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                                            <div>
                                                <Typography sx={{ fontSize: '14px' }}  >Debalina Dhar</Typography>
                                                <Typography variant="body2" sx={{ color: colorConfigs.primaryColor.red[600] }}>example@email.com</Typography>

                                            </div>
                                        </div>

                                    </Grid>




                                </Grid>

                            </Paper>

                        </Box>
                    </Grid>
                    {/* Box 3 */}

                    <Grid item xs={12}>
                        <Typography>Detail Information</Typography>
                        <Box sx={{}}>
                            <Paper elevation={3} sx={{ padding: '25px' }}>
                                <Grid container p={3} m={2} spacing={1} >
                                    <Grid item xs={3} >
                                        <Typography sx={{ marginBottom: '10px' }}>Campaign ID</Typography>
                                        <Typography sx={{ marginBottom: '10px' }}>Campaign Name</Typography>
                                        <Typography sx={{ marginBottom: '10px' }}>Description</Typography>
                                        <Typography sx={{ marginBottom: '10px' }}>Created By</Typography>
                                        <Typography sx={{ marginBottom: '10px' }}>Start Date</Typography>
                                        <Typography sx={{ marginBottom: '10px' }}>End Date</Typography>
                                        <Typography sx={{ marginBottom: '10px' }}>Status</Typography>

                                        <Typography sx={{ marginBottom: '10px' }}>Product</Typography>
                                        <Typography sx={{ marginBottom: '10px' }}>Offer</Typography>
                                        <Typography sx={{ marginBottom: '10px' }}>Campaign Schedule & TA</Typography>
                                    </Grid>
                                    <Grid item xs={9} >
                                        <Typography sx={{ marginBottom: '10px' }}>: {PreviewData?._id}</Typography>
                                        <Typography sx={{ marginBottom: '10px' }}>: {PreviewData?.name}</Typography>
                                        <Typography sx={{ marginBottom: '10px' }}>: {PreviewData?.description}</Typography>
                                        <Typography sx={{ marginBottom: '10px' }}>: Debalina Dhar</Typography>
                                        <Typography sx={{ marginBottom: '10px' }}>: {formatDate(PreviewData?.updatedAt)} </Typography>
                                        <Typography sx={{ marginBottom: '10px' }}>: 01-04-2026</Typography>
                                        <Typography sx={{ marginBottom: '10px',
                                        color:  campaignStatus === 'active'
                                        ? '#00B65E'
                                        : campaignStatus === 'decline'
                                        ? '#FF0000'
                                        : '#E06336',
                                        fontWeight:'bold'
                                    
                                    }}>: {PreviewData?.status}</Typography>
                                        <Typography sx={{ marginBottom: '10px' }}>: <span>
                                            <Button variant='outlined' size='small'>
                                            link

                                            </Button>
                                        </span>
                                        </Typography>

                                        <Typography sx={{ marginBottom: '10px' }}>: Diwali offer by 5%</Typography>
                                        <Typography sx={{ marginBottom: '10px' }}>: <span>
                                            <Button variant='outlined' size='small'
                                                onClick={handleOpenPreviewDetails}

                                            >view</Button>

                                        </span></Typography>
                                    </Grid>
                                </Grid>

                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
                {
                    campaignStatus === 'pending' &&
                <div style={{ display: 'flex', justifyContent: 'center', margin: '2px', padding: '10px' }}> 
                    <div style={{ marginRight: '10px' }}>
                        <Button variant='outlined' onClick={handleApprove}>
                            Approve
                        </Button>

                    </div>
                    <div style={{ marginLeft: '10px' }}>
                        <Button variant='outlined'
                        onClick={handleDecline}
                        >
                            Decline
                        </Button>

                    </div>


                </div>
                }


            </Paper>
            <CustomDialogBox open={openDetails}
                handleClose={handleClosePreviewDetails}>
                <PreviewDetails />

            </CustomDialogBox>


        </Box>

    )
}

export default CampaignViewDetails

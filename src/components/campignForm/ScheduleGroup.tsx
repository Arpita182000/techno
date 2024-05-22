import { Box, Card, CardContent, CardHeader, Switch, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { ApiService, getURL } from '../../api';

import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import SmsIcon from '@mui/icons-material/Sms';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import CustomDialogBox from '../common/dialogBox/CustomDialogBox';
import ConfigCampaignTable from './ConfigCampaignTable';
import ScheduleCampign from './ScheduleCampign';
import { formatDate } from '../../utils/helperFunctions';
import { API_ADDRESS } from '../../api/apiConfig';


const ScheduleGroup = ({ scheduleData, setScheduleData }: any) => {

  class Mode {
    email: boolean;
    sms: boolean;
    whatsapp: boolean;


    constructor() {
      this.email = false;
      this.sms = false;
      this.whatsapp = false;
    }

    getModeStates() {
      return {
        "mode": {
          "email": this.email,
          "whatsapp": this.whatsapp,
          "sms": this.sms
        }
      }
    }
  }

  const [openConfig, setOpenConfig] = useState(false);
  const [openCampaign, setOpenCampaign] = useState(false);
  const [data, setData] = useState<any>({
    "limit": 5,
    "skip": 0
  })
  const [scheduleGroupData, setscheduleGroupData] = useState<any>([]);
  const [toggle, setToggle] = useState<any>(false)
  const [mode, setMode] = useState<Mode>(new Mode());
  const [groupId, setGroupId] = useState<any>("");
  const [enableSwitchButton, setEnableSwitchButton] = useState<any>(false)



  useEffect(() => {
    handleFetchGroupData();
  }, [toggle])

  const submitScheduleCampaign = async () => {
    const response = ApiService.callPostApi(

      // 'http://localhost:9001/api/campaign/schedule'
      getURL(API_ADDRESS.scheduleCampaign)
      ,
      // {...scheduleData, id: localStorage.getItem("campaignId")}
      { campaignId: localStorage.getItem("campaignId"), groupId: groupId, schedule: { ...scheduleData } }
    );
    response.then((res) => {
      setEnableSwitchButton(true);
    setToggle(!toggle)
    })
    
    
  }

  const handleConfig = () => {
    setOpenConfig(false);
    setOpenCampaign(true);
  }

  const handleCampaign = () => {
    submitScheduleCampaign();
    setOpenCampaign(false);
  }

  const handleGroupSwitch = async (id: string, itemType: string) => {
    // console.log("calling groupId",id);
    const getMode = scheduleGroupData.find((groupData: any) => groupData._id === id);
    const mode1 = new Mode();
    const response = await ApiService.callPostApi(
      // 'http://localhost:9001/api/campaign/schedule/mode'
      getURL(API_ADDRESS.toggleMode)
      , {
        campaignId: localStorage.getItem("campaignId"),
        groupId: id,
        mode: {
          ...getMode.mode,
          [itemType]: !getMode.mode[itemType]
        }
      })
      console.log("calling  respo", response, scheduleGroupData);
      const updatedScheduleGroupData = scheduleGroupData.map((schedule: any) => schedule._id === id ? response?.data : schedule);
      setscheduleGroupData(updatedScheduleGroupData);//updating the 
    // setMode(response?.data?.mode)
 


  }






  const handleFetchGroupData = async () => {
    try {
      const result = await ApiService.callPostApi(
        // 'http://localhost:9001/api/campaign/group'
        getURL(API_ADDRESS.groupCampaign)
        , {
          campaignId: localStorage.getItem("campaignId"),
          ...data
        }
      );


      //   setTotal(result?.data?.total);
      setscheduleGroupData(result?.data?.groups)
      setMode(result?.data?.groups[0]?.mode ?? new Mode());
      const ids = result?.data?.groups.map((group: any) => group._id);

      // Convert the array to a JSON string
      const idsJson = JSON.stringify(ids);

      // Store the JSON string in local storage
      localStorage.setItem('groupIds', idsJson);


    } catch (error: any) {
      console.error('Error fetching data:', error.message);
    }
  };
  const handleConfigClose = () => {
    setOpenConfig(false);

  }
  const handleCampaignClose = () => {
    setOpenCampaign(false);

  }
  const handleOpenConfig = (id: string) => {
    setOpenConfig(true)
    setGroupId(id);
  }


  const handleAddClick = async () => {
    try {
      // setOpen(true);
      const result = await ApiService.callPostApi(
        // 'http://localhost:9001/api/campaign/group/add'
        getURL(API_ADDRESS.addGroupCampaign)
        , {
          campaignId: localStorage.getItem("campaignId"),



        }


      );

      console.log("calling api response", result, scheduleGroupData);
      setscheduleGroupData([...scheduleGroupData, result?.data])

      //   setTotal(result?.data?.total);
      // setscheduleGroupData(result?.data?.groups)


    } catch (error: any) {
      console.error('Error fetching data:', error.message);
    }

  }




  const handleDeleteItem = async (id: string) => {
    console.log("viewing the id", id);

    try {
      const response = ApiService.callPostApi(
        // http://localhost:9001/api/campaign/group/delete
        getURL(API_ADDRESS.deleteGroupCampaign)
        , {
          groupId: id

        });
      response.then((res) => {
        setToggle(!toggle)

      })

    } catch (error: any) {
      console.error('Error deleting item:', error.message);
    }
  };

  const cartItems = {
    icon: WhatsAppIcon,
    title: 'WhatsApp',
    Component: Switch
  }


  return (
    <>
      <Box mt={1} p={2} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
        {/* <div style={{ position: 'relative' }}> */}

        {scheduleGroupData?.map((item: any, index: any) =>
          <Card sx={{ width: '250px', height: 'auto', margin: '10px' }} key={index} >
            <CardHeader sx={{ height: '10px', backgroundColor: 'red', color: 'white' }}
              title={<Typography gutterBottom variant="body1" component="h2">
                card title
              </Typography>}
            />
            <CardContent>
              {item?.schedule?.startDate ? 
              (<Typography variant="body2" sx={{ fontSize: '12px' }}>
                Start Date: {formatDate(item?.schedule?.startDate)}
              </Typography>)
              : (<Typography variant="body2" sx={{ fontSize: '12px' }}>
              Start Date: ''
            </Typography>)}
              {item?.schedule?.endDate ? 
              (<Typography variant="body2" sx={{ fontSize: '12px' }}>
                End Date: {formatDate(item?.schedule?.endDate)}
              </Typography>)
              : (<Typography variant="body2" sx={{ fontSize: '12px' }}>
              End Date: ''
            </Typography>)
               }


            </CardContent>
            <CardContent style={{ display: 'flex', flexDirection: 'column', columnGap: '1px', }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <WhatsAppIcon fontSize={'small'} sx={{ marginRight: '5px' }} />
                  <Typography variant="body2">WhatsApp</Typography>
                </div>
                <Switch size='small'
                disabled={!enableSwitchButton}
                  onClick={() => handleGroupSwitch(item?._id, "whatsapp")}
                  // defaultChecked={mode.whatsapp} 
                  checked={item?.mode?.whatsapp ?? mode.whatsapp}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <EmailIcon fontSize={'small'} sx={{ marginRight: '5px' }} />
                  <Typography variant="body2">Email</Typography>
                </div>
                <Switch size='small'
                disabled={!enableSwitchButton}
                  onClick={() => handleGroupSwitch(item?._id, "email")}
                  //  defaultChecked={mode.email} 
                  checked={item?.mode?.email ?? mode.email}

                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <SmsIcon fontSize={'small'} sx={{ marginRight: '5px' }} />
                  <Typography variant="body2">SMS</Typography>
                </div>
                <Switch size='small'
                  // defaultChecked={mode.sms} 
                  checked={item?.mode?.sms ?? mode.sms}
                  disabled={!enableSwitchButton}

                  onClick={() => handleGroupSwitch(item?._id, "sms")}
                />
              </div>
            </CardContent>
            <div style={{ margin: '5px', display: 'flex', justifyContent: 'flex-end' }}>
              <BorderColorOutlinedIcon fontSize='small' style={{ marginRight: '5px', }}
                onClick={() =>
                  handleOpenConfig(item._id)
                  // setOpenConfig(true)
                }
              />
              <DeleteOutlineIcon fontSize='small'
                onClick={() => handleDeleteItem(item._id)}
              />
            </div>
          </Card>
        )}
        <AddIcon
          onClick={handleAddClick}
          style={{
            margin: '10px',

            // marginRight: '10px' ,
            cursor: 'pointer'
          }} fontSize="large" />
        {/* </div> */}

      </Box>
      <CustomDialogBox
        open={openConfig}
        handleClose={handleConfigClose}
        // title={'Test'}
        customButton={'Next'}
        handleCustomClick={handleConfig}
      >
        <ConfigCampaignTable groupId={groupId} />
      </CustomDialogBox>
      <CustomDialogBox
        open={openCampaign}
        handleClose={handleCampaignClose}
        // title={'Test'}
        customButton={'Next'}
        handleCustomClick={handleCampaign}
      >
        <ScheduleCampign groupId={groupId} setScheduleData={setScheduleData} scheduleData={scheduleData} />
      </CustomDialogBox>
    </>
  )
}

export default ScheduleGroup;
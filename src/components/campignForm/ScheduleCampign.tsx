import { Box, FormControlLabel, Grid, Paper, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


import React, { useEffect, useState } from 'react'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import WeekDetails from './WeekDetails';
import { Check } from '@mui/icons-material';
import { ApiService, getURL } from '../../api';
import { API_ADDRESS } from '../../api/apiConfig';
 

const ScheduleCampign = ({ setScheduleData, scheduleData, groupId }: any) => {
  const [Week, setWeek] = useState([]);
  const [selectedWeekCount, setSelectedWeekCount] = useState(0);
  console.log("groupId", groupId);


  const [stopDay, setStopDay] = useState('');
  const [repeat, setRepeat] = useState({
    hour: '',
    minute: '',
  });
  const [delay, setDelay] = useState({
    hour: '',
    minute: '',
  });
  // const [schedule,setSchedule] = useState({
  //   startDate: null,
  // 	endDate:null,
  // 	daysAfter: "", 
  //   weeksAfter: {
  // 		days: Week
  // 	},
  //   repeat: {
  //     startTime: "",
  //     delay:'',
  //     count:''
  //   }
  // });



  useEffect(() => {
    fetchScheduleData();
  }, [])


  const fetchScheduleData = async () => {
    try {
      const result = await ApiService.callPostApi(
        getURL(API_ADDRESS.getScheduleCampaign)

        // 'http://localhost:9001/api/campaign/schedule/get'
        , {
          campaignId: localStorage.getItem("campaignId"),
          groupId: groupId

        }

      );
      console.log("response api", result);


    } catch (error: any) {
      console.error('Error fetching data:', error.message);
    }
  };


  const [recurrence, setRecurrence] = useState('daily');
  const [Check, setCheck] = useState(false);
  const [Check1, setCheck1] = useState(false);
  console.log(...Week);



  const handleRecurrenceChange = (event: any) => {
    setRecurrence(event.target.value);
  };
  const handleDaysChange = (e: any) => {
    // setDays(event.target.value);
    // setSchedule({...schedule,daysAfter:e.target.value})
    setScheduleData({ ...scheduleData, daysAfter: e.target.value })
  };

  const handleWeekChange = (e: any) => {
    setScheduleData({
      ...scheduleData,
      weeksAfter: {
        ...scheduleData.weeksAfter,
        count: e.target.value
      }
    });
  }



  const handleStartChange = (field: any, value: any) => {
    setRepeat(prevSchedule => ({
      ...prevSchedule,
      [field]: value
    }));
  };

  const handleDelayChange = (field: any, value: any) => {
    setDelay(prevSchedule => ({
      ...prevSchedule,
      [field]: value
    }));
  };
  useEffect(() => setScheduleData({ ...scheduleData, repeat: { ...scheduleData.repeat, count: stopDay } }), [stopDay])



  useEffect(() => setScheduleData({ ...scheduleData, repeat: { ...scheduleData.repeat, startTime: `${repeat.hour}:${repeat.minute}` } }), [repeat])


  useEffect(() => setScheduleData({ ...scheduleData, repeat: { ...scheduleData.repeat, delay: `${delay.hour}:${delay.minute}` } }), [delay])
  // useEffect(() => setScheduleData({...scheduleData, weeksAfter: {...scheduleData.weeksAfter, count:selectedCount}}), [selectedCount])

  useEffect(() => setScheduleData({ ...scheduleData, weeksAfter: { ...scheduleData.weeksAfter, days: Week } }), [Week])

  // useEffect(() => setScheduleData({...scheduleData, weeksAfter: {...scheduleData.weeksAfter, days: Week}}), [schedule, Week]);

  const handleInputLimit = (min: any, max: any, current: any) => {
    current = parseInt(current);
    if(current > max) return max;
    if(current < min) return min
    return current;
  }

  return (
    <Box p={1} mr={3} ml={3}>
      <Paper elevation={3} sx={{ width: '100%', height: '100vh' }}>
        <Typography sx={{ fontWeight: 'bold', padding: '0.5rem' }}>
          Campaign Schedule
        </Typography>
        <hr className="horizontal-line" />
        <Box p={5} m={3}>
          <Grid container mb={3} >
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Start Date</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs} >

                <DesktopDatePicker sx={{ width: '50%', height: '50px' }}
                  onChange={(date: any) => {
                    let dateSelected = new Date(date).toLocaleDateString();
                    setScheduleData({ ...scheduleData, startDate: dateSelected });
                  }}
                />

              </LocalizationProvider>

            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>End Date</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>

                <DesktopDatePicker sx={{ width: '50%', height: '50px' }}
                  onChange={(date: any) => {
                    let dateSelected = new Date(date).toLocaleDateString();
                    setScheduleData({ ...scheduleData, endDate: dateSelected })
                  }}
                />

              </LocalizationProvider>

            </Grid>
          </Grid>
          <div style={{ padding: '1rem' }}>

            <div style={{ display: 'flex', alignItems: 'center', padding: '1rem' }}>
              <RadioGroup row value={recurrence} onChange={handleRecurrenceChange}>
                <FormControlLabel value="daily" control={<Radio />} label={<Typography variant="body1" fontWeight="bold">Recur every :</Typography>} />
              </RadioGroup>
              <div style={{ display: 'flex', alignItems: 'center', marginLeft: '5px' }}>
                <TextField
                  size='small'
                  type="number"
                  value={scheduleData.daysAfter < 10 ? `0${scheduleData.daysAfter}` : scheduleData.daysAfter}
                  onChange={handleDaysChange}
                  inputProps={{ min: 0 }}
                  style={{ width: '70px' }}
                />
                <Typography sx={{ marginLeft: '5px', fontWeight: 'bold' }} variant="body1">days</Typography>
              </div>
            </div>


            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                <Radio
                  value="weekly"
                  checked={recurrence === 'weekly'}
                  onChange={handleRecurrenceChange}
                />
                <Typography variant="body1" fontWeight="bold">Recur every : </Typography>
              </div>
              <TextField
                size='small'
                type="number"
                value={scheduleData.weeksAfter.count < 10 ? `0${scheduleData.weeksAfter.count}` : scheduleData.weeksAfter.count}
                inputProps={{ min: 0 }}
                onChange={handleWeekChange}
                style={{ width: '70px', marginLeft: '10px', }}
              />
              <Typography variant="body1" fontWeight="bold" style={{ marginLeft: '5px' }}>weeks on</Typography>

            </div>
            <div style={{ paddingTop: '1rem', marginLeft: '10rem', }}>
              <WeekDetails Week={Week} setWeek={setWeek} />
            </div>
          </div>
          <div style={{ padding: '1rem', display: "flex", justifyContent: "start", gap: "10px", alignItems: "center" }}>

            <label><b>Trigger on scheduled days at:</b>

              <label>{'  '}</label>
              <input
                type="number"
                min={0}
                max={23}
                value={repeat.hour}
                onChange={(e) => {
                  let selectedHours = handleInputLimit(0, 23, e.target.value)
                  handleStartChange('hour', selectedHours)
                }}
                style={{ width: '70px', marginRight: '5px', padding: '0.5rem', borderRadius: '5px', border: ' 1px solid grey' }}
              />


              <label>{'  '}:{'  '}</label>
              <input
                type="number"
                min={0}
                max={59}
                value={repeat.minute}
                onChange={(e) => {
                  let selectedMinutes = handleInputLimit(0, 59, e.target.value)
                  handleStartChange('minute', selectedMinutes)
                }}
                style={{ width: '70px', padding: '0.5rem', borderRadius: '5px', border: ' 1px solid grey' }}
              />
            </label>

          </div>


          <div style={{ padding: '0.5rem', display: "flex", justifyContent: "start", gap: "10px", alignItems: "center" }}>
            <input
              type="checkbox"
              checked={Check}
              onChange={(e: any) => {
                setCheck(e.target.checked)
              }}
            />
            <label>Repeat every hour and minute:</label>
            <input
              type="number"
              min={0}
              max={23}
              value={delay.hour}
              onChange={(e) => {
                let selectedHours = handleInputLimit(0, 23, e.target.value)
                handleDelayChange('hour', selectedHours)
              }}
              style={{ width: '70px', padding: '0.5rem', borderRadius: '5px', border: ' 1px solid grey' }}
            />
            <label>HRS</label>
            <input
              type="number"
              min={0}
              max={59}
              value={delay.minute}
              onChange={(e) => {
                let selectedMinutes = handleInputLimit(0, 59, e.target.value)
                handleDelayChange('minute', selectedMinutes)
              }}
              style={{ width: '70px', padding: '0.5rem', borderRadius: '5px', border: ' 1px solid grey' }}
            />
            <label>MIN</label>

          </div>
          <div style={{ padding: '0.5rem', display: "flex", justifyContent: "start", gap: "10px", alignItems: "center" }}>
            <input
              type="checkbox"
              checked={Check1}
              onChange={(e: any) => {
                setCheck1(e.target.checked)
              }}
            // style={{width: '70px', marginRight: '5px', padding:'0.5rem'}}  
            />
            <label>Trigger limit :<span></span></label>
            <input
              type="number"
              min={1}
              max={50}
              value={stopDay}
              onChange={(e) => {
                let selectedLimit = handleInputLimit(1, 50, e.target.value);
                setStopDay(selectedLimit)
              }}
              style={{ width: '70px', padding: '0.5rem', borderRadius: '5px', border: ' 1px solid grey' }}
            />
            <label>  times a day</label>

          </div>
        </Box>
      </Paper>

    </Box>
  )
}


export default ScheduleCampign


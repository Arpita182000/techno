import { Chip } from '@mui/material';
import React from 'react'
import colorConfigs from '../../configs/colorConfigs';

const  WeekDetails = ( {Week,setWeek,selectedCount,setSelectedCount}:any) => {
    const dataArr = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
    const handleChangeWeek = (item:any) =>{
        const index = Week.indexOf(item);
  
  if (index === -1) {
    // Item is not in the array, so add it
    setWeek([...Week, item]);
    // setSelectedCount(selectedCount + 1);
  } else {
    // Item is in the array, so remove it
    setWeek( Week.filter((val:any, i:any) => i !== index));
    // setSelectedCount(selectedCount - 1);
  }

    }
  return (
    <div>
    {dataArr.map((item, index) => (
        <Chip key={index} label={item} size="small" style={{ marginLeft: '10px', marginBottom: '5px',padding:"10px",fontWeight:"500" }} 
         onClick={() => handleChangeWeek(item)}
         sx={{ bgcolor: Week.includes(item) ? colorConfigs.primaryColor.red[600] : '', color:Week.includes(item) ?'white':'' }}
        
        />
      ))}
      
    </div>
  )
}

export default WeekDetails

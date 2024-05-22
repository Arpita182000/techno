import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import EnhancedTable from '../../components/common/table/Table';
import { ApiService, getURL } from '../../api';
import CustomTabs, { TabData } from '../../components/common/tabs/Tab';
import { useNavigate } from 'react-router-dom';
import { API_ADDRESS } from '../../api/apiConfig';
type Props = {};
const CampignOverviewPage = (props: Props) => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<any>([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [value, setValue] = useState<number>(0);
  const [searchOffer, setSearchOffer] = useState<any>({
    "skip": 0,
    "status":'',
    "limit": 5,
    "name": "",
    "startDate": "",
    "endDate": "",
    "configured": true,
    "sortquery": {
      "createdAt": -1
    }
  })




  const headCells: any = [
    {
      id: '_id',
      label: 'Campign Id',
    },
    {
      id: 'name',
      label: 'Campign-Name',
    },
    {
      id: 'createdAt',
      label: 'Start Date',
      type: "date"
    },
    {
      id:'status',
      label:'Status'
    }
  ];



  const handleViewDetails = (row: any) => {
    console.log("calling row", row.status);
    console.log("calling details");
    navigate(`/campaign/view-details?status=${row.status}&campaignId=${row._id}`);
  }
  useEffect(() => {
    fetchCampaignOverviewData();
  }, [page, rowsPerPage, value])

  const handleTabSwitch = (value: number) => {
    setValue(value);
    setRowsPerPage(5);
    setPage(0);
  }

  const fetchCampaignOverviewData = async () => {

    try {
      // const result = await ApiService.callPostApi('http://localhost:9001/api/campaign/search', {
      const result = await ApiService.callPostApi(getURL(API_ADDRESS.searchCampaign), {
        // campaignId: localStorage.getItem("campaignId"),
        ...searchOffer,
        configured: value == 0 ? true : false,
        // status: value == 0 ? 'not configured' : {'$ne':'not configured'},
        limit: rowsPerPage,
        skip: page * rowsPerPage
      }

      );
      console.log("response api", result);
      setTableData(result?.data?.campaigns);
      setTotal(result?.data?.total);


    } catch (error: any) {
      console.error('Error fetching data:', error.message);
    }
  };

  function createFilterCampaignData(id: string, value: string) {
    setSearchOffer({ ...searchOffer, [id]: value })
  }

  const tabsData: TabData[] = [
    {
      label: 'Sent for Approval', content: <EnhancedTable headCells={headCells} enableEdit={true} rows={tableData}
    rowsPerPage={rowsPerPage}
    setRowsPerPage={setRowsPerPage}
    pageTotal={total}
    setPage={setPage} page={page}
    createFilterConfig={createFilterCampaignData}
    handleViewDetails={handleViewDetails}
  />
    },
    {  
      label: 'Draft', content: <EnhancedTable headCells={headCells} enableEdit={true} rows={tableData}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        pageTotal={total}
        setPage={setPage} page={page}
        createFilterConfig={createFilterCampaignData}
      />
    },
  ];


  return (
    <div style={{margin:"20px"}}>
      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
        Campign Overview
      </Typography>
      <Box sx={{}} >
        <CustomTabs tabs={tabsData} value={value} handleTabSwitch={handleTabSwitch} />
      </Box>
    </div>
  )
}

export default CampignOverviewPage

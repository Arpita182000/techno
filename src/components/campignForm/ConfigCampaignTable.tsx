import React, { useEffect, useMemo, useState } from 'react'
import AlertPage from '../../pages/component/AlertPage'
import { ApiService, getURL } from '../../api';
import EnhancedTable from '../common/table/Table';
import { Box, Button, Typography } from '@mui/material';
import { API_ADDRESS } from '../../api/apiConfig';
import colorConfigs from "../../configs/colorConfigs";

type Data = {
  _id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  email1: string;
  phone: number;
  whatsapp: number;
  profileImg: string;
  address: {
    line1: string;
    city: string;
    district: string;
    state: string;
    zipcode: number;
    _id: string;
  };
  avgSale: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const ConfigCampaignTable = ({groupId}:any) => {
  const [storeData, setStoreData] = useState<Data[]>([]);
  const[storeDetails,setStoreDetails] = useState<any>([]);
  const [addedData, setAddedData] = useState<any>([]);
  const [pageTotal, setPageTotal] = useState<number>(0)
  const [page, setPage] = useState(0);
  const [page1, setPage1] = useState(0);
  const [rows, setRows] = useState([]);
  const [rows1, setRows1] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rowsPerPage1, setRowsPerPage1] = useState(5);


  const [filterConfig, setFilterConfig] = useState<Record<string, any>>({
    name: "",
    limit: 5,
    skip: 0,
    pointOfContact: ""
  });
  const [childTablePayload, setChildTablePayload] = useState<any>({
    name: "",
    tags: [],
    state: "",
    district: "",
    city: "",
    pointOfContact: "",
    phone: "",
    whatsapp: "",
    email: "",
    skip: 0,
    limit: 5,
    sortquery: {
      createdAt: -1
    }
  });
  
  const [toggle, setToggle] = useState<boolean>(false);

  console.log("calling response of selectedId",groupId);
  

  useEffect(() => {
    fetchAddStoreData();
  }, [toggle, childTablePayload, page1, rowsPerPage1]);


  useEffect(() => {
    fetchData();
    
  }, [filterConfig,toggle, page, rowsPerPage]);

  const fetchData = async () => {
    try {
      const result = await ApiService.callPostApi(
        // 'http://localhost:9001/api/campaign/stores/search'
      getURL(API_ADDRESS.searchCampaignStore)
      
      ,
        {
          ...filterConfig, 
          limit: rowsPerPage,
          skip: page * rowsPerPage,
          campaignId: localStorage.getItem("campaignId"),
          groupId:groupId
        }
      );
      setStoreData(result?.data?.stores ?? []);
      let rows = getRows(result?.data?.stores);
      setRows(rows);
      console.log("calling store",result.data);
      
      setPageTotal(result?.data?.total);
      
    } catch (error: any) {
      console.error('Error fetching data:', error.message);
    }
  };

  const fetchAddStoreData = async () => {
    try {
      const result = await ApiService.callPostApi(
        // 'http://localhost:9001/api/campaign/stores/search/added'
        getURL(API_ADDRESS.campaignAdded)
        , {
        campaignId: localStorage.getItem("campaignId"),
        groupId:groupId,
        ...childTablePayload,
        limit: rowsPerPage1,
        skip: page1 * rowsPerPage1
      }

      );
      console.log("result111", result);
      setAddedData(result?.data?.stores ?? []);
      let rows = getRows(result?.data?.stores);
      setRows1(rows);
      // setPageTotal(result?.data?.total);
    } catch (error: any) {
      console.error('Error fetching data:', error.message);
    }
  };


 


  const handleAddAudience = async (e:any) => {
    e.preventDefault()
    const storeId = storeDetails.map((item: any) => item._id);
    console.log("calling Ids of store", storeId);
    

    try {

      const response = ApiService.callPostApi(
        getURL(API_ADDRESS.addCampaignStore)
        // 'http://localhost:9001/api/campaign/stores/add'
        , {
        campaignId: localStorage.getItem("campaignId"),
        storeIdList: storeId,
        groupId:groupId
      });
      response.then((res) => {
        setToggle(!toggle)
        setStoreDetails([])
      })
      console.log("calling response", response);

    } catch (error) {
      console.error('Error adding audience:', error);
    }

  };


  const handleDeleteAudience = async (e:any) => {
    e.preventDefault()
    const storeId = storeDetails.map((item: any) => item._id);
    try {

      const response = ApiService.callPostApi(
        // 'http://localhost:9001/api/campaign/stores/delete'
        getURL(API_ADDRESS.deleteCampaignStore)

        , {
        campaignId: localStorage.getItem("campaignId"),
        storeIdList: storeId,
        groupId:groupId
      });
      response.then((res) => {
        setToggle(!toggle)
        setStoreDetails([])
      })
      console.log("calling response", response);

    } catch (error) {
      console.error('Error adding audience:', error);
    }

  };

   
    
  






  function createFilterConfig1(id: string, value: string) {
    setFilterConfig({ ...filterConfig, [id]: value })
  }

  function createFilterConfig2(id: string, value: string) {
    setChildTablePayload({ ...childTablePayload, [id]: value })
  }

  

  

  const getRows = (rowData: any = []) => {
    return rowData?.map((row: any) => {
      const { address, ...rest } = row;
      const { _id: addressId, ...addressWithoutId } = address;
      return {
        ...rest,
        ...addressWithoutId
      }
    })
  }

  // const rows1 = addedData?.map((row: any) => {
  //   const { address, ...rest } = row;
  //   const { _id: addressId, ...addressWithoutId } = address;
  //   return {
  //     ...rest,
  //     ...addressWithoutId
  //   }
  // })



  const headCells: any = [
    {
      id: "_id",
      label: "Store Id",
    },
    {
      id: "name",
      label: "Store Name",
    },
    {
      id: "tags",
      label: "Tags",
    },
    {
      id: "state",
      label: "State",
    },
    // {
    //   id: "line1",
    //   label: "Zone"
    // },
    {
      id: "district",
      label: "District"
    },
    {
      id: "city",
      label: "City"
    },
    {
      id: "pointOfContact",
      label: "Point of Contact"
    },
    {
      id: "phone",
      label: "Contact No"
    },
    {
      id: 'whatsapp',
      label: 'Whatsapp No'
    },
    {
      id: 'avgSale',
      label: 'Average Sale'
    },
    {
      id: 'email',
      label: 'Email'
    }



  ]


  return (
    <div>
      <div>
        <div className='overviewClass'>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }} mt={2}>
            Configure Campaign
          </Typography>

        </div>

        {/* {storeData? 
      <Box sx={{width:"maxwidth",boxShadow:5,height:400, mt:3,borderRadius:'2rem'}} >
         <NoDataFound/>

      </Box>
     
      :
       */}
        <Box
          sx={{ mt: '1rem' }}
        //  sx={{ width: "maxwidth", boxShadow: 5, height: 400, mt: 3, borderRadius: '2rem' }} 
        >

          <EnhancedTable rows={rows} headCells={headCells} enableEdit={true} pageTotal={pageTotal} setPage={setPage} page={page}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            createFilterConfig={createFilterConfig1} isCheckBox={true}
            nonScroll={['_id']}
           
            selectedRows={storeDetails}
            setSelectedRows={setStoreDetails}
          />
         <div style={{width:"100%",display:"flex",justifyContent:"end",marginBottom:"1rem"}}>
         <button onClick={handleAddAudience} style={{ alignItems: "center",
                      color: "white",
                      padding: " 10px 3rem",
                      borderRadius: "20px",
                      background: colorConfigs.primaryColor.red[600],
                      border:"none",
                      outline:"none"}}>Add Adudience</button>
         </div>

        </Box>
        {/* } */}
        <Box
          sx={{ mt: '1rem' }}
        //  sx={{ width: "maxwidth", boxShadow: 5, height: 400, mt: 3, borderRadius: '2rem' }} 
        >
  

          <EnhancedTable rows={rows1} headCells={headCells} enableEdit={true} pageTotal={rows1?.length} setPage={setPage1} page={page1}
            createFilterConfig={createFilterConfig2}
            isCheckBox={true}
            nonScroll={['_id']} isButton={true}
            rowsPerPage={rowsPerPage1}
            setRowsPerPage={setRowsPerPage1}
            selectedRows={storeDetails}
            setSelectedRows={setStoreDetails}
          />
          <div style={{width:"100%",display:"flex",justifyContent:"end",marginBottom:"1rem"}}>
          <button  style={{ alignItems: "center",
                      color: "white",
                      padding: " 10px 3rem",
                      borderRadius: "20px",
                      background: colorConfigs.primaryColor.red[600],
                      border:"none",
                      outline:"none"}} onClick={handleDeleteAudience}>Delete</button>
                      </div>
        </Box>
      </div>
     
    </div>
  )
}

export default ConfigCampaignTable
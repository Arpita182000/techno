import { Box, Button, Container, Typography } from '@mui/material';

import EnhancedTable from '../../components/common/table/Table';
import './component.style.css';
import { Troubleshoot } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { ApiService, getURL } from '../../api';
import { error } from 'console';
import { NoDataFound } from '../../components/dataNotFound/NoDataFound';
import { API_ADDRESS } from '../../api/apiConfig';
import colorConfigs from '../../configs/colorConfigs';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {};
type StoreData = {
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

const AlertPage = (props: Props) => {
 const navigate = useNavigate();
  const [storeData, setStoreData] = useState<StoreData[]>([]);
  const [pageTotal,setPageTotal] = useState<number>(0)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterConfig, setFilterConfig] = useState<Record<string,any>>({
    name: "",
    limit: 5,
    sortquery:{'createdAt':-1},
    skip: 0,
    pointOfContact: "",
    state:"",
    district:"",


  });
  const [toggle,setToggle] = useState(false);

  console.log("filterConfig", filterConfig);
  
  useEffect(() => {
    fetchData();
  }, [filterConfig, page, rowsPerPage,toggle]);

  const fetchData = async () => {
    try {
      const result = await ApiService.callPostApi(
        // 'http://localhost:9001/api/stores/search'
        getURL(API_ADDRESS.searchStore)
        
        , {
        ...filterConfig,
        limit: rowsPerPage,
        skip: page * rowsPerPage
      });
      console.log("result", result);
      setStoreData(result?.data?.stores ?? []);
      setPageTotal(result?.data?.total);
    } catch (error: any) {
      console.error('Error fetching data:', error.message);
    }
  };

  function createFilterConfig(id: string, value: string) {
    setFilterConfig({...filterConfig, [id]: value})
  }


  const rows = storeData?.map((row) => {
    const { address, ...rest } = row;
    return {
      ...rest,
      ...address
    }
  })



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
  const handleViewDetails = (row: any) => {
    console.log("calling row id", row._id);
   
    // navigate(`/campaign/view-details?status=${row.status}&campaignId=${row._id}`);
    navigate(`/store/store-details`,{state: {storeId: row._id}});
    // /user/user-details/:id
  }

  const handleEdit = (row: any) => {
    navigate(`/store/store-edit`, {state: {storeId: row._id}});
  }

  const handleDelete = (row: any) => {
    const Id =  row._id
    try {

      const response = ApiService.callPostApi(
       
        getURL(API_ADDRESS.deleteStore)

        , {
          storeId:Id
      
      });
      response.then((res) => {
        toast.success("Store deleted successfully!",{
          autoClose: 1000,
        });
        setToggle(!toggle)
      
      })
      console.log("calling response", response);

    } catch (error) {
      console.error('Error adding audience:', error);
    }

  };
  


  return (
    <div style={{marginLeft:"30px"}}>
      <ToastContainer/>
      <div style={{display: "flex",justifyContent: "space-between"}}>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          Store Overview
        </Typography>
        <Button
                
                variant="contained" sx={{
                    alignItems: "center",
                    paddingX: "2rem",
                    borderRadius: "20px",
                    paddingY: "8px",
                    color:"white" ,
                    background: colorConfigs.primaryColor.red[600],
                     '&:hover': {
                    bgcolor: colorConfigs.primaryColor.red[600],
                  }
                }}
                onClick={() => navigate('/store/add-store')}
                >ADD Store +</Button>
      </div>

      {/* {storeData? 
      <Box sx={{width:"maxwidth",boxShadow:5,height:400, mt:3,borderRadius:'2rem'}} >
         <NoDataFound/>

      </Box>
     
      :
       */}
      <Box sx={{ width: "maxwidth", boxShadow: 5, mt: 3, borderRadius: '10px',background:"white" }} >
        <EnhancedTable rows={rows} headCells={headCells} enableEdit={true} pageTotal ={pageTotal} setPage={setPage} page={page}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          createFilterConfig={createFilterConfig}
          handleViewDetails={handleViewDetails}
          nonScroll={['_id']}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />

      </Box>
     


    </div>





  );
};

export default AlertPage;

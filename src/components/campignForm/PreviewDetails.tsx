import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import EnhancedTable from '../common/table/Table'
import { ApiService, getURL } from '../../api'
import { log } from 'console'
import { API_ADDRESS } from '../../api/apiConfig'

const PreviewDetails = () => {
    const[tableData,setTbleData] = useState<any>([]);
    const [pageTotal, setPageTotal] = useState<number>(0);
    const [page, setPage] = useState(0);
    const[rows,setRows] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [data,setData] = useState<any>({
     
	"name": "",
	"tags": [],
	"state": "",
	"district": "",
	"city": "",
	"pointOfContact": "ohn 3",
	"phone":"",
	"whatsapp": "",
	"email": "",
	"email1": "",
	"skip": 0,
	"limit": 10,
	"sortquery": {
		"stores.createdAt": -1
	}
    })
    console.log("calling data table",tableData);
    
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
useEffect(() =>{
    handlePreviewDetails();
},[page, rowsPerPage])



const handlePreviewDetails = async () => {
    const response = await ApiService.callPostApi(
      // 'http://localhost:9001/api/campaign/stores/search/all',
      getURL(API_ADDRESS.previewDetails),
      
      { campaignId : localStorage.getItem("campaignId"),
      ...data,
      limit: rowsPerPage,
     skip: page * rowsPerPage,

    
    }
    )
    console.log("calling response",response?.data?.stores);
    // setPreviewData(response?.data)
    setTbleData(response?.data?.stores ?? []);
    let rows = getRows(response?.data?.stores);
    setRows(rows);

    setPageTotal(response?.data?.total)
    
  
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
 
  return (
    
    <div>
       <Typography variant="body1" sx={{ fontWeight: 'bold' }} mt={2}>
            Configure Campaign
          </Typography>
          <EnhancedTable headCells={headCells} rows={rows}
          pageTotal={pageTotal} setPage={setPage} page={page}
          rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          
          
          />
    </div>
  )
}

export default PreviewDetails

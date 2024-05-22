import React, { useEffect, useState } from 'react'
import EnhancedTable from '../common/table/Table';
import { Box, Typography } from '@mui/material';
import { ApiService, getURL } from '../../api';
import { API_ADDRESS } from '../../api/apiConfig';
type Props = {};
const ChooseOfferTable = ({selectedCampaignRows, setSelectedCampaignRows}: any) => {
  const [offers, setOffers] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [storeId, setStoreId] = useState<any>([]);
  const [searchOffer, setSearchOffer] = useState<any>({
    "skip": 0,
    "limit": 5,
    "sortquery": {
      "createdAt": -1
    },
    startDate: "", 
    endDate: "", 

  })



  const headCells: any = [
    {
      id: '_id',
      label: 'Offer Id',
    },
    {
      id: 'title',

      label: 'Offer Title',
    },
    {
      id: 'createdAt',
      label: 'Create Date',
      type:'date'
    },

    {
      id: 'updatedAt',
      label: 'Update Date',
      type: 'date'

    },
    {
      id: 'condition',

      label: 'Condition',
    },
    {
      id: 'note',

      label: 'Note',
    },

  ];
  useEffect(() => {
    fetchChooseOfferData();

  }, [searchOffer,page, rowsPerPage,])


  const fetchChooseOfferData = async () => {

    try {
      const result = await ApiService.callPostApi(
        // 'http://localhost:9001/api/offer'
        getURL(API_ADDRESS.offer)
        , 
      {
        campaignId: localStorage.getItem("campaignId"),
        ...searchOffer,
        limit: rowsPerPage,
        skip: page * rowsPerPage
      }

      );
      console.log("response api", result);
      setOffers(result?.data?.offers);
      setTotal(result?.data?.total);


    } catch (error: any) {
      console.error('Error fetching data:', error.message);
    }
  };



  function createFilterChooseOffer(id: string, value: string) {
    setSearchOffer({ ...searchOffer, [id]: value })
  }


  return (
    <div>
      <div className='overviewClass'>
        <Typography variant="body1" sx={{ fontWeight: 'bold', }}>
          Choose offers
        </Typography>
      </div>
      <Box
      >

        <EnhancedTable headCells={headCells} isCheckBox={true} enableEdit={true} rows={offers}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          setPage={setPage} page={page}
          createFilterConfig={createFilterChooseOffer}
          pageTotal={total}
          selectedRows={selectedCampaignRows}
          setSelectedRows={setSelectedCampaignRows}
        />
        {/* <EnhancedTable rows={rows} headCells={headCells} enableEdit={true} pageTotal={pageTotal} setPage={setPage} page={page}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            createFilterConfig={createFilterConfig1} isCheckBox={true}
            nonScroll={['_id']}
           
            selectedRows={storeDetails}
            setSelectedRows={setStoreDetails}
          /> */}
      </Box>

    </div>
  )
}

export default ChooseOfferTable

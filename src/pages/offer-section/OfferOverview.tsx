import React, { useEffect, useState } from "react";
import { Box, Grid, TextField, Button } from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/system";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import filter from "../../assets/images/PNG/filter.png";
import image1 from "../../assets/images/PNG/images (1).jpg";
import { Link, useNavigate } from "react-router-dom";
import { getURL } from "../../api";
import ApiService from "../../api/services/ApiService";
import { API_ADDRESS } from "../../api/apiConfig";
import EnhancedTable from "../../components/common/table/Table";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function OfferOverview() {
  const navigate = useNavigate();
  const [viewData, setViewData] = useState<any[]>([]);
  const [isOpenList, setIsOpenList] = useState<boolean[]>([]);
  const [pageTotal,setPageTotal] = useState<number>(0)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchOffer, setSearchOffer] = useState<any>({
    "title":"",
    "note": "",
    "startDate": "",
    "endDate": "",
    "skip": 0,
    "limit": 5,
    "sort": {
      "createdAt": -1
    }


  })
  const[toggle,setToggle] = useState(false);


  const viewOffferfunc = async () => {
    const response = await ApiService.callPostApi(
      getURL(API_ADDRESS.viewOffer),
      {
        ...searchOffer,
        limit: rowsPerPage,
        skip: page * rowsPerPage
      }
    );
    setViewData(response?.data?.offers);
    setPageTotal(response?.data?.total);
  };
  useEffect(() => {
    viewOffferfunc();
  }, [searchOffer,page, rowsPerPage,toggle]);

  const StyledTable = styled("table")({
    width: "100%",
    borderCollapse: "collapse",
  });

  const StyledHeaderRow = styled("tr")({
    border: "none",
  });

  const StyledHeaderCell = styled("th")({
    padding: "16px",
    border: "none",
    fontWeight: "600",
  });

  const StyledDataCell = styled("td")({
    textAlign: "left",
    borderBottom: "1px gray solid",
    padding: "15px",
  });
  const OptionsBox = styled("div")({
    background: "white",
    border: "1px solid #ccc",
    padding: "10px",
    position: "absolute",
    left: "89%",
    width: "120px",
    zIndex: "1",
    textAlign: "left",
  });

  const handleOpen = (index: number) => {
    const updatedIsOpenList = [...isOpenList];
    updatedIsOpenList[index] = !updatedIsOpenList[index];
    setIsOpenList(updatedIsOpenList);
  };

  const headCells: any = [
    {
      id: '_id',
      label: 'Offer ID',
    },
    {
      id: 'title',

      label: 'Offer Name',
    },
    {
      id: 'createdAt',
      label: 'Date',
      type:'date'
    },

    
    {
      id: 'note',

      label: 'Note',
    },

  ];

  function createFilterChooseOffer(id: string, value: string) {
    setSearchOffer({ ...searchOffer, [id]: value })
  }

  const handleViewDetails = (row: any) => {
    console.log("calling row id of offer", row._id);
    // <Link to={"/offer-details/"+ row._id}>View Details</Link>
    navigate(`/offer-details/${row._id}`);
  }
  const handleEdit = (row: any) => {
    console.log("calling row id of offer", row._id);
    // <Link to={"/offer-details/"+ row._id}>View Details</Link>
    navigate(`/edit-offer-details/${row._id}`);
  }

  const handleDelete = (row: any) => {
    const Id =  row._id
    try {

      const response = ApiService.callPostApi(
       
        getURL(API_ADDRESS.deleteOffer)

        , {
          offerId:Id
      
      });
      response.then((res) => {
        toast.success("offer deleted successfully!",{
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
    // <div className="overviewClass">
    //   <div className="header">
    //     <Typography variant="body1" sx={{ fontWeight: "bold" }}>
    //       Offer Overview
    //     </Typography>
    //   </div>
    //   <Box
    //     sx={{
    //       borderRadius: "10px",
    //       boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    //       padding: "30px",
    //       paddingTop: "5%",
    //       background: "white",
    //     }}
    //   >
    //     {/* Parent Box */}
    //     <Grid container spacing={3}>
    //       {/* First Child Box */}
    //       <Grid item md={6}>
    //         <Box
    //           sx={{
    //             borderRadius: "3%",
    //             background: "#EEEBEB",
    //             width: "100%",
    //           }}
    //         >
    //           <TextField
    //             id="search"
    //             label="Search in Drive or Paste Url"
    //             variant="outlined"
    //             size="small"
    //             fullWidth
    //             InputProps={{
    //               endAdornment: <SearchIcon />,
    //             }}
    //           />
    //         </Box>
    //       </Grid>
    //       {/* Second Child Box */}
    //       <Grid item md={6}>
    //         <Box
    //           sx={{
    //             display: "flex",
    //             alignItems: "center",
    //             gap: "15px",
    //             justifyContent: "end",
    //           }}
    //         >
    //           <Button
    //             type="submit"
    //             variant="contained"
    //             sx={{
    //               alignItems: "center",
    //               color: "white",
    //               paddingX: "2.5rem",
    //               borderRadius: "20px",
    //               paddingY: "10px",
    //               background: colorConfigs.primaryColor.red[600],
    //             }}
    //           >
    //             <span>
    //               <Link to="/offer/create-offer">Create Offer+</Link></span>
    //           </Button>
    //         </Box>
    //       </Grid>
    //     </Grid>
    //     {viewData && viewData.length > 1 ? (
    //       <Box sx={{ marginY: "5%", width: "100%" }}>
    //         <div style={{ overflowX: "auto" }}>
    //           <StyledTable>
    //             <thead style={{ background: "#EEEBEB" }}>
    //               <StyledHeaderRow>
    //                 <StyledHeaderCell>Offer ID</StyledHeaderCell>
    //                 <StyledHeaderCell>Offer Title</StyledHeaderCell>
    //                 <StyledHeaderCell>Date</StyledHeaderCell>
    //                 <StyledHeaderCell>Condition</StyledHeaderCell>
    //                 <StyledHeaderCell>Note</StyledHeaderCell>
    //                 <StyledHeaderCell>
    //                   <img alt="filter" width={20} src={filter} />
    //                 </StyledHeaderCell>
    //               </StyledHeaderRow>
    //             </thead>
    //             {viewData.map((v, i) => {
    //               // console.log(v);
    //               return (
    //                 <tbody key={v._id} style={{ position: "relative", textAlign: "left" }}>
    //                   <tr>
    //                     <StyledDataCell>{v._id}</StyledDataCell>
    //                     <StyledDataCell>{v.title}</StyledDataCell>
    //                     <StyledDataCell
    //                       style={{ color: "green", fontWeight: "600" }}
    //                     >
    //                       {/* {new Date(v.createdAt).toISOString().split("T")[0]} */}
    //                        {new Date(v.createdAt).toISOString().split("T")[0].split("-").reverse().join("/")}
    //                     </StyledDataCell>
    //                     <StyledDataCell>{v.condition}</StyledDataCell>
    //                     <StyledDataCell>{v.note}</StyledDataCell>
    //                     <StyledDataCell>
    //                       <MoreVertIcon onClick={() => handleOpen(i)} />
    //                       {isOpenList[i] && (
    //                         <OptionsBox>
    //                           <div>
    //                             <Link to={"/offer-details/"+ v._id}>View Details</Link>
    //                           </div>
    //                           <div>Delete</div>
    //                         </OptionsBox>
    //                       )}
    //                     </StyledDataCell> 
    //                   </tr>
    //                 </tbody>
    //               );
    //             })}
    //           </StyledTable>
    //         </div>
    //       </Box>
    //     ) : (
    //       "check your internet connection"
    //     )}

    //     <Box
    //       sx={{
    //         display: "flex",
    //         justifyContent: "space-between",
    //         marginTop: "1rem",
    //       }}
    //     >
    //       <Box
    //         sx={{
    //           display: "flex",
    //           justifyContent: "start",
    //           alignItems: "center",
    //         }}
    //       >
    //         <Typography>Showing 1 to 50 | Total 500...</Typography>
    //       </Box>
    //       <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
    //         <Typography>1|2|3|5</Typography>
    //       </Box>
    //     </Box>
    //   </Box>
    // </div>
    <>
    <ToastContainer />
    <div style={{display: "flex",justifyContent: "space-between"}}>
       <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
         Offer OverView
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
               onClick={() => navigate('/offer/create-offer')}
               >Create Offer &nbsp; +</Button>
     </div>
     <div style={{marginTop:'1rem'}}>
   <EnhancedTable  enableEdit={true} rows={viewData}
   headCells={headCells}
   rowsPerPage={rowsPerPage}
   setRowsPerPage={setRowsPerPage}
   setPage={setPage} page={page}
   pageTotal ={pageTotal} 
   createFilterConfig={createFilterChooseOffer}
   handleViewDetails={handleViewDetails}
   handleDelete={handleDelete}
   handleEdit={handleEdit}
  //  pageTotal={total}
  //  selectedRows={selectedCampaignRows}
  //  setSelectedRows={setSelectedCampaignRows}
 />
 </div>
 </>

  );
}

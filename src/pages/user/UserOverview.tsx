import React, { useEffect, useState } from "react";
import { Box, Grid, TextField, Button } from "@mui/material";
import "./AddUser.css";
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



export default function UserOverview() {
  const [viewData, setViewData] = useState<any[]>([]);
  // const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [isOpenList, setIsOpenList] = useState<boolean[]>([]);
  const [pageTotal,setPageTotal] = useState<number>(0)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const[toggle, setToggle] = useState(false);
  const [searchOffer, setSearchOffer] = useState<any>({
    "name":'',
    "whatsapp":'',
    "phone" :'',
    "email1":'',
    "skip": 0,
    "limit": 5,
    "sort": {
      "createdAt": -1
    }


  })



  const handleDelete = (row: any) => {
    const Id =  row._id
    try {

      const response = ApiService.callPostApi(
       
        getURL(API_ADDRESS.deleteUser)

        , {
          userId:Id
      
      });
      response.then((res) => {
        toast.success("User deleted successfully!",{
          autoClose: 1000,
        });
        setToggle(!toggle)
      
      })
      console.log("calling response", response);

    } catch (error) {
      console.error('Error adding audience:', error);
    }

  };

  const viewUserfunc = async () => {
    const response = await ApiService.callPostApi(
      getURL(API_ADDRESS.viewUser),
      {
       ...searchOffer,
       limit: rowsPerPage,
        skip: page * rowsPerPage
      }
    );
    setViewData(response?.data?.users);
    setPageTotal(response?.data?.total);

  };
  useEffect(() => {
    viewUserfunc();
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
    textAlign: "center",
    padding: "15px",
  });
  const RoundedImage = styled("img")({
    borderRadius: "50%",
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
  

  const handleDeleteClick = () => {
    const isConfirmed = window.confirm("Are you sure you want to delete?");
    if (isConfirmed) {
      // Delete logic goes here
      // You can call your delete API or perform any other action
      console.log("Delete confirmed");
    } else {
      console.log("Delete canceled");
    }
  };


  const headCells: any = [
    {
      id: '_id',
      label: 'User ID',
    },
    {
      id: 'name',

      label: 'User Name',
      type: 'username'
    },
    {
      id: 'email1',
      label: 'Email',
    },

    {
      id: 'phone',
      label: 'Mobile Number'

    },
    {
      id: 'whatsapp',

      label: 'WhatsApp Number',
    },
    // {
    //   id: 'note',

    //   label: 'Note',
    // },

  ];
  function createFilterChooseOffer(id: string, value: string) {
    setSearchOffer({ ...searchOffer, [id]: value })
  }

  const handleEdit = (row: any) => {
    console.log("calling row id", row._id);
   
    // navigate(`/campaign/view-details?status=${row.status}&campaignId=${row._id}`);
    navigate(`/user/edit-user-details/${row._id}`);
    // /user/user-details/:id
  }

  const handleViewDetails = (row: any) => {
   
    // navigate(`/campaign/view-details?status=${row.status}&campaignId=${row._id}`);
    navigate(`/user/user-details/${row._id}`);
    // /user/user-details/:id
  }

  return (
    // <div className="overviewClass">
    //   <div className="header">
    //     <Typography variant="body1" sx={{ fontWeight: "bold" }}>
    //       User Overview
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
    //             <Link to="/user/add-user">
    //               ADD User <span>+</span>
    //             </Link>
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
    //                 <StyledHeaderCell>SL</StyledHeaderCell>
    //                 <StyledHeaderCell>User ID</StyledHeaderCell>
    //                 <StyledHeaderCell>User Name</StyledHeaderCell>
    //                 <StyledHeaderCell>Email</StyledHeaderCell>
    //                 <StyledHeaderCell>Mobile Number</StyledHeaderCell>
    //                 <StyledHeaderCell>WhatsApp Number</StyledHeaderCell>
    //                 <StyledHeaderCell>Role</StyledHeaderCell>
    //                 <StyledHeaderCell>
    //                   <img alt="filter" width={20} src={filter} />
    //                 </StyledHeaderCell>
    //               </StyledHeaderRow>
    //             </thead>
    //             {viewData.map((v, i) => {
    //               return (
    //                 <tbody key={i} style={{ position: "relative" }}>
    //                   <tr style={{ borderBottom: "1px gray solid" }}>
    //                     <StyledDataCell>{i + 1}</StyledDataCell>
    //                     <StyledDataCell>{v._id}</StyledDataCell>
    //                     <StyledDataCell
    //                       style={{
    //                         display: "flex",
    //                         justifyContent: "center",
    //                         alignItems: "center",
    //                         gap: "6px",
    //                       }}
    //                     >
    //                       <RoundedImage
    //                         alt="Arpita's Profile"
    //                         src={image1}
    //                         width={31}
    //                         height={31}
    //                       />
    //                       {v.firstName} {v.lastName}
    //                     </StyledDataCell>

    //                     <StyledDataCell>{v.email1}</StyledDataCell>
    //                     <StyledDataCell>{v.phone}</StyledDataCell>
    //                     <StyledDataCell>{v.whatsapp}</StyledDataCell>
    //                     <StyledDataCell>
    //                       <div
    //                         className={
    //                           v.accountType?.role === "employee"
    //                             ? "roleBox"
    //                             : "managerBox"
    //                         }
    //                       >
    //                         {v.accountType?.role == null
    //                           ? "null"
    //                           : v?.accountType?.role}
    //                       </div>
    //                     </StyledDataCell>
    //                     <StyledDataCell>
    //                       <MoreVertIcon onClick={() => handleOpen(i)} />
    //                       {isOpenList[i] && (
    //                         <OptionsBox>
    //                           <div>
    //                             <Link to={"/user/user-details/"+v._id}>View Details</Link>
    //                           </div>
    //                           <div>Edit</div>
    //                           <div onClick={handleDeleteClick}>Delete</div>
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
    <ToastContainer/>
     <div style={{display: "flex",justifyContent: "space-between"}}>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          User OverView
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
                onClick={() => navigate('/user/add-user')}
                >ADD User +</Button>
      </div>
      <div style={{marginTop:'1rem'}}>
    <EnhancedTable headCells={headCells} enableEdit={true} rows={viewData}
    rowsPerPage={rowsPerPage}
    setRowsPerPage={setRowsPerPage}
    setPage={setPage} page={page}
    createFilterConfig={createFilterChooseOffer}
    handleViewDetails={handleViewDetails}
    pageTotal={pageTotal}
    handleDelete = {handleDelete}
     handleEdit={handleEdit}
    // selectedRows={selectedCampaignRows}
    // setSelectedRows={setSelectedCampaignRows}
  />
  </div>

  </>
  );
}

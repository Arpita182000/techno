import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Box, Grid, TextField, Button, Typography } from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import { useNavigate } from "react-router-dom";
import { getURL } from "../../api";
import ApiService from "../../api/services/ApiService";
import { API_ADDRESS } from "../../api/apiConfig";
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
  condition: Yup.string().required("Condition is Required"),
  note: Yup.string().required("Note is Required"),
});

export default function CreateOffer() {

  const navigate = useNavigate();

  const offerPage = () => {
  
  };

  const submitOffer = async (values: any) => {
    // const response = await ApiService.callPostApi(
    //   getURL(API_ADDRESS.createOffer),
    //   values
    // );
    ApiService.callPostApi(
      getURL(API_ADDRESS.createOffer),
      values
    ).then(res => {
      if(res.status === 200) {
        toast("offer created successfully!", {
          autoClose: 1000,
          onClose: () => {
            navigate("/offer/offer-overview");
          },
        });
      }
    });
    // console.log("offer response", response);
  };

  return (
    <div className="overviewClass">
       <ToastContainer />
      <div className="header">
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Create Offer
        </Typography>
      </div>
      <Formik
        initialValues={{
          title: "",
          condition: "",
          note: "",
          // creator: "65fd985eb7532f01f84a1bfb", // hardcoded user id
        }}
        onSubmit={(values) => {
          submitOffer(values);
          offerPage();
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, errors, touched ,resetForm}) => (
          <Form>
            <Box
              sx={{
                width: "maxWidth",
                borderRadius: "10px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                padding: "30px",
                paddingTop: "5%",
                background: "white",
              }}
            >
              <div className="header">
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    color: colorConfigs.primaryColor.red[600],
                    fontSize: "2rem",
                  }}
                >
                  What should we name this offer?
                </Typography>
              </div>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ padding: "10px", marginBottom: "1.5rem" }}>
                    <Typography variant="body2" sx={{ mt: "18px" }}>
                      Enter Offer Title &nbsp;<span style={{ color: "red" }}>*</span>
                    </Typography>
                   
                    <Field
                      as={TextField}
                      name="title"
                      fullWidth
                      variant="outlined"
                      size="small"
                      error={errors.title && touched.title}
                    />
                     <div style={{ color: "red", fontSize: "12px" }}>
                      <ErrorMessage name="title" className="error" />
                    </div>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ padding: "10px", marginBottom: "1.5rem" }}>
                    <Typography variant="body2" sx={{ mt: "18px" }}>
                      Condition &nbsp;<span style={{ color: "red" }}>*</span>
                    </Typography>
                   
                    <Field
                      as={TextField}
                      name="condition"
                      fullWidth
                      variant="outlined"
                      size="small"
                      error={errors.condition && touched.condition}
                    />
                     <div style={{ color: "red", fontSize: "12px" }}>
                      <ErrorMessage name="condition" className="error" />
                    </div>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ marginBottom: "1.5rem" }}>
                    <Typography variant="body2" style={{ height: "50px" }}>
                      Type Note &nbsp;<span style={{ color: "red" }}>*</span>
                    </Typography>
                    <Field
                      as={TextField}
                      name="note"
                      fullWidth
                      multiline
                      rows={5}
                      variant="outlined"
                      style={{ height: "150px" }}
                      error={errors.note && touched.note}
                    />
                    <div style={{ color: "red", fontSize: "12px" }}>
                      <ErrorMessage name="note" className="error" />
                    </div>
                  </Box>
                </Grid>
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "1rem",
                }}
              >
                <Box></Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "15px" }}
                >
                  <Button
                    type="button"
                    variant="contained"
                    onClick={() => {
                      resetForm();
                    }}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      paddingX: "3rem",
                      borderRadius: "20px",
                      paddingY: "6px",
                      border: `1px solid ${colorConfigs.primaryColor.red[600]}`,
                      color: colorConfigs.primaryColor.red[600],
                      background: "white",
                    }}
                  >
                    Clear
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      color: "white",
                      paddingX: "3rem",
                      borderRadius: "20px",
                      paddingY: "6px",
                      background: colorConfigs.primaryColor.red[600],
                    }}
                    disabled={isSubmitting}
                  >
                    Save
                  </Button>
                </Box>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </div>
  );
}

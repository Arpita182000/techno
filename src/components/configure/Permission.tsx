import React from "react";
import { Box, Grid, TextField, Button, Typography, Switch } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import "./Permission.css";
import colorConfigs from "../../configs/colorConfigs";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { ApiService, getURL, LOCALHOST } from "../../api";
import { API_ADDRESS } from "../../api/apiConfig";
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define an interface representing the shape of your form values
interface FormValues {
  role: string;
  permissions: {
    store: {
      view: boolean;
      add: boolean;
      delete: boolean;
      edit: boolean;
    };
    tag: {
      view: boolean;
      add: boolean;
      delete: boolean;
    };
    offer: {
      view: boolean;
      add: boolean;
      delete: boolean;
    };
    campaign: {
      view: boolean;
      add: boolean;
      delete: boolean;
      edit: boolean;
      approve: boolean;
      start: boolean;
      restart: boolean;
      pause: boolean;
    };
  };
}

export default function Permission() {
  const initialValues: FormValues = {
    role: "",
    permissions: {
      store: { view: false, add: false, delete: false, edit: false },
      tag: { view: false, add: false, delete: false },
      offer: { view: false, add: false, delete: false },
      campaign: {
        view: false,
        add: false,
        delete: false,
        edit: false,
        approve: false,
        start: false,
        restart: false,
        pause: false,
      },
    },
  };

  const RoleValidationSchema = Yup.object().shape({
    role: Yup.string().max(25, 'Must be 25 characters or less').required('Required'),
  });

  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    ApiService.callPostApi(getURL(API_ADDRESS.addAccountType), values)
      .then(res => {
        toast("Permission added successfully!",{
          onClose :() =>{
            actions.resetForm();
            actions.setSubmitting(false);
          }
        });
      
      }).catch(error => {
        // console.log('error adding role', error)
      }
    );
  
  };



  return (
    <div className="PermissionClass">
        <ToastContainer />
      <div className="header">
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Permission
        </Typography>
      </div>        
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema = { RoleValidationSchema }>

       {({ errors, touched, validateField, validateForm,resetForm}) => (
        <Form>
          <Grid item xs={12}>
            <Box
              sx={{
                borderRadius: "3%",
                background: "#EEEBEB",
                maxWidth: "360px",
                marginBottom: "2%",
              }}
            >
              <Field
                name="role"
                as={TextField}
                label="Enter Role"
                variant="outlined"
                size="small"
                fullWidth
              sx={{
        ...(errors.role && touched.role && {
          "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
            textAlign: "left",
            borderColor: "red",
          }
        })
      }}
    />
    {errors.role && touched.role ? (
      <div style={{ color: "red",fontSize:"12px",background:"#f5f5f5",zIndex:"9999"}}>{errors.role }</div>
    ) : null}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table sx={{ border: "none" }}>
                <TableHead
                  sx={{
                    background: colorConfigs.primaryColor.red[600],
                    fontWeight: "600",
                  }}
                >
                  <TableRow>
                    <TableCell
                      style={{
                        width: "20%",
                        color: "white",
                        fontWeight: "600",
                        fontSize: "20px",
                      }}
                    >
                      Actions
                    </TableCell>
                    <TableCell
                      style={{
                        width: "10%",
                        color: "white",
                        fontWeight: "600",
                        fontSize: "20px",
                      }}
                    >
                      Value
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      colSpan={2} // Spanning across all columns
                      style={{
                        width: "100%",
                        background: "#EEEBEB",
                        fontSize: "17px",
                        fontWeight:"500"
                      }}
                    >
                      Store
                    </TableCell>
                  </TableRow>
                  {Object.keys(initialValues.permissions.store).map(
                    (action) => (
                      <TableRow key={action}>
                        <TableCell style={{ width: "20%" }}>{action}</TableCell>
                        <TableCell style={{ width: "10%" }}>
                          <Field
                            type="checkbox"
                            name={`permissions.store.${action}`}
                            as={Switch}
                          />
                        </TableCell>
                      </TableRow>
                    )
                  )}
                   <TableRow>
                    <TableCell
                      colSpan={2} // Spanning across all columns
                      style={{
                        width: "100%",
                        background: "#EEEBEB",
                        fontSize: "17px",
                        fontWeight:"500"
                      }}
                    >
                      Tags
                    </TableCell>
                  </TableRow>
                  {Object.keys(initialValues.permissions.tag).map(
                    (action) => (
                      <TableRow key={action}>
                        <TableCell style={{ width: "20%" }}>{action}</TableCell>
                        <TableCell style={{ width: "10%" }}>
                          <Field
                            type="checkbox"
                            name={`permissions.tag.${action}`}
                            as={Switch}
                          />
                        </TableCell>
                      </TableRow>
                    )
                  )}
                    <TableRow>
                    <TableCell
                      colSpan={2} // Spanning across all columns
                      style={{
                        width: "100%",
                        background: "#EEEBEB",
                        fontSize: "17px",
                        fontWeight:"500"
                      }}
                    >
                      Offer
                    </TableCell>
                  </TableRow>
                  {Object.keys(initialValues.permissions. offer).map(
                    (action) => (
                      <TableRow key={action}>
                        <TableCell style={{ width: "20%" }}>{action}</TableCell>
                        <TableCell style={{ width: "10%" }}>
                          <Field
                            type="checkbox"
                            name={`permissions. offer.${action}`}
                            as={Switch}
                          />
                        </TableCell>
                      </TableRow>
                    )
                  )}
                    <TableRow>
                    <TableCell
                      colSpan={2} // Spanning across all columns
                      style={{
                        width: "100%",
                        background: "#EEEBEB",
                        fontSize: "17px",
                        fontWeight:"500"
                      }}
                    >
                     Campaign
                    </TableCell>
                  </TableRow>
                  {Object.keys(initialValues.permissions.campaign).map(
                    (action) => (
                      <TableRow key={action}>
                        <TableCell style={{ width: "20%" }}>{action}</TableCell>
                        <TableCell style={{ width: "10%" }}>
                          <Field
                            type="checkbox"
                            name={`permissions.campaign.${action}`}
                            as={Switch}
                          />
                        </TableCell>
                      </TableRow>
                    )
                  )}
                  {/* Repeat the same for other permission sections */}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1rem",
            }}
          >
            <Button
              type="button"
              variant="contained"
              onClick={() => {
                resetForm();
              }}
              sx={{
                alignItems: "center",
                paddingX: "2rem",
                borderRadius: "20px",
                paddingY: "10px",
                border: `1px solid ${colorConfigs.primaryColor.red[600]}`,
                color: colorConfigs.primaryColor.red[600],
                background: "white",
              }}
              
            >
              Clear
            </Button>
            <Button type="submit" variant="contained"  sx={{
                      alignItems: "center",
                      color: "white",
                      paddingX: "3rem",
                      borderRadius: "20px",
                      paddingY: "10px",
                      background: colorConfigs.primaryColor.red[600],
                    }}>
              Save & Continue
            </Button>
          </Box>
        </Form>
      )}
      </Formik>
    </div>
  );
}

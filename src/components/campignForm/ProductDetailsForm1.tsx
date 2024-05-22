import {
  Box,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import colorConfigs from "../../configs/colorConfigs";
import CustomInputWithChip from "../common/fields/CustomInputWithChip";
import MultiSelectChipDropdown from "./MultiselectDropdown";
import { Stepper, Step, StepLabel } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const ProductDetailsForm = ({ setProductDetailsData, errors }: any) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = ["Domain", "Family", "Category", "Brand", "Products"];

  const { productDetails } = useSelector(
    (state: RootState) => state.campaignState
  );
  console.log("productDetails1", productDetails);

  const [data, setData] = useState<any>({
    name: productDetails.name ?? "",
    description: productDetails.description ?? "",
  }); //productDetails ??
  const [selectedValues, setSelectedValues] = useState<any>({
    domain: productDetails.domain ?? [],
    family:  productDetails.family ?? [],
    category: productDetails.category ?? [],
    band:  productDetails.band ?? [],
    product:productDetails.product ?? [],
  });

  useEffect(
    () => setProductDetailsData({ ...selectedValues, ...data }),
    [selectedValues, data]
  );

  const formDropdownValues = {
    domain: ["Digital", "Shoes", "Watches"],
    family: ["TV", "Fridge", "Laptop", "Smartphone"],
    category: ["size", "resolution", "panel type"],
    band: ["LG", "SAMSUNG", "SONY"],
    product: ["Sony Bravia", "LG G3", "Samsung 1234"],
  };

  const handleSelectChange = (key: any, value: any) => {
    setSelectedValues({ ...selectedValues, [key]: value });
    console.log("calling selectedValues", selectedValues);
    // if(value.length > 0){
    //   setActiveStep(activeStep+1)
    // }
  };

  const handleDeleteChip = (key: any, value: any) => {
    setSelectedValues({
      ...selectedValues,
      [key]: selectedValues[key].filter(
        (chipToDelete: any) => chipToDelete !== value
      ),
    });
    // setActiveStep(activeStep - 1)
  };

  return (
    <Box p={3}>
      <Grid container rowGap={2}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: colorConfigs.primaryColor.red[600],
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" fontSize={14}>
              1
            </Typography>
          </div>
          <div>
            <Typography variant="h6">Campaign Info</Typography>
          </div>
        </div>
        <Box sx={{ background: " #F0F4F7", width: "100%", padding: "2rem" }}>
          <Grid item xs={12} sx={{ marginBottom: "1rem" }}>
            <Typography variant="body2" sx={{ marginBottom: "0.6rem" }}>
              Campaign Name &nbsp;<span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              fullWidth
              onChange={(e: any) => {
                setData({ ...data, name: e.target.value });
              }}
              value={data.name}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor:
                      errors.name && data.name === "" ? "red" : "initial",
                  },
                },
              }}
            />
            {errors.name && data.name === "" && (
              <Typography variant="caption" color="error">
                {errors.name}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sx={{ marginBottom: "1rem" }}>
            <Typography variant="body2" sx={{ marginBottom: "0.6rem" }}>
              Campaign Description &nbsp;<span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              fullWidth
              onChange={(e: any) => {
                setData({ ...data, description: e.target.value });
              }}
              value={data.description}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor:
                      errors.description && data.description === ""
                        ? "red"
                        : "initial",
                  },
                },
              }}
            />
            {errors.description && data.description === "" && (
              <Typography variant="caption" color="error">
                {errors.description}
              </Typography>
            )}
          </Grid>
        </Box>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap:"10px",
            marginTop:"10px"
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: colorConfigs.primaryColor.red[600],
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              
            }}
          >
            <Typography variant="h6" fontSize={14}>2</Typography>
          </div>
          <div>
            <Typography variant="h6">Select Product Hierarchy</Typography>
          </div>
        </div>
       <Box sx={{ background: " #F0F4F7", width: "100%", padding: "2rem" }}>
       <Grid container spacing={2}>
       <Grid item  md={2} xs={12} >
       <Grid item>
          <Stepper  activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step  key={label}>
                <StepLabel  >{label} <span style={{ color: "red" }}>*</span></StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
          </Grid>
       <Grid item  md={10} xs={12}>
        <Grid item  xs={12} sx={{marginBottom:"18px"}}>
            {/* <Typography variant="body2">Choose Domain</Typography> */}
  
            {/* <Select fullWidth size='small'
                          labelId="demo-simple-select-label"
                          id="domain"
                          value={formData["domain"]}
  
                          onChange={(e: any) => handleChange(e.target.value, "domain")}
                          
                      >
                          <MenuItem value={10}>Digital</MenuItem>
                          <MenuItem value={20}>Shoes</MenuItem>
                          <MenuItem value={30}>watches</MenuItem>
                      </Select>
  
                */}
            <MultiSelectChipDropdown
              keyName="domain"
              handleSelectChange={handleSelectChange}
              handleDeleteChip={handleDeleteChip}
              options={formDropdownValues.domain}
              selectedValues={selectedValues.domain}
              setSelectedValues={setSelectedValues}
            />
            {errors.domain && <Typography variant="caption" color="error">{errors.domain}</Typography>}
          </Grid>
          <Grid item xs={12} sx={{marginBottom:"18px"}}>
           
            <MultiSelectChipDropdown
              keyName="family"
              handleSelectChange={handleSelectChange}
              handleDeleteChip={handleDeleteChip}
              options={
                selectedValues.domain.length > 0 ? formDropdownValues.family : []
              }
              selectedValues={
                selectedValues.domain.length > 0 ? selectedValues.family : []
              }
              setSelectedValues={setSelectedValues}
            />
       
            {errors.family && <Typography variant="caption" color="error">{errors.family}</Typography>}
          </Grid>
          <Grid item xs={12} sx={{marginBottom:"18px"}}>
            {/* <Typography variant="body2">Category</Typography> */}
            <MultiSelectChipDropdown
              keyName="category"
              handleSelectChange={handleSelectChange}
              handleDeleteChip={handleDeleteChip}
              options={
                selectedValues.family.length > 0
                  ? formDropdownValues.category
                  : []
              }
              selectedValues={
                selectedValues.family.length > 0 ? selectedValues.category : []
              }
              setSelectedValues={setSelectedValues}
            />
             {errors.category && <Typography variant="caption" color="error">{errors.category}</Typography>}
          </Grid>
          <Grid item xs={12} sx={{marginBottom:"18px"}}>
            {/* <Typography variant="body2">Band</Typography> */}
            <MultiSelectChipDropdown
            
              keyName="band"
              handleSelectChange={handleSelectChange}
              handleDeleteChip={handleDeleteChip}
              options={
                selectedValues.category.length > 0 ? formDropdownValues.band : []
              }
              selectedValues={
                selectedValues.category.length > 0 ? selectedValues.band : []
              }
              setSelectedValues={setSelectedValues}
            />
              {errors.band && <Typography variant="caption" color="error">{errors.band}</Typography>}

          </Grid>
          <Grid item xs={12} sx={{marginBottom:"18px"}}>
            {/* <Typography variant="body2">Products</Typography> */}
            <MultiSelectChipDropdown
              keyName="product"
              handleSelectChange={handleSelectChange}
              handleDeleteChip={handleDeleteChip}
              options={
                selectedValues.band.length > 0 ? formDropdownValues.product : []
              }
              selectedValues={
                selectedValues.band.length > 0 ? selectedValues.product : []
              }
              setSelectedValues={setSelectedValues}
            />
             {errors.product && <Typography variant="caption" color="error">{errors.product}</Typography>}
          </Grid>
          </Grid>
          </Grid>
       </Box>
      </Grid>
    </Box>
  );
};

export default ProductDetailsForm;

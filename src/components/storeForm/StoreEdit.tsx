import React, { useEffect, useState } from 'react';
import DynamicForm from '../../components/dynamicForm/DynamicForm';
import { Box, Button, Checkbox, Container, Grid, TextField, Typography } from '@mui/material';
import FormSection from '../../components/dynamicForm/FormSection';
import AddressForm from '../../components/dynamicForm/forms/AddressForm';
import AdditionalInfoForm from '../../components/dynamicForm/forms/AdditionalInfoForm';
import PointContactForm from '../../components/dynamicForm/forms/PointContactForm';
import colorConfigs from '../../configs/colorConfigs';
import axios from 'axios';
import ApiService from '../../api/services/ApiService';
import { useLocation, useNavigate } from 'react-router-dom';

import { Phone } from '@mui/icons-material';
import { getURL } from '../../api';
import { API_ADDRESS } from '../../api/apiConfig';
import { error } from 'console';
type Props = {};

const ButtonPage = (props: Props) => {
  const [isChecked,setIsChecked]=useState(false)
  const handelCheckbox = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setIsChecked(e.target.checked)
  }
  const [name, setName] = useState<any>('')
  const [pointContactFormData, setPointContactFormData] = useState<any>({
    firstName: '',
    lastName: '',
    email: '',
    email1: '',
    phone: '',
    whatsapp: "",

  });

  const [addressFormData, setAddressFormData] = useState<any>({
    line1: '',

    city: '',
    district: '',
    state: '',
    zipcode: '',

  });
  const [additonalFormData, setAdditionalFormData] = useState<any>({
    avgSale: '',
    tags: [],
  });
  const [errors, setErrors] = useState<any>({})
  const navigate = useNavigate();
  const location = useLocation();
  const storeIdValue = location?.state?.storeId ?? "";
  const [storeId, setStoreId] = useState<any>(storeIdValue);


  useEffect(() => {
    getEditedData(storeId);
  }, []);

  const getEditedData = async (storeId: any) => {
    try {
      const result = await ApiService.callPostApi(
        getURL(API_ADDRESS.editStore), 
        {
          "storeId": storeId
        }
      );
      console.log("result storeId", result);
      setPointContactFormData({
        firstName: result?.data?.firstName ?? '',
        lastName: result?.data?.lastName ??'',
        email: result?.data?.email ?? '',
        email1: result?.data?.email1 ?? '',
        phone: result?.data?.phone ?? '',
        whatsapp: result?.data?.whatsapp ?? "",
        profileImg: result?.data?.profileImg ?? "",
    
      })
      setAddressFormData({
        line1:result?.data?.address?.line1 ?? '',
        city: result?.data?.address?.city ?? '',
        district: result?.data?.address?.district ?? '',
        state: result?.data?.address?.state ?? '',
        zipcode: result?.data?.address?.zipcode ?? '',
    
      })
      setAdditionalFormData({
        avgSale:result?.data?.avgSale ?? '',
        tags: result?.data?.tags?.join(',') ?? ''
        // tags:
      })
      setName(result?.data?.name ?? '')

      // setStoreData(result?.data?.stores ?? []);
      // setPageTotal(result?.data?.total);
    } catch (error: any) {
      console.error('Error fetching data:', error.message);
    }
  }


  const isValidEmail = (email: string) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);

  }

  const isValidNumber = (Phone: any) => {
    // const phoneRegex = /^\d{10}$/;
    const phoneRegex = /^[0-9]+$/;
    return phoneRegex.test(Phone);
  }

  const validateForm = () => {

    let err_item: Record<string, any> = {};
     if(!name) err_item['name'] = "Store name is required";

    if (!pointContactFormData.firstName) err_item['firstName'] = 'First name is required';
    if (!pointContactFormData.lastName) err_item['lastName'] = 'Last name is required';
    if (!pointContactFormData.email) {
      err_item['email'] = 'Email is required';
    } else if (!isValidEmail(pointContactFormData.email)) {
      err_item['email'] = 'Invalid Email format';

    }

    if (!pointContactFormData.phone) {

      err_item['phone'] = 'Phone number is required';

    } else if (!isValidNumber(pointContactFormData.phone)) {
      err_item['phone'] = 'Phone number must be numeric';
    }else if(pointContactFormData.phone.length !== 10){
      err_item['phone'] = "Phone number shoudld contain 10 digits"
    }

    if(!pointContactFormData.whatsapp){
      err_item['whatsapp'] = 'WhatsApp number is required';
    }else if (!isValidNumber(pointContactFormData.whatsapp)) {
      err_item['whatsapp'] = 'Whatsapp number must be numeric';
    }else if(pointContactFormData.whatsapp.length != 10){
      err_item['whatsapp'] = "Whatsapp number shoudld contain 10 digits"
    }




    if (!addressFormData.line1) err_item['line1'] = 'Address is required!';
    if (!addressFormData.city) err_item['city'] = 'City is required!';
    if (!addressFormData.district) err_item['district'] = 'District is required!';
    if (!addressFormData.zipcode) err_item['zipcode'] = 'Pin is required!';
    if (!addressFormData.state) err_item['state'] = 'State is required!';
    if (!additonalFormData.avgSale) err_item['avgSale'] = 'Average sale is required!';
    if (additonalFormData.tags.length === 0) err_item['tags'] = 'Tags are required!';
    setErrors(err_item);

    return Object.keys(err_item).length === 0;
  };





  async function editStore(storeId: any) {

    // const isValid = validateForm();
    // if (isValid) {
      try {
        const response = ApiService.callPostApi(
          // 'http://localhost:9001/api/stores'
          getURL(API_ADDRESS.updateStore),
          { 
            "storeId": storeId,
            "updatedStore":{
            ...pointContactFormData, "address": addressFormData, ...additonalFormData, name }
          },
        );

        response.then((res) => {
          navigate('/store/store-overview');
        })
      } catch (error) {
        console.log("Error adding audience:", error);
      }
    // }

  }



  return (
    <div style={{margin:"0 1rem"}}>
      <Typography variant="body1" sx={{ fontWeight: 'bold' }} mt={2}>
        Edit Store
      </Typography>

      <Box
        sx={{
          marginTop: 2,
          // display: 'flex',
          // flexDirection: 'column',
          // alignItems: 'center',
          width: "100%", boxShadow: 5, h: 450, borderRadius: '1rem',background:"white"

        }}
      >

        <Box sx={{ p: 3 }} component='form' onSubmit={(e: any) => {
          e.preventDefault();
          editStore(storeId);
        }} >
          <>
          <Typography variant="body2">
            Store Name<span style={{ color: 'red' }}>*</span>
          </Typography>
          <TextField size="small" variant="outlined" fullWidth margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            // required
              
            sx={{
              ...(errors.name && {
                "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                  
                  borderColor: "red",
                }
              })
            }}
          />
          {errors.name && 
                     <Typography variant="caption" color="error">{errors.name}</Typography>}
          </>
          <DynamicForm
          // onSubmit={(e: any) => {
          //   e.preventDefault();
          //   addStore();
          // }}
          >
            <FormSection sectionTitle="Point Of Contact">
              <PointContactForm errors={errors} pointContactFormData={pointContactFormData} setPointContactFormData={setPointContactFormData} />
            </FormSection>
            <FormSection sectionTitle="Address">
              <AddressForm addressFormData={addressFormData} errors={errors} setAddressFormData={setAddressFormData} />
            </FormSection>
            <FormSection sectionTitle="Additional Information">
              <AdditionalInfoForm additonalFormData={additonalFormData} errors={errors} setAdditionalFormData={setAdditionalFormData} />
            </FormSection>
          </DynamicForm>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
            <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
              <Checkbox sx={{ color: colorConfigs.primaryColor.red[600] }}  onChange={handelCheckbox}/>
              <Typography sx={{  }}>
                I accept the terms and privacy policy
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                type='submit'
                disabled={!isChecked}
                variant="contained" sx={{
                    alignItems: "center",
                    paddingX: "3rem",
                    borderRadius: "20px",
                    paddingY: "8px",
                    color:"white" ,
                    background: colorConfigs.primaryColor.red[600],
                     '&:hover': {
                    bgcolor: colorConfigs.primaryColor.red[600],
                  }
                }}>Edit</Button>
            </Box>
          </Box>

        </Box>




      </Box>

    </div>
  );
};

export default ButtonPage;

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ProductDetailsForm from "../../components/campignForm/ProductDetailsForm";
import ChooseOfferTable from "../../components/campignForm/ChooseOfferTable";
import TextEditor from "../../components/campignForm/TextEditor";

import ScheduleCampign from "../../components/campignForm/ScheduleCampign";
import ProductDetailsForm1 from "../../components/campignForm/ProductDetailsForm1";
import ApiService from "../../api/services/ApiService";
import ConfigCampaignTable from "../../components/campignForm/ConfigCampaignTable";
import ChooseTemplate from "../../components/campignForm/ChooseTemplate";
import CampaignPreview from "../../components/campignForm/CampaignPreview";
import ScheduleGroup from "../../components/campignForm/ScheduleGroup";
import CampaignSubmit from "../../components/campignForm/CampaignSubmit";
import { useDispatch, useSelector } from "react-redux";
import { resetCampaignStates, setProductDetails } from "../../redux/features/campaignSlice";
import { getURL } from "../../api";
import { API_ADDRESS } from "../../api/apiConfig";
import { Api } from "@mui/icons-material";
import CustomButton from "../../components/common/button/CustomButton";
import colorConfigs from "../../configs/colorConfigs";
import { RootState } from "../../redux/store";

const steps = [
  "Product details",
  "Choose offers",
  "Select template",
  "Groups",
  "Campaign Preview",
  "Campaign Submit",
];

const CreateCampignPage = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [productDetailsData, setProductDetailsData] = useState<any>({});
  const [errors, setErrors] = useState({});
  const [scheduleData, setScheduleData] = useState<any>({
    startDate: null,
    endDate: null,
    daysAfter: "",
    weeksAfter: {
      days: [],
      count: "",
    },
    repeat: {
      startTime: "",
      delay: "",
      count: "",
    },
  });
  const { chooseOffers } = useSelector((state: RootState) => state.campaignState);
  const [selectedCampaignRows, setSelectedCampaignRows] = useState<Record<any, any>[]>(chooseOffers.selectedRows);
  const [selectedEmail, setSelectedEmail] = useState<any>("");
  const [selectedSms, setSelectedSms] = useState<any>("");
  const [selectedWhatsApp, setSelectedWhatsApp] = useState<any>("");
  const dispatch = useDispatch();

  const [editorContent, setEditorContent] = useState<string>("");
  const [editorSubject, setEditorSubject] = useState<string>("");
 
  useEffect(() => {
    return () => {
      dispatch(resetCampaignStates());
    };
  }, []);
  
  const validateForm = () => {
    const newErrors: any = {};

    if (!productDetailsData.name) {
      newErrors.name = "Campaign Name is required";
    }

    if (!productDetailsData.description) {
      newErrors.description = "Campaign Description is required";
    }
    if (productDetailsData.domain.length === 0) {
      newErrors.domain = "Choose Domain is required";
    }

    if (productDetailsData.family.length === 0) {
      newErrors.family = "Choose Family is required";
    }
    if (productDetailsData.category.length === 0) {
      newErrors.category = "Choose category is required";
    }
    if (productDetailsData.band.length === 0) {
      newErrors.band = "Choose Brand is required";
    }
    if (productDetailsData.product.length === 0) {
      newErrors.product = "Choose Product is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitCampaign = async () => {
    dispatch(setProductDetails(productDetailsData));
    const response = await ApiService.callPostApi(
      // 'http://localhost:9001/api/campaign/create'
      getURL(API_ADDRESS.createCampaign),
      productDetailsData
    );
    console.log("calling response", response.data._id);

    let id = response.data._id; // Assuming the ID is in the response data
    localStorage.setItem("campaignId", id);
  };

  // const SubmitCampaignPreview = async () =>{
  //   const response
  // }

  // const submitScheduleCampaign = async () => {
  //   const response = await ApiService.scheduleputApi(
  //     'http://localhost:9001/api/campaign/schedule',
  //     // {...scheduleData, id: localStorage.getItem("campaignId")}
  //     { id: localStorage.getItem("campaignId"), schedule: { ...scheduleData } }
  //   )
  // }
  const submitEditorCampaign = async () => {
    const response = await ApiService.editorputApi(
      // 'http://localhost:9001/api/campaign/template'
      getURL(API_ADDRESS.templateCampign),

      payload
    );
  };

  const submitChooseOffer = async () => {
    console.log("calling payload", selectedCampaignRows);

    const payload = {
      id: localStorage.getItem("campaignId"),
      offer: {
        // title: "",
        // condition: "",
        // note: ""
        ...selectedCampaignRows,
      },
    };
    const response = await ApiService.scheduleputApi(
      // 'http://localhost:9001/api/campaign/offer',
      getURL(API_ADDRESS.campaignOffer),

      payload
    );
  };

  const payload: any = {
    id: localStorage.getItem("campaignId"),
    template: {
      email: {
        subject: editorSubject,
        body: editorContent,
      },
      whatsapp: {
        subject: "subject 1",
        body: "body 1",
      },
      sms: {
        subject: "subject 1",
        body: "body 1",
      },
    },
  };

  const handleNext = (e: any) => {
    const isValid = validateForm();
    if (activeStep === 0) {
      if (isValid) {
        submitCampaign();
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else if (activeStep === 1) {
      submitChooseOffer();
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else if (activeStep === 2) {
      submitEditorCampaign();
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else if (activeStep === 3) {
      //   submitScheduleCampaign();
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    e.preventDefault();
    console.log("calling e->", e);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [step, setStep] = useState(1);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleSubmit = (e: any) => {
  //   e.preventDefault();
  //   if (step === 3) {
  //     console.log("Form submitted with data:", formData);
  //   } else {
  //     setStep((prevStep) => prevStep + 1);
  //   }
  // };

  // const handleConfig = () => {
  //   console.log("calling handleConfig");
  // };

  return (
    <div
      style={{
        background: "white",
        padding: "2rem",
        borderRadius: "10px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        margin: "1rem 2rem",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
      {activeStep === 0 && (
        <Box component="form" onSubmit={handleNext}>
          <ProductDetailsForm1
            setProductDetailsData={setProductDetailsData}
            errors={errors}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "1.8rem",
            }}
          >
            <CustomButton
              variant="contained"
              type="submit"
              sx={{
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
            </CustomButton>
            <CustomButton
              variant="contained"
              type="submit"
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
            >
              Next
            </CustomButton>
          </div>
        </Box>
      )}
      {activeStep === 1 && (
        <form onSubmit={handleNext}>
          {/* <label>
              Email:
              <input type="email" name="email" value={formData.email || ''} onChange={handleChange} />
            </label> */}
          <ChooseOfferTable
            selectedCampaignRows={selectedCampaignRows}
            setSelectedCampaignRows={setSelectedCampaignRows}
          />

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <CustomButton
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
              variant="contained"
              onClick={() => setActiveStep(activeStep - 1)}
            >
              Back
            </CustomButton>
            <CustomButton
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
              variant="contained"
              type="submit"
            >
              Next
            </CustomButton>
          </div>
        </form>
      )}
      {activeStep === 2 && (
        <Box component="form" onSubmit={handleNext}>
          <ChooseTemplate
            setSelectedEmail={setSelectedEmail}
            selectedEmail={selectedEmail}
            selectedSms={selectedSms}
            setSelectedSms={setSelectedSms}
            setSelectedWhatsApp={setSelectedWhatsApp}
            selectedWhatsApp={selectedWhatsApp}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
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
              variant="contained"
              onClick={() => setActiveStep(activeStep - 1)}
            >
              Back
            </Button>
            <Button
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
              variant="contained"
              type="submit"
            >
              Next
            </Button>
          </div>
        </Box>
      )}
      {activeStep === 3 && (
        <Box component="form" onSubmit={handleNext}>
          {/* <ScheduleCampign setScheduleData={setScheduleData} scheduleData={scheduleData} />
          <Button sx={{ display: 'flex', justifyContent: 'flex-end' }} variant="contained" type="submit">Next</Button> */}

          <ScheduleGroup
            scheduleData={scheduleData}
            setScheduleData={setScheduleData}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
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
              variant="contained"
              onClick={() => setActiveStep(activeStep - 1)}
            >
              Back
            </Button>
            <Button
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
              variant="contained"
              type="submit"
            >
              Next
            </Button>
          </div>
        </Box>
      )}

      {activeStep === 4 && (
        <Box component="form" onSubmit={handleNext}>
          <CampaignPreview
            setActiveStep={setActiveStep}
            activeStep={activeStep}
          />
        </Box>
      )}

      {activeStep === 5 && (
        <Box component="form" onSubmit={handleNext}>
          <CampaignSubmit />
          {/* <Button sx={{ display: 'flex', justifyContent: 'flex-end' }} variant="contained" type="submit">Next</Button> */}
        </Box>
      )}
    </div>
  );
};

export default CreateCampignPage;

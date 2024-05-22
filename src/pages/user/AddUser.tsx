import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  Box,
  Grid,
  TextField,
  Button,
  Checkbox,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import "./AddUser.css";
import colorConfigs from "../../configs/colorConfigs";
import addbutton from "../../assets/images/PNG/add button.png";
import maskGroup from "../../assets/images/PNG/Mask group.png";
import * as Yup from "yup";
import { getURL } from "../../api";
import ApiService from "../../api/services/ApiService";
import { API_ADDRESS } from "../../api/apiConfig";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const UserValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(
      /^[A-Za-z]+$/,
      "First name must contain only alphabetic characters"
    )
    .max(25, "Must be 25 characters or less")
    .required("First name is required"),
  lastName: Yup.string()
    .matches(/^[A-Za-z]+$/, "Last name must contain only alphabetic characters")
    .max(25, "Must be 25 characters or less")
    .required("Last Name is Required"),
  email1: Yup.string()
    .email("Invalid email address")
    .required("email1 is Required"),
  email2: Yup.string().email("Invalid email address"),
  phone: Yup.string()
    .max(10, "must 10 digits")
    .min(10, "must be 10 digits")
    .required("Phone Number is Required"),
  whatsapp: Yup.string()
    .max(10, "must 10 digits")
    .min(10, "must be 10 digits")
    .required("WhatsApp Number is Required"),
  address1: Yup.string()
    .max(250, "Must be 250 characters or less")
    .required("Address Line 1  is Required"),
  address2: Yup.string(),
  city: Yup.string()
    .matches(/^[a-zA-Z\s]*$/, "City must contain only letters and spaces")
    .required("City is required"),
  district: Yup.string()
    .matches(/^[a-zA-Z\s]*$/, "District must contain only letters and spaces")
    .required("District is required"),
  state: Yup.string()
    .matches(/^[a-zA-Z\s]*$/, "State must contain only letters and spaces")
    .required("State is required"),
  zipcode: Yup.string()
    .max(6, "must be 6 digits")
    .min(6, "must be 6 digits")
    .required("Zipcode is Required"),
  role: Yup.string().required("Assign Roles is Required"),
  imageUrl: Yup.string().required("Image is required"),
});

type permission1 = {
  view: boolean;
  add: boolean;
  delete: boolean;
  edit: boolean;
  approve: boolean;
  start: boolean;
  restart: boolean;
  pause: boolean;
};

type AccountType = {
  role: string;
  permissions: {
    store: permission1;
    tag: permission1;
    offer: permission1;
    campaign: permission1;
  };
  // permissions: {
  //   store: { view: boolean; add: boolean; delete: boolean; edit: boolean };
  //   tag: { view: boolean; add: boolean; delete: boolean };
  //   offer: { view: boolean; add: boolean; delete: boolean };
  //   campaign: {
  //     view: boolean;
  //     add: boolean;
  //     delete: boolean;
  //     edit: boolean;
  //     approve: boolean;
  //     start: boolean;
  //     restart: boolean;
  //     pause: boolean;
  //   };
  // };
};

type FormValues = {
  firstName: string;
  lastName: string;
  email1: string;
  email2: string;
  phone: string;
  whatsapp: string;
  address1: string;
  address2: string;
  city: string;
  district: string;
  state: string;
  zipcode: string;
  role: string;
  accountType?: any;
  imageUrl: string;
};

const AddUser: React.FC = () => {
  const [roleData, setRoleData] = useState<AccountType[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageData, setImageData] = useState<any>({ file: null });
  const [imageUrl, setImageUrl] = useState<string>("");

  const handelCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };
  useEffect(() => {
    ApiService.callGetApi(getURL(API_ADDRESS.accountType))
      .then((res) => {
        setRoleData(res as AccountType[]);
      })
      .catch((error) => {
        console.log("error fetching user roles:", error);
      });
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (
    values: FormValues
    // { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    values.accountType = roleData.find(
      (account) => account.role === values.role
    );
    values.imageUrl = imageUrl;

    ApiService.callPostApi(getURL(API_ADDRESS.addUser), values).then((res) => {
      if (res.status === 200) {
        toast("User added successfully!", {
          autoClose: 1000,
          onClose: () => {
            navigate("/user/user-overview");
          },
        });
      }
    });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setImageData({ file });

    if (file) {
      const maxSize = 2 * 1024 * 1024; // 2 MB
      if (file.size > maxSize) {
        toast.error("File size exceeds the maximum allowed size (2 MB)");
        event.target.value = "";
      } else {
        setSelectedFile(file);
      }
    }
  };
  const [imageToastShown, setImageToastShown] = useState(false);
  const handleFileUpload = async () => {
    if (imageData.file) {
      try {
        const formData = new FormData();
        formData.append("image", imageData.file);

        await axios
          .post(getURL(API_ADDRESS.imageUpload), formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              enctype: "multipart/form-data",
            },
          })
          .then((res: any) => {
            debugger;
            if (res.data.success === true) {
              setImageUrl(res.data.imageUrl);
            }
          });

        toast("Image successfully uploaded");
      } catch (error) {
        console.log("Error uploading image: ", error);
        toast("Failed. Try again.. ");
      }
    } else {
      if (!imageData.file && !imageToastShown) {
        toast("Please choose an image.. ");
        setImageToastShown(true);
      }
    }
  };

  const [selectedState, setSelectedState] = useState("");
  const [districts, setDistricts] = useState<any>([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const states = [
    {
      name: "Karnataka",
      districts: [
        {
          name: "Bangalore",
          cities: ["Bangalore City", "Electronic City", "Whitefield"],
        },
        {
          name: "Mysore",
          cities: ["Mysore City", "Vijayanagar", "Kuvempunagar"],
        },
      ],
    },
    {
      name: "Maharashtra",
      districts: [
        {
          name: "Mumbai",
          cities: ["Mumbai City", "Thane", "Navi Mumbai"],
        },
        {
          name: "Pune",
          cities: ["Pune City", "Pimpri-Chinchwad", "Hinjewadi"],
        },
      ],
    },
    // Add more states, districts, and cities as needed
  ];

  const [addressFormData, setAddressFormData] = useState<any>({
    line1: "",

    city: "",
    district: "",
    state: "",
    zipcode: "",
  });

  return (
    <div className="overviewClass">
      <ToastContainer />
      <div className="header">
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Add User
        </Typography>
      </div>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email1: "",
          email2: "",
          phone: "",
          whatsapp: "",
          address1: "",
          address2: "",
          city: "",
          district: "",
          state: "",
          zipcode: "",
          role: "",
          imageUrl: "",
        }}
        validationSchema={UserValidationSchema}
        onSubmit={async (values) => handleSubmit(values)}
      >
        {/*
        onSubmit = {(values) => { console.log('submitting')}}
       {({ errors, touched, validateField, validateForm }) => (

        */}
        {(props) => {
          const {
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
            setFieldValue,
            resetForm,
          } = props;

          const handleStateChange = (event: any) => {
            const stateName = event.target.value;
            setSelectedState(stateName);
            setFieldValue("state", stateName);
            const districts =
              states.find((state) => state.name === stateName)?.districts ?? [];

            setDistricts(districts);
            setSelectedCity("");
            setSelectedDistrict("");
            setAddressFormData({
              ...addressFormData,
              state: event.target.value,
            });
          };

          const handleDistrictChange = (event: any) => {
            const districtName = event.target.value;
            setSelectedDistrict(districtName);
            setFieldValue("district", districtName);

            const cities =
              districts.find((district: any) => district.name === districtName)
                ?.cities ?? [];
            setCities(cities);
            setSelectedCity("");
            setAddressFormData({
              ...addressFormData,
              district: event.target.value,
            });
          };

          const handleCityChange = (event: any) => {
            setSelectedCity(event.target.value);
            setFieldValue("city", event.target.value);
            setAddressFormData({
              ...addressFormData,
              city: event.target.value,
            });
            // setSelectedDistrict('');
          };

          return (
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
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        padding: "10px",
                        background: "#EEEBEB",
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "20px",
                        marginBottom: "1.5rem",
                      }}
                    >
                      <Grid container spacing={3}>
                        <Grid item xs={6}>
                          <Typography variant="body2">
                            First Name <span style={{ color: "red" }}>*</span>
                          </Typography>
                          <Field
                            as={TextField}
                            size="small"
                            fullWidth
                            variant="outlined"
                            error={errors.firstName && touched.firstName} // Set error prop based on whether there's an error
                            name="firstName"
                          />
                          {errors.firstName && touched.firstName ? (
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {errors.firstName}
                            </div>
                          ) : null}
                        </Grid>

                        <Grid item xs={6}>
                          <Typography variant="body2">
                            Last Name <span style={{ color: "red" }}>*</span>
                          </Typography>
                          <Field
                            as={TextField}
                            fullWidth
                            variant="outlined"
                            size="small"
                            name="lastName"
                            error={errors.lastName && touched.lastName}
                            // Link with form state
                          />
                          {errors.lastName && touched.lastName ? (
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {errors.lastName}
                            </div>
                          ) : null}
                        </Grid>
                      </Grid>
                    </Box>
                    <Box
                      sx={{
                        padding: "10px",
                        background: "#EEEBEB",
                        marginBottom: "1.5rem",
                      }}
                    >
                      <Grid item xs={12} sx={{ marginBottom: "1rem" }}>
                        <Typography
                          variant="body2"
                          sx={{ marginBottom: "0.6rem" }}
                        >
                          Upload Your Photo (2 MB max size) &nbsp;
                          <span style={{ color: "red" }}>*</span>
                        </Typography>

                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                        <Button
                          type="button"
                          onClick={handleFileUpload}
                          sx={{
                            alignItems: "center",
                            color: "white",
                            paddingX: "1rem",
                            paddingY: "8.5px",
                            background: colorConfigs.primaryColor.red[600],
                            "&:hover": {
                              background: colorConfigs.primaryColor.red[600],
                            },
                          }}
                        >
                          Upload
                        </Button>

                        {errors.imageUrl && touched.imageUrl ? (
                          <div style={{ color: "red", fontSize: "12px" }}>
                            {errors.imageUrl}
                          </div>
                        ) : null}
                      </Grid>
                    </Box>
                    <Box
                      sx={{
                        padding: "10px",
                        background: "#EEEBEB",
                        marginBottom: "1.5rem",
                      }}
                    >
                      <Typography variant="body2">
                        Email(Primary) <span style={{ color: "red" }}>*</span>
                      </Typography>
                      <Field
                        as={TextField}
                        fullWidth
                        variant="outlined"
                        size="small"
                        name="email1" // Link with form state
                        error={errors.email1 && touched.email1}
                      />
                      {errors.email1 && touched.email1 ? (
                        <div style={{ color: "red", fontSize: "12px" }}>
                          {errors.email1}
                        </div>
                      ) : null}
                    </Box>
                    <Box
                      sx={{
                        padding: "10px",
                        background: "#EEEBEB",
                        marginBottom: "1.5rem",
                      }}
                    >
                      <Typography variant="body2">Email(Secondary)</Typography>
                      <Field
                        as={TextField}
                        fullWidth
                        variant="outlined"
                        size="small"
                        name="email2"
                        error={errors.email2 && touched.email2} // Link with form state
                      />
                      {errors.email2 && touched.email2 ? (
                        <div style={{ color: "red", fontSize: "12px" }}>
                          {errors.email2}
                        </div>
                      ) : null}
                    </Box>
                    <Box
                      sx={{
                        padding: "10px",
                        background: "#EEEBEB",
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "20px",
                        marginBottom: "1.5rem",
                      }}
                    >
                      <Grid container spacing={3}>
                        <Grid item xs={6}>
                          <Typography variant="body2">
                            Phone Number <span style={{ color: "red" }}>*</span>
                          </Typography>
                          <Field
                            as={TextField}
                            size="small"
                            fullWidth
                            variant="outlined"
                            name="phone"
                            error={errors.phone && touched.phone}
                            onChange={(e: any) => {
                              e.preventDefault();
                              const { value } = e.target;
                              const regex = /^[0-9]*$/;
                              if (regex.test(value.toString())) {
                                setFieldValue("phone", value);
                              }
                            }}
                          />
                          {errors.phone && touched.phone ? (
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {errors.phone}
                            </div>
                          ) : null}
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2">
                            WhatsApp Number
                            <span style={{ color: "red" }}>*</span>
                          </Typography>
                          <Field
                            as={TextField}
                            fullWidth
                            variant="outlined"
                            size="small"
                            name="whatsapp"
                            error={errors.whatsapp && touched.whatsapp}
                            onChange={(e: any) => {
                              e.preventDefault();
                              const { value } = e.target;
                              const regex = /^[0-9]*$/;
                              if (regex.test(value.toString())) {
                                setFieldValue("whatsapp", value);
                              }
                            }}
                          />
                          {errors.whatsapp && touched.whatsapp ? (
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {errors.whatsapp}
                            </div>
                          ) : null}
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        padding: "10px",
                        background: "#EEEBEB",
                        marginBottom: "1.5rem",
                      }}
                    >
                      <Grid item xs={12}>
                        <Typography variant="body2">
                          Address Line 1 <span style={{ color: "red" }}>*</span>
                        </Typography>
                        <Field
                          as={TextField}
                          fullWidth
                          variant="outlined"
                          size="small"
                          name="address1"
                          error={errors.address1 && touched.address1} // Link with form state
                        />
                        {errors.address1 && touched.address1 ? (
                          <div style={{ color: "red", fontSize: "12px" }}>
                            {errors.address1}
                          </div>
                        ) : null}
                      </Grid>
                    </Box>
                    <Box
                      sx={{
                        padding: "10px",
                        background: "#EEEBEB",
                        marginBottom: "1.5rem",
                      }}
                    >
                      <Grid item xs={12}>
                        <Typography variant="body2">Address Line 2</Typography>
                        <Field
                          as={TextField}
                          fullWidth
                          variant="outlined"
                          size="small"
                          name="address2"
                          error={errors.address2 && touched.address2} // Link with form state
                        />
                        {errors.address2 && touched.address2 ? (
                          <div style={{ color: "red", fontSize: "12px" }}>
                            {errors.address2}
                          </div>
                        ) : null}
                      </Grid>
                    </Box>
                    <Box
                      sx={{
                        padding: "10px",
                        background: "#EEEBEB",
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "20px",
                        marginBottom: "1.5rem",
                      }}
                    >
                      <Grid container spacing={3}>
                        <Grid item xs={6}>
                          <Typography variant="body2">
                            State <span style={{ color: "red" }}>*</span>
                          </Typography>
                          <Field
                            as={Select}
                            size="small"
                            fullWidth
                            variant="outlined"
                            name="state"
                            value={selectedState}
                            onChange={handleStateChange}
                            error={errors.state && touched.state}
                          >
                            <MenuItem value="">
                              <p>Select a state</p>
                            </MenuItem>
                            {states.map((state, index) => (
                              <MenuItem key={index} value={state.name}>
                                {state.name}
                              </MenuItem>
                            ))}
                          </Field>
                          {errors.state && touched.state ? (
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {errors.state}
                            </div>
                          ) : null}
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2">
                            District <span style={{ color: "red" }}>*</span>
                          </Typography>
                          <Field
                            as={Select}
                            fullWidth
                            variant="outlined"
                            size="small"
                            name="district"
                            value={selectedDistrict}
                            onChange={handleDistrictChange}
                            error={errors.district && touched.district}
                          >
                            {" "}
                            <MenuItem value="">
                              <em>Select a district</em>
                            </MenuItem>
                            {districts.map((district: any, index: any) => (
                              <MenuItem key={index} value={district.name}>
                                {district.name}
                              </MenuItem>
                            ))}
                          </Field>
                          {errors.district && touched.district ? (
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {errors.district}
                            </div>
                          ) : null}
                        </Grid>
                      </Grid>
                    </Box>
                    <Box
                      sx={{
                        padding: "10px",
                        background: "#EEEBEB",
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "20px",
                        marginBottom: "1.5rem",
                      }}
                    >
                      <Grid container spacing={3}>
                        <Grid item xs={6}>
                          <Typography variant="body2">
                            City <span style={{ color: "red" }}>*</span>
                          </Typography>
                          <Field
                            as={Select}
                            size="small"
                            fullWidth
                            variant="outlined"
                            name="city"
                            error={errors.city && touched.city}
                            value={selectedCity}
                            onChange={handleCityChange}
                          >
                            {" "}
                            <MenuItem value="">
                              <p>Select a city</p>
                            </MenuItem>
                            {cities.map((city, index) => (
                              <MenuItem key={index} value={city}>
                                {city}
                              </MenuItem>
                            ))}
                          </Field>
                          {errors.city && touched.city ? (
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {errors.city}
                            </div>
                          ) : null}
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2">
                            Zip Code <span style={{ color: "red" }}>*</span>
                          </Typography>
                          <Field
                            as={TextField}
                            fullWidth
                            variant="outlined"
                            size="small"
                            name="zipcode"
                            error={errors.zipcode && touched.zipcode}
                            onChange={(e: any) => {
                              e.preventDefault();
                              const { value } = e.target;
                              const regex = /^[0-9]*$/;
                              if (regex.test(value.toString())) {
                                setFieldValue("zipcode", value);
                              }
                            }}
                          />
                          {errors.zipcode && touched.zipcode ? (
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {errors.zipcode}
                            </div>
                          ) : null}
                        </Grid>
                      </Grid>
                    </Box>
                    <Box
                      sx={{
                        padding: "10px",
                        marginBottom: "1.5rem",
                      }}
                    >
                      <Grid
                        item
                        xs={12}
                        sx={{ background: "#EEEBEB", padding: "10px" }}
                      >
                        <Typography sx={{ width: "33%", flexShrink: 0 }}>
                          Assign Roles &nbsp;
                          <span style={{ color: "red" }}>*</span>
                        </Typography>

                        <Field
                          as={Select}
                          variant="outlined"
                          // sx={{  }}
                          name="role"
                          sx={{
                            ...(errors.role &&
                              touched.role && {
                                "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline":
                                  {
                                    textAlign: "left",
                                    borderColor: "red",
                                  },
                              }),
                            width: "100%",
                          }}
                        >
                          {roleData &&
                            roleData.map((roleItem, index) => (
                              <MenuItem key={index} value={roleItem.role}>
                                {roleItem.role}
                              </MenuItem>
                            ))}
                        </Field>
                        {errors.role && touched.role ? (
                          <div style={{ color: "red", fontSize: "12px" }}>
                            {errors.role}
                          </div>
                        ) : null}
                      </Grid>
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
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox
                      checked={isChecked}
                      onChange={handelCheckbox}
                      sx={{ color: colorConfigs.primaryColor.red[600] }}
                    />
                    <Typography>
                      I confirm the details furnished are correct and true.
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "15px" }}
                  >
                    <Button
                      type="submit"
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
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={!isChecked}
                      sx={{
                        alignItems: "center",
                        color: "white",
                        paddingX: "3rem",
                        borderRadius: "20px",
                        paddingY: "10px",
                        background: colorConfigs.primaryColor.red[600],
                      }}
                    >
                      ADD
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddUser;

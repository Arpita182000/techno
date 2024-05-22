import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import colorConfigs from "../../../configs/colorConfigs";
import axios from "axios";
import { API_ADDRESS } from "../../../api/apiConfig";
import { getURL } from "../../../api";

const PointContactForm = ({
  pointContactFormData,
  setPointContactFormData,
  errors,
}: any) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageData, setImageData] = useState<any>({ file: null });
  console.log("calling errors", errors);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const maxSize = 2 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error("File size exceeds the maximum allowed size (2 MB)");
        event.target.value = "";
      } else {
        setSelectedFile(file);
        setImageData({ file });
      }
    }
  };

  const handleImageUpload = async () => {
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
              pointContactFormData.profileImg = res.data.imageUrl;
            }
          });

        toast("Image successfully uploaded");
      } catch (error) {
        console.log("Error uploading image: ", error);
        toast("Failed. Try again.. ");
      }
    } else {
      toast("Please choose an image.. ");
    }
  };

  return (
    <div>
      <Grid container spacing={3} py={2}>
        <Grid item xs={6}>
          <Typography variant="body2">
            Frist Name <span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            size="small"
            fullWidth
            variant="outlined"
            value={pointContactFormData.firstName}
            onChange={(e) =>
              setPointContactFormData({
                ...pointContactFormData,
                firstName: e.target.value,
              })
            }
            required
            // {...errors.firstName && <Typography variant="caption" color="error">{errors.firstName}</Typography>}

            sx={{
              ...(errors.firstName && {
                "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                  borderColor: "red",
                },
              }),
            }}
          />
          {errors.firstName && (
            <Typography variant="caption" color="error">
              {errors.firstName}
            </Typography>
          )}
        </Grid>

        <Grid item xs={6}>
          <Typography variant="body2">
            Last Name <span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={pointContactFormData.lastName}
            onChange={(e) =>
              setPointContactFormData({
                ...pointContactFormData,
                lastName: e.target.value,
              })
            }
            required
            sx={{
              ...(errors.lastName && {
                "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                  borderColor: "red",
                },
              }),
            }}
          />
          {errors.lastName && (
            <Typography variant="caption" color="error">
              {errors.lastName}
            </Typography>
          )}
        </Grid>
      </Grid>
      <Grid container spacing={3} py={2}>
        <Grid item xs={6}>
          <Typography variant="body2">
            Email(Primary)<span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            size="small"
            fullWidth
            variant="outlined"
            value={pointContactFormData.email}
            required
            onChange={(e) =>
              setPointContactFormData({
                ...pointContactFormData,
                email: e.target.value,
              })
            }
            sx={{
              ...(errors.email && {
                "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                  borderColor: "red",
                },
              }),
            }}
          />
          {errors.email && (
            <Typography variant="caption" color="error">
              {errors.email}
            </Typography>
          )}
        </Grid>

        <Grid item xs={6}>
          <Typography variant="body2">Email(Secondary)</Typography>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={pointContactFormData.email1}
            onChange={(e) =>
              setPointContactFormData({
                ...pointContactFormData,
                email1: e.target.value,
              })
            }
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} py={2}>
        <Grid item xs={6}>
          <Typography variant="body2">
            Phone Number<span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            size="small"
            fullWidth
            variant="outlined"
            value={pointContactFormData.phone}
            onChange={(e) =>
              setPointContactFormData({
                ...pointContactFormData,
                phone: e.target.value,
              })
            }
            required
            sx={{
              ...(errors.phone && {
                "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                  borderColor: "red",
                },
              }),
            }}
          />
          {errors.phone && (
            <Typography variant="caption" color="error">
              {errors.phone}
            </Typography>
          )}
        </Grid>

        <Grid item xs={6}>
          <Typography variant="body2">
            Whats App Number<span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={pointContactFormData.whatsapp}
            onChange={(e) =>
              setPointContactFormData({
                ...pointContactFormData,
                whatsapp: e.target.value,
              })
            }
            sx={{
              ...(errors.whatsapp && {
                "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                  borderColor: "red",
                },
              }),
            }}
          />
          {errors.whatsapp && (
            <Typography variant="caption" color="error">
              {errors.whatsapp}
            </Typography>
          )}
        </Grid>
      </Grid>

      <div>
        <Grid item xs={12} sx={{ marginBottom: "1rem" }}>
          <Typography variant="body2" sx={{ marginBottom: "0.6rem" }}>
            Upload Your Photo (2 MB max size) &nbsp;
            <span style={{ color: "red" }}>*</span>
          </Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            <label
              htmlFor="fileInput"
              style={{
                backgroundColor: colorConfigs.primaryColor.red[600],
                color: "white",
                padding: "8px 3px",
                cursor: "pointer",
                width: "10%",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              Choose File
            </label>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            {/* Display file name if selected */}
            <div
              style={{
                border: "1px gray solid",
                height: "38px",
                width: "90%",
                justifyContent: "flex-start",
                alignItems: "center",
                display: "flex",
              }}
            >
              {selectedFile && <span>Selected File: {selectedFile.name}</span>}
            </div>
            <Button
              sx={{
                alignItems: "center",
                      color: "white",
                      paddingX: "1rem",
                      paddingY: "8.5px",
                      background: colorConfigs.primaryColor.red[600],
                      "&:hover": {
                        background: colorConfigs.primaryColor.red[600]  
                      }
              }}
              type="button"
              onClick={handleImageUpload}
            >
              Upload
            </Button>
          </div>
        </Grid>
      </div>
    </div>
  );
};

export default PointContactForm;

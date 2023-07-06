import {
  Typography,
  Box,
  Modal,
  Stack,
  TextField,
  Button,
  Autocomplete,
  Divider,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FormikProvider, useFormik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Edit({ open, setOpen }) {
  const [add, setAdd] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const type = window.location.pathname;
  const deviceType = type.split("/")[2];
  const status = [
    {
      id: 1,
      label: "Available",
    },
    {
      id: 2,
      label: "Assigned",
    },
  ];
  const editValidaitonSchema = Yup.object().shape({
    id: Yup.number().required("ID is required"),
    ModelNumber: Yup.string().required("Model No. is required"),
    DeviceID: Yup.string().required("Device ID is required"),
    Processor: Yup.string().required("Processor is required"),
    RAM: Yup.string().required("Please fill this field"),
    Storage: Yup.string().required("Please fill this field"),
   // Status: Yup.string().required("Please select status"),
   // AssignedTo: Yup.string().required("please select !!"),
  });
  const formik = useFormik({
    initialValues: {
      id: "",
      ModelNumber: "",
      DeviceID: "",
      Processor: "",
      RAM: "",
      Storage: "",
      Status: "",
      AssignedTo: "",
    },
    validationSchema: editValidaitonSchema,
    onSubmit: (values) => {
      console.log(values);
      const deviceData = {
        id: Number(values.id),
        ModelNumber: values.ModelNumber,
        DeviceID: values.DeviceID,
        Processor: values.Processor,
        RAM: values.RAM,
        Storage: values.Storage,
        Status: values.Status.label,
        AssignedTo: values.AssignedTo.label,
      };
      axios
        .post(`http://localhost:8000/${deviceType}`, deviceData)
        .then((response) => setAdd(response.data))
        .catch((error) => console.log(error));
    
    handleClose()  },
  });
  const {
    values,
    handleSubmit,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    getFieldProps,
    
  } = formik;

  // const addDevice = () => {
  //   axios
  //     .post(`http://localhost:8000/${deviceType}`, deviceData)
  //     .then((response) => setAdd(response.data))
  //     .catch((error) => console.log(error));
  // };

  console.log("add", add);

  console.log("errors", errors);
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            width: 550,
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            position: "absolute",
            boxShadow: 24,
            top: "20%",
            left: "30%",
            p: 2,
          }}
        >
          <Typography
            variant="h5"
            mb={1}
            ml={5}
            align="flex-start"
            justifyContent="center"
            sx={{ textTransform: "capitalize" }}
          >
            {deviceType}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
              <Stack
                direction="column"
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                <Stack direction="row" spacing={2}>
                  <TextField
                    label="id"
                    name="id"
                    value={values.id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.id && errors.id)}
                    helperText={Boolean(touched.id && errors.id)}
                  />
                  <TextField
                    label="Model No."
                    name="ModelNumber"
                    value={values.ModelNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    {...getFieldProps("ModelNumber")}
                    error={Boolean(touched.ModelNumber && errors.ModelNumber)}
                    helperText={touched.ModelNumber && errors.ModelNumber}
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label="Device ID"
                    name="DeviceID"
                    value={values.DeviceID}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.DeviceID && errors.DeviceID)}
                    helperText={touched.DeviceID && errors.DeviceID}
                  />
                  <TextField
                    label="Processor"
                    name="Processor"
                    value={values.Processor}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.Processor && errors.Processor)}
                    helperText={touched.Processor && errors.Processor}
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label="RAM"
                    name="RAM"
                    value={values.RAM}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.RAM && errors.RAM)}
                    helperText={touched.RAM && errors.RAM}
                  />
                  <TextField
                    label="Storage"
                    name="Storage"
                    value={values.Storage}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.Storage && errors.Storage)}
                    helperText={touched.Storage && errors.Storage}
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Autocomplete
                    options={status?.map((item) => ({
                      label: item.label,
                      id: item.id,
                    }))}
                    getOptionLabel={option=>option.label}
                    sx={{ width: 235 }}
                    name="Status"
                    onChange={(e, value) => setFieldValue("Status", value)}
                   value={values.Status.label}
                  
                    onBlur={handleBlur}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="Status"
                        label="Status"
                        error={Boolean(touched.Status && errors.Status)}
                        helperText={touched.Status && errors.Status}
                      />
                    )}
                  />
                  <Autocomplete
                    options={status?.map((item) => ({
                      label: item.label,
                      id: item.id,
                    }))}
                    sx={{ width: 235 }}
                    name="AssignedTo"
                    onChange={(e, value) => setFieldValue("AssignedTo", value)}
                    value={values.AssignedTo}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Assigned To"
                        error={Boolean(touched.AssignedTo && errors.AssignedTo)}
                        helperText={touched.AssignedTo && errors.AssignedTo}
                      />
                    )}
                  />

                  {/* <FormControl>
                {" "}
                <InputLabel id="demo-simple-select-assigned">
                  Assigned to
                </InputLabel>
                <Select
                  labelId="demo-simple-select-assigned"
                  // value="assigned"
                  label="assigned to"
                  sx={{ width: 235 }}
                >
                  <MenuItem>Joe</MenuItem>
                  <MenuItem>Ross</MenuItem>
                </Select>
              </FormControl> */}
                </Stack>
                <Stack
                  direction="row"
                  sx={{
                    width: "87%",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button variant="outlined" sx={{ mr: 2 }}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained">
                    Save
                  </Button>
                </Stack>
              </Stack>
            </Form>
          </FormikProvider>
        </Box>
      </Modal>
    </>
  );
}

export default Edit;

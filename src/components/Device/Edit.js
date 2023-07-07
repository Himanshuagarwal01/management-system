import {
  Typography,
  Box,
  Modal,
  Stack,
  TextField,
  Button,
  Autocomplete,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FormikProvider, useFormik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Edit({ open, setOpen, modalType, data,onChangeSpot,setOnChangeSpot }) {
  const [add, setAdd] = useState([]);
  const [error, setError] = useState("");
  const [openn, setOpenn] = useState(false);
  const [list,setList]=useState([])
  const handleClose = () => {
    resetForm()
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
  const handleClickk = () => {
    setOpenn(true);
  };

  const handleClosee = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenn(false);
  };
  const editValidaitonSchema = Yup.object().shape({
    // id: Yup.number().required("ID is required"),
    ModelNumber: Yup.string().required("Model No. is required"),
    DeviceID: Yup.number().required("Device ID is required"),
    Processor: Yup.string().required("Processor is required"),
    RAM: Yup.string().required("Please fill this field"),
    Storage: Yup.string().required("Please fill this field"),
    Status: Yup.string().required("Please select status"),
    AssignedTo: Yup.string().required("please select !!"),
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
    onSubmit: (values, { setErrors }) => {
      console.log("values", values);
      const deviceData = {
        id: values.id,
        ModelNumber: values.ModelNumber,
        DeviceID: Number(values.DeviceID),
        Processor: values.Processor,
        RAM: values.RAM,
        Storage: values.Storage,
        Status: values.Status,
        AssignedTo: values.AssignedTo,
      };
      // console.log("deviceData", deviceData);

      const dataID = list.find((x) => x.DeviceID === Number(values.DeviceID))
     
      if (!dataID) {
        axios
          .post(`http://localhost:8000/${deviceType}`, deviceData)
          .then((response) => setAdd(response.data))
          .catch((error) => {  
            console.log(error);
          });
          handleClose()
          setOnChangeSpot(!onChangeSpot)
      } else {
        //setError("This ID is already exists");
        setError("This ID is already exists");
            handleClickk();
        console.log("setError", error);
        
        // setErrors({DeviceID:"This ID is already exists"})
        // console.log("setErrors",setErrors);
      }
     // handleClose();
    },
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
    resetForm
  } = formik;

  useEffect(()=>{
    setList(data)
    console.log("d1",data)
    console.log("list",list);
  },[data])
  // useEffect(() => {
  //   setFieldValue("DeviceID", data.length + 1);
  // }, [data]);

  // const addDevice = () => {
  //   axios
  //     .post(`http://localhost:8000/${deviceType}`, deviceData)
  //     .then((response) => setAdd(response.data))
  //     .catch((error) => console.log(error));
  // };

  console.log("add", add);

  console.log("errors", errors);
  console.log("val", values);
  console.log("ddd", data.length);

  return (
    <>
      <Modal open={open} onClose={handleClose} data={data}>
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
            {modalType} {deviceType}
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
                  {/* <TextField
                    label="id"
                    name="id"
                    value={values.id}
                    disabled
                  /> */}
                  <TextField
                    label="Device ID"
                    name="DeviceID"
                    value={values.DeviceID}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean((touched.DeviceID && errors.DeviceID)||error)}
                    helperText={(touched.DeviceID && errors.DeviceID)||error}
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
                    label="Processor"
                    name="Processor"
                    value={values.Processor}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.Processor && errors.Processor)}
                    helperText={touched.Processor && errors.Processor}
                  />
                  <TextField
                    label="RAM"
                    name="RAM"
                    value={values.RAM}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.RAM && errors.RAM)}
                    helperText={touched.RAM && errors.RAM}
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label="Storage"
                    name="Storage"
                    value={values.Storage}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.Storage && errors.Storage)}
                    helperText={touched.Storage && errors.Storage}
                  />
                  <Autocomplete
                    options={
                      status?.map((item) => ({
                        label: item.label,
                        id: item.id,
                      })) || []
                    }
                    getOptionLabel={(option) => option.label}
                    sx={{ width: 235 }}
                    name="Status"
                    onChange={(e, value) => {
                      setFieldValue("Status", value?.label);
                    }}
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
                </Stack>
                <Stack direction="row">
                  <Autocomplete
                    options={
                      status?.map((item) => ({
                        label: item.label,
                        id: item.id,
                      })) || []
                    }
                    sx={{ width: 490 }}
                    name="AssignedTo"
                    onChange={(e, value) =>
                      setFieldValue("AssignedTo", value?.label)
                    }
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
                  <Button
                    variant="outlined"
                    sx={{ mr: 2 }}
                    onClick={handleClose}
                  >
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
      <Snackbar open={openn} autoHideDuration={6000} onClose={handleClosee}>
        <Alert onClose={handleClosee} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Edit;

// const handleClick = () => {
//   setOpen(true);
// };

// const handleClose = (event, reason) => {
//   if (reason === 'clickaway') {
//     return;
//   }

//   setOpen(false);
// };

{
  /* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar> */
}

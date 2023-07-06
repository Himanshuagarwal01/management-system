import React from "react";
import { Modal, Box, Typography } from "@mui/material";
import { FormikProvider, Form, useFormik } from "formik";
import * as Yup from "yup";

function AddModal() {
  const addSchema = Yup.object().shape({
    id: Yup.number().required("ID is required"),
    ModelNo: Yup.string().required("Model No. is required"),
    DeviceID: Yup.string().required("Device ID is required"),
    Processor: Yup.string().required("Processor is required"),
    RAM: Yup.string().required("Please fill this field"),
    Storage: Yup.string().required("Please fill this field"),
    Status: Yup.string().required("Please select status"),
    AssignedTo: Yup.string().required("please select !!"),
  });
  const formik = useFormik({
    initialValues: {
      id: "",
      ModelNo: "",
      DeviceID: "",
      Processor: "",
      RAM: "",
      Storage: "",
      Status: "",
      AssignedTo: "",
    },
    validationSchema: { addSchema },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <>
      <Modal>
        <Box>
          <Typography></Typography>
        </Box>
      </Modal>
    </>
  );
}

export default AddModal;

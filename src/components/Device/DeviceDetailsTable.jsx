import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Edit from "./Edit";
function DeviceDetailsTable() {
  const params = useParams();
  const type = window.location.pathname;
  const deviceType = type.split("/")[2];
  console.log(type);
  console.log("params", params);
  const [tableHead, setTableHead] = useState([]);
  const [tableBody, setTableBody] = useState([]);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const color = [
    {
      orange: "#F8B195",
      pink: "#F67280",
      purple: "#C06C84",
      violet: "#6C5B7B",
      blue: "#355C7D",
    },
  ];
  const laptop1 = [
    "ID",
    "Model Number",
    "Device ID",
    "Processor",
    "RAM",
    "Storage",
    "Status",
    "Action",
  ];
  const mouse1 = ["Sr No.", "Device ID", "Company", "Status", "Action"];
  // const laptopData = [
  //   {
  //     id: 1,
  //     ModelNumber: "15ALC6",
  //     DeviceID: "L9N012C14032",
  //     Processor: "AMD® Ryzen 5 5500u with radeon graphics × 12",
  //     RAM: "8GB",
  //     Storage: "512 GB",
  //     Status: "Available",
  //   },
  // ];

  useEffect(() => {
    axios
      .get(`http://localhost:8000/${deviceType}`)
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    if (type.includes("laptop")) {
      setTableHead(laptop1);
      setTableBody(data);
    }
    if (type.includes("mouse")) {
      setTableHead(mouse1);
      setTableBody(data);
    }
  }, [data]);
  console.log(tableHead);

  return (
    <>
      <Box sx={{ display: "flex", width: "100%" }}>
        <Typography
          variant="h5"
          fontSize={35}
          sx={{ textTransform: "capitalize", mb: 4 }}
        >
          {deviceType}
        </Typography>
        <Button
          onClick={handleOpen}
          variant="contained"
          sx={{ alignContent: "flex-end", justifyContent: "flex-end" }}
        >
          Add
        </Button>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {tableHead.map((item) => (
                <TableCell
                  sx={{
                    fontSize: "18px",
                    fontWeight: 600,
                    backgroundColor: "#d9f2c4",
                  }}
                >
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {deviceType === "laptop"
              ? tableBody?.map((x, index) => (
                  <TableRow key={x.id}>
                    <TableCell>{x.id}</TableCell>
                    <TableCell>{x.ModelNumber}</TableCell>
                    <TableCell>{x.DeviceID}</TableCell>
                    <TableCell>{x.Processor}</TableCell>
                    <TableCell>{x.RAM}</TableCell>
                    <TableCell>{x.Storage}</TableCell>
                    <TableCell>{x.Status}</TableCell>
                    <TableCell>
                      <Button
                        onClick={handleOpen}
                        variant="outlined"
                        sx={{ mr: "7px" }}
                      >
                        Edit
                      </Button>{" "}
                      <Button
                        variant="outlined"
                        sx={{ borderColor: "#ff0000", color: "#ff0000" }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              : deviceType === "mouse"
              ? tableBody?.map((y, index) => (
                  <TableRow key={y.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{y.DeviceID}</TableCell>
                    <TableCell>{y.Company}</TableCell>
                    <TableCell>{y.Status}</TableCell>
                    <TableCell>
                      <Button
                        onClick={handleOpen}
                        variant="outlined"
                        sx={{ mr: "7px" }}
                      >
                        Edit
                      </Button>{" "}
                      <Button
                        variant="outlined"
                        sx={{ borderColor: "#ff0000", color: "#ff0000" }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              : ""}
          </TableBody>
        </Table>
      </TableContainer>
      <Edit open={open} setOpen={setOpen} />
    </>
  );
}

export default DeviceDetailsTable;

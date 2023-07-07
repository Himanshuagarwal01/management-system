import React, { useState } from "react";
import {
  Card,
  CardContent,
  Stack,
  Typography,
  Box,
  CardActions,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
export default function Home() {

  const [list,setList]=useState([])
  const devices = [
    {
      id: 1,
      deviceName: "All laptops",
      total: 20,
      availability: 5,
     backgroundColor: "#cccccc",
    // backgroundColor:'#C06C84',
      link:'laptop'
    },
    {
      id: 2,
      deviceName: "All Mouses",
      total: 25,
      availability: 5,
     // backgroundColor:'#6C5B7B',
     backgroundColor: "#adc286",
      link:'mouse'
    },
    {
      id: 3,
      deviceName: "All keyboards",
      total: 10,
      availability: 8,
      backgroundColor: "#729e9d",
      //backgroundColor:'#355C7D',
      link:'keyboard'
    },
  ];

// const handleViewDeviceList=()=>{
// axios.get()
// }

  return (
    <>
      <Box justifyContent="center" sx={{ height: "60vh" }}>
        <Stack
          direction="row"
          spacing={3}
          justifyContent="center"
          alignItems="center"
        >
          {devices?.map((item) => {
            return (
              <Stack key={item.id}>
                <Card
                  sx={{
                    minWidth: 300,
                    my: 5,
                    py: 2,
                    px: 2,
                    borderRadius: "10px",
                    backgroundColor: item.backgroundColor,
                  }}
                >
                  <CardContent>
                    {" "}
                    <Typography variant="h5">{item.deviceName}</Typography>
                    <Typography color="text.secondary" sx={{ my: 2 }}>
                      Total No. - {item.total}
                    </Typography>
                    <Typography color="text.secondary">
                      Available - {item.availability}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{justifyContent:'flex-end'}} >
                    <Button size="small" >
                      <Link style={{textDecoration:'none'}} to={`deviceDetails/${item.link}`}>View Details</Link>
                      </Button>
                  </CardActions>
                </Card>
              </Stack>
            );
          })}
          {/* <Stack>
            <Card
              sx={{
                minWidth: 300,
                my: 5,
                py: 2,
                px: 2,
                borderRadius: "10px",
                backgroundColor: "#cccccc",
              }}
            >
              <CardContent>
                {" "}
                <Typography variant="h5">All laptops</Typography>
                <Typography color="text.secondary" sx={{ my: 2 }}>
                  Total No. -{" "}
                </Typography>
                <Typography color="text.secondary">Available - </Typography>
              </CardContent>
            </Card>
          </Stack>
          <Stack>
            <Card
              sx={{
                minWidth: 300,
                my: 5,
                py: 2,
                px: 2,
                borderRadius: "10px",
                backgroundColor: "#cccccc",
              }}
            >
              <CardContent>
                <Typography variant="h5">All Mouses</Typography>
                <Typography color="text.secondary" sx={{ my: 2 }}>
                  Total No. -{" "}
                </Typography>
                <Typography color="text.secondary">Available - </Typography>
              </CardContent>
            </Card>
          </Stack>
          <Stack>
            <Card
              sx={{
                minWidth: 300,
                my: 5,
                py: 2,
                px: 2,
                borderRadius: "10px",
                backgroundColor: "#cccccc",
              }}
            >
              <CardContent>
                {" "}
                <Typography variant="h5">All laptops</Typography>
                <Typography color="text.secondary" sx={{ my: 2 }}>
                  Total No. -{" "}
                </Typography>
                <Typography color="text.secondary">Available - </Typography>
              </CardContent>
            </Card>
          </Stack> */}
        </Stack>
      </Box>
    </>
  );
}

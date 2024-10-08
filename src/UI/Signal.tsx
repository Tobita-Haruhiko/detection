import { Check, Close } from "@mui/icons-material";
import { Box, Button, Stack } from "@mui/material"
import { useState } from "react";

interface Props {
  isGreenLightning: boolean;
  isRedLightning: boolean;
}


export const Signal: React.FC<Props> = ({isGreenLightning, isRedLightning}) => {
  return(
    <>
    <Stack spacing={2} direction="row">
      <Box sx={{background: "green", 
        borderRadius: "5px",
        height: "25px", 
        width: "25px", 
        filter: isGreenLightning ? "none" : "brightness(50%)"
      }}>
        <Check sx={{color: "white"}}/>
      </Box>

      <Box sx={{background: "red", 
        borderRadius: "5px",
        height: "25px", 
        width: "25px", 
        filter: isRedLightning ? "none" : "brightness(50%)"
      }}>
        <Close sx={{color: "white"}}/></Box>
      </Stack>
    </>
    
  )
}
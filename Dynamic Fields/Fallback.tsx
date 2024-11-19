import { RotateRight } from '@mui/icons-material'
import { Typography,IconButton,Stack } from '@mui/material'
import React from 'react'

const Fallback = () => {
  return (
    <React.Fragment>
        <Stack style={{width:"50%",height:"150px",marginLeft:"25%",marginTop:"50px"}}>
            <Typography variant="h6" style={{textAlign: "center"}}>...Loading</Typography>
            <IconButton aria-label="rotate">
                <RotateRight color="error"/>
            </IconButton>
        </Stack>   
    </React.Fragment>
  )
}

export default Fallback
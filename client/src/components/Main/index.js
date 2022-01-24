import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { footerHeight, mainHeight } from '../utils/sizes';

const main = (props) => {
  let date = new Date();
  let dateFullYear = date.getFullYear();
  if (dateFullYear !== 2021) {
    dateFullYear = `2021—${dateFullYear}`;
  }
  return (
    <Paper sx={{ bgcolor: '#cfe8fc', }}>
      <Container maxWidth="xl" >
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: `${mainHeight}vh`
        }}>
          <props.elem/>

        </Box>
        
      </Container>
      <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: `${footerHeight}vh`,
          backgroundColor: "#1976d2",
        }}>
          <Typography
          variant="body1"
          color="white"
          >© VizionCorp, {dateFullYear}</Typography>

        </Box>
    </Paper>
  )
};

export default main;
import React from 'react';
import styles from './Home.module.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const Home = () => {

  const tech = [
    "React",
    "MUI Library",
    "Redux",
    "React-Router",
    "JWT",
    "NodeJs/Express",
    "Mongo DB"
  ];
  return(
  <div className={styles.Home}>
    <Card sx={{ width: {xs: 275, md: 600, lg: 900}, m: 'auto', mt: 5, boxShadow:'none' }}>
      <CardContent>
        <Typography variant="h3"  gutterBottom sx={{textAlign: 'center'}}>
         MERN STACK Template
        </Typography>
        <Typography variant="h5" component="div">
         Techs Includes:
        </Typography>

        <Box sx={{ flexGrow: 1, mt: 5 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        { 
          tech.map((el, index) =>  <Grid item xs={2} sm={4} md={4} key={index}>
          <Item>{el}</Item>
        </Grid>)
        }
      </Grid>
    </Box>
      </CardContent>
    </Card>
  </div>
);}

export default Home;

import React, { useEffect } from 'react';
import { Grid, Card, CardContent, CardActions, Divider, List, ListItem, Typography, Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CallIcon from '@mui/icons-material/Call';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';






export default function SupportPage() {



  return (
    <>
       <Navbar />

    <Grid container justifyContent="center" spacing={4} sx={{paddingX: '12px', marginBottom : '26px', marginTop : '26px'}}>
      <Grid item xs={12} sm={6} md={4}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" sx={{marginBottom: 3}}>Email Support</Typography>
            <Divider />
            <List>
              <ListItem>
                <CheckIcon color="primary" />
                &nbsp;&nbsp; Priority Email Support
              </ListItem>
              <ListItem>
                <CheckIcon color="primary" />
                &nbsp;&nbsp; 48hr Resolution Window
              </ListItem>
              <ListItem>
                <CheckIcon color="primary" />
                &nbsp;&nbsp; Account Setup
              </ListItem>
              <ListItem>
                <CheckIcon color="primary" />
                &nbsp;&nbsp; Catalogue Setup
              </ListItem>
              <ListItem>
                <CheckIcon color="primary" />
                &nbsp;&nbsp; Bugs Resolution
              </ListItem>
              <ListItem>
                <CheckIcon color="primary" />
                &nbsp;&nbsp; On-demand Reports (PDF)
              </ListItem>
             
            </List>
            <Divider />
          </CardContent>
          <CardActions>
        
            {/* <Typography variant="subtitle1">{getPrice() + '/'}{pricing === 'year' ? 'year' : 'month'}</Typography> */}


            <Button
              variant="outlined"
              color="secondary"
              startIcon={<MailOutlineIcon />}
              style={{marginLeft: '16px', textTransform: 'lowercase'}}
            >
              support@billsbook.online
            </Button>
          </CardActions>
        </Card>
      </Grid>
      

     
    </Grid>

    <Footer />
    </>
  );
}
import React from 'react';
import { Grid, CardContent, Typography} from '@mui/material';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import watch1 from "../../images/watch1.png"
import watch2 from "../../images/watch2.png"
import watch3 from "../../images/watch3.png"
import watch4 from "../../images/watch4.png"
import mainBanner1 from "../../images/mainBanner2.webp"







export default function AllWatches() {



  return (
    <>
       <Navbar />

       <div item className="col-md-12 col-lg-12">
          <img
            className="img-fluid"
            src={mainBanner1}
            priority={true}
            alt="Passion into Profession"
          />
        </div>

        <div style={{ display : 'flex', flexDirection : 'column', alignItems : 'center'}}>



<Grid container justifyContent="center" sx={{paddingX: '34px', marginBottom : '26px', marginTop : '22px'}}>

  <Grid item xs={12} sm={6} md={3}>
      <CardContent sx={{ paddingX : '34px'}}>
      <img className="w-100 img-fluid rounded" src={watch1}  style={{ width: '100%', height: '270px' }} // Set width, height, and max height
            alt="Third slide" />

        <Typography sx={{ fontSize: '16px', marginBottom: 2, fontWeight : 500, marginTop : 4}}>Nike Dunk Low Spartan Green / Michigan State</Typography>
       <Typography >Rs. 1,05,999/-</Typography>
      </CardContent>
      
  </Grid>

  <Grid item xs={12} sm={6} md={3}>
      <CardContent sx={{ paddingX : '34px'}}>
      <img className="w-100 img-fluid rounded" src={watch2}  style={{ width: '100%', height: '270px' }} // Set width, height, and max height
            alt="Third slide" />

        <Typography sx={{ fontSize: '16px', marginBottom: 2, fontWeight : 500, marginTop : 4}}>Nike Dunk Low Spartan Green / Michigan State</Typography>
       <Typography >Rs. 1,05,999/-</Typography>
      </CardContent>
      
  </Grid>

  <Grid item xs={12} sm={6} md={3}>
      <CardContent sx={{ paddingX : '34px'}}>
      <img className="w-100 img-fluid rounded" src={watch3}  style={{ width: '100%', height: '270px' }} // Set width, height, and max height
            alt="Third slide" />

        <Typography sx={{ fontSize: '16px', marginBottom: 2, fontWeight : 500, marginTop : 4}}>Nike Dunk Low Spartan Green / Michigan State</Typography>
       <Typography >Rs. 1,05,999/-</Typography>
      </CardContent>
      
  </Grid>

  <Grid item xs={12} sm={6} md={3}>
      <CardContent sx={{ paddingX : '34px'}}>
      <img className="w-100 img-fluid rounded" src={watch4}  style={{ width: '100%', height: '270px' }} // Set width, height, and max height
            alt="Third slide" />

        <Typography sx={{ fontSize: '16px', marginBottom: 2, marginTop : 4, fontWeight : 500, marginTop : 4}}>Nike Dunk Low Spartan Green / Michigan State</Typography>
       <Typography >Rs. 1,05,999/-</Typography>
      </CardContent>
      
  </Grid>


  <Grid item xs={12} sm={6} md={3}>
      <CardContent sx={{ paddingX : '34px'}}>
      <img className="w-100 img-fluid rounded" src={watch1}  style={{ width: '100%', height: '270px' }} // Set width, height, and max height
            alt="Third slide" />

        <Typography sx={{ fontSize: '16px', marginBottom: 2, fontWeight : 500, marginTop : 4}}>Nike Dunk Low Spartan Green / Michigan State</Typography>
       <Typography >Rs. 1,05,999/-</Typography>
      </CardContent>
      
  </Grid>

  <Grid item xs={12} sm={6} md={3}>
      <CardContent sx={{ paddingX : '34px'}}>
      <img className="w-100 img-fluid rounded" src={watch2}  style={{ width: '100%', height: '270px' }} // Set width, height, and max height
            alt="Third slide" />

        <Typography sx={{ fontSize: '16px', marginBottom: 2, fontWeight : 500, marginTop : 4}}>Nike Dunk Low Spartan Green / Michigan State</Typography>
       <Typography >Rs. 1,05,999/-</Typography>
      </CardContent>
      
  </Grid>

  <Grid item xs={12} sm={6} md={3}>
      <CardContent sx={{ paddingX : '34px'}}>
      <img className="w-100 img-fluid rounded" src={watch3}  style={{ width: '100%', height: '270px' }} // Set width, height, and max height
            alt="Third slide" />

        <Typography sx={{ fontSize: '16px', marginBottom: 2, fontWeight : 500, marginTop : 4}}>Nike Dunk Low Spartan Green / Michigan State</Typography>
       <Typography >Rs. 1,05,999/-</Typography>
      </CardContent>
      
  </Grid>

  <Grid item xs={12} sm={6} md={3}>
      <CardContent sx={{ paddingX : '34px'}}>
      <img className="w-100 img-fluid rounded" src={watch4}  style={{ width: '100%', height: '270px' }} // Set width, height, and max height
            alt="Third slide" />

        <Typography sx={{ fontSize: '16px', marginBottom: 2, marginTop : 4, fontWeight : 500, marginTop : 4}}>Nike Dunk Low Spartan Green / Michigan State</Typography>
       <Typography >Rs. 1,05,999/-</Typography>
      </CardContent>
      
  </Grid>








 
</Grid>



</div>

<Grid container justifyContent={'center'} paddingX={5} marginBottom={6}> 
            <Grid xs={12} md={3} lg={3}>

            <Link to="/all-sneakers" style={{textDecoration: 'none'}}><button className="btn signup-btn-grad-2 btn-g-fonts text-white">Explore Sneakers</button></Link>


            </Grid>

         </Grid>



    <Footer />
    </>
  );
}
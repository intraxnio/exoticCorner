import React from 'react'
import banner1 from "../../images/1093-desktop_thumbnail.webp"
import banner2 from "../../images/3356-desktop_thumbnail.webp"
import banner3 from "../../images/4508-desktop_thumbnail.webp"
import banner4 from "../../images/4512-desktop_thumbnail.webp"
import handBag1 from "../../images/handBag1.jpg"
import watch1 from "../../images/watch1.png"
import watch2 from "../../images/watch2.png"
import watch3 from "../../images/watch3.png"
import watch4 from "../../images/watch4.png"
import { Grid, Card, CardContent, CardActions, Divider, List, ListItem, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import mainBanner1 from "../../images/mainBanner.webp"
import mainBanner2 from "../../images/mainBanner2.webp"





function BodyBlocks() {
  return (
    <>

{/* sneaker section  */}
<div style={{ display : 'flex', flexDirection : 'column', alignItems : 'center'}}>

<Typography sx={{ fontSize : '32px', fontWeight : 500, paddingTop : 6, paddingX : 2, alignItems : 'center', textAlign : 'center', display : 'flex', flexWrap : 'wrap' }}>SNEAKERS</Typography>


<Grid container justifyContent="center" sx={{paddingX: '34px', marginBottom : '26px'}}>

  <Grid item xs={12} sm={6} md={3}>
      <CardContent sx={{ paddingX : '34px'}}>
      <img className="w-100 img-fluid rounded" src={banner1}  style={{ width: '100%', height: 'auto' }} // Set width, height, and max height
            alt="Third slide" />

        <Typography sx={{ fontSize: '16px', marginBottom: 2, fontWeight : 500}}>Nike Dunk Low Spartan Green / Michigan State</Typography>
       <Typography >Rs. 1,05,999/-</Typography>
      </CardContent>
      
  </Grid>

  <Grid item xs={12} sm={6} md={3}>
      <CardContent sx={{ paddingX : '34px'}}>
      <img className="w-100 img-fluid rounded" src={banner2}  style={{ width: '100%', height: 'auto' }} // Set width, height, and max height
            alt="Third slide" />

        <Typography sx={{ fontSize: '16px', marginBottom: 2, fontWeight : 500}}>Nike Dunk Low Spartan Green / Michigan State</Typography>
       <Typography >Rs. 1,05,999/-</Typography>
      </CardContent>
      
  </Grid>

  <Grid item xs={12} sm={6} md={3}>
      <CardContent sx={{ paddingX : '34px'}}>
      <img className="w-100 img-fluid rounded" src={banner3}  style={{ width: '100%', height: 'auto' }} // Set width, height, and max height
            alt="Third slide" />

        <Typography sx={{ fontSize: '16px', marginBottom: 2, fontWeight : 500}}>Nike Dunk Low Spartan Green / Michigan State</Typography>
       <Typography >Rs. 1,05,999/-</Typography>
      </CardContent>
      
  </Grid>

  <Grid item xs={12} sm={6} md={3}>
      <CardContent sx={{ paddingX : '34px'}}>
      <img className="w-100 img-fluid rounded" src={banner4}  style={{ width: '100%', height: 'auto' }} // Set width, height, and max height
            alt="Third slide" />

        <Typography sx={{ fontSize: '16px', marginBottom: 2, fontWeight : 500}}>Nike Dunk Low Spartan Green / Michigan State</Typography>
       <Typography >Rs. 1,05,999/-</Typography>
      </CardContent>
      
  </Grid>

  <Grid item xs={12} sm={6} md={3}>
      <CardContent sx={{ paddingX : '34px'}}>
      <img className="w-100 img-fluid rounded" src={banner3}  style={{ width: '100%', height: 'auto' }} // Set width, height, and max height
            alt="Third slide" />

        <Typography sx={{ fontSize: '16px', marginBottom: 2, fontWeight : 500}}>Nike Dunk Low Spartan Green / Michigan State</Typography>
       <Typography >Rs. 1,05,999/-</Typography>
      </CardContent>
      
  </Grid>

  <Grid item xs={12} sm={6} md={3}>
      <CardContent sx={{ paddingX : '34px'}}>
      <img className="w-100 img-fluid rounded" src={banner1}  style={{ width: '100%', height: 'auto' }} // Set width, height, and max height
            alt="Third slide" />

        <Typography sx={{ fontSize: '16px', marginBottom: 2, fontWeight : 500}}>Nike Dunk Low Spartan Green / Michigan State</Typography>
       <Typography >Rs. 1,05,999/-</Typography>
      </CardContent>
      
  </Grid>

  <Grid item xs={12} sm={6} md={3}>
      <CardContent sx={{ paddingX : '34px'}}>
      <img className="w-100 img-fluid rounded" src={banner4}  style={{ width: '100%', height: 'auto' }} // Set width, height, and max height
            alt="Third slide" />

        <Typography sx={{ fontSize: '16px', marginBottom: 2, fontWeight : 500}}>Nike Dunk Low Spartan Green / Michigan State</Typography>
       <Typography >Rs. 1,05,999/-</Typography>
      </CardContent>
      
  </Grid>

  <Grid item xs={12} sm={6} md={3}>
      <CardContent sx={{ paddingX : '34px'}}>
      <img className="w-100 img-fluid rounded" src={banner1}  style={{ width: '100%', height: 'auto' }} // Set width, height, and max height
            alt="Third slide" />

        <Typography sx={{ fontSize: '16px', marginBottom: 2, fontWeight : 500}}>Nike Dunk Low Spartan Green / Michigan State</Typography>
       <Typography >Rs. 1,05,999/-</Typography>
      </CardContent>
      
  </Grid>




 
</Grid>



</div>

<Grid container justifyContent={'center'} paddingX={5} marginBottom={6}> 
            <Grid xs={12} md={3} lg={3}>

            <Link to="/all-sneakers" style={{textDecoration: 'none'}}><button className="btn signup-btn-grad-2 btn-g-fonts text-white">View All</button></Link>


            </Grid>

         </Grid>

{/* sneaker section  */}


{/* watch section  */}
<div style={{ display : 'flex', flexDirection : 'column', alignItems : 'center'}}>

<Typography sx={{ fontSize : '32px', fontWeight : 500, paddingTop : 6, paddingX : 2, alignItems : 'center', textAlign : 'center', display : 'flex', flexWrap : 'wrap' }}>WATCHES</Typography>


<Grid container justifyContent="center" sx={{paddingX: '34px', marginBottom : '26px'}}>

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

            <Link to="/all-watches" style={{textDecoration: 'none'}}><button className="btn signup-btn-grad-2 btn-g-fonts text-white">View All</button></Link>


            </Grid>

         </Grid>

{/* watch section  */}


{/* bag section  */}
<div style={{ display : 'flex', flexDirection : 'column', alignItems : 'center'}}>

<Typography sx={{ fontSize : '32px', fontWeight : 500, paddingTop : 6, paddingX : 2, alignItems : 'center', textAlign : 'center', display : 'flex', flexWrap : 'wrap' }}>BAGS</Typography>


<Grid container justifyContent="center" sx={{paddingX: '34px', marginBottom : '26px'}}>

  <Grid item xs={12} sm={6} md={3}>
      <CardContent sx={{ paddingX : '34px'}}>
      <img className="w-100 img-fluid rounded" src={handBag1}  style={{ width: '100%', height: 'auto' }} // Set width, height, and max height
            alt="Third slide" />

        <Typography sx={{ fontSize: '16px', marginBottom: 2, fontWeight : 500, marginTop : 4}}>Nike Dunk Low Spartan Green / Michigan State</Typography>
       <Typography >Rs. 1,05,999/-</Typography>
      </CardContent>
      
  </Grid>

  <Grid item xs={12} sm={6} md={3}>
      <CardContent sx={{ paddingX : '34px'}}>
      <img className="w-100 img-fluid rounded" src={handBag1}  style={{ width: '100%', height: 'auto' }} // Set width, height, and max height
            alt="Third slide" />

        <Typography sx={{ fontSize: '16px', marginBottom: 2, fontWeight : 500, marginTop : 4}}>Nike Dunk Low Spartan Green / Michigan State</Typography>
       <Typography >Rs. 1,05,999/-</Typography>
      </CardContent>
      
  </Grid>

  <Grid item xs={12} sm={6} md={3}>
      <CardContent sx={{ paddingX : '34px'}}>
      <img className="w-100 img-fluid rounded" src={handBag1}  style={{ width: '100%', height: 'auto' }} // Set width, height, and max height
            alt="Third slide" />

        <Typography sx={{ fontSize: '16px', marginBottom: 2, fontWeight : 500, marginTop : 4}}>Nike Dunk Low Spartan Green / Michigan State</Typography>
       <Typography >Rs. 1,05,999/-</Typography>
      </CardContent>
      
  </Grid>

  <Grid item xs={12} sm={6} md={3}>
      <CardContent sx={{ paddingX : '34px'}}>
      <img className="w-100 img-fluid rounded" src={handBag1}  style={{ width: '100%', height: 'auto' }} // Set width, height, and max height
            alt="Third slide" />

        <Typography sx={{ fontSize: '16px', marginBottom: 2, marginTop : 4, fontWeight : 500, marginTop : 4}}>Nike Dunk Low Spartan Green / Michigan State</Typography>
       <Typography >Rs. 1,05,999/-</Typography>
      </CardContent>
      
  </Grid>








 
</Grid>



</div>

<Grid container justifyContent={'center'} paddingX={5} marginBottom={6}> 
            <Grid xs={12} md={3} lg={3}>

            <Link to="/" style={{textDecoration: 'none'}}><button className="btn signup-btn-grad-2 btn-g-fonts text-white">View All</button></Link>


            </Grid>

         </Grid>

{/* bag section  */}
    
<div container className="row mx-auto mb-4">
<div item className="col-md-12 col-lg-6 mt-4">
          <img
            className="img-fluid rounded"
            src={mainBanner1}
            priority={true}
            alt="Passion into Profession"
          />
        </div>

        <div item className="col-md-12 col-lg-6 mt-4">
          <img
            className="img-fluid rounded"
            src={mainBanner2}
            priority={true}
            alt="Passion into Profession"
          />
        </div>

        </div>

    </>
  )
}

export default BodyBlocks
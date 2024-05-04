import React from 'react'
import { Grid, Avatar, Stack, Typography, Box } from "@mui/material";
import review1img from '../../images/IMG_1025.jpg'
import review2img from '../../images/IMG_1023.jpg'
import review3img from '../../images/IMG_1027.jpeg'
import { Link } from 'react-router-dom';





function BodyCards() {
  return (
    <>
    
   <Grid container marginY={4} paddingX={1}>

    <Grid xs={12} md={4} lg={4} bgcolor={'#C5EBAA'}  paddingX={3} paddingY={3}>

      <Box sx={{ paddingTop : '22px'}}>

      <Stack sx={{ display: 'flex', flexDirection : 'row'}}>
      <Avatar  sx={{ width: 56, height: 56 }} alt="Remy Sharp" src={review1img}/>

      <Stack sx={{ display : 'flex', flexDirection : 'column', paddingLeft : '12px', paddingY : '6px'}}>
      <Typography sx={{ fontSize : '16px', fontWeight : '500'}}>Pradeep Reddy</Typography>
      <Typography sx={{ fontSize : '14px'}}>Back to roots</Typography>
      </Stack>

      </Stack>

      </Box>

      <Box paddingTop={3} paddingBottom={4} sx={{ display: 'flex', flexDirection : 'column'}}>

      <div className="reviews-text"> "The majority of my clients pay with credit cards using the secure link on the invoice. 
      That is a&nbsp;
      <span style={{ fontWeight : 500, background : '#C6EBC5'}}>great time saver and helps me get paid faster!"</span>
      </div>
      </Box>

    </Grid>

    <Grid xs={12} md={4} lg={4} bgcolor={'#AD88C6'}  paddingX={3} paddingY={3}>

<Box sx={{ paddingTop : '22px'}}>

<Stack sx={{ display: 'flex', flexDirection : 'row'}}>
<Avatar  sx={{ width: 56, height: 56 }} alt="Remy Sharp" src={review2img}/>

<Stack sx={{ display : 'flex', flexDirection : 'column', paddingLeft : '12px', paddingY : '6px'}}>
<Typography sx={{ fontSize : '16px', fontWeight : '500'}}>Akhila Sri</Typography>
<Typography sx={{ fontSize : '14px'}}>Forest Kisan</Typography>
</Stack>

</Stack>

</Box>

<Box paddingTop={3} paddingBottom={4} sx={{ display: 'flex', flexDirection : 'column'}}>

<div className="reviews-text"> "It's more than just a trendy software; it offers peace of mind. 
You should feel assured&nbsp;
<span style={{ fontWeight : 500, background : '#DC84F3'}}>that your taxes won't be a year-long worry."</span>
</div>
</Box>

</Grid>

<Grid xs={12} md={4} lg={4} bgcolor={'#FF9843'}  paddingX={3} paddingY={3}>

<Box sx={{ paddingTop : '22px'}}>

<Stack sx={{ display: 'flex', flexDirection : 'row'}}>
<Avatar  sx={{ width: 56, height: 56 }} alt="Remy Sharp" src={review3img}/>

<Stack sx={{ display : 'flex', flexDirection : 'column', paddingLeft : '12px', paddingY : '6px'}}>
<Typography sx={{ fontSize : '16px', fontWeight : '500'}}>Chandu Lal</Typography>
<Typography sx={{ fontSize : '14px'}}>Jyoram Clinics</Typography>
</Stack>

</Stack>

</Box>

<Box paddingTop={3} paddingBottom={4} sx={{ display: 'flex', flexDirection : 'column'}}>

<div className="reviews-text"> "BillsBook has been a game-changer for me. Managing my expenses and invoices used to be a headache, but now it's a breeze.&nbsp;
<span style={{ fontWeight : 500, background : '#FF8E8F'}}>It's saved me so much time and hassle!"</span>
</div>
</Box>

</Grid>


   </Grid>

   <Grid container justifyContent={'center'} paddingX={5}> 
            <Grid xs={12} md={3} lg={3}>

            <Link to="/login/brand" style={{textDecoration: 'none'}}><button className="btn signup-btn-grad-2 btn-g-fonts text-white">Explore Now</button></Link>


            </Grid>

         </Grid>
    
    </>
  )
}

export default BodyCards
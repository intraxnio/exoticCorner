import React, { useState }from "react";
import { Grid, CardContent, Typography} from '@mui/material';
import Navbar from "./Navbar";
import Footer from "./Footer";
import banner1 from "../../images/1093-desktop_thumbnail.webp"
import thumbnail1 from "../../images/3356-desktop_thumbnail.webp"
import thumbnail2 from "../../images/4508-desktop_thumbnail.webp"
import thumbnail3 from "../../images/1093-desktop_thumbnail.webp"
import thumbnail4 from "../../images/4537-desktop_thumbnail.webp"
import { Link } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import VerifiedIcon from '@mui/icons-material/Verified';
import LoyaltyIcon from '@mui/icons-material/Loyalty';




function IndividualItem() {

    const [selectedSize, setSelectedSize] = useState('UK 7');
    const [selectedImage, setSelectedImage] = useState(thumbnail1);
    const [activeThumbnail, setActiveThumbnail] = useState(thumbnail1);


    const handleSizeClick = (size) => {
      setSelectedSize(size);
    };

    const handleThumbnailClick = (thumbnail) => {
        setSelectedImage(thumbnail);
        setActiveThumbnail(thumbnail);
      };


  return (
    <>
    <Navbar />
      <div className="container mx-auto row mb-5">

      <div className="col-md-6 col-lg-6">
      <img
        className="img-fluid rounded"
        src={selectedImage}
        alt="Main Image"
      />

      <div className="row">
        <div className="col-3 col-md-3 col-lg-3">
          <img
            className={`img-fluid p-2 thumbnail ${activeThumbnail === thumbnail1 ? 'active' : ''}`}
            src={thumbnail1}
            alt="Thumbnail 1"
            onClick={() => handleThumbnailClick(thumbnail1)}
          />
        </div>

        <div className="col-3 col-md-3 col-lg-3">
          <img
            className={`img-fluid p-2 thumbnail ${activeThumbnail === thumbnail2 ? 'active' : ''}`}
            src={thumbnail2}
            alt="Thumbnail 2"
            onClick={() => handleThumbnailClick(thumbnail2)}
          />
        </div>

        <div className="col-3 col-md-3 col-lg-3">
          <img
            className={`img-fluid p-2 thumbnail ${activeThumbnail === thumbnail3 ? 'active' : ''}`}
            src={thumbnail3}
            alt="Thumbnail 3"
            onClick={() => handleThumbnailClick(thumbnail3)}
          />
        </div>

        <div className="col-3 col-md-3 col-lg-3">
          <img
            className={`img-fluid p-2 thumbnail ${activeThumbnail === thumbnail4 ? 'active' : ''}`}
            src={thumbnail4}
            alt="Thumbnail 4"
            onClick={() => handleThumbnailClick(thumbnail4)}
          />
        </div>
      </div>
    </div>

     



        <div className="container col-md-6 col-lg-6 row">
    
          <div style={{ fontSize : '26px', fontWeight : 500}}>
          Nike Dunk Low Spartan Green / Michigan State
          </div>

          <div style={{ fontSize : '22px', fontWeight : 500 }}>
          Rs. 1,59,999/-
          </div>

          <div style={{ fontSize : '16px', fontWeight : 400, color : 'grey'}}>
          Taxes included. Free shipping on all orders
          </div>

          <div style={{ display : 'flex', marginTop : '22px'}}>

          <div
              onClick={() => handleSizeClick('UK 7')}
              className="size-option"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid black',
                paddingLeft: '16px',
                paddingRight: '16px',
                paddingTop: '6px',
                paddingBottom: '6px',
                marginRight: '12px',
                cursor : 'pointer',
                background: selectedSize === 'UK 7' ? 'black' : 'transparent'
              }}>
              <Typography sx={{ fontSize: '16px', color : selectedSize === 'UK 7' ? 'white' : 'black' }}>UK</Typography>
              <Typography sx={{ fontSize: '22px', fontWeight: 500, color : selectedSize === 'UK 7' ? 'white' : 'black' }}>7</Typography>
            </div>



            <div
              onClick={() => handleSizeClick('UK 8')}
              className="size-option"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid black',
                paddingLeft: '16px',
                paddingRight: '16px',
                paddingTop: '6px',
                cursor : 'pointer',
                paddingBottom: '6px',
                marginRight: '12px',
                background: selectedSize === 'UK 8' ? 'black' : 'transparent'
              }}>
              <Typography sx={{ fontSize: '16px', color : selectedSize === 'UK 8' ? 'white' : 'black' }}>UK</Typography>
              <Typography sx={{ fontSize: '22px', fontWeight: 500, color : selectedSize === 'UK 8' ? 'white' : 'black' }}>8</Typography>
            </div>

            <div
              onClick={() => handleSizeClick('UK 9')}
              className="size-option"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid black',
                paddingLeft: '16px',
                paddingRight: '16px',
                paddingTop: '6px',
                cursor : 'pointer',
                paddingBottom: '6px',
                marginRight: '12px',
                background: selectedSize === 'UK 9' ? 'black' : 'transparent'
              }}>
              <Typography sx={{ fontSize: '16px', color : selectedSize === 'UK 9' ? 'white' : 'black' }}>UK</Typography>
              <Typography sx={{ fontSize: '22px', fontWeight: 500, color : selectedSize === 'UK 9' ? 'white' : 'black' }}>9</Typography>
            </div>

            <div
              onClick={() => handleSizeClick('UK 10')}
              className="size-option"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid black',
                paddingLeft: '16px',
                paddingRight: '16px',
                paddingTop: '6px',
                cursor : 'pointer',
                paddingBottom: '6px',
                marginRight: '12px',
                background: selectedSize === 'UK 10' ? 'black' : 'transparent'
              }}>
              <Typography sx={{ fontSize: '16px', color : selectedSize === 'UK 10' ? 'white' : 'black' }}>UK</Typography>
              <Typography sx={{ fontSize: '22px', fontWeight: 500, color : selectedSize === 'UK 10' ? 'white' : 'black' }}>10</Typography>
            </div>

          </div>

          <Grid container justifyContent={'start'} marginTop={6}> 
            <Grid xs={12} md={6} lg={6}>

            <Link to="/all-sneakers" style={{textDecoration: 'none'}}><button className="add-to-cart-btn btn-g-fonts">Add to cart</button></Link>


            </Grid>

         </Grid>


         <Grid xs={12} md={12} lg={12} className="my-accordion-item my-3 mx-auto">

<Accordion sx={{ marginTop : '32px'}} >
  <AccordionSummary
    expandIcon={<ArrowDropDownIcon />}
    aria-controls="panel1-content"
    id="panel1-header"
  >
    <VerifiedIcon  sx={{ marginRight : '6px'
    }}/>
    <Typography>Verified Authentic</Typography>
  </AccordionSummary>
  <AccordionDetails>
  <div className="accordion-body">
        Ensuring you get authentic products is our priority at Hype Fly India. Each item goes through a comprehensive authentication check, every time.
      </div>
  </AccordionDetails>
</Accordion>

<Accordion sx={{ marginTop : '12px', marginBottom : '12px'}}>
  <AccordionSummary
    expandIcon={<ArrowDropDownIcon />}
    aria-controls="panel2-content"
    id="panel2-header"
  >
    <LoyaltyIcon  sx={{ marginRight : '6px' }} />
    <Typography>Our Promise</Typography>
  </AccordionSummary>
  <AccordionDetails>
      <div className="accordion-body">
      The Jordan Jumpman Jack TR 'Sail' delivers an earthy colorway of Travis Scott's premier signature shoe. Secured with a traditional lace closure and an adjustable midfoot strap, the upper features dark brown canvas construction with off-white leather overlays and a reverse beige Swoosh on the lateral side. <br /> Contrasting crimson accents land on the Jumpman icon atop the tongue and the Cactus Jack face logo stamped on the back heel. A grippy gum rubber outsole wraps up the sidewalls of the white foam midsole.

Explore sneaker excellence at Hype Fly India, where authenticity is guaranteed. <br /><br /> Discover a diverse selection of authentic shoes, including exclusive collaborations like Jordan with Dior, Off-White, and more, alongside designer options from Balenciaga, Gucci, Golden Goose, and beyond.

<br /><br /> SKU - FZ8117 100 <br /><br />

NOTE - Shipping of this pair will take 18-20 working days

      </div>
  </AccordionDetails>
</Accordion>

</Grid>
        
        </div>

       

      </div>

      <Footer />


    </>
  );
}

export default IndividualItem;

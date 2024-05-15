import React from "react";
import mainBanner1 from "../../images/mainBanner.webp"
import mainBanner2 from "../../images/mainBanner2.webp"
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';



function BodyMain() {
  return (
    <>
      <div className="container mx-auto row">

      <Carousel>
      <Carousel.Item>
        <img className="d-block w-100 img-fluid rounded" src={mainBanner1} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100 img-fluid rounded" src={mainBanner2} alt="Second slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100 img-fluid rounded" src={mainBanner1} alt="Third slide" />
      </Carousel.Item>
    </Carousel>

      </div>


    </>
  );
}

export default BodyMain;

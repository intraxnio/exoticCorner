import React from "react";
import mainBanner from "../../images/exoticBanner.jpg"
import { Link } from 'react-router-dom';



function BodyMain() {
  return (
    <>
        
        <div className="col-md-12 col-lg-12 col-12">
          <img
            className="img-fluid"
            src={mainBanner}
            priority={true}
            alt="Passion into Profession"
          />
        </div>


    </>
  );
}

export default BodyMain;

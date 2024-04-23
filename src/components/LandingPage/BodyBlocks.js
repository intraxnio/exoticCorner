import React from 'react'
import banner1 from "../../images/banner1.jpg"
import banner2 from "../../images/banner2.jpg"
import banner3 from "../../images/banner3.jpg"
import banner4 from "../../images/banner4.jpg"
import banner5 from "../../images/banner5.jpg"
import banner6 from "../../images/banner6.jpg"
import banksett from "../../images/banksett.jpg"
import { Link } from 'react-router-dom';





function BodyBlocks() {
  return (
    <>

    <div className="container mt-5">

        <div className="row mx-auto">
            <div className="col-12 col-md-6 col-lg-6 my-auto">
                <div className="row creator-underline txt-bold"><p>B2B Fruit Market</p></div>
                <div className="row bb-txt-3"><p>Purchase exotic fruits in bulk
                    <span className="span-70"> online </span>and have them delivered directly to your outlet/shop.</p></div>
                {/* <div className="row bb-txt-3"><p><span className="check-1"></span>Trigger retargeting pixels directly from your links.</p></div> */}

                <div className="row-center bb-txt-2">
                    <p className= "my-auto">Simplify procurement by effortlessly ordering exotic fruits in bulk online. No more logistical headaches; we handle the delivery straight to your outlet or shop, ensuring freshness and convenience. Whether you're a small shop or a bustling outlet, our streamlined service adapts to your needs. 
                    Say goodbye to traditional hassles and embrace the future of fruit procurement. Join the growing community of businesses benefiting from our innovative approach to wholesale fruit distribution.
                    <br /><br />Elevate your supply chain efficiency and elevate your business with us. </p>
                </div>


            </div>

            <div className="col-12 col-md-6 col-lg-6" >
                <img className="img-fluid rounded" style={{ padding: '42px'}} src={banner1} alt="banner" width={500} height={500} />
            </div>
        </div>
    </div>

     <div className="container mt-3">
        <div className="row mx-auto">

        <div className="col-12 col-md-6 col-lg-6 order-2 order-md-0 order-lg-0">
       <img className="img-fluid rounded" src={banner3} alt="Business Growth" width={500} height={500} />

        </div>


            <div className="col-12 col-md-6 col-lg-6 my-auto">
                <div className="row creator-underline txt-bold"><p>Accept Payments</p></div>
                <div className="row bb-txt-3"><p>Purchase exotic fruits in bulk
                    <span className="span-70"> online </span>and have them delivered directly to your outlet/shop.</p></div>
                {/* <div className="row bb-txt-3"><p><span className="check-1"></span>Trigger retargeting pixels directly from your links.</p></div> */}

                <div className="row-center bb-txt-2">
                    <p className= "my-auto">Simplify procurement by effortlessly ordering exotic fruits in bulk online. No more logistical headaches; we handle the delivery straight to your outlet or shop, ensuring freshness and convenience. Whether you're a small shop or a bustling outlet, our streamlined service adapts to your needs. 
                    Say goodbye to traditional hassles and embrace the future of fruit procurement. Join the growing community of businesses benefiting from our innovative approach to wholesale fruit distribution.
                    <br /><br />Elevate your supply chain efficiency and elevate your business with us. </p>
                </div>

                


            </div>


        </div>
    </div>


<div className="container mt-3">

<div className="row mx-auto">
    <div className="col-12 col-md-6 col-lg-6 my-auto">
        <div className="row creator-underline txt-bold"><p>Small Businesses</p></div>
        <div className="row bb-txt-3"><p>Purchase exotic fruits in bulk
                    <span className="span-70"> online </span>and have them delivered directly to your outlet/shop.</p></div>
                {/* <div className="row bb-txt-3"><p><span className="check-1"></span>Trigger retargeting pixels directly from your links.</p></div> */}

                <div className="row-center bb-txt-2">
                    <p className= "my-auto">Simplify procurement by effortlessly ordering exotic fruits in bulk online. No more logistical headaches; we handle the delivery straight to your outlet or shop, ensuring freshness and convenience. Whether you're a small shop or a bustling outlet, our streamlined service adapts to your needs. 
                    Say goodbye to traditional hassles and embrace the future of fruit procurement. Join the growing community of businesses benefiting from our innovative approach to wholesale fruit distribution.
                    <br /><br />Elevate your supply chain efficiency and elevate your business with us. </p>
                </div>


    </div>

    <div className="col-12 col-md-6 col-lg-6">
        <img className="img-fluid rounded" src={banner2} alt="banner" width={500} height={500} />

    </div>
</div>
</div>


    <div className="container mt-3">

        <div className="row mx-auto">
          <div className="col-12 col-md-6 col-lg-6 order-2 order-md-0 order-lg-0">
          <img className="img-fluid rounded" src={banksett} alt="social Media" width={500} height={500} />
        </div>

            <div className="col-12 col-md-6 col-lg-6 my-auto">
                <div className="row creator-underline txt-bold"><p>Payment Settlements</p></div>
                <div className="row bb-txt-3"><p>Purchase exotic fruits in bulk
                    <span className="span-70"> online </span>and have them delivered directly to your outlet/shop.</p></div>
                {/* <div className="row bb-txt-3"><p><span className="check-1"></span>Trigger retargeting pixels directly from your links.</p></div> */}

                <div className="row-center bb-txt-2">
                    <p className= "my-auto">Simplify procurement by effortlessly ordering exotic fruits in bulk online. No more logistical headaches; we handle the delivery straight to your outlet or shop, ensuring freshness and convenience. Whether you're a small shop or a bustling outlet, our streamlined service adapts to your needs. 
                    Say goodbye to traditional hassles and embrace the future of fruit procurement. Join the growing community of businesses benefiting from our innovative approach to wholesale fruit distribution.
                    <br /><br />Elevate your supply chain efficiency and elevate your business with us. </p>
                </div>

            </div>
        </div>

    </div>


    </>
  )
}

export default BodyBlocks
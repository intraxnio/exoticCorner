import React from 'react'
import banner1 from "../../images/fruitMarket.jpg"
import banner2 from "../../images/startup.jpg"
import banner3 from "../../images/digitalindia.jpg"
import banner4 from "../../images/delivery.jpg"
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

            <div className="col-12 col-md-6 col-lg-6 my-auto" >
                <img className="img-fluid rounded" src={banner1} alt="banner" width={600} height={600} />
            </div>
        </div>
    </div>

     <div className="container mt-3">
        <div className="row mx-auto">

        <div className="col-12 col-md-6 col-lg-6 order-2 order-md-0 order-lg-0 my-auto">
       <img className="img-fluid rounded" src={banner2} alt="Business Growth" width={600} height={600} />

        </div>


            <div className="col-12 col-md-6 col-lg-6 my-auto">
                <div className="row creator-underline txt-bold"><p>Small Business/Startup</p></div>
                <div className="row bb-txt-3"><p>Freshness & Convenience for Every Business, from
                    <span className="span-70"> Startup to Enterprise. </span></p></div>
                {/* <div className="row bb-txt-3"><p><span className="check-1"></span>Trigger retargeting pixels directly from your links.</p></div> */}

                <div className="row-center bb-txt-2">
                    <p className= "my-auto">Embrace the future of fruit procurement for your small business or startup with our platform. Effortlessly order exotic fruits in bulk online, with delivery straight to your outlet or shop. 
                    No matter your size, our streamlined service adapts to your needs. Say goodbye to logistical headaches and traditional hassles. Join our community of businesses benefiting from our innovative approach to wholesale fruit distribution. 
                    Elevate your supply chain efficiency and business success with us. 
                    <br /><br /> Whether you're just starting out or already established, we supply fruits even for the smallest ventures, ensuring freshness and convenience every step of the way. </p>
                </div>

                


            </div>


        </div>
    </div>


<div className="container mt-3">

<div className="row mx-auto">
    <div className="col-12 col-md-6 col-lg-6 my-auto">
        <div className="row creator-underline txt-bold"><p>Digital India</p></div>
        <div className="row bb-txt-3"><p>Modern Payment Solutions for the traditional Fruit Market, but
                    <span className="span-70"> online. </span></p></div>
                {/* <div className="row bb-txt-3"><p><span className="check-1"></span>Trigger retargeting pixels directly from your links.</p></div> */}

                <div className="row-center bb-txt-2">
                    <p className= "my-auto">Join the digital revolution in fruit procurement with our diverse payment options. 
                    <br /><br />Embrace the spirit of Digital India as we offer seamless transactions via debit/credit cards (VISA, Mastercard, Amex), UPI, and net banking etc. 
                    <br /><br />Say goodbye to traditional cash transactions and welcome the convenience of online payments. 
                    With a focus on modernizing the fruit market, we empower businesses to easily purchase exotic fruits online while promoting a cashless economy. 
                    Whether you're a small shop or a large enterprise, our flexible payment methods cater to your needs, ensuring a smooth and secure transaction experience in line with India's digital transformation.</p>
                </div>


    </div>

    <div className="col-12 col-md-6 col-lg-6 my-auto">
        <img className="img-fluid rounded" src={banner3} alt="banner" width={500} height={500} />

    </div>
</div>
</div>


    <div className="container mt-3">

        <div className="row mx-auto">
          <div className="col-12 col-md-6 col-lg-6 order-2 order-md-0 order-lg-0 my-auto">
          <img className="img-fluid rounded" src={banner4} alt="social Media" width={600} height={600} />
        </div>

            <div className="col-12 col-md-6 col-lg-6 my-auto">
                <div className="row creator-underline txt-bold"><p>Shipment Delivery</p></div>
                <div className="row bb-txt-3"><p>Right now we are serving
                    <span className="span-70"> Hyderabad </span>city and soon will serve other cities as well.</p></div>
                {/* <div className="row bb-txt-3"><p><span className="check-1"></span>Trigger retargeting pixels directly from your links.</p></div> */}

                <div className="row-center bb-txt-2">
                    <p className= "my-auto">Experience swift and reliable shipment delivery in Hyderabad with our service. 
                    From our base in the city, we ensure your orders reach you within just 3 days. 
                    <br /><br /> Embrace the convenience of timely deliveries, whether you're stocking up for your shop or outlet. 
                    Our commitment to efficiency means you can rely on us for fresh, quality fruits delivered straight to your doorstep.  
                    Join the growing community of businesses in Hyderabad benefitting from our seamless shipment delivery service, making stocking your shelves hassle-free.</p>
                </div>

                <div className="col-md-4 col-12 get-started-button-credit-card mb-5" >
          <Link to="/login/brand" style={{textDecoration: 'none'}}>
            <button className="btn signup-btn-grad btn-g-fonts" >
              Order Now
            </button>
          </Link>
      </div>

            </div>

          

        </div>

    </div>

   


    </>
  )
}

export default BodyBlocks
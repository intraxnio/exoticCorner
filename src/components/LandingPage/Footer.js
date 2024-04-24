import React from "react";
import { Link } from 'react-router-dom';
import linkedin from "../../images/icon-instagram.png"

export default function Footer() {
  return (
    <>
      <div className="container-fluid bg-footer-container pt-5 pb-2">
        <div className="container row mx-auto p-1">
          <div className="container col-md-3 col-12 my-2">
            <div className="div">
                
              <ul>
                <li className="footer-head-text">Useful</li>
                <li className="footer-content-text"><Link to="/terms-conditions" className="footer-subhead-decoration">Terms & Conditions</Link></li>
                <li className="footer-content-text"><Link to="/privacy-policy" className="footer-subhead-decoration">Privacy Policy</Link></li>
                <li className="footer-content-text"><Link to="/cancellation-refund" className="footer-subhead-decoration">Cancellation & Refund</Link></li>
                <li className="footer-content-text"><Link to="/shipping-policy" className="footer-subhead-decoration">Shipping Policy</Link></li>
                <li className="footer-content-text"><Link to="/contact-us" className="footer-subhead-decoration">Contact Us</Link></li>
                {/* <li className="footer-content-text"><Link to="/sitemap.xml" className="footer-subhead-decoration">Sitemap</Link></li> */}

              </ul>
            </div>
          </div>
          {/* <div className="container col-sm-6 col-6 col-md-3 col-lg-3 my-2">
            <div className="div">
              <ul>
                <li className="footer-head-text">Support</li>
                <li className="footer-content-text"><Link href="/support/contact"><a className="footer-subhead-decoration">Contact Us</a></Link></li>
                <li className="footer-content-text"><Link href="/sitemap.xml"><a className="footer-subhead-decoration">Sitemap</a></Link></li>

                <li className="footer-content-text"><Link href="/support/creators"><a className="footer-subhead-decoration">For Creators</a></Link></li>
                <li className="footer-content-text"><Link href="/support/brands"><a className="footer-subhead-decoration">For Brands</a></Link></li>
                <li className="footer-content-text"><Link href="/support/others"><a className="footer-subhead-decoration">Others</a></Link></li>

              </ul>
            </div>
          </div> */}
        
          
          <div className="container col-sm-12 col-12 col-md-3 col-lg-3 my-2">
            <div className="div">
              <ul>
                <li className="footer-head-text">Follow us</li>
                {/* 
                <li className="footer-content-text">
                 Freshbooks Alternative
                </li>
                <li className="footer-content-text">
                 Quickbooks Alternative
                </li>
                <li className="footer-content-text">
                 Zohobooks Alternative
                </li>
                <li className="footer-content-text">
                 Xero Alternative
                </li>
                <li className="footer-content-text">
                 Sage Intacct Alternative
                </li>
                <li className="footer-content-text">
                 Netsuite Alternative
                </li>
               

                <li className="footer-head-text pt-4">
                  Follow us 
                </li> */}
                <li className="footer-content-text my-1">
                <Link to="https://www.instagram.com/exoticfruitscorner/" target="_blank" rel="noopener noreferrer"><a><img  className="img-fluid rounded icon-image" src={linkedin} alt="linkedin-icon" width={38} height={22} /></a></Link>

                  
                </li>
              </ul>
            </div>
          </div>
        </div>



        <div className="container text-center my-3">
          <span className="fw-normal" style={{color: "#B9B4C7"}}>&copy;2024, ForestKisan Organic Products. All Rights Reserved.</span>
        </div>

      </div>
    </>
  );
}

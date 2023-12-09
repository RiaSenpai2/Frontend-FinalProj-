import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <div className="footer-top" style={{ paddingLeft: '25%' }}>
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-5 col-md-12 footer-info">
              <a href="index.html" className="logo d-flex align-items-center">
                <img src='src/Components/assets/img' alt="" />
                <span>LuggShare</span>
              </a>
              <p>Selling luggage space: A new twist in travel, redefining logistics and community sharing.</p>
              <div className="social-links mt-3">
                <a href="" className="twitter"><i className="bi bi-twitter"></i></a>
                <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
                <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
                <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
              </div>
            </div>

            <div className="col-lg-2 col-6 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li><i className="bi bi-chevron-right"></i> <a href="#">Home</a></li>
                <li><i className="bi bi-chevron-right"></i> <a href="#">About</a></li>
                <li><i className="bi bi-chevron-right"></i> <a href="#">Contact us</a></li>
                <li><i className="bi bi-chevron-right"></i> <a href="#">How it works?</a></li>
                <li><i className="bi bi-chevron-right"></i> <a href="#">Login</a></li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
              <h4>Contact Us</h4>
              <p>
                A108 Adam Street A<br />
                New York, NY 535022<br />
                United States <br /><br />
                <strong>Phone:</strong> +1 5589 55488 55<br />
                <strong>Email:</strong> info@example.com<br />
              </p>
            </div>

          </div>
        </div>
      </div>

      <div className="container">
        <div className="copyright">
          &copy; Copyright <strong><span>LuggShare</span></strong>. All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;

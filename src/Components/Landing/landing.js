import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./landing.css";
import 'aos/dist/aos.css';
import northeasternImage from "../assets/img/touristImage.avif";
import AOS from 'aos';
import Filler from "../FillerComp/Filler";
import leftImage from "../assets/img/busi.jpg"
import { Carousel } from 'react-bootstrap';
import testimonialimg1 from "../assets/img/testimonials/testimonials-1.jpg"
import testimonialimg2 from "../assets/img/testimonials/testimonials-2.jpg"
import testimonialimg3 from "../assets/img/testimonials/testimonials-3.jpg"
import testimonialimg4 from "../assets/img/testimonials/testimonials-4.jpg"
import testimonialimg5 from "../assets/img/testimonials/testimonials-5.jpg"
import { Accordion, Container, Row, Col } from 'react-bootstrap';


const Landing = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);
    
  return (
    <div className="Landing">
      <div className="background-section">
        <div className="text-container">
          <h2 className="landing-h2">Want to earn during flying?</h2>
          <h1 className="landing-h1">"Unlocking Extra Luggage Space: Share, Travel, and Earn!"</h1>
        </div>
      </div>
      <Filler
        subtitle="What we do ?"
        title="We help flight travelers share their extra luggage space with fellow passengers, making travel more cost-effective and efficient."
        readMoreLink="#"
        readMoreText="Read More"
        imageSrc={northeasternImage}
        imageAlt="Northeastern University"
      />

      
     <hr className="divider" />



    <section className="about">
      <div className="container" data-aos="fade-up">
        <div className="row gx-0">
          
          {/* Image now comes first, so it will be on the left */}
          <div
            className="col-lg-6 d-flex align-items-center"
            data-aos="zoom-out"
            data-aos-delay="200"
          >
            <img src={leftImage} className="img-fluid" alt="Business Image" />
          </div>

          {/* Content now comes second, so it will be on the right */}
          <div
            className="col-lg-6 d-flex flex-column justify-content-center"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="content">
              <h3>How we do?</h3>
              <h2>We help flight travelers share their extra luggage space with fellow passengers, making travel more cost-effective and efficient.</h2>
              <div className="text-center text-lg-start">
                <a
                  href="#Home"
                  className="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center"
                >
                  <span>Read more</span>
                  <i className="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <hr className="divider" />

    <section id="testimonials" className="testimonials">
      <div className="container" data-aos="fade-up">

        <header className="section-header">
          <h2>Testimonials</h2>
          <p>Feedback we received so far.</p>
        </header>

        <Carousel data-aos="fade-up" data-aos-delay="200">
          {/* Testimonial 1 */}
          <Carousel.Item>
            <div className="testimonial-item">
              <div className="stars">
                <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i>
              </div>
              <p>
                Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.
              </p>
              <div className="profile mt-auto">
                <img src={testimonialimg1} className="testimonial-img" alt="" />
                <h3>Saul Goodman</h3>
                <h4>Ceo & Founder</h4>
              </div>
            </div>
          </Carousel.Item>

          {/* Testimonial 2 */}
          <Carousel.Item>
            <div className="testimonial-item">
              <div className="stars">
                <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i>
              </div>
              <p>
                Export tempor illum tamen malis malis eram quae irure esse labore quem cillum quid cillum eram malis quorum velit fore eram velit sunt aliqua noster fugiat irure amet legam anim culpa.
              </p>
              <div className="profile mt-auto">
                <img src={testimonialimg2} className="testimonial-img" alt="" />
                <h3>Sara Wilsson</h3>
                <h4>Designer</h4>
              </div>
            </div>
          </Carousel.Item>

          {/* Testimonial 3 */}
          <Carousel.Item>
            <div className="testimonial-item">
              <div className="stars">
                <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i>
              </div>
              <p>
                Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem veniam duis minim tempor labore quem eram duis noster aute amet eram fore quis sint minim.
              </p>
              <div className="profile mt-auto">
                <img src={testimonialimg3} className="testimonial-img" alt="" />
                <h3>Jena Karlis</h3>
                <h4>Store Owner</h4>
              </div>
            </div>
          </Carousel.Item>

          {/* Testimonial 4 */}
          <Carousel.Item>
            <div className="testimonial-item">
              <div className="stars">
                <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i>
              </div>
              <p>
                Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export minim fugiat minim velit minim dolor enim duis veniam ipsum anim magna sunt elit fore quem dolore labore illum veniam.
              </p>
              <div className="profile mt-auto">
                <img src={testimonialimg4} className="testimonial-img" alt="" />
                <h3>Matt Brandon</h3>
                <h4>Freelancer</h4>
              </div>
            </div>
          </Carousel.Item>

          {/* Testimonial 5 */}
          <Carousel.Item>
            <div className="testimonial-item">
              <div className="stars">
                <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i>
              </div>
              <p>
                Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam tempor noster veniam enim culpa labore duis sunt culpa nulla illum cillum fugiat legam esse veniam culpa fore nisi cillum quid.
              </p>
              <div className="profile mt-auto">
                <img src={testimonialimg5} className="testimonial-img" alt="" />
                <h3>John Larson</h3>
                <h4>Entrepreneur</h4>
              </div>
            </div> 
          </Carousel.Item>      
        </Carousel>
      </div>
    </section>

    <hr className="divider" />


    <section id="custom-faq" className="custom-faq">
      <Container data-aos="fade-up">
        <header className="section-header">
          <h2>Have Questions?</h2>
          <p>Commonly asked Questions?</p>
        </header>

        <Row>
          <Col lg={6}>
            {/* Custom F.A.Q List 1 */}
            <Accordion defaultActiveKey="0" id="custom-faqlist1">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  How do I get started with your service?
                </Accordion.Header>
                <Accordion.Body>
                  Getting started is easy! Just sign up, create an account, and you'll be on your way to using our services.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  What payment methods do you accept?
                </Accordion.Header>
                <Accordion.Body>
                  We accept a variety of payment methods, including credit cards, PayPal, and more. You can choose the one that works best for you.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>

          <Col lg={6}>
            {/* Custom F.A.Q List 2 */}
            <Accordion defaultActiveKey="0" id="custom-faqlist2">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  Is my personal information secure?
                </Accordion.Header>
                <Accordion.Body>
                  Your privacy and security are our top priorities. We use advanced encryption and security measures to protect your data.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  Can I cancel my subscription at any time?
                </Accordion.Header>
                <Accordion.Body>
                  Yes, you can cancel your subscription anytime without any additional fees. We believe in providing flexibility to our users.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </section>


    </div>

    
  );
};

export default Landing;




import React from 'react';
import "./Filler.css"

function Filler(props) {
  return (
    <section className="about" id='about'>
      <div className="container" data-aos="fade-up">
        <div className="row gx-0">
          <div
            className="col-lg-6 d-flex flex-column justify-content-center"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="content">
              <h3>{props.subtitle}</h3>
              <h2>{props.title}</h2>
              <div className="text-center text-lg-start">
                <a
                  href={props.readMoreLink}
                  className="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center"
                >
                  <span>{props.readMoreText}</span>
                  <i className="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>

          <div
            className="col-lg-6 d-flex align-items-center"
            data-aos="zoom-out"
            data-aos-delay="200"
          >
            <img src={props.imageSrc} className="img-fluid" alt={props.imageAlt} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Filler;

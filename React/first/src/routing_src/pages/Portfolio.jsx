import React from 'react'
import img1 from './images/working-business-women.jpg';
import img2 from './images/curved-display-pinky-girl.jpg';
import img3 from './images/computer-desk-stickers.jpg';
import img4 from './images/marketing-strategy-women.jpg';
import img5 from './images/dashboard-interfaces-transparent-displays.jpg';
import img6 from './images/portfolio-website-girl.jpg';

function Portfolio1() {
  return (
<>
<section className="my-5 bg-primary-subtle" id="portfolio">
  <div className="container py-5">
    <div className="row">
      <div className="col-lg-12">
        <h2 className="about-heading text-center mx-auto display-3 fw-bold">Featured Work</h2>
        <hr className="hr-line mx-auto" />
      </div>
    </div>
    <div className="row gy-5">
      <div className="col-lg-4">
        <div className="card custom-card rounded-5">
          <img src={img1} className="card-img-top" alt="E-commerce" />
          <div className="card-body">
            <h5 className="card-title fw-bold">E-commerce Platform</h5>
            <p className="card-text">
              A modern, responsive e-commerce solution with focus on user experience and
              conversion optimization.
              Built with scalability and performance in mind.
            </p>
            <div>
              <span className="badge bg-light text-dark tech-badge">React</span>
              <span className="badge bg-light text-dark tech-badge">Node.js</span>
              <span className="badge bg-light text-dark tech-badge">MongoDB</span>
              <span className="badge bg-light text-dark tech-badge">Stripe</span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="card custom-card rounded-5">
          <img src={img2} className="card-img-top" alt="E-commerce" />
          <div className="card-body">
            <h5 className="card-title fw-bold">E-commerce Platform</h5>
            <p className="card-text">
              A modern, responsive e-commerce solution with focus on user experience and
              conversion optimization.
              Built with scalability and performance in mind.
            </p>
            <div>
              <span className="badge bg-light text-dark tech-badge">React</span>
              <span className="badge bg-light text-dark tech-badge">Node.js</span>
              <span className="badge bg-light text-dark tech-badge">MongoDB</span>
              <span className="badge bg-light text-dark tech-badge">Stripe</span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="card custom-card rounded-5">
          <img src={img3} className="card-img-top" alt="E-commerce" />
          <div className="card-body">
            <h5 className="card-title fw-bold">E-commerce Platform</h5>
            <p className="card-text">
              A modern, responsive e-commerce solution with focus on user experience and
              conversion optimization.
              Built with scalability and performance in mind.
            </p>
            <div>
              <span className="badge bg-light text-dark tech-badge">React</span>
              <span className="badge bg-light text-dark tech-badge">Node.js</span>
              <span className="badge bg-light text-dark tech-badge">MongoDB</span>
              <span className="badge bg-light text-dark tech-badge">Stripe</span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="card custom-card rounded-5">
          <img src={img4} className="card-img-top" alt="E-commerce" />
          <div className="card-body">
            <h5 className="card-title fw-bold">E-commerce Platform</h5>
            <p className="card-text">
              A modern, responsive e-commerce solution with focus on user experience and
              conversion optimization.
              Built with scalability and performance in mind.
            </p>
            <div>
              <span className="badge bg-light text-dark tech-badge">React</span>
              <span className="badge bg-light text-dark tech-badge">Node.js</span>
              <span className="badge bg-light text-dark tech-badge">MongoDB</span>
              <span className="badge bg-light text-dark tech-badge">Stripe</span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="card custom-card rounded-5">
          <img src={img5} className="card-img-top" alt="E-commerce" />
          <div className="card-body">
            <h5 className="card-title fw-bold">E-commerce Platform</h5>
            <p className="card-text">
              A modern, responsive e-commerce solution with focus on user experience and
              conversion optimization.
              Built with scalability and performance in mind.
            </p>
            <div>
              <span className="badge bg-light text-dark tech-badge">React</span>
              <span className="badge bg-light text-dark tech-badge">Node.js</span>
              <span className="badge bg-light text-dark tech-badge">MongoDB</span>
              <span className="badge bg-light text-dark tech-badge">Stripe</span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="card custom-card rounded-5">
          <img src={img6} className="card-img-top" alt="E-commerce" />
          <div className="card-body">
            <h5 className="card-title fw-bold">E-commerce Platform</h5>
            <p className="card-text">
              A modern, responsive e-commerce solution with focus on user experience and
              conversion optimization.
              Built with scalability and performance in mind.
            </p>
            <div>
              <span className="badge bg-light text-dark tech-badge">React</span>
              <span className="badge bg-light text-dark tech-badge">Node.js</span>
              <span className="badge bg-light text-dark tech-badge">MongoDB</span>
              <span className="badge bg-light text-dark tech-badge">Stripe</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


</>
  )
}

export default Portfolio1;
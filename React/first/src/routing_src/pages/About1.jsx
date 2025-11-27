import React from 'react'
import img7 from './images/smiling-girl-computer-desktop.jpg'

function About1() {
  return (
<>
<section className="my-5 bg-primary-subtle" id="about">
  <div className="container py-5">
    <div className="row">
      <div className="col-lg-12">
        <h2 className="about-heading text-center mx-auto display-3 fw-bold">About Us</h2>
        <hr className="hr-line mx-auto" />
      </div>
    </div>
    <div className="row py-4">
      <div className="col-lg-5">
        <div className="hero-img">
          <img src={img7} alt="hero-img" className="img-fluid rounded-5" />
        </div>
      </div>
      <div className="col-lg-7 pt-5">
        <div className="about-text slide-in-right">
          <h3>Passionate about creating meaningful digital experiences</h3>
          <p>With over 5 years of experience in digital design, I specialize in creating user-centered
            solutions that bridge the gap between functionality and aesthetics. My approach combines
            strategic thinking with creative execution to deliver impactful results.</p>
          <p>I believe that great design is not just about how it looks, but how it works and how it
            makes people feel. Every project is an opportunity to solve problems and create
            connections that matter.</p>
          <p>When I'm not designing, you'll find me exploring new technologies, sketching ideas, or
            seeking inspiration in nature and architecture.</p>
          <div className="skills">
            <span className="skill-tag">UI/UX Design</span>
            <span className="skill-tag">Web Development</span>
            <span className="skill-tag">Brand Identity</span>
            <span className="skill-tag">Motion Graphics</span>
            <span className="skill-tag">Prototyping</span>
            <span className="skill-tag">Design Systems</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

</>
  )
}

export default About1
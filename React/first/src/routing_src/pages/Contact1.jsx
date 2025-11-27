import React from 'react'

function Contact1() {
  return (
<>
<section className="mt-5 bg-primary-subtle" id="contact">
  <div className="container py-5">
    <div className="row text-center">
      <h2 className="section-title fade-in mt-5">Let's Work Together</h2>
      <p className="fade-in">Ready to bring your vision to life? Let's discuss how we can create something
        amazing together. I'm always excited to take on new challenges and collaborate on innovative
        projects.</p>
    </div>
    <div className="row">
      <div className="col-lg-8 mx-auto">
        <form action>
          <div className="row gy-3">
            <div className="col-md-6">
              <input type="text" name="name" className="form-control" placeholder="Your Name" required />
            </div>
            <div className="col-md-6">
              <input type="email" className="form-control" name="email" placeholder="Your Email" required fdprocessedid="gknxvb" />
            </div>
            <div className="col-md-12">
              <input type="text" className="form-control" name="subject" placeholder="Subject" required />
            </div>
            <div className="col-md-12">
              <textarea className="form-control" name="message" rows={10} placeholder="Message" required defaultValue={""} />
            </div>
            <div className="col-md-12 text-center">
              {/* <div class="loading">Loading</div>
                          <div class="error-message"></div>
                          <div class="sent-message">Your message has been sent. Thank you!</div> */}
              <button type="submit" className="send-message-button">Send Message</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>

</>

  )
}

export default Contact1
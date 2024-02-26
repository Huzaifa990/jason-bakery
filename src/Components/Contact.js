import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add form validation here
    console.log(formData);
    // You can submit formData to your backend or API endpoint here
    // For now, let's just show the success message
    setShowSuccess(true);
    // Clear form data
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div>
      <div className="contact-from-section mt-150 mb-150">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mb-5 mb-lg-0">
              <div className="form-title">
                <h2>Have a question or inquiry?</h2>
                <p>
                  We're here to help! Feel free to reach out to us using the
                  contact form below, and we'll get back to you as soon as
                  possible. Whether you're looking to place an order, inquire
                  about our products and services, or just want to say hello,
                  we'd love to hear from you. Simply fill out the form with your
                  name, email address, and message, and one of our friendly team
                  members will be in touch shortly. Your feedback is important
                  to us, and we're committed to providing exceptional customer
                  service every step of the way. Thank you for choosing Sweet
                  Tooth Bakery. We look forward to serving you soon!
                </p>
              </div>
              <div id="form_status"></div>
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <p>
                    <input
                      type="text"
                      placeholder="Name"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </p>
                  <p>
                    <input
                      type="tel"
                      placeholder="Phone"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      placeholder="Subject"
                      name="subject"
                      id="subject"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </p>
                  <p>
                    <textarea
                      name="message"
                      id="message"
                      cols="30"
                      rows="10"
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </p>
                  <p>
                    <input type="submit" value="Submit" />
                  </p>
                </form>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="contact-form-wrap">
                <div className="contact-form-box">
                  <h4>
                    <i className="fas fa-map"></i> Shop Address
                  </h4>
                  <p>
                    123, New Street <br /> London <br /> England
                  </p>
                </div>
                <div className="contact-form-box">
                  <h4>
                    <i className="far fa-clock"></i> Shop Hours
                  </h4>
                  <p>
                    MON - FRIDAY: 8 to 9 PM <br /> SAT - SUN: 10 to 8 PM{" "}
                  </p>
                </div>
                <div className="contact-form-box">
                  <h4>
                    <i className="fas fa-address-book"></i> Contact
                  </h4>
                  <p>
                    Phone: +44 0208 123 456 <br /> Email:
                    support@sweettoothbakery.co.uk
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showSuccess} onHide={() => setShowSuccess(false)}>
        <Modal.Header closeButton>
          <Modal.Title style={{color: 'green', fontWeight: 'bold'}}>Form Submitted Successfully!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your form has been submitted successfully. We'll get back to you as
          soon as possible.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSuccess(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

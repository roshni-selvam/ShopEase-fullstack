import { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

function Contact() {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_ywmpla1",
        "template_affjyan",
        form.current,
        "mhzfChEZ4TSZPmV2N"
      )
      .then(() => {
        alert("Message Sent Successfully!");
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to send message");
      });

    e.target.reset();
  };
return (
    <section className="contact">
      <h2>Contact Us</h2>

      <form
        ref={form}
        onSubmit={sendEmail}
        className="contact-form"
      >
        <input
          type="text"
          name="user_name" // Updated to match template
          placeholder="Your Name"
          required
        />

        <input
          type="email"
          name="user_email" // Updated to match template
          placeholder="Your Email"
          required
        />

        <textarea
          name="message" // This was already correct
          placeholder="Your Message"
          rows="5"
          required
        ></textarea>

        <button type="submit">
          Send Message
        </button>
      </form>
    </section>
  );
}
export default Contact;
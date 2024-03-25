import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import './styles.css';

export default function FeedBack() {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    emailjs.init(import.meta.env.VITE_key);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serviceId = import.meta.env.VITE_service_ID;
    const templateId = import.meta.env.VITE_template_ID;
    try {
      setLoading(true);
      await emailjs.sendForm(serviceId, templateId, form.current, {
        userName: user.name, 
      });
      alert("Email successfully sent. Please check your inbox.");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <aside>
        <form ref={form}>
          <label>Message</label>
          <textarea name="message" className="highlighted-textarea" />
          <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
      </aside>
      <form className="for" onSubmit={handleSubmit}>
      </form>
    </section>
  );
}

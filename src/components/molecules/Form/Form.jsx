import React, { useRef, useState } from 'react';
import './form.css';
import emailjs from '@emailjs/browser';

const Form = () => {
  const contactForm = useRef();
  const [formFilled, setFormFilled] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = contactForm.current.email.value;
    const atIndex = email.indexOf('@');

    if (
      contactForm.current.name.value &&
      email &&
      atIndex !== -1 && 
      contactForm.current.message.value
    ) {
      emailjs
        .sendForm('service_4am808m', 'template_fo948bf', contactForm.current, 'JLlZHdARt2Uvm4PdA')
        .then(
          () => {
            console.log('SUCCESS!');
            setIsSent(true);
            setTimeout(() => {
              setIsSent(false);
              contactForm.current.reset();
            }, 3000);
          },
          (error) => {
            console.log('FAILED...', error.text);
          },
        );
    } else {
      alert("Veuillez remplir tous les champs du formulaire correctement avant d'envoyer.");
    }
  };

  return (
    <div>
      <form ref={contactForm} onSubmit={handleSubmit}>
      {isSent && <p>Merci votre message a bien été envoyé !</p>}
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="message">Message</label>
        <textarea name="message" id="message" />
        <input type="submit" value="Envoyer" className='button' />
      </form>
    </div>
  );
};

export default Form;

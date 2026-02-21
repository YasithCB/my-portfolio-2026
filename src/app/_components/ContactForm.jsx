"use client";

import { Formik } from 'formik';
import AppData from "@data/app.json";

const ContactForm = () => {
  return (
    <>
        {/* contact form */}
        <Formik
        initialValues = {{ email: '', name: '', message: '' }}
        validate = { values => {
            const errors = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
                errors.email = 'Invalid email address';
            }
            return errors;
        }}
        onSubmit = {( values, { setSubmitting } ) => {
            const form = document.getElementById("contactForm");
            const status = document.getElementById("contactFormStatus");
            const data = new FormData();

            data.append('name', values.name);
            data.append('email', values.email);
            data.append('message', values.message);

            fetch(form.action, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    status.innerHTML = "<h5>Thanks, your message is sent successfully.</h5>";
                    form.reset()
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
                        } else {
                            status.innerHTML = "<h5>Oops! There was a problem submitting your form</h5>"
                        }
                    })
                }
            }).catch(error => {
                status.innerHTML = "<h5>Oops! There was a problem submitting your form</h5>"
            });

            setSubmitting(false);
        }}
        >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
        }) => (
        <form onSubmit={handleSubmit} id="contactForm" action={AppData.settings.formspreeURL} className="art-contact-form">
            {/* form field */}
            <div className="art-form-field">
                {/* name input */}
                <input 
                    type="text" 
                    placeholder="Name"
                    name="name" 
                    id="name"
                    className="art-input"
                    required="required" 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name} 
                />
                {/* label */}
                <label  htmlFor="name"><i className="fas fa-user"></i></label>
            </div>
            {/* form field end */}
            {/* form field */}
            <div className="art-form-field">
                {/* email input */}
                <input 
                    type="email" 
                    id="email"
                    className="art-input"
                    placeholder="Email"
                    name="email"
                    required="required"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email} 
                />
                {/* label */}
                <label  htmlFor="email"><i className="fas fa-at"></i></label>
            </div>
            {/* form field end */}
            {/* form field */}
            <div className="art-form-field">
                {/* message textarea */}
                <textarea 
                    placeholder="Message"
                    name="message" 
                    id="message"
                    className="art-input"
                    required="required"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.message} 
                />
                {/* label */}
                <label  htmlFor="message"><i className="far fa-envelope"></i></label>
            </div>
            {/* form field end */}
            {/* button */}
            <div className="art-submit-frame">
                <button className="art-btn art-btn-md art-submit" type="submit"><span>Send message</span></button>
                {/* success */}
                <div className="art-success">Success <i className="fas fa-check"></i></div>
            </div>
            {/* button end */}
            
            <div className="form-status alert-success mil-mb-90" id="contactFormStatus" style={{"display": "none"}} />
        </form>
        )}
        </Formik>
        {/* contact form end */}
    </>
  );
};
export default ContactForm;
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./login.css";

// Validation schema for the form
const SignupSchema = Yup.object().shape({
  fname: Yup.string()
    .min(3, 'Too Short!')
    .max(14, 'Too Long!')
    .required('Required'),
  lname: Yup.string()
    .min(3, 'Too Short!')
    .max(14, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Password is too short - should be 6 chars minimum.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must contain a number, an uppercase letter, a lowercase letter, and a special character."
    )
    .required('Required'),
});

export default function SignUp() {
  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <Formik
          initialValues={{ fname: '', lname: '', email: '', password: '' }}
          validationSchema={SignupSchema}
          onSubmit={(values, { setSubmitting, setFieldError }) => {
            console.log("Sending data to backend:", values);
            fetch("https://backend-luggshare3.onrender.com/api/user/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            })
            .then(response => {
              if (!response.ok) {
                throw response;
              }
              return response.json();
            })
            .then(data => {
              if (data.status === "ok") {
                alert('Registration Successful');
                window.location.href = "./Login";
                // Optionally redirect the user to login page
              } else {
                alert('Registration failed: ' + data.message);
              }
            })
            .catch(async (error) => {
              if (error.status === 400) {
                const errorData = await error.json();
                setFieldError('email', errorData.message);
              } else {
                alert('An error occurred');
              }
            })
            .finally(() => setSubmitting(false));
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <h3>Sign Up</h3>
              <div className="mb-3">
                <label>First Name</label>
                <Field name="fname" type="text" className={`form-control ${errors.fname && touched.fname ? 'is-invalid' : ''}`} />
                <ErrorMessage name="fname" component="div" className="invalid-feedback" />
              </div>

              <div className="mb-3">
                <label>Last Name</label>
                <Field name="lname" type="text" className={`form-control ${errors.lname && touched.lname ? 'is-invalid' : ''}`} />
                <ErrorMessage name="lname" component="div" className="invalid-feedback" />
              </div>

              <div className="mb-3">
                <label>Email Address</label>
                <Field name="email" type="email" className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`} />
                <ErrorMessage name="email" component="div" className="invalid-feedback" />
              </div>

              <div className="mb-3">
                <label>Password</label>
                <Field name="password" type="password" className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`} />
                <ErrorMessage name="password" component="div" className="invalid-feedback" />
              </div>

              <button type="submit" className="btn btn-primary">Sign Up</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

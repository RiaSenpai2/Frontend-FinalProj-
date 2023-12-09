import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

import "./login.css"

// Validation schema for the form
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string().required('Required'),
});




export default function Login() {

  const navigate = useNavigate();
  const handleGoogleLogin = (googleData) => {
    console.log(googleData);
  };

  const handleGoogleFailure = (error) => {
    console.error(error);
    // Handle login failure
  };

  const navigateToResetPassword = () => {
    navigate('/reset-password'); // Navigate to reset-password route
  };
  
  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={(values, { setSubmitting }) => {
            fetch("https://backend-luggshare3.onrender.com/api/user/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            })
            .then(response => response.json())
            .then(data => {
              console.log(data);
              if (data.status === "ok") {
                // Assuming the response includes user's first name and token
                window.localStorage.setItem('loggedIn', true);
                window.localStorage.setItem("email", data.email);
                window.localStorage.setItem("token", data.token);
                window.location.href = "./";
                // Redirect if needed
              } else {
                alert('Login failed: ' + data.message);
              }
            })
            .catch(error => {
              console.error('Error:', error);
              alert('An error occurred');
            })
            .finally(() => setSubmitting(false));
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <h3>Sign In</h3>
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

              <button type="submit" className="btn btn-primary">Login</button>
            </Form>
          )}
        </Formik>
        <GoogleLogin
          clientId="618923635698-lo9k25r7fqdhtnoqtbg8tcpcrehe80dj.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={handleGoogleLogin}
          onFailure={handleGoogleFailure}
          cookiePolicy={'single_host_origin'}
        />

        {/* New Button for Password Reset */}
        <button onClick={navigateToResetPassword} className="btn btn-secondary">
          Reset Password
        </button>
      </div>
    </div>
  );
}

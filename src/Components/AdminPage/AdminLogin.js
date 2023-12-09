import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./adminLogin.css"; 
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Authentication/AuthContext';


// Validation schema
const AdminLoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .required('Required'),
});

export default function AdminLogin() {
    const { setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={AdminLoginSchema}
          onSubmit={(values, { setSubmitting }) => {
            fetch("https://backend-luggshare3.onrender.com/api/admin/login", { 
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            })
            .then(response => {
              if (!response.ok) {
                throw new Error('Invalid credentials');
              }
              return response.json();
            })
            .then(data => {
              localStorage.setItem('isLoggedIn', 'true');
              alert('Admin login successful');
              navigate('/admin/dashboard');
              // Handle admin login success, e.g., redirect or store session data
            })
            .catch(error => {
              alert(error.message);
            })
            .finally(() => setSubmitting(false));
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <h3>Admin Login</h3>
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
      </div>
    </div>
  );
}

import React from 'react';
import { AuthProvider } from './Components/Authentication/AuthContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './Components/Authentication/ProtectedRoute';
import AdminLogin from './Components/AdminPage/AdminLogin';

import Dashboard from "./Components/AdminPage/Dashboard";
import Seller from "./Components/Seller/Seller";
import Buyer from "./Components/Buyer/Buyer";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Home from './Components/Landing/landing';
import Login from "./Components/Authentication/login_component";
import SignUp from "./Components/Authentication/signup_component";
import ResetPassword from "./Components/ResetPassword/ResetPassword";

// Define DefaultLayout here
const DefaultLayout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<DefaultLayout><Home /></DefaultLayout>} />
          <Route path="/seller" element={<DefaultLayout><Seller /></DefaultLayout>} />
          <Route path="/login" element={<DefaultLayout><Login /></DefaultLayout>} />
          <Route path="/sign-up" element={<DefaultLayout><SignUp /></DefaultLayout>} />
          <Route path="/buyer" element={<DefaultLayout><Buyer /></DefaultLayout>} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute> } />
          
       
          <Route path="/reset-password" element={<ResetPassword />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;


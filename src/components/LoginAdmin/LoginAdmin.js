import './LoginAdmin.css';
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const LoginAdmin = ({ setIsLoggedIn }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9._%+-]+@(Admin\.com|gmail\.com)$/,
        "Email must be in the format xxx@gmail.com"
      ),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
  });

  const handleLogin = async (values) => {
    try {
      // Check for regular user in local storage
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser && storedUser.email === values.email && storedUser.password === values.password) {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', 'user');
        navigate("/Home");
        return;
      }

      // Check for admin in the database
      const response = await fetch(
        `http://localhost:4000/users?email=${values.email}&password=${values.password}`
      );
      const users = await response.json();

      if (users.length > 0) {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', 'admin');
        navigate("/Admin/Products");
      } else {
        setLoginError("Invalid email or password.");
      }
    } catch (error) {
      console.error("Login error", error);
      setLoginError("An error occurred while trying to log in.");
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        handleLogin(values).finally(() => setSubmitting(false));
      }}
    >
      {({ isSubmitting }) => (
        <div className="d-flex justify-content-around align-items-center flex-wrap w-100 h-75">
          <Form className="login-container">
            <h1>Login</h1>
            <hr />
            {loginError && <div className="error">{loginError}</div>}
            <div>
              <label htmlFor="email">Email Address</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <div className="password-field">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                />
                <span onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              Login
            </button>
            <div className="mt-3">
              <p>
                Don't have an account? <a href="/RegisterUser">Register here</a>
              </p>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default LoginAdmin;

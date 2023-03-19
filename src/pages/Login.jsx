import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBIcon,
  MDBInput,
  MDBValidation,
} from "mdb-react-ui-kit";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../redux/features/authSlice";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { email, password } = formValue;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ formValue, navigate, toast }));
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue, // [e.target.name]: e.target.value,
      [name]: value,
    });
  };
  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
    >
      <MDBCard alignment="center">
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <h5>Sign In</h5>
        <MDBCardBody>
          <MDBValidation onsubmit={handleSubmit} noValidate className="row g-3">
            {/* Email  */}
            <div className="col-md-12">
              <MDBInput
                label="Email"
                type="email"
                value={email}
                name="email"
                onChange={onInputChange}
                required
                invalid
                // validation="Looks good!"
                // noValidate="Please provide your email."
              >
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">
                  Please provide a valid Email.
                </div>
              </MDBInput>
            </div>
            {/* Password  */}
            <div className="col-md-12">
              <MDBInput
                label="Password"
                type="password"
                value={password}
                name="password"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide your password."
              >
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">
                  Please provide your password.
                </div>
              </MDBInput>
            </div>
            {/* Submit/Sign in button */}
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }} className="mt-2">
                Login
              </MDBBtn>
              {/* <button className="btn btn-primary mt-2" type="submit">
                Sign In
              </button> */}
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/register">
            <p>
              Don't have an account? <strong>Sign Up</strong>
            </p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Login;

import React from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  return (
    <div className="main-container">
      <div className="login-box">
        <div className="header">
          <h2>Login Page</h2>
        </div>
        <div className="login">
          <div className="form-control1">
            <input
              type="text"
              placeholder="user name"
              className="tbox"
              required=""
            />
          </div>
          <div className="form-control1">
            <input
              type="password"
              placeholder="*********"
              className="tbox"
              required=""
            />
          </div>
          <div className="form-control1">
            <input type="submit" defaultValue="Login Now" className="btn" />
          </div>
          <div className="forget-box">
            <Link to="/" className="link">
              forget password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

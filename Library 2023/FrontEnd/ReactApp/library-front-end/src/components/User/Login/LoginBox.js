import '../../../assets/css/adminlte.css'
import React from "react"

import "../../../assets/plugins/fontawesome-free/css/all.min.css"
import "../../../assets/plugins/icheck-bootstrap/icheck-bootstrap.min.css"
import AuthForm from '../Auth/AuthForm.js'

function LoginBox(props){

	return (
<div className='hold-transition login-page'>
<div className="login-box">
  <div className="login-logo">
    <a href="index.html"><b>VUM Library </b>2022</a>
  </div>
  {/* -- /.login-logo */}
  <div className="card">
    <div className="card-body login-card-body">
      <p className="login-box-msg">Sign in to start your session</p>
      <AuthForm></AuthForm>
      <div className="social-auth-links text-center mb-3">
      </div>
      {/* /.social-auth-links */}

      <p className="mb-1">
        <a href="forgot-password.html">I forgot my password</a>
      </p>
      <p className="mb-0">
        <a href="register.html" className="text-center">Register a new membership</a>
      </p>
    </div>
    {/* /.login-card-body */}
  </div>
</div>
</div>)
}

export default LoginBox;


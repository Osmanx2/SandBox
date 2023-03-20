import '../../../assets/css/adminlte.css'
import React from "react"

import "../../../assets/plugins/fontawesome-free/css/all.min.css"
import "../../../assets/plugins/icheck-bootstrap/icheck-bootstrap.min.css"
import RegisterForm from './RegisterForm'

function RegisterBox(props){

	return (
<div className='hold-transition login-page'>
<div className="login-box">
  <div className="login-logo">
    <a href="index.html"><b>VUM Library </b>2023</a>
  </div>
  {/* -- /.login-logo */}
  <div className="card">
    <div className="card-body login-card-body">
      <p className="login-box-msg">Register new user</p>
      <RegisterForm></RegisterForm>
      <div className="social-auth-links text-center mb-3">
      </div>
      {/* /.social-auth-links */}

      <p className="mb-1">
        <a href="forgot-password.html">I forgot my password</a>
      </p>
    </div>
    {/* /.login-card-body */}
  </div>
</div>
</div>)
}

export default RegisterBox;


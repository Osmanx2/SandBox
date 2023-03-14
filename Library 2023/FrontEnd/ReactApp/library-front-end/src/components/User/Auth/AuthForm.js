import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../store/auth-context';


const AuthForm = () => {
	const parseJwt = (token) => {
		try {
		  return JSON.parse(atob(token.split(".")[1]));
		} catch (e) {
		  return null;
		}
	  };

	const emailInputRef = useRef();
	const passwordInputRef = useRef();
	const authCtx = useContext(AuthContext);
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);
	const [isLogin, setIsLogin] = useState(true);

	const switchAuthModeHandler = () => {
		setIsLogin((prevState) => !prevState);
	};

	const submitHandler = (event) => {
		event.preventDefault();
	
		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;
	
		// optional: Add validation
	
		setIsLoading(true);
		let url ='auth-api/Users/authenticate';
		console.log(JSON.stringify({
			password: enteredPassword,
			username: enteredEmail
			
		  }))
		fetch(url, {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json'
		  },
		  body: JSON.stringify({
			password: enteredPassword,
			username: enteredEmail
		  }),
		})
		  .then((res) => {
			setIsLoading(false);
			if (res.ok) {
			  return res.json();
			} else {
			  return res.json().then((data) => {
				let errorMessage = 'Authentication failed!';
				
				throw new Error(errorMessage);
			  });
			}
		  })
		  .then((data) => {
			//console.log(data.token)
			const expirationTime = new Date(parseJwt(data.token).exp * 1000)
			//console.log(expirationTime)
			authCtx.login(data.token, expirationTime.toISOString());
			navigate("/dashboard");
		  })
		  .catch((err) => {
			console.log("Catched error")
			alert(err.message);
		  });
	  };

	return (<form onSubmit={submitHandler}>
	<div className="input-group mb-3">
	  <input type="email" className="form-control" placeholder="Email" ref={emailInputRef}/>
	  <div className="input-group-append">
		<div className="input-group-text">
		  <span className="fas fa-envelope"></span>
		</div>
	  </div>
	</div>
	<div className="input-group mb-3">
	  <input type="password" className="form-control" placeholder="Password" ref={passwordInputRef}/>
	  <div className="input-group-append">
		<div className="input-group-text">
		  <span className="fas fa-lock"></span>
		</div>
	  </div>
	</div>
	<div className="row">
	  <div className="col-8">
		<div className="icheck-primary">
		  <input type="checkbox" id="remember"/>
		  <label htmlFor="remember">
			Remember Me
		  </label>
		</div>
	  </div>
	  {/* /.col */}
	  <div className="col-4">
	  {!isLoading && (
            <button type="submit" className="btn btn-primary btn-block" onClick={switchAuthModeHandler}>Sign In</button>
          )}
          {isLoading && <p>Sending request...</p>}
	  </div>
	  {/* /.col */}
	</div>
  </form>)
}

export default AuthForm;
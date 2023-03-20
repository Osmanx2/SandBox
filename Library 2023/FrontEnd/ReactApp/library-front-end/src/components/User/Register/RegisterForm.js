import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../store/auth-context';


const RegisterForm = () => {
	const parseJwt = (token) => {
		try {
		  return JSON.parse(atob(token.split(".")[1]));
		} catch (e) {
		  return null;
		}
	  };

	const emailInputRef = useRef();
	const passwordInputRef = useRef();
	const passwordRepeadInputRef = useRef();
	const authCtx = useContext(AuthContext);
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);
	const [isLogin, setIsLogin] = useState(true);

	const switchAuthModeHandler = () => {
		setIsLogin((prevState) => !prevState);
	};

	const validations = (password, repeatPassword) => {
		let errors = []

		// Validation 1
		if(password != repeatPassword){
			errors.push("Passwords does not match!")
		}

		// Validation 2
		// Will be in the API for existing user as need separate API call just for user validation otherwise
		
		console.log(JSON.stringify(errors))
		return errors
	}
	const submitHandler = (event) => {
		event.preventDefault();
	
		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;
		const enteredRepeatPassword = passwordRepeadInputRef.current.value;

		let err = validations(enteredPassword, enteredRepeatPassword)

		console.log("Debug ->"+err)

		if (err.length > 0) {
			alert(err[0]);
		}

		setIsLoading(true);
		let url ='auth-api/Users';
		// console.log(JSON.stringify({
		// 	password: enteredPassword,
		// 	username: enteredEmail
			
		//   }))
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
				console.log("Error is thrown!!!!")
				let errorMessage = data.message != null? data.message : 'Something went wrong!!';
				
				throw new Error(errorMessage);
			  });
			}
		  })
		  .then((data) => {
			alert(`User with id: ${data.id} is created.`);
			navigate("/dashboard");
		  })
		  .catch((err) => {
			console.log(JSON.stringify(err))
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
	  <input type="text" className="form-control" placeholder="Password" ref={passwordInputRef}/>
	  <div className="input-group-append">
		<div className="input-group-text">
		  <span className="fas fa-lock"></span>
		</div>
	  </div>
	</div>
	<div className="input-group mb-3">
	  <input type="text" className="form-control" placeholder="Repeat Password" ref={passwordRepeadInputRef}/>
	  <div className="input-group-append">
		<div className="input-group-text">
		  <span className="fas fa-lock"></span>
		</div>
	  </div>
	</div>
	<div className="row">
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

export default RegisterForm;
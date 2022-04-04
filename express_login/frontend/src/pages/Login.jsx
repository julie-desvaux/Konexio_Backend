import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// CONTEXT
import { AuthContext } from "../context/AuthContext";

function Login() {
	const context = useContext(AuthContext);
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		fetch("/users/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					toast.success(data.message);
					context.setIsAuthenticated(true);
					navigate("/");
				}
			})
			.catch((err) => toast.error("Email or Password doesn't match"));
	};

	return (
		<div className="container">
			<h1 className="m-3 text-center">Login</h1>
			<div className="row">
				<div className="col">
					<form onSubmit={handleSubmit}>
						<div className="form-group">
							<label htmlFor="email" className="form-label mt-4">
								Email address
							</label>
							<input
								type="email"
								className="form-control"
								id="email"
								aria-describedby="emailHelp"
								placeholder="Enter your email"
								required
								onChange={(e) => setEmail(e.target.value)}
							/>
							<small id="emailHelp" className="form-text text-muted">
								We'll never share your email with anyone else.
							</small>
						</div>
						<div className="form-group">
							<label htmlFor="password" className="form-label mt-4">
								Password
							</label>
							<input
								type="password"
								className="form-control"
								id="password"
								aria-describedby="passwordHelp"
								placeholder="******"
								required
								onChange={(e) => setPassword(e.target.value)}
							/>
							<small id="passwordHelp" className="form-text text-muted">
								The password must contain at least 8 characters
							</small>
						</div>

						<button type="submit" className="btn btn-primary mt-4">
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Login;

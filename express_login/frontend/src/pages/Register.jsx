import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [surname, setSurname] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			fetch("/users/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					password,
					confirmPassword,
					firstName,
					surname,
					dateOfBirth,
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.success) {
						toast.success(data.message);
						navigate("/login");
					}
				})
				.catch((err) => toast.error("User not created"));
		} else {
			toast.error("Password and Confirm Password doesn't match");
		}
	};

	return (
		<div className="container">
			<h1 className="m-3 text-center">Register</h1>
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
						<div className="form-group">
							<label htmlFor="confirmPassword" className="form-label mt-4">
								Confirm Password
							</label>
							<input
								type="password"
								className="form-control"
								id="confirmPassword"
								placeholder="******"
								required
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="firstName" className="form-label mt-4">
								First Name
							</label>
							<input
								type="text"
								className="form-control"
								id="firstName"
								placeholder="Enter your Firstname"
								required
								onChange={(e) => setFirstName(e.target.value)}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="surname" className="form-label mt-4">
								Surname
							</label>
							<input
								type="text"
								className="form-control"
								id="surname"
								placeholder="Enter your surname"
								required
								onChange={(e) => setSurname(e.target.value)}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="dateOfBirth" className="form-label mt-4">
								Date Of Birth
							</label>
							<input
								type="date"
								className="form-control"
								id="dateOfBirth"
								placeholder="Enter your date of birth"
								required
								onChange={(e) => setDateOfBirth(e.target.value)}
							/>
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

export default Register;

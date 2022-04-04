import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

// CONTEXT
import { AuthContext } from "../context/AuthContext";

function Navbar() {
	const location = useLocation();
	const navigate = useNavigate();
	const context = useContext(AuthContext);

	const handleLogout = () => {
		fetch("/users/logout")
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					toast.success("You are logout");
					context.setIsAuthenticated(false);
					Cookies.remove("jwt");
					navigate("/login");
				}
			});
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container-fluid">
				<a className="navbar-brand" href="/">
					Express Login
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarColor02"
					aria-controls="navbarColor02"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarColor02">
					<ul className="navbar-nav me-auto">
						{context.isAuthenticated ? (
							<>
								<li className="nav-item">
									<a className={`nav-link ${location.pathname === "/" ? "active" : ""}`} href="/">
										Admin
									</a>
								</li>
								<li className="nav-item">
									<a
										className={`nav-link ${location.pathname === "/logout" ? "active" : ""}`}
										href=""
										onClick={handleLogout}
									>
										Logout
									</a>
								</li>
							</>
						) : (
							<>
								<li className="nav-item">
									<a
										className={`nav-link ${location.pathname === "/login" ? "active" : ""}`}
										href="/login"
									>
										Login
									</a>
								</li>
								<li className="nav-item">
									<a
										className={`nav-link ${location.pathname === "/register" ? "active" : ""}`}
										href="/register"
									>
										Register
									</a>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;

import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// REACT-TOASTIFY
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// PAGES & COMPONENTS
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";

// CONTEXT
import AuthProvider from "./context/AuthContext";
import { AuthContext } from "./context/AuthContext";

const PrivateRoute = ({ children }) => {
	const context = useContext(AuthContext);
	return context.isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
	return (
		<AuthProvider>
			<div className=" min-h-screen flex flex-col justify-between">
				<Router>
					<Navbar />
					<Routes>
						<Route
							path="/"
							element={
								<PrivateRoute>
									<Admin />
								</PrivateRoute>
							}
						/>
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/logout" element={<Logout />} />
					</Routes>
				</Router>
			</div>
			<ToastContainer />
		</AuthProvider>
	);
}

export default App;

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

// MODEL
const User = require("../models/UserModel.js");

const { protect } = require("../middleware/authMiddleware.js");

// @desc 	Register a new user
// @route 	POST /users/register
// @access 	Public
router.post("/register", async (req, res) => {
	console.log(req.body);
	const { email, password, confirmPassword, firstName, surname, dateOfBirth } = req.body;

	// VALIDATION
	if (!email || !password || !confirmPassword) {
		return res.status(400).json({
			success: false,
			message: "Please include fields : email, password and confirm password",
		});
	}

	// TESTER SI LE PASSWORD ET LE CONFIRMPASSWORD SONT IDENTIQUES
	if (password !== confirmPassword) {
		return res.status(400).json({
			success: false,
			message: "Password and Confirm Password doesn't match",
		});
	}

	// HASHAGE DU MOT DE PASSE
	const hashedPassword = await bcrypt.hash(req.body.password, 12);

	// CONVERTIR LA DATE RECUE EN VRAI DATE (Date reçue au format YYYY-MM-DD)
	const trueDateOfBirth = Date.parse(dateOfBirth);

	// CREATION DE L'UTILISATEUR
	try {
		await User.create({
			email,
			password: hashedPassword,
			firstName,
			surname,
			dateOfBirth: trueDateOfBirth,
		});
		res.status(201).json({
			success: true,
			message: `User ${req.body.email} created`,
		});
	} catch (err) {
		console.log("err :", err);
		return res.status(400).json({
			success: false,
			message: "User already exists",
		});
	}
});

// @desc 	Login a user
// @route 	POST /users/login
// @access 	Public
router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	try {
		// RECUPERER LES INFOS DE L'UTILISATEUR1
		const user = await User.findOne({ email });
		// VERIFIER SI L'UTILISATEUR EXISTE
		if (!user) {
			return res.status(401).json({
				success: false,
				message: "Invalid email or password",
			});
		}

		// VERIFIER SI LES MOTS DE PASSES CORRESPONDENT
		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			return res.status(401).json({
				message: "Invalid email or password",
			});
		}

		// GENERER UN TOKEN
		const token = jwt.sign({ id: user._id }, process.env.SECRET);

		// GENERATION DU COOKIE AVEC LE TOKEN
		res.cookie("jwt", token, { httpOnly: true, secure: false });

		// ENVOIS DE LA REPONSE
		res.json({
			success: true,
			message: "Loggin successfull",
		});
	} catch (err) {
		console.log("err :", err);
		return res.status(400).json({
			success: false,
			message: "Invalid email or password",
		});
	}
});

// @desc 	Logout a user
// @route 	POST /users/logout
// @access 	Public
router.post("/logout", async (req, res) => {
	res.clearCookie("jwt");
	res.json({
		success: true,
		message: "You are Logout",
	});
});

// @desc 	Get current user
// @route 	GET /users/admin
// @access 	Private
router.get("/admin", protect, async (req, res) => {
	try {
		const users = await User.find().select("firstName surname dateOfBirth");
		return res.json({
			success: true,
			data: users,
		});
	} catch (err) {
		console.log("err :", err);
		return res.status(401).json({
			success: false,
			message: "Invalid email or password",
		});
	}
});

module.exports = router;

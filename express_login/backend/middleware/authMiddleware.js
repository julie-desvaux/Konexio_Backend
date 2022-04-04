const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
	try {
		// DECRYPTE LE TOKEN QUI EST DANS LE COOKIE
		const user = jwt.verify(req.cookies.jwt, process.env.SECRET);
		// AJOUTER UNE CLE SUR L'OBJET REQ POUR POURVOIR RECUPER LE USERID DANS NOS ROUTES
		req.userId = user.id;
		next();
	} catch (err) {
		console.log("err :", err);
		return res.status(401).json({
			success: false,
			message: "Your token is not valid",
		});
	}
};

module.exports = { protect };

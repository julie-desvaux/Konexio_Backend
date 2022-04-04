const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config({
	path: ".env",
});
const app = express();
const PORT = process.env.PORT || 8000;

// MIDDELWARES
app.use(express.json());
app.use(cookieParser());

// CONNECT MONGODB
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
	})
	.then(() => {
		console.log("Connected to MongoDB");
	});

// ROUTES
app.use("/users", require("./routes/userRouter"));

// Start server
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});

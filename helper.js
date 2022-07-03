const jwt = require("jsonwebtoken");
const JWT_SECRET = "temporary secret";

genJWT = (data, secret = JWT_SECRET) => {
	return jwt.sign(data, secret, {
		expiresIn: "28d",
	});
};

verifyJWT = (req, res, next) => {	
	baseUrl = req.baseUrl.split("/").reverse()[0];
    auth_token = req.headers["x-token"] || "";
	if (!auth_token) return helper.sendError(res, "Authentication token not provided!", 401);
	jwt.verify(auth_token, JWT_SECRET, (err, data) => {
		if (err) {
			if (err.name === "TokenExpiredError") throw { err_message: "Authentication token expired!", err_code: 401 };
			throw { err_message: "Invalid authentication token!", err_code: 401 };
		}
		delete data["exp"];
		delete data["iat"];
		req.email = data['email'];
		next();
	});
};

sendError = (res, err, resCode) => {
	err = err || "Internal server error";
	resCode = resCode || 500;
	req = res.req;
	err_message = { code: resCode || 500, message: err };
	if (typeof err !== "string") err = "Internal server error!";
	let message = {
		code: resCode,
		message: err,
	};
	res.status(resCode);
	res.json(message);
	res.end();
};

sendSuccess = (res, data, resCode) => {
	resCode = resCode || 200;
	data = data === undefined ? {} : data;
	let message = {
		code: resCode,
		data: data,
	};
	res.status(resCode);
	res.json(message);
	res.end();
};

module.exports = {
    genJWT,
    verifyJWT,
    sendError,
    sendSuccess,
}
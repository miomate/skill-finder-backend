const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.tokenPayload = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = { isAuthenticated };



//backup
// const jwt = require("jsonwebtoken");
// const isAuthenticated = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];

//     const payload = jwt.verify(token, process.env.TOKEN_SECRET); // decode token and get payload
//     req.tokenPayload = payload; // to pass the decoded payload to the next route
//     next();
//   } catch (error) {
//     // the middleware will catch error and send 401 if:
//     // 1. There is no token
//     // 2. Token is invalid

//     // 3. There is no headers or authorization in req (no token)
//     res.status(401).json("token not provided or not valid");
//   }
// };
// module.exports = { isAuthenticated };
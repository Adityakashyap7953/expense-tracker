const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {

    // Authorization header se token lena
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided"
      });
    }

    // Bearer TOKEN
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Invalid token"
      });
    }

    // Token verify
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // User ID request me store karna
    req.userId = decoded.userId;

    // Next middleware/route par jaana
    next();

  } catch (error) {

    console.log("AUTH ERROR:", error.message);

    return res.status(401).json({
      message: "Invalid or expired token"
    });

  }
};

module.exports = authMiddleware;
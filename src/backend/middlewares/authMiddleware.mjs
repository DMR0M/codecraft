import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Attach user ID from the token payload to the request object
    req.user = { id: decoded.id };

    next(); // Allow request to continue
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};


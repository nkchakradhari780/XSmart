import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const verifyAdmin = (req, res, next) => {
  try {
    const token = req.cookies?.admin_token;

    if (!token) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    // attach admin info to request
    req.admin = decoded;

    next(); // ✅ go to controller
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

import jwt from "jsonwebtoken";

// POST API - Admin login
const loginAdmin = async (req, res) => {
  const correctUsername = process.env.ADMIN_USERNAME;
  const correctPassword = process.env.ADMIN_PASSWORD;
  const JWT_SECRET = process.env.JWT_SECRET; // should be in .env
  try {
    const { username, password } = req.body;
    // Validate inputs
    if (!username || !password) {
      return res
      .status(400)
      .json({ error: "Username and password are required" });
    }

    // Check credentials
    if (username === correctUsername && password === correctPassword) {
      // Create JWT token valid for 1 day
      const token = jwt.sign({ role: "admin" }, JWT_SECRET, {
        expiresIn: "1d",
      });
      
      return res.status(200).json({
        success: true,
        message: "Login successful",
        token,
      });
    } else {
      return res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

const verifyToken = async (req, res) => {
  try {
    // Read Authorization header
    const JWT_SECRET = process.env.JWT_SECRET;
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    // Optionally: Additional checks here...

    return res.status(200).json({
      success: true,
      message: "Token is valid",
      user: decoded,
    });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

export { loginAdmin, verifyToken };

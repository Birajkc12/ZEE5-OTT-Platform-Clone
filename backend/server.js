const express = require("express");
const mysql = require("mysql2");
const path = require("path"); // Add this line to import the 'path' module
const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ZEE5",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

app.use(express.json());
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "../public")));

// Endpoint for user registration
app.post("/register", (req, res) => {
  const { email } = req.body;

  // Check if the email is already registered
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.error("Error checking email:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Insert the user into the database
    db.query("INSERT INTO users (email) VALUES (?)", [email], (err) => {
      if (err) {
        console.error("Error inserting user:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      res.json({ message: "Registration successful" });
    });
  });
});
// Endpoint for user sign-in
// Endpoint for user sign-in
app.post("/signin", (req, res) => {
  const { email } = req.body;

  // Check if the email is registered
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.error("Error checking email:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "Email not found. Please register." });
    }

    // For simplicity, assuming sign-in is successful, you may want to implement actual authentication
    res.json({ message: "Sign-in successful", user: results[0] });
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

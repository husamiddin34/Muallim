const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const FILE = "./users.json";

// Ro‘yxatdan o‘tish
app.post("/register", (req, res) => {
  let users = [];
  if (fs.existsSync(FILE)) {
    users = JSON.parse(fs.readFileSync(FILE));
  }
  users.push(req.body);
  fs.writeFileSync(FILE, JSON.stringify(users, null, 2));
  res.send({ ok: true });
});

// Login
app.post("/login", (req, res) => {
  let users = [];
  if (fs.existsSync(FILE)) {
    users = JSON.parse(fs.readFileSync(FILE));
  }
  const user = users.find(
    (u) => u.email === req.body.email && u.password === req.body.password
  );
  if (user) res.send({ ok: true, user });
  else res.send({ ok: false });
});

// Admin panel uchun barcha foydalanuvchilar
app.get("/users", (req, res) => {
  let users = [];
  if (fs.existsSync(FILE)) {
    users = JSON.parse(fs.readFileSync(FILE));
  }
  res.send(users);
});

app.listen(3000, () => console.log("✅ Backend ishlayapti port 3000"));

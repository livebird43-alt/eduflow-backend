// ----------------------
// EduFlow Backend Server
// ----------------------

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ----------------------
// Dummy Data (like a DB)
// ----------------------
let courses = [
  { id: 1, title: "Web Development", description: "Learn HTML, CSS, and JavaScript" },
  { id: 2, title: "Data Structures", description: "Learn arrays, stacks, and queues" }
];

let assignments = [
  { id: 1, courseId: 1, title: "Build a Portfolio", due: "2025-09-15" },
  { id: 2, courseId: 2, title: "Stack Implementation", due: "2025-09-20" }
];

let users = [
  { id: 1, name: "Asha", role: "student" },
  { id: 2, name: "Vikram", role: "teacher" },
  { id: 3, name: "Admin", role: "admin" }
];

// ----------------------
// Routes
// ----------------------

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to EduFlow Backend 🚀");
});

// Get all courses
app.get("/courses", (req, res) => {
  res.json(courses);
});

// Get all assignments
app.get("/assignments", (req, res) => {
  res.json(assignments);
});

// Get all users
app.get("/users", (req, res) => {
  res.json(users);
});

// Add new course
app.post("/courses", (req, res) => {
  const newCourse = req.body;
  courses.push(newCourse);
  res.json({ message: "Course added successfully", course: newCourse });
});

// Add new assignment
app.post("/assignments", (req, res) => {
  const newAssignment = req.body;
  assignments.push(newAssignment);
  res.json({ message: "Assignment added successfully", assignment: newAssignment });
});

// Add new user
app.post("/users", (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.json({ message: "User added successfully", user: newUser });
});

// Delete user
app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  users = users.filter(u => u.id !== userId);
  res.json({ message: "User deleted successfully" });
});
// ----------------------
// Login Route
// ----------------------
app.post("/login", (req, res) => {
  const { name, role } = req.body;
  const user = users.find(
    u => u.name.toLowerCase() === name.toLowerCase() && u.role === role
  );

  if (user) {
    res.json({ success: true, user });
  } else {
    res.json({ success: false, message: "Invalid name or role" });
  }
});

// ----------------------
// Start Server
// ----------------------
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ EduFlow backend running at http://localhost:${PORT}`);
});

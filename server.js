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
  { id: 2, title: "Data Structures", description: "Learn arrays, stacks, and queues" },
  { id: 3, title: "Database Management", description: "Learn SQL and DB design" },
];

let assignments = [
  { id: 1, courseId: 1, title: "Build a Portfolio", due: "2025-11-10" },
  { id: 2, courseId: 2, title: "Stack Implementation", due: "2025-11-12" },
  { id: 3, courseId: 3, title: "SQL Query Practice", due: "2025-11-15" },
];

let users = [
  { id: 1, name: "Asha", role: "student" },
  { id: 2, name: "Vikram", role: "teacher" },
  { id: 3, name: "Admin", role: "admin" },
];

let submissions = [
  // Example structure
  // { id: 1, studentName: "Asha", assignmentId: 1, submissionLink: "https://...", remark: "Good job!" }
];

// ----------------------
// Routes
// ----------------------

// Default route
app.get("/", (req, res) => {
  res.send("✅ Welcome to EduFlow Backend 🚀");
});

// ----------------------
// Courses & Assignments
// ----------------------

app.get("/courses", (req, res) => {
  res.json(courses);
});

app.get("/assignments", (req, res) => {
  res.json(assignments);
});

app.post("/courses", (req, res) => {
  const newCourse = req.body;
  newCourse.id = Date.now();
  courses.push(newCourse);
  res.json({ message: "Course added successfully", course: newCourse });
});

app.post("/assignments", (req, res) => {
  const newAssignment = req.body;
  newAssignment.id = Date.now();
  assignments.push(newAssignment);
  res.json({ message: "Assignment added successfully", assignment: newAssignment });
});

// ----------------------
// Users and Login
// ----------------------

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  const newUser = req.body;
  newUser.id = Date.now();
  users.push(newUser);
  res.json({ message: "User added successfully", user: newUser });
});

app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  users = users.filter(u => u.id !== userId);
  res.json({ message: "User deleted successfully" });
});

app.post("/login", (req, res) => {
  const { name, role } = req.body;
  const user = users.find(
    u => u.name.toLowerCase() === name.toLowerCase() && u.role === role
  );
  if (user) res.json({ success: true, user });
  else res.json({ success: false, message: "Invalid name or role" });
});

// ----------------------
// Student Submissions
// ----------------------

// Add new submission (from student.html)
app.post("/submit", (req, res) => {
  const { studentName, assignmentId, submissionLink } = req.body;
  if (!studentName || !assignmentId || !submissionLink) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newSubmission = {
    id: Date.now(),
    studentName,
    assignmentId: parseInt(assignmentId),
    submissionLink,
    remark: "",
  };

  submissions.push(newSubmission);
  res.json({ message: "Submission added successfully", submission: newSubmission });
});

// Get submissions (for teacher.html)
app.get("/submissions", (req, res) => {
  const assignmentId = parseInt(req.query.assignmentId);
  if (!assignmentId) return res.json(submissions);
  const filtered = submissions.filter(s => s.assignmentId === assignmentId);
  res.json(filtered);
});

// Add remark to submission
app.post("/remark/:id", (req, res) => {
  const submissionId = parseInt(req.params.id);
  const { remark } = req.body;

  const submission = submissions.find(s => s.id === submissionId);
  if (!submission) {
    return res.status(404).json({ message: "Submission not found" });
  }

  submission.remark = remark;
  res.json({ message: "Remark saved successfully", submission });
});

// ----------------------
// Start Server
// ----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ EduFlow backend running at port ${PORT}`);
});

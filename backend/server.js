const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Temporary student data
let students = [
  {
    id: 1,
    name: "Arun",
    course: "MERN Stack",
    amount: 25000,
    paymentStatus: "Paid",
  },
  {
    id: 2,
    name: "Priya",
    course: "Frontend",
    amount: 20000,
    paymentStatus: "Pending",
  },
];

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Student Management API is running",
  });
});

// GET - Get all students
app.get("/api/students", (req, res) => {
  res.json(students);
});

// POST - Add a new student
app.post("/api/students", (req, res) => {
  const {
    name,
    course,
    amount = 0,
    paymentStatus = "Pending",
  } = req.body;

  // Validation
  if (!name || !course) {
    return res.status(400).json({
      message: "Name and course are required",
    });
  }

  const newStudent = {
    id: Date.now(),
    name: name.trim(),
    course: course.trim(),
    amount: Number(amount) || 0,
    paymentStatus: paymentStatus || "Pending",
  };

  students.push(newStudent);

  res.status(201).json(newStudent);
});

// PUT - Update student
app.put("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);

  const {
    name,
    course,
    amount,
    paymentStatus,
  } = req.body;

  const student = students.find(
    (student) => student.id === id
  );

  if (!student) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  // Update only provided fields
  if (name !== undefined) {
    student.name = name.trim();
  }

  if (course !== undefined) {
    student.course = course.trim();
  }

  if (amount !== undefined) {
    student.amount = Number(amount) || 0;
  }

  if (paymentStatus !== undefined) {
    student.paymentStatus = paymentStatus;
  }

  res.json(student);
});

// DELETE - Delete student
app.delete("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);

  const studentExists = students.some(
    (student) => student.id === id
  );

  if (!studentExists) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  students = students.filter(
    (student) => student.id !== id
  );

  res.json({
    message: "Student deleted successfully",
  });
});

// Export app for Vercel
module.exports = app;

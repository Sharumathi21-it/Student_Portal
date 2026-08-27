import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import Courses from "./pages/Courses";
import Payments from "./pages/Payments";

// Deployed backend URL
const API_URL = "https://student-portal-backend-chi.vercel.app";

function Navbar() {
  const location = useLocation();

  const links = [
    { path: "/", label: "Students", icon: "👨‍🎓" },
    { path: "/add-student", label: "Add Student", icon: "➕" },
    { path: "/courses", label: "Courses", icon: "📚" },
    { path: "/payments", label: "Payments", icon: "💳" },
  ];

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-xl">
            🎓
          </div>

          <div>
            <h1 className="text-lg font-bold text-gray-900">
              StudentHub
            </h1>

            <p className="text-xs text-gray-500">
              Management System
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {links.map((link) => {
            const active = location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {link.icon} {link.label}
              </Link>
            );
          })}
        </div>

      </div>
    </nav>
  );
}

function DashboardHeader({ students }) {
  return (
    <div className="mb-8 rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 text-white shadow-xl">

      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-white/90">
            Student Management
          </p>

          <h2 className="text-4xl font-bold">
            Manage your students
          </h2>

          <p className="mt-2 max-w-xl text-white/95">
            Manage students, courses and payments from one simple dashboard.
          </p>
        </div>

        <Link
          to="/add-student"
          className="w-fit rounded-xl bg-white px-5 py-3 font-semibold text-indigo-600 shadow-lg transition hover:scale-105"
        >
          + Add Student
        </Link>

      </div>
    </div>
  );
}

function Stats({ students }) {
  return (
    <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">

      <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Total Students
            </p>

            <h3 className="mt-2 text-3xl font-bold text-indigo-600">
              {students.length}
            </h3>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-2xl">
            👨‍🎓
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Courses
            </p>

            <h3 className="mt-2 text-3xl font-bold text-purple-600">
              4+
            </h3>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-2xl">
            📚
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              System Status
            </p>

            <h3 className="mt-2 text-2xl font-bold text-green-700">
              Active
            </h3>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-2xl">
            ✓
          </div>
        </div>
      </div>

    </div>
  );
}

function AppContent({
  students,
  deleteStudent,
  editStudent,
  addStudent,
}) {
  const location = useLocation();

  const showDashboard = location.pathname === "/";

  return (
    <>
      {showDashboard && (
        <>
          <DashboardHeader students={students} />
          <Stats students={students} />
        </>
      )}

      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

        <Routes>

          <Route
            path="/"
            element={
              <Students
                students={students}
                deleteStudent={deleteStudent}
                editStudent={editStudent}
              />
            }
          />

          <Route
            path="/add-student"
            element={
              <AddStudent addStudent={addStudent} />
            }
          />

          <Route
            path="/courses"
            element={
              <Courses />
            }
          />

          <Route
            path="/payments"
            element={
              <Payments />
            }
          />

        </Routes>

      </div>
    </>
  );
}

function App() {
  const [students, setStudents] = useState([]);

  // GET students from deployed backend
  useEffect(() => {
    fetch(`${API_URL}/api/students`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }

        return response.json();
      })
      .then((data) => {
        setStudents(data);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, []);

  const addStudent = (student) => {
    setStudents((prev) => [...prev, student]);
  };

  // DELETE student
  const deleteStudent = async (id) => {
    try {
      const response = await fetch(
        `${API_URL}/api/students/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete student");
        return;
      }

      setStudents((prev) =>
        prev.filter((student) => student.id !== id)
      );

      alert("Student deleted successfully!");
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Unable to connect to the server.");
    }
  };

  // EDIT student
  const editStudent = async (id, name, course) => {
    try {
      const response = await fetch(
        `${API_URL}/api/students/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            course,
          }),
        }
      );

      const updatedStudent = await response.json();

      if (!response.ok) {
        alert(
          updatedStudent.message ||
            "Failed to update student"
        );
        return;
      }

      setStudents((prev) =>
        prev.map((student) =>
          student.id === id
            ? updatedStudent
            : student
        )
      );

      alert("Student updated successfully!");
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Unable to connect to the server.");
    }
  };

  return (
    <BrowserRouter>

      <div className="min-h-screen bg-slate-50">

        <Navbar />

        <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">

          <AppContent
            students={students}
            deleteStudent={deleteStudent}
            editStudent={editStudent}
            addStudent={addStudent}
          />

        </main>

        <footer className="border-t bg-white py-6 text-center text-sm text-gray-500">
          © 2026 StudentHub • Student Management System
        </footer>

      </div>

    </BrowserRouter>
  );
}

export default App;

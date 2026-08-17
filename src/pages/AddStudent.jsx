import { useState } from "react";

function AddStudent({ addStudent }) {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !course.trim() || !amount.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (name.trim().length < 3) {
      setError("Student name must contain at least 3 characters.");
      return;
    }

    if (course.trim().length < 2) {
      setError("Course name must contain at least 2 characters.");
      return;
    }

    if (Number(amount) <= 0) {
      setError("Please enter a valid payment amount.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/students",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            course: course.trim(),
            amount: Number(amount),
            paymentStatus: "Paid",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to add student.");
        return;
      }

      addStudent(data);

      setName("");
      setCourse("");
      setAmount("");

      alert("Student added successfully!");
    } catch (error) {
      console.error(error);
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">

      {/* HEADER */}
      <div className="mb-8 text-center">

        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 text-3xl">
          🎓
        </div>

        <h2 className="text-3xl font-bold text-gray-900">
          Add New Student
        </h2>

        <p className="mt-2 text-gray-500">
          Register a student and record their payment
        </p>

      </div>

      {/* FORM CARD */}
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm"
      >

        {/* NAME */}
        <div className="mb-5">

          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Student Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter student name"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />

        </div>

        {/* COURSE */}
        <div className="mb-5">

          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Course
          </label>

          <input
            type="text"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            placeholder="Enter course name"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />

        </div>

        {/* PAYMENT */}
        <div className="mb-5">

          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Payment Amount
          </label>

          <div className="relative">

            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-gray-500">
              ₹
            </span>

            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />

          </div>

        </div>

        {/* STATUS */}
        <div className="mb-6 rounded-xl bg-green-50 p-4">

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-600">
              ✓
            </div>

            <div>
              <p className="font-semibold text-green-700">
                Payment Status
              </p>

              <p className="text-sm text-green-600">
                Payment will be recorded as Paid
              </p>
            </div>

          </div>

        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-5 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-600">
            ⚠️ {error}
          </div>
        )}

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3.5 font-semibold text-white shadow-md transition hover:from-indigo-700 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Adding Student..." : "＋ Add Student"}
        </button>

      </form>

    </div>
  );
}

export default AddStudent;
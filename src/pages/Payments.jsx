import { useEffect, useState } from "react";

const API_URL = "https://student-portal-backend-chi.vercel.app";

function Payments() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);

  // Get students from deployed backend
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
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
        setLoading(false);
      });
  }, []);

  const openPayment = (student) => {
    setSelectedStudent(student);
    setAmount(student.amount || "");
  };

  const closePayment = () => {
    setSelectedStudent(null);
    setAmount("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/students/${selectedStudent.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: selectedStudent.name,
            course: selectedStudent.course,
            amount: Number(amount),
            paymentStatus: "Paid",
          }),
        }
      );

      const updatedStudent = await response.json();

      if (!response.ok) {
        alert(
          updatedStudent.message || "Payment failed."
        );
        return;
      }

      setStudents((prev) =>
        prev.map((student) =>
          student.id === selectedStudent.id
            ? updatedStudent
            : student
        )
      );

      alert("Payment successful! 💳");
      closePayment();
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Unable to connect to the server.");
    }
  };

  const totalAmount = students.reduce(
    (total, student) =>
      total + Number(student.amount || 0),
    0
  );

  return (
    <div>

      {/* HEADER */}
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-purple-600">
          Financial Management
        </p>

        <h2 className="mt-1 text-3xl font-bold text-gray-900">
          Payments
        </h2>

        <p className="mt-2 text-gray-500">
          Manage student fees and payment records
        </p>
      </div>

      {/* TOTAL */}
      <div className="mb-8 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-7 text-white shadow-lg">
        <p className="text-sm text-white/70">
          Total Amount Collected
        </p>

        <h3 className="mt-2 text-4xl font-bold">
          ₹{totalAmount.toLocaleString("en-IN")}
        </h3>
      </div>

      {/* STUDENTS */}
      <h3 className="mb-4 text-lg font-bold text-gray-900">
        Student Payments
      </h3>

      {loading ? (
        <p className="text-gray-500">
          Loading...
        </p>
      ) : students.length === 0 ? (
        <div className="rounded-2xl bg-gray-50 p-10 text-center">
          <p className="text-gray-500">
            No students available for payment.
          </p>
        </div>
      ) : (
        <div className="space-y-3">

          {students.map((student) => {

            const paid =
              student.paymentStatus === "Paid";

            return (
              <div
                key={student.id}
                className="flex flex-col justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:flex-row md:items-center"
              >

                {/* STUDENT */}
                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 font-bold text-purple-600">
                    {student.name
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {student.name}
                    </h4>

                    <p className="text-sm text-gray-500">
                      📚 {student.course}
                    </p>
                  </div>

                </div>

                {/* PAYMENT */}
                <div className="flex items-center gap-3">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      paid
                        ? "bg-green-50 text-green-600"
                        : "bg-yellow-50 text-yellow-600"
                    }`}
                  >
                    {paid ? "Paid" : "Pending"}
                  </span>

                  <span className="font-bold text-gray-900">
                    ₹{Number(
                      student.amount || 0
                    ).toLocaleString("en-IN")}
                  </span>

                  <button
                    onClick={() =>
                      openPayment(student)
                    }
                    className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white hover:from-indigo-700 hover:to-purple-700"
                  >
                    {paid ? "Pay Again" : "Pay Now"}
                  </button>

                </div>

              </div>
            );
          })}

        </div>
      )}

      {/* PAYMENT MODAL */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl">

            <div className="mb-6">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-2xl">
                💳
              </div>

              <h2 className="text-2xl font-bold text-gray-900">
                Make Payment
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Payment for {selectedStudent.name}
              </p>
            </div>

            <div className="mb-5 rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                Course
              </p>

              <p className="font-semibold text-gray-800">
                {selectedStudent.course}
              </p>
            </div>

            <form onSubmit={handlePayment}>

              <label
                htmlFor="payment-modal-amount"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Payment Amount
              </label>

              <div className="relative mb-6">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-gray-500">
                  ₹
                </span>

                <input
                  id="payment-modal-amount"
                  name="paymentAmount"
                  type="number"
                  min="1"
                  value={amount}
                  onChange={(e) =>
                    setAmount(e.target.value)
                  }
                  placeholder="Enter amount"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 pl-10 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />

              </div>

              <div className="flex gap-3">

                <button
                  type="button"
                  onClick={closePayment}
                  className="flex-1 rounded-xl bg-gray-100 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-200"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 font-semibold text-white"
                >
                  💳 Pay Now
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default Payments;

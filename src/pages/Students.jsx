import { useState } from "react";

function Students({ students, deleteStudent, editStudent }) {
  const [search, setSearch] = useState("");
  const [editingStudent, setEditingStudent] = useState(null);
  const [editName, setEditName] = useState("");
  const [editCourse, setEditCourse] = useState("");

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  const openEdit = (student) => {
    setEditingStudent(student);
    setEditName(student.name);
    setEditCourse(student.course);
  };

  const closeEdit = () => {
    setEditingStudent(null);
    setEditName("");
    setEditCourse("");
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!editName.trim() || !editCourse.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    await editStudent(
      editingStudent.id,
      editName.trim(),
      editCourse.trim()
    );

    closeEdit();
  };

  return (
    <div>

      {/* HEADER */}
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Students
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            View and manage all registered students
          </p>
        </div>

        <div className="rounded-xl bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600">
          {students.length} Students
        </div>

      </div>

      {/* SEARCH */}
      <div className="mb-6">

        <label htmlFor="student-search" className="sr-only">
          Search students
        </label>

        <input
          id="student-search"
          name="search"
          type="text"
          placeholder="🔍 Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
        />

      </div>

      {/* EMPTY STATE */}
      {students.length === 0 ? (

        <div className="rounded-2xl bg-gray-50 p-12 text-center">

          <div className="mb-3 text-5xl">
            🎓
          </div>

          <h3 className="text-lg font-semibold text-gray-800">
            No students yet
          </h3>

          <p className="mt-1 text-gray-500">
            Add your first student to get started.
          </p>

        </div>

      ) : filteredStudents.length === 0 ? (

        <div className="rounded-2xl bg-gray-50 p-10 text-center">

          <div className="text-4xl">
            🔍
          </div>

          <p className="mt-3 text-gray-500">
            No student found.
          </p>

        </div>

      ) : (

        /* STUDENT LIST */
        <div className="space-y-3">

          {filteredStudents.map((student, index) => (

            <div
              key={student.id}
              className="group flex flex-col justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-5 transition hover:-translate-y-0.5 hover:border-indigo-100 hover:shadow-md md:flex-row md:items-center"
            >

              {/* STUDENT INFO */}
              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 text-lg font-bold text-indigo-600">
                  {student.name.charAt(0).toUpperCase()}
                </div>

                <div>

                  <h3 className="font-semibold text-gray-900">
                    {student.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    📚 {student.course}
                  </p>

                </div>

              </div>

              {/* ACTIONS */}
              <div className="flex gap-2">

                <button
                  onClick={() => openEdit(student)}
                  className="rounded-lg bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-600 hover:text-white"
                >
                  ✏️ Edit
                </button>

                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        `Delete ${student.name}?`
                      )
                    ) {
                      deleteStudent(student.id);
                    }
                  }}
                  className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-500 hover:text-white"
                >
                  🗑️ Delete
                </button>

              </div>

            </div>

          ))}

        </div>
      )}

      {/* EDIT MODAL */}
      {editingStudent && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl">

            {/* MODAL HEADER */}
            <div className="mb-6 flex items-start justify-between">

              <div>
                <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-xl">
                  ✏️
                </div>

                <h2 className="text-2xl font-bold text-gray-900">
                  Edit Student
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Update student information
                </p>
              </div>

              <button
                onClick={closeEdit}
                aria-label="Close edit student dialog"
                className="rounded-lg px-3 py-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                ✕
              </button>

            </div>

            {/* FORM */}
            <form onSubmit={handleSave}>

              <div className="mb-5">

                <label
                  htmlFor="edit-student-name"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Student Name
                </label>

                <input
                  id="edit-student-name"
                  name="editStudentName"
                  type="text"
                  value={editName}
                  onChange={(e) =>
                    setEditName(e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  placeholder="Enter student name"
                />

              </div>

              <div className="mb-7">

                <label
                  htmlFor="edit-student-course"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Course
                </label>

                <input
                  id="edit-student-course"
                  name="editCourse"
                  type="text"
                  value={editCourse}
                  onChange={(e) =>
                    setEditCourse(e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  placeholder="Enter course"
                />

              </div>

              {/* MODAL BUTTONS */}
              <div className="flex gap-3">

                <button
                  type="button"
                  onClick={closeEdit}
                  className="flex-1 rounded-xl bg-gray-100 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-200"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 font-semibold text-white shadow-md hover:from-indigo-700 hover:to-purple-700"
                >
                  Save Changes
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Students;

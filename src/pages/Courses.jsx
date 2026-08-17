function Courses() {
  // Demo course data
  // Later this can be connected directly to your backend.
  const courses = [
    {
      name: "MERN Stack",
      icon: "💻",
      students: ["Arun", "Priya"],
    },
    {
      name: "Frontend Development",
      icon: "🎨",
      students: ["Kavya"],
    },
    {
      name: "React Development",
      icon: "⚛️",
      students: ["Rahul", "Divya"],
    },
    {
      name: "Python Programming",
      icon: "🐍",
      students: ["Vishnu"],
    },
  ];

  return (
    <div>

      {/* HEADER */}
      <div className="mb-8">

        <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-indigo-600">
          Learning Programs
        </p>

        <h2 className="text-3xl font-bold text-gray-900">
          Courses
        </h2>

        <p className="mt-2 text-gray-500">
          View courses and registered students
        </p>

      </div>


      {/* COURSE CARDS */}
      <div className="grid gap-5 md:grid-cols-2">

        {courses.map((course) => (

          <div
            key={course.name}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >

            {/* COURSE HEADER */}
            <div className="flex items-start justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 text-2xl">
                  {course.icon}
                </div>

                <div>

                  <h3 className="text-lg font-bold text-gray-900">
                    {course.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {course.students.length} registered student
                    {course.students.length !== 1 ? "s" : ""}
                  </p>

                </div>

              </div>

            </div>


            {/* STUDENTS */}
            <div className="mt-6 border-t border-gray-100 pt-5">

              <p className="mb-3 text-sm font-semibold text-gray-700">
                Registered Students
              </p>

              <div className="space-y-2">

                {course.students.map((student) => (

                  <div
                    key={student}
                    className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3"
                  >

                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
                      {student.charAt(0)}
                    </div>

                    <span className="text-sm font-medium text-gray-700">
                      {student}
                    </span>

                  </div>

                ))}

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Courses;
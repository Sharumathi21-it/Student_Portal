import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Students</Link>
      <Link to="/add-student">Add Student</Link>
      <Link to="/courses">Courses</Link>
      <Link to="/payments">Payments</Link>
    </nav>
  );
}

export default Navbar;
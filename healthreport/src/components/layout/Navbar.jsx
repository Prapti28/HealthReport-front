import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-lg font-semibold text-gray-900">
          AI Health
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Home
          </Link>

          <Link
            to="/login"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-md bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
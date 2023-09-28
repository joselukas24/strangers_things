import { Link } from "react-router-dom";

export default function Header({ token, setToken }) {
  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    window.location.reload();
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1>Strangers Things</h1>
      <nav className="flex gap-5">
        <Link to="/" className="mr-3">
          Home
        </Link>
        <Link to="/posts" className="mr-3">
          Posts
        </Link>
        {token ? (
          <div className="flex gap-5">
            <Link to="/profile" className="mr-3">
              Profile
            </Link>
            <Link to="/" className="mr-3" onClick={handleLogout}>
              Logout
            </Link>
          </div>
        ) : (
          <div className="flex gap-5">
            <Link to="/login" className="mr-3">
              Login
            </Link>
            <Link to="/register" className="mr-3">
              Register
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

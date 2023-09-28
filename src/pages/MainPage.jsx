import Header from "../components/Header";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext, useEffect } from "react";

export default function MainPage() {
  const { token, setToken } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const userLocalStorage = JSON.parse(localStorage.getItem("token"));
      setToken(userLocalStorage);
    }
  }, []);

  return (
    <div>
      <Header token={token} setToken={setToken} />
      <h1 className="text-center text-6xl">Welcome to Stranger's Things!</h1>
      {token ? (
        <div className="text-center">
          <h1 className="text-3xl">Logged in!</h1>
          <Link to="/profile" className="inline-block">
            <button className="mt-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
              View Profile
            </button>
          </Link>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-3xl">Please Login or Register</h1>
        </div>
      )}
    </div>
  );
}

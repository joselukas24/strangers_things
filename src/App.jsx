import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import { useEffect, useMemo, useState } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PostsPage from "./pages/PostsPage";
import { UserContext } from "./UserContext";

function App() {
  const [token, setToken] = useState(null);
  const value = useMemo(() => ({ token, setToken }), [token, setToken]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  return (
    <div id="main-section">
      <UserContext.Provider value={value}>
        <Routes>
          <Route
            path="/"
            element={<MainPage token={token} setToken={setToken} />}
          ></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/posts" element={<PostsPage />}></Route>
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import { useEffect, useMemo, useState } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PostsPage from "./pages/PostsPage";
import PostFormPage from "./pages/PostFormPage";
import ProfilePage from "./pages/ProfilePage";
import { UserContext } from "./UserContext";

function App() {
  const [token, setToken] = useState(null);
  const value = useMemo(() => ({ token, setToken }), [token, setToken]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const localStorageToken = JSON.parse(localStorage.getItem("token"));
      setToken(localStorageToken);
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
          <Route path="/post-form" element={<PostFormPage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;

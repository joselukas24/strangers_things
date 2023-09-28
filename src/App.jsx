import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PostsPage from "./pages/PostsPage";

function App() {
  const [token, setToken] = useState(null);
  return (
    <div id="main-section">
      <Routes>
        <Route
          path="/"
          element={<MainPage token={token} setToken={setToken} />}
        ></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/posts" element={<PostsPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;

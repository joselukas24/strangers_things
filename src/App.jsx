import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(null);
  return (
    <div id="main-section">
      <Routes>
        <Route
          path="/"
          element={<MainPage token={token} setToken={setToken} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;

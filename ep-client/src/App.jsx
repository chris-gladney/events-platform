import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";
import "./App.css";
import LoggedIn from "../Components/LoggedIn";
import AdminPage from "../Components/AdminPage";
import LoginPage from "../Components/LoginPage";
import AdminLogin from "../Components/AdminLogin";
import Register from "../Components/Register";
import RequireAuth from "../Components/RequireAuth";
import Layout from "../Components/Layout";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({});

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/adminlogin" element={<AdminLogin />} />

      {/* Protect the routes below */}
      {/* <UserContext.Provider value={{ user, setUser }}> */}
        <Route element={<RequireAuth />}>
          <Route path="/events" element={<LoggedIn />} />
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      {/* </UserContext.Provider> */}

      {/* Route to redirect if failure */}
      <Route path="/" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default App;

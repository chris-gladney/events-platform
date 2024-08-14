import { Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";
import "./App.css";
import LoggedIn from "../Components/LoggedIn";
import AdminPage from "../Components/AdminPage";
import LoginPage from "../Components/LoginPage";
import AdminLogin from "../Components/AdminLogin";
import Register from "../Components/Register";
import RequireAuth from "../Components/RequireAuth";
import Layout from "../Components/Layout";
import PaymentSuccess from "../Components/PaymentSuccess";

export const UserEventsContext = createContext();

function App() {
  const [userEvents, setUserEvents] = useState([]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/adminlogin" element={<AdminLogin />} />

        <Route element={<RequireAuth allowedRoles={[2001, 5150]} />}>
          <Route
            path="/events"
            element={<LoggedIn setUserEvents={setUserEvents} />}
          />
        </Route>

        <Route element={<RequireAuth allowedRoles={[5150]} />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>

        <Route path="/" element={<LoginPage />} />
      </Route>

      <Route
        path="/success"
        element={<PaymentSuccess userEvents={userEvents} />}
      />
    </Routes>
  );
}

export default App;

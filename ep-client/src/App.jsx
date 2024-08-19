import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import LoggedIn from "../Components/LoggedIn";
import AdminPage from "../Components/AdminPage";
import LoginPage from "../Components/LoginPage";
import AdminLogin from "../Components/AdminLogin";
import Register from "../Components/Register";
import RequireAuth from "../Components/RequireAuth";
import Layout from "../Components/Layout";
import PaymentSuccess from "../Components/PaymentSuccess";

function App() {
  const [userEvents, setUserEvents] = useState([]);

  // add an event context to the basket and payment
  // success components. This is the data that will
  // be sent to the google calendar api

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
        <Route
          path="/success"
          element={<PaymentSuccess userEvents={userEvents} />}
        />
      </Route>
    </Routes>
  );
}

export default App;

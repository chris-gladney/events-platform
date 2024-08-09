import { Link, useNavigate, useLocation } from "react-router-dom";
import Google from "./Google";
import axios from "axios";
import { useContext, useState } from "react";
import useAuth from "../hooks/useAuth";
import { UserContext } from "../src/App";

const Login = () => {
  const { setAuth } = useAuth();
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [userLogin, setUserLogin] = useState("");
  const [pwd, setPwd] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/auth",
        JSON.stringify({ user: userLogin, pwd }),
        {
          headers: {
            Authorization: "Bearer",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response));

      const accessToken = response?.data?.accessToken;
      const loggedInUser = response?.data?.user;

      setUser(loggedInUser);
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {+
      console.log(err);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <label htmlFor="username" className="username">
          Username:
        </label>
        <br />
        <input
          type="text"
          id="username"
          name="username"
          className="username"
          onChange={(e) => {
            setUserLogin(e.target.value);
          }}
        />
        <br />
        <label htmlFor="password" className="password">
          Password:
        </label>
        <br />
        <input
          type="password"
          id="password"
          name="passord"
          className="password"
          onChange={(e) => {
            setPwd(e.target.value);
          }}
        />
        <br />
        <button className="login-btn">Sign in</button>
      </form>
      <Link to="/register">
        <button className="login-btn">Register</button>
      </Link>
      <Google />
      <Link to="/adminlogin">
        <button className="admin-login-btn">Admin Login</button>
      </Link>
    </div>
  );
};

export default Login;

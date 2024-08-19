import { Link, useNavigate, useLocation } from "react-router-dom";
import Google from "./Google";
import axios from "../api/axios";
import { useContext, useState } from "react";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [userLogin, setUserLogin] = useState("");
  const [pwd, setPwd] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/auth",
        JSON.stringify({ user: userLogin, pwd }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        }
      );
      // console.log(JSON.stringify(response.data));

      const accessToken = response?.data?.accessToken;
      const loggedInUser = response?.data?.user;
      const role = response?.data?.role;

      // console.log(accessToken, "<<< accessToken");
      // console.log(loggedInUser, "<<< user");
      // console.log(role, "<<< role");

      setAuth({ user: userLogin, role, accessToken });
      setUserLogin("");
      setPwd("");
      setUserLogin({ user: userLogin, role });
      navigate("/events", { replace: true });
    } catch (err) {
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
      {/* <Google /> */}
      <Link to="/adminlogin">
        <button className="admin-login-btn">Admin Login</button>
      </Link>
    </div>
  );
};

export default Login;

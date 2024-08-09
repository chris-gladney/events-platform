const AdminLogin = () => {
  return (
    <div className="login">
      <form>
        <label htmlFor="username" className="username">
          Username:
        </label>
        <br />
        <input type="text" id="username" name="username" className="username" />
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
        />
        <br />
        <button className="login-btn">Sign in</button>
      </form>
    </div>
  );
};

export default AdminLogin;

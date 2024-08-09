import Login from "./Login";

const LoginPage = () => {
  return (
    <div className="login-page">
      <section className="welcome-sect">
        <h1 className="welcome-title">Welcome to Meetup events platform!</h1>
        <p className="welcome-text">
          Welcome to this events app! Users can browse and sign up/purchase events. Admins can create events.
        </p>
      </section>
      <Login />
    </div>
  );
};

export default LoginPage;

const Google = () => {
  const loginWithGoogle = () => {
    window.open("http://localhost:5000/auth/google/callback", "_self");
  };

  return <button onClick={loginWithGoogle}>Sign in with Google</button>;
};

export default Google;

import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function UserSignIn({ context }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    context.actions.signIn(username, password).then((res) => {
      if (res === null) {
        console.log("Sign-In Has Failed!");
      } else if (res === 500) {
        navigate('/error');
      } else if (location.state?.from) {
        navigate(location.state.from);
      } else {
        navigate("/");
      }
    });
  };

  return (
    <>
      <div className="form--centered">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Email Address</label>
          <input
            id="username"
            name="username"
            type="email"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button" type="submit">
            Sign In
          </button>
          <Link className="button" to={`/`}>
            Cancel
          </Link>
        </form>
        <p>
          Don't have a user account? Click here to{" "}
          <Link to={"/signup"}>sign up</Link>!
        </p>
      </div>
    </>
  );
}

import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { loginUser } from "../api";

export const loader = ({ request }) => {
  return new URL(request.url).searchParams.get("message");
};

export default function Login() {
  const message = useLoaderData();
  const [loginFormData, setLoginFormData] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("idle");
  const [err, setErr] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    setErr(null);
    loginUser(loginFormData)
      .then((data) => {
        console.log("LOGIN DATA", data);
      })
      .catch((err) => {
        console.log(err);
        setErr(err);
      })
      .finally(() => {
        setStatus("idle");
      });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="login-container">
      {message && <h2>{message}</h2>}
      <h1>Sign in to your account</h1>
      {err && <h4>{err.message}</h4>}
      <form onSubmit={handleSubmit} className="login-form">
        <input name="email" onChange={handleChange} type="email" placeholder="Email address" value={loginFormData.email} />
        <input name="password" onChange={handleChange} type="password" placeholder="Password" value={loginFormData.password} />
        <button disabled={status === "submitting"}> {status === "submitting" ? "Loggin in" : "Log In"}</button>
      </form>
    </div>
  );
}

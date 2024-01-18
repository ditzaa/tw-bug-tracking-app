import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACK_URL } from "../consts";
import "./Login.css";

export const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const payload = {
      email,
      password,
    };

    if (!payload.email || !payload.password) {
      alert("Unul sau mai multe campuri nu au fost completate!");
      return;
    }

    axios
      .post(`${BACK_URL}/api/student/login`, payload)
      .then((res) => {
        localStorage.setItem("student", JSON.stringify(res.data.student));
        navigate("/projects");
      })
      .catch((err) => {
        alert("Eroare! " + err.message);
      });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={onSubmit}>
        <div className="email-container">
        <label htmlFor="email" className="label-login">Email</label>
        <input id="email" type="text" onChange={(e) => setEmail(e.target.value)}></input>
        </div>
        <div className="password-container">
        <label className="label-login" htmlFor="password">Password</label>
        <input id="password" type="password" onChange={(e) => setPassword(e.target.value)}></input>
        </div>

        <div className="buttons-container">
          <button id="login-button" type="submit">Login</button>
          <button id="register-button" onClick={() => navigate("/register")}>Register</button>
        </div>
        
      </form>
    </div>
  );
};

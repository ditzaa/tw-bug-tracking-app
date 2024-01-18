import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACK_URL } from "../consts";
import "./Register.css";

export const Register = () => {
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
      .post(`${BACK_URL}/api/student/create-account`, payload)
      .then((res) => {
        alert("Succes! " + res.data);
      })
      .catch((err) => {
        console.log(err.message);
        alert("Eroare! " + err.message);
      });
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={onSubmit}>
        <div>
        <label className="label-register" htmlFor="email">Email</label>
        <input className="input-register" id="email" type="text" onChange={(e) => setEmail(e.target.value)}></input>
        </div>
       
        <div>
        <label className="label-register" htmlFor="password">Password</label>
        <input className="input-register" id="password" type="password" onChange={(e) => setPassword(e.target.value)}></input>
        </div>
        

        <div className="buttons-container">
          <button className="buttons-register" type="submit">Register</button>
          <button className="buttons-register" onClick={() => navigate("..")}>Back</button>
        </div>
        
      </form>
    </div>
  );
};

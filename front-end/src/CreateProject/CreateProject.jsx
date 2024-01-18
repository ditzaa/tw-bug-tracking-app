import axios from "axios";
import { useState } from "react";
import { BACK_URL } from "../consts";
import { useNavigate } from "react-router-dom";
import "./CreateProject.css";

export const CreateProject = () => {
  const [name, setName] = useState("");
  const [repository, setRepository] = useState("");
  const [emailFields, setEmailFields] = useState([]);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem("student"));

    const memberEmails = [currentUser.email];

    for (let i = 0; i < emailFields.length; i++) {
      const emailField = document.getElementById(`member_${i}`);
      memberEmails.push(emailField.value);
    }

    const payload = {
      name,
      repository,
      members: memberEmails,
    };

    axios
      .post(`${BACK_URL}/api/project/create-project`, payload)
      .then((res) => {
        navigate("./..");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="create-project-container">
      <form className="create-project-form" onSubmit={onSubmit}>
        <div>
        <label className="label-create-project"  htmlFor="name">Name</label>
        <input className="input-create-project" id="name" type="text" onChange={(e) => setName(e.target.value)}></input>
        </div>
        
        <div>
        <label className="label-create-project">Repository</label>
        <input className="input-create-project" id="repository" type="text" onChange={(e) => setRepository(e.target.value)}></input>
        </div>
        

        <button
        className="buttons-create-project"
          type="button"
          onClick={() => {
            setEmailFields((prevState) => [...prevState, {}]);
          }}
        >
          Add member
        </button>

        {emailFields.map((field, index) => (
          <input className="new-member-input" id={`member_${index}`} type="text"></input>
        ))}

        <button  className="buttons-create-project" type="submit">Create</button>
        <button  className="buttons-create-project"onClick={() => navigate("./..")}>Back</button>
      </form>
    </div>
  );
};

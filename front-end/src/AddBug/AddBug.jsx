import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BACK_URL } from "../consts";
import "./AddBug.css";

export const AddBug = () => {
  const [commitLink, setcommitLink] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("");
  const [priority, setPriority] = useState("");

  const { projectId } = useParams();

  const navigate = useNavigate();

  const onSubmit = (e) => {
    console.log("onSubmit");
    e.preventDefault();

    const payload = {
      commitLink,
      description,
      severity,
      priority,
      projectId,
    };

    if (!payload.commitLink || !payload.description || !payload.severity || !payload.priority) {
      alert("Unul sau mai multe campuri nu au fost completate!");
      return;
    }

    axios
      .post(`${BACK_URL}/api/bug/createBug`, payload)
      .then((res) => {
        navigate("./..");
      })
      .catch((err) => {
        console.log(err.message);
        alert("Eroare! " + err.message);
      });
  };

  return (
    <div className="add-bug-container">
      <h2>Add bug</h2>
      <form className="add-bug-form" onSubmit={onSubmit}>
        <div>
          <label className="label-add-bug" htmlFor="description">Description</label>
          <input id="description" className="input-add-bug" type="text" onChange={(e) => setDescription(e.target.value)}></input>
        </div>

        <div>
        <label className="label-add-bug" htmlFor="severity">Severity</label>
        <input id="severity" className="input-add-bug"  type="text" onChange={(e) => setSeverity(e.target.value)}></input>
        </div>
        
        <div>
          <label className="label-add-bug" htmlFor="priority">Priority</label>
          <input id="priority" className="input-add-bug"  type="text" onChange={(e) => setPriority(e.target.value)}></input>
        </div>
        
        <div>
          <label className="label-add-bug" htmlFor="commitLink">Commit Link</label>
          <input id="commitLink" className="input-add-bug"  type="text" onChange={(e) => setcommitLink(e.target.value)}></input>
        </div>
        

        <button className="buttons-add-bug" type="submit">Submit</button>
        <button className="buttons-add-bug" onClick={() => navigate("./..")}>Back</button>
      </form>
    </div>
  );
};

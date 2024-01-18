import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACK_URL } from "../consts";
import "./Projects.css";

export const Projects = () => {
  const [projects, setProjects] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BACK_URL}/api/project/getAll`)
      .then((res) => {
        setProjects(res.data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  console.log(projects);

  return (
    <div className="projects-container">
      {projects?.map((project) => (
        <div className="project-container">
          <Link className="link-project" to={`/projects/${project.id}`}>{project.name}</Link>
          <p>{project.repository}</p>
        </div>
      ))}
      <button className="button-add-project" onClick={() => navigate("./create")}>Adauga proiect</button>
    </div>
  );
};

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BACK_URL } from "../consts";
import "./Project.css";


const getRoleOfMember = (project) => {
  if (!project) return "";
  const filter = project.students.filter((student) => student.id === JSON.parse(localStorage.getItem("student")).id);
  if(filter.length === 0){
    return "";
  }
  return filter[0].participation.role;
};

export const Project = () => {
  const { projectId } = useParams();

  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [enableAdhere, setEnableAdhere] = useState(true);

  useEffect(() => {
    axios
      .get(`${BACK_URL}/api/project/getProject/${projectId}`)
      .then((res) => {
        setProject(res.data);

        const project = res.data;
        const filter = project.students.filter((student) => student.id === JSON.parse(localStorage.getItem("student")).id);
        setEnableAdhere(filter.length === 0);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  const onClickAdhereProject = (e) => {
    e.preventDefault();

    const payload = {
      studentId: JSON.parse(localStorage.getItem("student")).id,
      projectId,
    };

    axios
      .post(`${BACK_URL}/api/student/create-tester`, payload)
      .then((res) => {
        alert("Success!");
        window.location.reload();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const onClickAssignBug = (e, bugId) => {
    e.preventDefault();

    const payload = {
      studentId: JSON.parse(localStorage.getItem("student")).id,
      id: bugId,
    };

    axios
      .put(`${BACK_URL}/api/bug/assignBug`, payload)
      .then((res) => {
        alert("Success!");
        window.location.reload();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const onClickResolveBug = (e, bugId) => {
    e.preventDefault();

    const payload = {
      resolveCommitLink: document.getElementById(`resolve-commit-link-${bugId}`).value,
      id: bugId,
    };

    if (!payload.resolveCommitLink) {
      alert("Commit Link nu a fost completat!");
      return;
    }

    axios
      .put(`${BACK_URL}/api/bug/resolveBug`, payload)
      .then((res) => {
        alert("Success!");
        window.location.reload();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="about-project-container">
      <div className="about-project-header">
        {projectId}
        <div>{project?.name}</div>
        <div>{project?.repository}</div>
      </div>

      {project?.students.map((member) => (
        <div>{member.email}</div>
      ))}
      <div>
        <div className="bugs">Bugs: </div>
        {project?.bugs?.map((bug) => (
          <div>
            <div className="about-bug-container">
              <p>{bug.name}</p>
              <p>{bug.description}</p>
              <p>{bug.severity}</p>
              <p>{bug.priority}</p>
              <p>{bug.commitLink}</p> 
            </div>

            {!bug.studentId && getRoleOfMember(project) === "member" && <button className="buttons-bug" id="assign-btn"
             onClick={(e) => onClickAssignBug(e, bug.id)}>Assign bug</button>}
            {bug.resolveCommitLink === "none" && bug.studentId === JSON.parse(localStorage.getItem("student")).id && (
              <>
              <div className="resolve-commit-container">
                <label htmlFor={`resolve-commit-link-${bug.id}`}>Resolve commit link</label>
                <input id={`resolve-commit-link-${bug.id}`} type="text"></input>
                <button
                  className="buttons-bug"
                  onClick={(e) => {
                    onClickResolveBug(e, bug.id);
                  }}
                >
                  Resolve bug
                </button>
              </div>
                
              </>
            )}
          </div>
        ))}
      </div>
      <button
        className="buttons-bug" 
        style={{
          display: enableAdhere ? "block" : "none",
        }}
        onClick={onClickAdhereProject}
      >
        Adhere to project
      </button>
      <button
      className="buttons-bug" 
        style={{
          display: getRoleOfMember(project) === "tester" ? "block" : "none",
        }}
        onClick={() => navigate("./addBug")}
      >
        Add bug
      </button>
      <button className="buttons-bug" onClick={() => navigate("./..")}>Back</button>
    </div>
  );
};

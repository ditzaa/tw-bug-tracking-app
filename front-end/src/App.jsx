import "./App.css";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { Login } from "./Login/Login";
import { Register } from "./Register/Register";
import { Projects } from "./Projects/Projects";
import { Project } from "./Project/Project";
import { AddBug } from "./AddBug/AddBug";
import { CreateProject } from "./CreateProject/CreateProject";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/create" element={<CreateProject />} />
      <Route path="/projects/:projectId" element={<Project />} />
      <Route path="/projects/:projectId/addBug" element={<AddBug />} />
    </>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

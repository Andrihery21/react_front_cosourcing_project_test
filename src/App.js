//import logo from "./logo.svg";
import "./App.css";
import { Employee } from "./Employee.js";
import {
  BrowserRouter,
 
} from "react-router-dom";

function App() {
  
  return (
    <BrowserRouter>
     <div className="mt-3">
      <img src="logo-cosourcing-v4-220x49-1.jpg" alt="logo cosourcing"/>
      </div>
      <div className="App container">
        
        <h3 className="d-flex justify-content-center m-3" style={{ color: "#f7921e" }}>
          Gestion des employés
        </h3>

        <Employee />
      </div>
    </BrowserRouter>
  );
}

export default App;

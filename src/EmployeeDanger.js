import React, { Component } from "react";
import { variables } from "./Variables.js";

export class Employee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
      modalTitle: "",
      employeeId: 0,
      nom: "",
      prenom: "",
      email: "",
      poste: "",
      salaire: "",
      dateEmbauche: "",
      avantage: "",

      EmployeeIdFilter:"",
      EmployeeNameFilter:"",
      employeeWithoutFilter:[]

    }
  }

 
  FilterFn(){
    var EmployeeIdFilter=this.state.EmployeeIdFilter;
    var EmployeeNameFilter = this.state.EmployeeNameFilter;

    var filteredData=this.state.employeeWithoutFilter.filter(
        function(el){
            return el.employeeId.toString().toLowerCase().includes(
                EmployeeIdFilter.toString().trim().toLowerCase()
            )&&
            el.EmployeeName.toString().toLowerCase().includes(
                EmployeeNameFilter.toString().trim().toLowerCase()
            )
        }
    );

    this.setState({employees:filteredData});

}

sortResult(prop,asc){
    var sortedData=this.state.employeeWithoutFilter.sort(function(a,b){
        if(asc){
            return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
        }
        else{
            return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
        }
    });

    this.setState({employees:sortedData});
}

changeEmployeeIdFilter = (e)=>{
  this.setState.EmployeeIdFilter=e.target.value;
  this.FilterFn();
}
changeEmployeeNameFilter = (e)=>{
  this.setState.EmployeeNameFilter=e.target.value;
  this.FilterFn();
}

refreshList(){
  fetch("https://localhost:7103/api/Employee/")
  .then(console.log(response=>response.json()))
  .then(data=>{
      this.setState({employees:data,employeeWithoutFilter:data});
  });
}
componentDidMount(){
  this.refreshList();
}


  changeNom = (e) => {
    this.setState({ nom: e.target.value });
  };
  changePrenom = (e) => {
    this.setState({ prenom: e.target.value });
  };
  changeEmail = (e) => {
    this.setState({ email: e.target.value });
  };
  changePoste = (e) => {
    this.setState({ poste: e.target.value });
  };
  changeSalaire = (e) => {
    this.setState({ salaire: e.target.value });
  };
  changeDateEmbauche = (e) => {
    this.setState({ dateEmbauche: e.target.value });
  };
  changeAvantage = (e) => {
    this.setState({ avantage: e.target.value });
  };

  addClick() {
    this.setState({
      modalTitle: "Ajout employé",
      employeeId: 0,
      nom: "",
      prenom: "",
      email: "",
      poste: "",
      salaire: "",
      dateEmbauche: "",
      avantage: "",
    });
  }
  editClick(emp) {
    this.setState({
      modalTitle: "Edit Employee",
      employeeId: emp.employeeId,
      nom: emp.nom,
      prenom: emp.prenom,
      email: emp.email,
      poste: emp.poste,
      salaire: emp.salaire,
      dateEmbauche: emp.dateEmbauche,
      avantage: emp.avantage
    });
  }

  createClick() {
    fetch(variables.API_URL + "employee", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nom: this.state.nom,
        prenom: this.state.prenom,
        email: this.state.email,
        poste: this.state.poste,
        salaire: this.state.salaire,
        dateEmbauche: this.state.dateEmbauche,
        avantage: this.state.avantage,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          this.refreshList();
        },
        (error) => {
          alert("Failed");
        }
      );
  }

  updateClick() {
    fetch(variables.API_URL + "employee/", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employeeId: this.state.employeeId,
        nom: this.state.nom,
        prenom: this.state.prenom,
        email: this.state.email,
        poste: this.state.poste,
        salaire: this.state.salaire,
        dateEmbauche: this.state.dateEmbauche,
        avantage: this.state.avantage,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          this.refreshList();
        },
        (error) => {
          alert("Failed");
        }
      );
  }

  deleteClick(id) {
    if (window.confirm("Are you sure?")) {
      fetch(variables.API_URL + "employee/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            alert(result);
            this.refreshList();
          },
          (error) => {
            alert("Failed");
          }
        );
    }
  }

  render() {
    const {
      employees,
      modalTitle,
      employeeId,
      nom,
      prenom,
      email,
      poste,
      salaire,
      dateEmbauche,
      avantage

    } = this.state;

    return (
      
      <div>
        
        <button
          type="button"
          className="btn btn-primary m-2 float-end"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => this.addClick()}
        >
          Ajouter un employé
        </button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Identifiant</th>
              <th>Nom</th>
              <th>Prenom</th>
              <th>Email</th>
              <th>Poste</th>
              <th>Salaire</th>
              <th>Date d'embauche</th>
              <th>Avantage</th>

            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.employeeId}>
                <td>{emp.nom}</td>
                <td>{emp.prenom}</td>
                <td>{emp.email}</td>
                <td>{emp.poste}</td>
                <td>{emp.salaire}</td>
                <td>{emp.dateEmbauche}</td>
                <td>{emp.avantage}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.editClick(emp)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    onClick={() => this.deleteClick(emp.employeeId)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="d-flex flex-row bd-highlight mb-3">
     
                        <div className="p-2 w-50 bd-highlight">

             
               
                    <div className="input-group mb-3">
                      <span className="input-group-text">Nom</span>
                      <input
                        type="text"
                        className="form-control"
                        value={nom}
                        onChange={this.changeNom}
                      />
                    </div>

                  
                    <div className="input-group mb-3">
                      <span className="input-group-text">Prénom</span>
                      <input
                        type="text"
                        className="form-control"
                        value={prenom}
                        onChange={this.changePrenom}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">Email</span>
                      <input
                        type="date"
                        className="form-control"
                        value={email}
                        onChange={this.changeEmail}
                      />
                    </div>
                  
                    <div className="input-group mb-3">
                      <span className="input-group-text">Poste</span>
                      <input
                        type="text"
                        className="form-control"
                        value={poste}
                        onChange={this.changePoste}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">Salaire</span>
                      <input
                        type="text"
                        className="form-control"
                        value={salaire}
                        onChange={this.changeSalaire}
                      />
                    </div>
                   
              
                    <div className="input-group mb-3">
                      <span className="input-group-text">Date d'embauche</span>
                      <input
                        type="text"
                        className="form-control"
                        value={dateEmbauche}
                        onChange={this.changeDateEmbauche}
                      />
                    </div>
                  
                    <div className="input-group mb-3">
                      <span className="input-group-text">Avantage</span>
                      <input
                        type="text"
                        className="form-control"
                        value={avantage}
                        onChange={this.changeAvantage}
                      />
                    </div> 
                  
                </div>

                {employeeId === 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.createClick()}
                  >
                    Créer
                  </button>
                ) : null}

                {employeeId !== 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.updateClick()}
                  >
                    Update
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      )
  }
}
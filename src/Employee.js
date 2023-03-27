import React, { Component }  from "react";
import { variables } from "./Variables.js";

export class Employee extends Component{


    constructor(props){
        super(props);

        this.state={
            employees:[],
            modalTitle:"",
            employeeId:0,
            nom:"",
            prenom:"",
            email:"",
            poste:"",
            salaire:"",
            dateEmbauche:"",
            avantage: "",
           

           
        }
    }
    
    refreshList(){
      fetch(variables.API_URL + "employee")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ employees: data });
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
      if (this.state.avantage.length===0||this.state.nom.length===0||this.state.prenom.length===0
        ||this.state.poste.length===0||this.state.salaire.length===0||this.state.dateEmbauche.length===0||this.state.email.length===0) {
        alert('Il y a une ou plusieurs informations manquantes,veuillez completer la totalité du formulaire')
        return
      }
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
            console.log('1');
            alert(result);
            this.refreshList();
          },
          (error) => {
            console.log(2);
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

    myFunction() {
      var src, input, filter, table, tr, td,td2,td3,td4,td5,td6,td7, i,j, txtValue, txtValue2,txtValue3,txtValue4,txtValue5,txtValue6,txtValue7;
      input = document.getElementById("myInput");
      filter = input.value.toUpperCase().trim().split(' ');
      table = document.getElementById("myTable");
      for (j = 0; j < filter.length; j++) {
        tr = table.getElementsByTagName("tr");
        src = filter[j].trim();
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td")[1];
          td2 = tr[i].getElementsByTagName("td")[2];
          td3 = tr[i].getElementsByTagName("td")[3];
          td4 = tr[i].getElementsByTagName("td")[4];
          td5 = tr[i].getElementsByTagName("td")[5];
          td6 = tr[i].getElementsByTagName("td")[6];
          td7 = tr[i].getElementsByTagName("td")[7];
          if (src!=='' && td && td2 &&td3&& td4 && td5 &&td6 &&td7) {
            txtValue = td.textContent || td.innerText;
            txtValue2 = td2.textContent || td2.innerText;
            txtValue3 = td3.textContent || td3.innerText;
            txtValue4 = td4.textContent || td4.innerText;
            txtValue5 = td5.textContent || td5.innerText;
            txtValue6 = td6.textContent || td6.innerText;
            txtValue7 = td7.textContent || td7.innerText;

            if (txtValue.toUpperCase().indexOf(src) > -1 || txtValue2.toUpperCase().indexOf(src) > -1 
            || txtValue3.toUpperCase().indexOf(src) > -1 ||txtValue4.toUpperCase().indexOf(src) > -1
            ||txtValue5.toUpperCase().indexOf(src) > -1||txtValue6.toUpperCase().indexOf(src) > -1||txtValue7.toUpperCase().indexOf(src) > -1) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
          }       
        }
      }
}
    
   
  

    
    render(){
             
        const{
            employees,
            modalTitle,
            employeeId,
            nom,
            prenom,
            email,
            poste,
            salaire,
            dateEmbauche,
            avantage,
           
          
            
        }=this.state;

    
      
  
         
        return(
              <div>
              <div className="d-flex p-2">
             
              <div className="col-sm-8">
              <input type="text" className="form-control col-sm-9" id="myInput"  onKeyUp={() => this.myFunction()} placeholder="Entrer les information pour rechercher.."/>
              </div>
             <div className="col-sm-6">
              <button
          type="button"
          className="btn btn-warning"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => this.addClick()}
        >
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
</svg> Ajouter un employé
        </button>
        </div>
        </div>

                   <table className="table table-hover table-striped" id="myTable">
          <thead>
            <tr>
              <th>Identifiant</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Poste</th>
              <th>Salaire</th>
              <th>Date d'embauche</th>
              <th>Avantage</th>
              <th>Action</th>

            </tr>
          </thead>
          <tbody>
            {employees 
            
             .map((emp) => (
              <tr key={emp.employeeId}>
                <td>EMP{emp.employeeId}</td>
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
                <div >
     
                        <div>

             
               
                    <div className="input-group mb-3">
                      <span className="input-group-text">Nom</span>
                      <input
                        type="text"
                        required="true"
                        className="form-control"
                        value={nom}
                        onChange={this.changeNom}
                      />
                    </div>

                  
                    <div className="input-group mb-3">
                      <span className="input-group-text">Prénom</span>
                      <input
                        type="text"
                        required="true"
                        className="form-control"
                        value={prenom}
                        onChange={this.changePrenom}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">Email</span>
                      <input
                        type="text"
                        required="true"
                        className="form-control"
                        value={email}
                        onChange={this.changeEmail}
                      />
                    </div>
                  
                    <div className="input-group mb-3">
                      <span className="input-group-text">Poste</span>
                      <select
                        className="form-select"
                        required="true"
                        value={poste}
                        onChange={this.changePoste}>
                          <option>Directeur</option>
                          <option>Responsable financier</option>
                          <option>DRH</option>
                          <option>RH</option>
                          <option>Developpeur</option>
                          <option>Medecin</option>
                          <option>Gardien</option>
                        </select>
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">Salaire</span>
                      <input
                        type="text"
                        required="true"
                        className="form-control"
                        value={salaire}
                        onChange={this.changeSalaire}
                      />
                    </div>
                   
              
                    <div className="input-group mb-3">
                      <span className="input-group-text">Date d'embauche</span>
                      <input
                        type="date"
                        required="true"
                        className="form-control"
                        value={dateEmbauche}
                        onChange={this.changeDateEmbauche}
                      />
                    </div>
                  
                    <div className="input-group mb-3">
                      <span className="input-group-text">Avantage</span>
                      <select
                        className="form-select"
                        required="true"
                        value={avantage}
                        onChange={this.changeAvantage}
                      >
                        <option>Indemnité de deplacement</option>
                        <option>Cantine</option>
                        <option>CNaPS</option>
                        <option>Ostie</option>
                        <option>Transport</option>
                        <option>Assurance</option>
                      </select>
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
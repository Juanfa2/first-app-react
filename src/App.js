import React, { Component } from "react";
import Formulario from "./Componentes/Formulario";
import Usuario from "./Componentes/Usuario";
import { BrowserRouter, Switch, Route, Link, NavLink } from "react-router-dom";
import "./CSS/menu.css"

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      usuarios:[],

    };
  }
  componentDidMount(){
    this.ListarUsuariosJPH();
    this.AgregarUsuarioJPH();
  }

  AgregarUsuarioJPH=(usuarioNuevo)=>{
    const URL = "https://jsonplaceholder.typicode.com/posts";
    const HEADER = {
      method:"POST",
      body:JSON.stringify({
        usuarioNuevo
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    }

    fetch(URL,HEADER)
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((e) => alert("ocurrio un error"))
   
  }

  AgregarUsuario=(nombre, usuario, correo)=>{
    const USUARIONUEVO ={
      id:this.state.usuarios.length + 1,
      name:nombre,
      username:usuario,
      email:correo
    }
    this.AgregarUsuarioJPH(USUARIONUEVO)
    this.setState({
      usuarios:[...this.state.usuarios,USUARIONUEVO ]
    })

    
  }


  ListarUsuariosJPH=()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) =>response.json())
    .then((usuariosJson) => this.setState({
      usuarios:usuariosJson
    }))
    .catch((e) => alert("Error en la carga"));
  }



  render(){
    return(
      <BrowserRouter>

        <nav className="menu">
          <NavLink className="enlace" activeClassName="activo" to="/" exact>Inicio</NavLink>
          <NavLink className="enlace" activeClassName="activo" to="/formulario">Formulario</NavLink>
          <NavLink className="enlace" activeClassName="activo" to="/usuarios">Usuarios</NavLink>
        </nav>
        

        <Switch> 
        
          <Route path="/formulario">
            <Formulario FuncionAgregar={this.AgregarUsuario}/>
          </Route>
        
        <Route path="/usuarios">
          {this.state.usuarios.map(
              (e)=>( <Usuario id={e.id} key={e.id} nombre={e.name} usuario={e.username} correo={e.email}  />)
            )}
        </Route>

        <Route path="/" exact>
          <Formulario FuncionAgregar={this.AgregarUsuario}/>
          {this.state.usuarios.map(
              (e)=>( <Usuario id={e.id} key={e.id} nombre={e.name} usuario={e.username} correo={e.email}  />)
            )}
        </Route>

        
       </Switch> 

      </BrowserRouter>
    )
  }
}
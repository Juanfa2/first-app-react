import React,{Component} from "react";
import "../CSS/tarjeta.css";

import "../CSS/boton.css"
export default class App extends Component{

    constructor(props){
        super(props);
        this.state = {
            
            nombre : this.props.nombre,
            usuario:this.props.usuario,
            correo : this.props.correo,
            mostrarUsuario: false,
            elemento: this.props.usuario
        }
    
    }

    CambiarElemento = ()=>{
        this.setState({
            elemento: this.state.mostrarUsuario? this.state.usuario : this.state.correo,
            mostrarUsuario: !this.state.mostrarUsuario
        })
    }

    render(){
        return(
            <div className="card">
               <div className="card-side front">
                   <div>{this.state.nombre} </div>
               </div>
               <div className="card-side back">
                   <div>{this.state.elemento} </div>
                   
                   <br/>
                   <button className="button-swing" onClick={this.CambiarElemento}>Mostrar {this.state.mostrarUsuario?"Usuario":"Correo"}</button>
               </div>
            </div>            
        ) 
    }
}
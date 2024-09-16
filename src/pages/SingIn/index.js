import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'

import './singIn.css'
import logo from'../../assets/logo.png'
import { AuthContext } from '../../contexts/auth'
import { toast } from "react-toastify";

export default function SingIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {singIn,loadingAuth} = useContext(AuthContext)

    async function hadleSingIn(e){
      e.preventDefault()
      
      if(email !== '' && password !== ''){
        await singIn(email, password)
      }else{
        toast.error("Preencha os campos")
      }
    }
  
  
    return(
      <div className="container-center">
        <div className="login">
          <div className="login-area">
            <img src={logo} alt="Logo do sistema de chamados" />
          </div>
  
          <form onSubmit={hadleSingIn}>
            <h1>Entrar</h1>
            <input 
              type="text" 
              placeholder="email@email.com"
              value={email}
              onChange={ (e) => setEmail(e.target.value) }
            />
  
            <input 
              type="password" 
              placeholder="********"
              value={password}
              onChange={ (e) => setPassword(e.target.value) }
            />
  
            <button type="submit">
              {loadingAuth ? 'carregando...': 'entrar'} 
            </button>
          </form>
  
          <Link to="/register">Criar uma conta</Link>
  
        </div>
      </div>
    )
  }
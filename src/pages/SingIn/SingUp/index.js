import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import './singUp.css'
import { AuthContext } from '../../../contexts/auth'
import { toast } from "react-toastify";
import logo from'../../../assets/logo.png'

export default function SingUp(){
    const[nome, setNome] =useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {singUp,loadingAuth} = useContext(AuthContext)

    async function handleSubimit(e){
      e.preventDefault()
      if(nome !=='' && email !== '' && password !== ''){
        await singUp(nome,email,password)
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
  
          <form onSubmit={handleSubimit}>
            <h1>Crie sua conta</h1>
            <input 
              type="text" 
              placeholder="digite seu nome"
              value={nome}
              onChange={ (e) => setNome(e.target.value) }
            />

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
  
            <button type="submit" >
              {loadingAuth ? 'carregando...': 'cadastrar'} 
            </button>
          </form>
  
          <Link to="/">Ja possui uma conta</Link>
  
        </div>
      </div>
    )
  }
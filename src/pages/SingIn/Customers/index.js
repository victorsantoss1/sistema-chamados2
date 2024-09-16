import Header from "../../../components/Header"
import Title from "../../../components/Title"
import { FiUser } from "react-icons/fi"
import { useState } from "react"
import { db } from "../../../services/firebaseConnections"
import { addDoc, collection } from "firebase/firestore"
import { toast } from "react-toastify"

export default function Customers(){
    const [nome,setNome] = useState('')
    const [cnpj,setCnpj] = useState('')
    const [endereco,setEndereco] = useState('')

    async function handleRegister(e){
        e.preventDefault()

        if(nome !== '' && cnpj !== '' && endereco !== ''){
            await addDoc(collection(db,"custumers"),{  //await add doc é a mesma coisa que criar um id aleatorio
                nomeFantasia: nome,
                cnpj: cnpj,
                endereco: endereco
            })
            .then(()=>{
                setNome()
                setCnpj()
                setEndereco()
                toast.success('Empresa registrada com sucesso!')
            })
            .catch((error)=>{
                console.log(error)
                toast.error("Falha ao registrar")
            })
          

        }else{
            toast.error("Preencha todos os campos")
        }
    }
    return(
        <div>
            <Header></Header>

            <div className="content">
                <Title name="Clientes">
                <FiUser size={25}></FiUser>
                </Title>
                <div className="container">
                    <form className="form-profile" onSubmit={handleRegister}>
                        <label> Nome fantasia</label>
                        <input type="text" placeholder="Nome da empresa" value={nome} onChange={(e)=> setNome(e.target.value)}></input>

                        <label> CNPJ</label>
                        <input type="text" placeholder="Digite o CNPJ" value={cnpj} onChange={(e)=> setCnpj(e.target.value)}></input>

                        <label> Endereco</label>
                        <input type="text" placeholder="Endereço da empresa" value={endereco} onChange={(e)=> setEndereco(e.target.value)}></input>

                        <button type="submit" >Salvar</button>
                    </form>

                </div>
            </div>
        </div>
    )
}
import { AuthContext } from "../../../contexts/auth"
import { useContext } from "react"
import Header from "../../../components/Header"
import './dashboard.css'
import Title from "../../../components/Title"
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from "react-icons/fi"
import { Link } from "react-router-dom"

export default function Dashboard(){

    async function handleLogout(){
        await logout()
    }


    const {logout} = useContext(AuthContext)
    return(
        <div>
            <Header></Header>
            
            <div className="content">
                <Title name="Chamados">
                    <FiMessageSquare size={25}></FiMessageSquare>
                </Title>

                <>
                <Link to="/new" className="new">
                <FiPlus color="#FFF" size={25}></FiPlus>
                Novo chamado
                </Link>
                

                <table>
                    <thead>
                        <tr>
                            <th scope="col">Clientes</th>
                            <th scope="col">Assuntos</th>
                            <th scope="col">Status</th>
                            <th scope="col">Cadastrado em</th>
                            <th scope="col">#</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td data-label="Cliente"> mercado</td>
                            <td data-label="Assunto"> Suporte</td>
                            <td data-label="Status"> Em aberto</td>
                            <td data-label="Cadastrado"> 12/05/2022</td>
                            <td data-label="#">
                                <button className="action" style={{backgroundColor: '#3583f6'}}>
                                    <FiSearch color="#FFF" size={17}></FiSearch>
                                </button>

                                <button className="action" style={{backgroundColor: '#f6a935'}}>
                                    <FiEdit2 color="#FFF" size={17}></FiEdit2>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </>
            </div>

        </div>
    )
}

                                
                                
                                
                                

import Header from "../../../components/Header"
import Title from "../../../components/Title"
import { FiSettings,FiUpload  } from "react-icons/fi"
import avatar from '../../../assets/avatar.png'
import { AuthContext } from "../../../contexts/auth"
import { useContext, useState } from "react"
import './profile.css'
import { toast } from "react-toastify";
import {doc, updateDoc} from 'firebase/firestore'
import { db, storage} from "../../../services/firebaseConnections"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

export default function Profile(){
    const {user,storageUser, setUser, logout} = useContext(AuthContext)

    const [avatarURL,setAvatarUrl] = useState(user&& user.avatarURL)
    const [imageAvatar,setImageAvatar] = useState(null)
    const [nome,setNome] = useState(user && user.name)
    const [email,setEmail] = useState(user && user.email)

    function handleFile(e){
        if(e.target.files[0]){
            const image= e.target.files[0]

            if(image.type === 'image/jpeg'|| image.type=== 'image/png'){
                setImageAvatar(image)
                setAvatarUrl(URL.createObjectURL(image))

            }else{
                toast.error("Envie uma imagem do tipo PNG ou JPEG ")
                setImageAvatar(null)
                return
            }
        }

    }
    async function handleUpload() {
        const currentUid = user.uid

        const uploadRef = ref(storage, `images/${currentUid}/${imageAvatar.name}`)

        const uploadTask = uploadBytes(uploadRef,imageAvatar)
        .then((snapshot)=>{

            getDownloadURL(snapshot.ref).then(async (downLoadURL)=>{
                let urlfoto = downLoadURL;

                const docRef = doc(db,"users",user.uid)
                await updateDoc(docRef,{
                    avatarURL: urlfoto,
                    name: nome,
                })
                .then(()=>{
                    let data ={
                        ...user,
                        name: nome,
                        avatarURL: urlfoto
                    }
                    setUser(data)
                    storageUser(data)
                    toast.success('Atualizado com sucesso')

                })
            })



            
        })
    }

    async function handleSubmit(e){
        e.preventDefault()

        if(imageAvatar=== null && nome !== ''){
            const docRef = doc(db,"users", user.uid)
            await updateDoc(docRef,{
                name: nome
            })
            .then(()=>{
                let data ={
                    ...user,
                    name: nome,
                }
                setUser(data)
                storageUser(data)
                toast.success('Atualizado com sucesso')
            })

        }else if(nome !== '' && imageAvatar !== null){
            
            
            handleUpload()
        }
    }


    return(
        
        <div>
            <Header></Header>
            <div className="content">
                <Title name={'Meu Perfil'}>
                <FiSettings size={25}></FiSettings>
                </Title>

                <div className="container" onSubmit={handleSubmit}>
                    <form className="form-profile">
                        <label className="label-avatar">
                            <span>
                                <FiUpload color="#FFF" size={25}></FiUpload>
                            </span>
                            <input type="file" accept="image/*" onChange={handleFile}/> <br></br> 
                            {avatarURL === null ?(
                                <img src={avatar} alt="foto perfil" width={250} height={250}></img>
                            ): (
                                <img src={avatarURL} alt="foto perfil" width={250} height={250}></img>
                            )}
                        </label>


                        <label>NOME</label>
                        <input type="text" value={nome} onChange={(e) =>  setNome(e.target.value)}/>
                        <label>EMAIL</label>
                        <input type="text" value={email}  disabled={true}></input>

                        <button type="submit">Salvar</button>
                    </form>
                </div>

                <div className="container">
                <button className="logout-btn" onClick={ () => logout() }>Sair</button>
                </div>
            </div>
            
        </div>
     
    )
}
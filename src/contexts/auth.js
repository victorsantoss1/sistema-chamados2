
import { useState, createContext, useEffect } from "react";
import {auth,db} from '../services/firebaseConnections'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {doc, getDoc, setDoc} from 'firebase/firestore'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loadingAuth,setLoadingAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(()=>{
        async function loadUser() {
            const storageUser = localStorage.getItem('@ticketsPRO')

            if(storageUser){
                setUser(JSON.parse(storageUser))
                setLoading(false)
            }
            setLoading(false)
        }

        loadUser()
    },[])
    
    async function singIn(email,password){
        setLoadingAuth(true)

        await signInWithEmailAndPassword(auth, email, password)
        .then( async(value)=>{
            let uid = value.user.uid
            
            const docRef = doc(db,"users", uid)  //estrutura doc (banco de dados, coleçao, oq vai pegar)
            const docSnap= await getDoc(docRef)

            let data ={
                uid: uid,
                    name: docSnap.data().name,
                    email: value.user.email,
                    avatarURL: docSnap.data().avatarURL
            }
            setUser(data)
            storageUser(data)
            setLoadingAuth(false)
            toast.success("Bem vindo ")
            navigate("/dashboard")

        })
        .catch((error)=>{
            console.log(error)
            setLoadingAuth(false)
            toast.error("Algo deu errado")
        })


       

    }
    // cadastrar novo usuario
    async function singUp(nome,email,password){
        setLoadingAuth(true)
        await createUserWithEmailAndPassword(auth,email,password)
        .then(async(value)=>{
            let uid = value.user.uid

            await setDoc(doc(db,"users",uid),{ //cria a coleçao USERS com o UID do usuario no banco DB
                name: nome,
                avatarURL: null,
            })
            .then(()=>{
                let data ={
                    uid: uid,
                    name: nome,
                    email: value.user.email,
                    avatarURL: null
                }
                setUser(data)
                storageUser(data)
                setLoadingAuth(false)
                toast.success("Seja bem vindo")
                navigate("/dashboard")
            })
            
        })
        .catch((error)=>{
            console.log(error)
            setLoadingAuth(false)
        })
    }

    function storageUser(data){
        localStorage.setItem('@ticketsPRO',JSON.stringify(data))
    }

    async function logout() {
        await signOut(auth)
        localStorage.removeItem('@ticketsPRO')
        setUser(null)
    }
    
    return ( // !! converte a variavel user para buleano(verdadeiro ou falso)
        <AuthContext.Provider value={{ signed: !!user, user,singIn,singUp,loadingAuth, loading,logout,storageUser,setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
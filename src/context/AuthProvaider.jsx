import { useState, useEffect, createContext } from "react"
import { useNavigate } from "react-router-dom"
import clienteAxios from "../config/clienteAxios"


const AuthContext = createContext()

const AuthProvaider = ({children}) => {

  const [auth, setAuth] = useState({})
  const [cargando, setCargando] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {

    const autenticarUser = async () => {
      const token = localStorage.getItem('token')

      if(!token){
        setCargando(false)
        return
      }

      const config = {
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        }
      }

      try {
          const { data } = await clienteAxios.get('/user/perfil', config)
          setAuth(data)
          navigate('/list')
      } catch (error) {
          setAuth({})
      }

      setCargando(false)
    }

    autenticarUser()

  }, [])

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export {
  AuthProvaider
}

export default AuthContext
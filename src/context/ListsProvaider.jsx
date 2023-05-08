import { useState, useEffect, createContext } from "react"
import clienteAxios from "../config/clienteAxios"
import { useNavigate } from "react-router-dom"

const ListsContext = createContext()

const ListsProvaider = ({ children }) => {

  const [lists, setLists] = useState([])
  const [alerta, setAlerta] = useState({})
  const [list, setList] = useState({})
  const [cargando, setCargando] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const getLists = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) return

        const config = {
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }

        const { data } = await clienteAxios.get('/list', config)
        setLists(data)
      } catch (error) {
        console.log(error);
      }
    }
    getLists()
  }, [])

  const showAlert = alert => {
    setAlerta(alert)

    setTimeout(() => {
      setAlerta({})
    }, 5000);
  }

  const submitList = async list => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const config = {
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await clienteAxios.post('/list', list, config)

      setLists([...lists, data])
      setAlerta({
        msg: 'Lista creada correctamente',
        error: false
      })

      setTimeout(() => {
        setAlerta({})
        navigate('/lists')
      }, 3000)
    } catch (error) {
      console.log(error);
    }
  }

  const getList = async id => {
    setCargando(true)
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const config = {
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await clienteAxios.get(`/list/${id}`, config)
      setList(data)
    } catch (error) {
      console.log(error);
    }

    setCargando(false)

  }

  return (
    <ListsContext.Provider
      value={{
        lists,
        showAlert,
        alerta,
        submitList,
        getList,
        list,
        cargando
      }}
    >
      {children}
    </ListsContext.Provider>
  )
}

export {
  ListsProvaider
}

export default ListsContext
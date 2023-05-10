import { useState, useEffect, createContext } from "react"
import clienteAxios from "../config/clienteAxios"
import { useNavigate } from "react-router-dom"

const ListsContext = createContext()

const ListsProvaider = ({ children }) => {

  const [lists, setLists] = useState([])
  const [alerta, setAlerta] = useState({})
  const [list, setList] = useState({})
  const [cargando, setCargando] = useState(false)
  const [modalFormColumn, setModalFormColumn] = useState(false)
  const [column, setColumn] = useState({})
  const [modalDelColumn, setModalDelColumn] = useState(false)
  const [buscador, setBuscador] = useState(false)

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

    if (list.id) {
      await updateList(list)
    } else {
      await newList(list)
    }


  }

  const updateList = async list => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const config = {
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await clienteAxios.put(`/list/lista/${list.id}`, list, config)

      const listasActualizadas = lists.map(listState => listState._id === data._id ? data : listState)
      setLists(listasActualizadas)

      setAlerta({
        msg: 'Lista actualizada correctamente',
        error: false
      })

      setTimeout(() => {
        setAlerta({})
        navigate('/list')
      }, 2000)
    } catch (error) {
      console.log(error);
    }

  }

  const newList = async list => {
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
        navigate('/list')
      }, 2000)
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
      setList(data.list)
    } catch (error) {
      console.log(error);
    }

    setCargando(false)

  }

  const deleteList = async id => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const config = {
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await clienteAxios.delete(`/list/${id}`, config)

      const listasActualizadas = lists.filter(listState => listState._id !== id)
      setLists(listasActualizadas)

      setAlerta({
        msg: data.msg,
        error: false
      })

      setTimeout(() => {
        setAlerta({})
        navigate('/list')
      }, 2000)
    } catch (error) {
      console.log(error);
    }

  }

  const handleModalColumns = () => {
    setModalFormColumn(!modalFormColumn)
    setColumn({})
  }

  const submitColumn = async column => {

    if (column?.id) {
      await editarColumn(column)
    } else {
      await crearColumn(column)
    }
  }

  const crearColumn = async column => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const config = {
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await clienteAxios.post('/column', column, config)

      const listaActualizada = { ...list }
      listaActualizada.columns = [...list.columns, data]

      setList(listaActualizada)
      setAlerta({})
      setModalFormColumn(false)
    } catch (error) {
      console.log(error);
    }
  }

  const editarColumn = async column => {

    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const config = {
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await clienteAxios.put(`/column/${column.id}`, column, config)

      const listaActualizada = { ...list }
      listaActualizada.columns = listaActualizada.columns.map(listState => listState._id === data._id ? data : listState)

      setList(listaActualizada)

      setAlerta({})
      setModalFormColumn(false)

    } catch (error) {
      console.log(error);
    }
  }

  const handleModalEditColumn = column => {
    setColumn(column)
    setModalFormColumn(true)
  }

  const handleModalEliminarColumn = column => {
    setColumn(column)
    setModalDelColumn(!modalDelColumn)
  }

  const eliminarColumn = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const config = {
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await clienteAxios.delete(`/column/${column._id}`, config)
      setAlerta({
        msg: data.msg,
        error: false
      })

      const listaActualizada = { ...list }
      listaActualizada.columns = listaActualizada.columns.filter(columnState => columnState._id !== column._id )
      setList(listaActualizada)
      setModalDelColumn(false)
      setColumn({})
      setTimeout(() => {
        setAlerta({})
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  }

  const handleBuscador = () => {
    setBuscador(!buscador)
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
        cargando,
        deleteList,
        modalFormColumn,
        handleModalColumns,
        submitColumn,
        handleModalEditColumn,
        column,
        modalDelColumn,
        handleModalEliminarColumn,
        eliminarColumn,
        buscador,
        handleBuscador
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
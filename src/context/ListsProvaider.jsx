import { useState, useEffect, createContext } from "react"
import clienteAxios from "../config/clienteAxios"
import { useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

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
  const [modalForCard, setModalForCard] = useState(false)
  const [cards, setCards] = useState({})
  const [card, setCard] = useState([])
  const [modalDelCard, setModalDelCard] = useState(false)

  const navigate = useNavigate()

  const {auth} = useAuth()

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
  }, [auth])

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
      setCards(data.cards);
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

  const handleModalCard = () => {
    setModalForCard(!modalForCard)
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
      listaActualizada.columns = listaActualizada.columns.filter(columnState => columnState._id !== column._id)
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

  const submitCard = async card => {

    if (card?.id) {
      await editarCard(card)
    } else {
      await crearCard(card)
    }
  }

  const crearCard = async card => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const config = {
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await clienteAxios.post('/card', card, config)

      const cardsActualizados = [ ...cards, data]

      setCards(cardsActualizados)
      setAlerta({})
      setModalForCard(false)
    } catch (error) {
      console.log(error);
    }
  }

  const editarCard = async card => {

    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const config = {
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      
      const { data } = await clienteAxios.put(`/card/${card.id}`, card, config)
      
      let cardsActualizados = [ ...cards ]
      cardsActualizados = cardsActualizados.map(cardState => cardState._id === data._id ? data : cardState)

      setCards(cardsActualizados)

      setAlerta({})
      setModalFormColumn(false)

    } catch (error) {
      console.log(error);
    }
  }

  const handleModalEditCard = card => {
    setCard(card)
    setModalForCard(true)
  }

  const handleModalEliminarCard = card => {
    setCard(card)
    setModalDelCard(!modalDelCard)
  }

  const eliminarCard = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const config = {
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await clienteAxios.delete(`/card/${card._id}`, config)
      setAlerta({
        msg: data.msg,
        error: false
      })

      let cardsActualizados = [ ...cards ]
      cardsActualizados = cardsActualizados.filter(cardState => cardState._id !== card._id)
      setCards(cardsActualizados)
      setModalDelCard(false)
      setCard({})
      setTimeout(() => {
        setAlerta({})
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  }

  const cerrarSesionList = () => {
    setLists([])
    setAlerta({})
    setList({})
    setColumn({})
    setCards([])
    setCard({})
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
        handleBuscador,
        card,
        cards,
        modalForCard,
        handleModalCard,
        submitCard,
        handleModalEditCard,
        handleModalEliminarCard,
        modalDelCard,
        eliminarCard,
        cerrarSesionList
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
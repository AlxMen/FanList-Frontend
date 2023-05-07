import { useState, useEffect, createContext } from "react"
import clienteAxios from "../config/clienteAxios"

const ListsContext = createContext()

const ListsProvaider = ({children}) => {

  const [lists, setLists] = useState([])

  return (
    <ListsContext.Provider
      value={{
        lists
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
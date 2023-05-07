import { useContext } from "react"
import ListsContext from "../context/ListsProvaider"

const useLists = () => {
  return useContext(ListsContext)
}

export default useLists
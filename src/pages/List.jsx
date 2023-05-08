import { useParams } from "react-router-dom"
import useLists from "../hooks/useLists"
import { useEffect } from "react"

const List = () => {

  const params = useParams()
  const { getList, list, cargando } = useLists()

useEffect(() => {
  getList(params.id)
}, [])

  const { name, date } = list

  return (

    cargando ? 'cargando...' : (
    <div>
      <h1 className="font-black tetx-4xl">{name}</h1>
    </div>
    )
  )
}

export default List
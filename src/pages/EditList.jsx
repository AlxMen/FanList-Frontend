import { useParams } from "react-router-dom"
import { useEffect } from "react"
import useLists from "../hooks/useLists"
import FormularioLista from "../components/FormularioLista"

const EditList = () => {

  const params = useParams()
  const { getList, list, cargando } = useLists()

  useEffect(() => {
    getList(params.id)
  }, [])

  const { name } = list

  if (cargando) return 'cargando...'

  return (
    <>
      <h1 className="font-black tetx-4xl">Editar Lista: {name}</h1>
      <div className="mt-10 flex justify-center">
        <FormularioLista />
      </div>

    </>
  )
}

export default EditList
import { useParams, Link } from "react-router-dom"
import useLists from "../hooks/useLists"
import { useEffect } from "react"
import ModalFormularioColumn from "../components/ModalFormularioColumn"
import ModalEliminarColumn from "../components/ModalEliminarColumn"
import Columns from "../components/Columns"
import Alert from "../components/Alert"

const List = () => {

  const params = useParams()
  const { getList, list, cargando, handleModalColumns, alerta } = useLists()
  useEffect(() => {
    getList(params.id)
  }, [])

  const { name, date, columns } = list

  if (cargando) return 'Cargando...'

  const { msg } = alerta

  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-black tetx-4xl uppercase">{name} <span className="text-sm text-gray-500 ml-4">{date}</span></h1>
        <div className="flex items-center gap-2 text-gray-400 hover:text-black">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
          </svg>
          <Link
            to={`/list/editar/${params.id}`}
            className="uppercase font-bold"
          >Editar</Link>
        </div>

      </div>
      <button
        onClick={handleModalColumns}
        type="button"
        className="text-sm px-3 py-2 mt-3 w-full md:w-auto rounded-lg uppercase font-bold bg-green-600 text-white text-center flex gap-2 items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>

        nueva seccion
      </button>

      <div className="flex justify-center">
        <div className="w-full md:w-1/3 lg:w-1/4">
          {msg && <Alert alerta={alerta} />}
        </div>
      </div>

      {columns?.length ?
        columns?.map(column => (
          <Columns key={column._id} column={column} />
        )) : <p className="text-center text-gray-600 uppercase p-5 ">No hay secciones creadas</p>}

      <ModalFormularioColumn />
      <ModalEliminarColumn />
    </>
  )
}

export default List
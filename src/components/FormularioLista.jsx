import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import useLists from "../hooks/useLists"
import Alert from "./Alert"


const FormularioLista = () => {
  const [id, setId] = useState(null)
  const [nombre, setNombre] = useState('')

  const { showAlert, alerta, submitList, list } = useLists()
  const params = useParams()

  useEffect(() => {
    if (params.id) {
      setId(list._id)
      setNombre(list.name)
    }else {

    }
  }, [params])

  const handleSubmit = async e => {
    e.preventeDefault()

    if (nombre === '') {
      showAlert({
        msg: 'El nombre de la lista es obligatorio',
        error: true
      })
      return
    }

    await submitList({id, nombre })

    setId(null)
    setNombre('')
  }

  const { msg } = alerta

  return (
    <form
      className="bg-white py-10 px-5 md:2-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >

      {msg && <Alert alerta={alerta} />}

      <div>
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="name"
        >Nombre Lista</label>

        <input
          id="name"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="[series, peliculas, juegos, nombre proyecto, etc.]"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />
      </div>

      <input
        type="submit"
        value={id ? 'Actualizar Lista' : 'Crear Lista'}
        className='bg-green-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-green-700 transition-colors'
      />

    </form>
  )
}

export default FormularioLista
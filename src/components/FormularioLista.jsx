import { useState } from "react"
import useLists from "../hooks/useLists"
import Alert from "./Alert"


const FormularioLista = () => {

  const [nombre, setNombre] = useState('')

  const { showAlert, alerta, submitList } = useLists()

  const handleSubmit = async e => {
    e.preventeDefault()

    if (nombre === '') {
      showAlert({
        msg: 'El nombre de la lista es obligatorio',
        error: true
      })
      return
    }

    await submitList({nombre})

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
        value="Crear Lista"
        className='bg-green-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-green-700 transition-colors'
      />

    </form>
  )
}

export default FormularioLista
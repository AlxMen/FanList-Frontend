import { useState } from "react"
import { Link } from "react-router-dom"
import Alert from "../components/Alert"
import clienteAxios from "../config/clienteAxios"

const Singup = () => {

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repitPassword, setRepitPassword] = useState('')
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()

    if ([nombre, email, password, repitPassword].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    if (password !== repitPassword) {
      setAlerta({
        msg: 'las contraseñas no son identicas',
        error: true
      })
      return
    }

    if (password <= 6) {
      setAlerta({
        msg: 'la contraseña debe tener mas de 6 caracteres',
        error: true
      })
      return
    }

    setAlerta({})

    try {
      const {data} = await clienteAxios.post(`/user`, { name: nombre, email, password })
      setAlerta({
        msg: data.msg,
        error: false
      })

      setNombre('')
      setEmail('')
      setPassword('')
      setRepitPassword('')
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta

  return (
    <>
      <h1 className="text-green-400 font-black text-6xl capitalize text-center">Crea tu cuenta <span className="text-green-700">y Empieza tus <span className="text-yellow-500">FanList</span></span></h1>

      {msg && <Alert alerta={alerta} />}

      <form
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label htmlFor="name" className="uppercase text-gray-600 block text-xl font-bold">Nombre</label>
          <input
            id="name"
            type="text"
            placeholder="Nombre de Usuario"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Example123@gmail.com"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="********"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label htmlFor="password2" className="uppercase text-gray-600 block text-xl font-bold">Repetir Contraseña</label>
          <input
            id="password2"
            type="password"
            placeholder="Repetir password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={repitPassword}
            onChange={e => setRepitPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Crear Cuenta"
          className="bg-green-500 w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-green-700 transition-colors"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          to="/"
          className="block text-center my-5 text-gray-700 uppercase text-sm"
        >¿Ya tienes cuenta? Inicia Sesión</Link>

        <Link
          to="/recovery-password"
          className="block text-center my-5 text-gray-700 uppercase text-sm"
        >Recuperar contraseña</Link>
      </nav>
    </>
  )
}

export default Singup
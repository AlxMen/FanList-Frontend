import { useState } from "react"
import { Link } from "react-router-dom"
import Alert from "../components/Alert"
import clienteAxios from "../config/clienteAxios"

const ForgotPassword = () => {

  const [email, setEmail] = useState('')
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()

    if (email === '' || email.length < 6) {
      setAlerta({
        msg: 'El Email es obligatorio',
        error: true
      })
      return
    }

    try {
      const {data} = await clienteAxios.post(`/user/recover-password`, {email})

      setAlerta({
        msg: data.msg,
        error: false
      })

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
      <h1 className="text-green-400 font-black text-6xl capitalize text-center">Recuperar<span className="text-green-700">Contraseña</span></h1>

      {msg && <Alert alerta={alerta} />}

      <form 
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
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

        <input
          type="submit"
          value="Enviar Instrucciones"
          className="bg-green-500 w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-green-700 transition-colors"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          to="/"
          className="block text-center my-5 text-gray-700 uppercase text-sm"
        >¿Ya tienes cuenta? Inicia Sesión</Link>

        <Link
          to="/singup"
          className="block text-center my-5 text-gray-700 uppercase text-sm"
        >¿No tienes una cuenta? Registrate</Link>
      </nav>
    </>
  )
}

export default ForgotPassword
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import clienteAxios from "../config/clienteAxios"
import Alert from '../components/Alert'

const ConfirmAccount = () => {

  const params = useParams()
  const { id } = params

  const [alerta, setAlerta] = useState({})
  const [cuentaConfrimada, setCuentaConfirmada] = useState(false)


  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/user/confirm/${id}`
        const { data } = await clienteAxios.get(url)

        setAlerta({
          msg: data.msg,
          error: false
        })

        setCuentaConfirmada(true)

      } catch (error) {
         
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
        
      }
    }
    confirmarCuenta()
  }, [])

  const { msg } = alerta

  return (
    <>
      <h1 className="text-green-400 font-black text-6xl capitalize text-center">Confirma tu cuenta <span className="text-green-700">Y Comienza Con tus <span className="text-yellow-500">FanList</span></span></h1>

      <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alert alerta={alerta} />}

        {cuentaConfrimada && (
          <Link
            to="/"
            className="block text-center my-5 text-gray-700 uppercase text-sm"
          >Inicia Sesión</Link>
        )}
      </div>
    </>
  )
}

export default ConfirmAccount
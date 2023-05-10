import { Link } from "react-router-dom"
import useLists from "../hooks/useLists"
import Busqueda from "./Busqueda"

const Header = () => {

  const { handleBuscador } = useLists()

  return (
    <header className="px-4 py-5 bg-green-200 border-b border-black">
      <div className="md:flex md:justify-between">
        <h2 className="text-4xl text-yellow-500 font-black text-center mb-5 md:mb-0">
          Fanlist
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <button
            type="button"
            className="font-bold uppercase"
            onClick={handleBuscador}
          >Buscar Lista</button>
          <Link
            to="/List"
            className="font-bold uppercase"
          >Listas</Link>

          <button
            type="button"
            className="text-white text-sm bg-green-600 p-3 rounded-md uppercase font-bold"
          >Cerrar Sesion</button>

          <Busqueda />
        </div>
      </div>
    </header>
  )
}

export default Header
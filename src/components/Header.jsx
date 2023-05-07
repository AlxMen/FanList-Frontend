import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="px-4 py-5 bg-green-200 border-b">
      <div className="md:flex md:justify-between">
        <h2 className="text-4xl text-yellow-500 font-black text-center">
          Fanlist
        </h2>

        <input 
          type="search"
          placeholder="Buscar Lista"
          className="rounded-lg lg:w-96 block p-2 border"
        />

        <div className="flex items-center gap-4">
          <Link 
            to="/List"
            className="font-bold uppercase"
          >Listas</Link>

          <button
          type="button"
          className="text-white text-sm bg-green-600 p-3 rounded-md uppercase font-bold"
          >Cerrar Sesion</button>
        </div>
      </div>
    </header>
  )
}

export default Header
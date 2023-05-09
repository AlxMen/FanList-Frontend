import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Sidebar = () => {

  const { auth } = useAuth()

  return (
    <aside className="md:w-80 lg:w-96 px-5 py-10 bg-yellow-100 border-r border-black" >
      <p className="text-xl font-bold">Hola: {auth.name}</p>

      <Link
        to="new-List"
        className="bg-green-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
      >Nueva Lista</Link>
    </aside>
  )
}

export default Sidebar
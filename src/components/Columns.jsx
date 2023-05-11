import useLists from "../hooks/useLists"
import Cards from "./Cards"

const Columns = ({ column }) => {

  const { handleModalEditColumn, handleModalEliminarColumn, cards } = useLists()

  const { name } = column

  return (
    <div className="rounded-lg p-3 mt-2 border-2 border-green-400 bg-yellow-100">
      <div className="w-full border-b-4 border-black flex justify-between">
        <p className="font-bold text-xl mt-2 w-full">{name}</p>

        <div className="flex gap-2 flex-col lg:flex-row">
          <button
            className="bg-green-600 hover:bg-green-800 px-4 py-2 mb-1 text-white uppercase font-bold text-sm rounded-lg"
            onClick={() => handleModalEditColumn(column)}
          >Editar</button>
          <button
            className="bg-red-600 hover:bg-red-800 px-4 py-2 mb-1 text-white uppercase font-bold text-sm rounded-lg"
            onClick={() => handleModalEliminarColumn(column)}
          >Eliminar</button>
        </div>
      </div>

      {cards?.length ?
        (cards.filter(card => card.columnowner === column._id)
          .map(card => <Cards key={card._id} card={card} />)
        ) : ''}



    </div>
  )
}

export default Columns
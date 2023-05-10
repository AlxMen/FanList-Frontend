

const Columns = ({column}) => {
  
  const {name} = column
  return (
    <div className="rounded-lg p-3 mt-2 border-2 border-green-400 bg-yellow-100">
      <div className="w-full border-b-4 border-black flex justify-between">
        <p className="font-bold text-xl mt-2 w-full">{name}</p>
        
        <div className="flex gap-2">
          <button
            className="bg-green-600 hover:bg-green-800 px-4 py-2 mb-1 text-white uppercase font-bold text-sm rounded-lg"
          >Editar</button>
          <button
            className="bg-red-600 hover:bg-red-800 px-4 py-2 mb-1 text-white uppercase font-bold text-sm rounded-lg"
          >Eliminar</button>
        </div>
      </div>
      
      <div className="bg-green-300 shadow mt-4 rounded-lg p-4">
        hola
      </div>
      
      

    </div>
  )
}

export default Columns
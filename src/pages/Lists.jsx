import useLists from "../hooks/useLists"
import PreviewList from "../components/PreviewList"

const Lists = () => {

  const { lists } = useLists()


  return (
    <>
      <h1 className="text-4xl font-black">Listas</h1>

      <div className="bg-white shadow mt-10 rounded-lg">
        {lists.length ?
          lists.map(list => (
            <PreviewList key={list._id} list={list} />
          ))
          : <p className="text-center text-gray-600 uppercase p-5 ">No hay listas creadas</p>}
      </div>
    </>
  )
}

export default Lists
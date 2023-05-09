import { Link } from "react-router-dom"

const PreviewList = (list) => {

  const { _id, date, name } = list.list
  return (
    <div className="border-b p-5 flex">
      <p className="flex-1">
        {name}

        <span className="text-sm text-gray-500 ml-4">{'Creado: '}{date.split('T')[0]}</span>
      </p>
      <Link
        to={`${_id}`}
        className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold"
      >
      Ver Lista
      </Link>
    </div>
  )
}

export default PreviewList
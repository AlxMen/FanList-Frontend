import FormularioLista from "../components/FormularioLista"

const NewList = () => {
  return (
    <>
    <h1 className="text-4xl font-black">crear Lista</h1>

    <div className="mt-10 flex justify-center">
      <FormularioLista />
    </div>
  </>
  )
}

export default NewList
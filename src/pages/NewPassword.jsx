

const NewPassword = () => {
  return (
    <>
      <h1 className="text-green-400 font-black text-6xl capitalize text-center">Reestablecer <span className="text-green-700">Contraseña</span></h1>

      <form className="my-10 bg-white shadow rounded-lg p-10">
        <div className="my-5">
          <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Nueva Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="Escribe tu nueva contraseña"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>

        <input
          type="submit"
          value="Guardar Nueva Contraseña"
          className="bg-green-500 w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-green-700 transition-colors"
        />
      </form>
    </>
  )
}

export default NewPassword
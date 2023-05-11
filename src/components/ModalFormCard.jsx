import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import useLists from '../hooks/useLists'
import Alert from './Alert'
import { useParams } from 'react-router-dom'

const ModalFormCard = () => {

  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [description, setDesc] = useState('')
  const [columnowner, setColmn] = useState('')

  const params = useParams()

  const { list, showAlert, alerta, modalForCard, handleModalCard, card, submitCard } = useLists()

  const allColumns = list.columns

  useEffect(() => {
    if (card?._id) {
      setId(card._id)
      setName(card.name)
      setDesc(card.description)
      setColmn(card.columnowner)
      return
    }
    setId('')
    setName('')
    setDesc('')
    setColmn('')
  }, [card])

  const handleSubmit = async e => {
    e.preventDefault()

    if ([name].includes('')) {
      showAlert({
        msg: 'El titulo y la seccion son obligatorias',
        error: true
      })
      return
    }

    await submitCard({id, name, description, columnowner, listowner: params.id})


    setId('')
    setName('')
    setDesc('')
    setColmn('')
  }

  const {msg} = alerta

  return (
    <Transition.Root show={modalForCard} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={handleModalCard}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">


              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleModalCard}
                >
                  <span className="sr-only">Cerrar</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>


              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-bold text-gray-900">
                    {id ? 'Editar Tarjeta' : 'Crear Tarjeta'}
                  </Dialog.Title>
                  {msg && <Alert alerta={alerta}/> }
                  <form className='my-10' onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="name" className='text-gray-700 uppercase font-bold text-sm' >
                        Titulo
                      </label>
                      <input
                        type="text"
                        id='name'
                        placeholder='Titulo de la tarjeta'
                        className='boder-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                        value={name}
                        onChange={e => setName(e.target.value)}
                      />
                      <label htmlFor="description" className='text-gray-700 uppercase mt-2 font-bold text-sm' >
                        Descripcion
                      </label>
                      <input
                        type="text"
                        id='description'
                        placeholder='Descripcion'
                        className='boder-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                        value={description}
                        onChange={e => setDesc(e.target.value)}
                      />
                      <label htmlFor="column" className='text-gray-700 uppercase mt-2 font-bold text-sm'>
                        Seccion:
                      </label>
                      <select
                        id='column'
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                        value={columnowner}
                        onChange={e => setColmn(e.target.value)}
                      >
                        <option value="" >-- Seleccionar --</option>
                        {allColumns?.map(opcion => (
                          <option key={opcion._id} value={opcion._id}>{opcion.name}</option>
                        ))}
                      </select>

                    </div>
                    <input 
                      type="submit" 
                      className='bg-green-600 hover:bg-green-800 w-full mt-5 p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded text-sm'
                      value={id ? 'Guardar Cambios' : 'Crear Tarjeta'}
                    />
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ModalFormCard
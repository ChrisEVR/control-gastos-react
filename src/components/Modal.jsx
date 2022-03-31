import { useState, useEffect } from 'react'
import CerrarBtn from '../img/cerrar.svg'
import Mensaje from './Mensaje'

const Modal = ({
    animarModal, 
    setModal, 
    setAnimarModal, 
    guardarGasto, 
    gastoEditar,
    setGastoEditar
}) => {

  const [mensaje, setMensaje] = useState("")
  const [nombre, setNombre] = useState("")
  const [cantidad, setCantidad] = useState(0)
  const [categoria, setCategoria] = useState("")
  const [id, setId] = useState("")
  const [fecha, setFecha] = useState("")
  
  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0){
        setNombre(gastoEditar.nombre)
        setCantidad(gastoEditar.cantidad)
        setCategoria(gastoEditar.categoria)
        setId(gastoEditar.id)
        setFecha(gastoEditar.fecha)
    }
  }, [])
  

  const ocultarModal = () => {
      setAnimarModal(false)
      setGastoEditar({})
      setTimeout(() => {
          setModal(false)
      }, 500)
  }

  const handleNuevoGasto = e => {
    e.preventDefault()

    if([nombre, cantidad].includes("") || cantidad <= 0){
        setMensaje("Todos los campos deben ser llenados")

        setTimeout(() => {
            setMensaje("")
        }, 3000);

        return
    }

    guardarGasto({nombre, cantidad, categoria, id, fecha})

  }

  return (
    <div className='modal'>
        <div className='cerrar-modal'>
            <img 
                src={CerrarBtn} 
                alt="cerrar modal" 
                onClick={ocultarModal}
            />
        </div>

        <form
            onSubmit={handleNuevoGasto} 
            className={`formulario ${animarModal ? "animar" : "cerrar"}`}
            >
            
            <legend> { 
                Object.keys(gastoEditar).length > 0 ? 
                "Editar Gasto" : 
                "Nuevo Gasto" 
                }
            </legend>

            {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}

            <div className='campo'>
                <label htmlFor="nombre_gasto" className=''>Nombre del Gasto</label>
                
                <input 
                    id="nombre_gasto" 
                    type="text" 
                    placeholder='Añade el nombre del gasto'
                    value={ nombre }
                    onChange={e => setNombre(e.target.value)}
                />
            </div>

            <div className='campo'>
                <label htmlFor="cantidad" className=''>Cantidad</label>
                
                <input 
                    id="cantidad" 
                    type="number" 
                    placeholder='Añade la cantidad del gasto'
                    value={ cantidad }
                    onChange={e => setCantidad(Number(e.target.value))}
                />
            </div>

            <div className='campo'>
                <label htmlFor="categoria">Categoría</label>
                
                <select
                    id='categoria'
                    value={ categoria }
                    onChange={e => setCategoria(e.target.value)}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>

                </select>
            </div>

            <input type='submit' value={
                Object.keys(gastoEditar).length > 0 ? 
                "Editar Gasto" : 
                "Añadir Gasto"
            } />

        </form>
    </div>
  )
}

export default Modal
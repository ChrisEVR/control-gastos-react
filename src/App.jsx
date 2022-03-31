import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filtros from './components/Filtros'
import Modal from './components/Modal'
import { generarId } from './helpers'
import ListadoGastos from './components/ListadoGastos'
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {
  
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  )
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )

  const [gastoEditar, setGastoEditar] = useState({})
  
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])
  
  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0){
      setModal(true)

      setTimeout(() => {
        setAnimarModal(true)
      }, 500)
    }
  }, [gastoEditar])
  
  useEffect(() => {  
    localStorage.setItem('presupuesto', presupuesto ?? 0)
    
  }, [presupuesto])
  
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
    
  }, [gastos])

  useEffect(() => {
    if(filtro){
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro)

      setGastosFiltrados(gastosFiltrados)
    }
    
  }, [filtro])
  
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0

    if(presupuestoLS > 0){
      setIsValidPresupuesto(true)
    }

  }, [])

  const handleNuevoGasto = () => {
    setModal(true)

    setTimeout(() => {
      setAnimarModal(true)
    }, 500)
  }

  const guardarGasto = gasto => {

    if(gasto.id){
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    }else{
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }


    setAnimarModal(false)
      
      setTimeout(() => {
          setModal(false)
      }, 500)
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gastoState => gastoState.id !== id)

    setGastos(gastosActualizados)
  }
  
  return (
    <div className={modal ? 'fijar':''}>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        gastos={gastos}
        setGastos={setGastos}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos
              gastos={gastos}
              eliminarGasto={eliminarGasto}
              setGastoEditar={setGastoEditar}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className='nuevo-gasto'>
            <img
              src={IconoNuevoGasto}
              alt="Icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}
        
      {modal && <Modal 
                  animarModal={animarModal}
                  gastos={gastos}  
                  gastoEditar={gastoEditar}
                  setModal={setModal} 
                  setAnimarModal={setAnimarModal}
                  guardarGasto={guardarGasto}
                  setGastoEditar={setGastoEditar}
                /> }

    </div>
  )
}

export default App

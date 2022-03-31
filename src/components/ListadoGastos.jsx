import Gasto from "./Gasto"

const ListadoGastos = ({
    gastos, 
    setGastoEditar, 
    eliminarGasto,
    filtro, 
    gastosFiltrados
}) => {
  return (
    <div className="listado-gastos contenedor">

        {
            filtro ? (
                <>
                    <h2>{gastosFiltrados.length > 0 ? 'Gastos' : 'No Hay Gastos En Esta Categoría'}</h2>

                    {gastosFiltrados.map(gasto => (
                        <Gasto
                            key={gasto.id}
                            gasto={gasto}
                            eliminarGasto={eliminarGasto}
                            setGastoEditar={setGastoEditar}
                        />
                    ))}
                </>
                
            ) : (
                <>
                    <h2>{gastos.length > 0? 'Gastos' : 'No Hay Gastos Aún'}</h2>

                    {gastos.map(gasto => (
                        <Gasto
                            key={gasto.id}
                            gasto={gasto}
                            eliminarGasto={eliminarGasto}
                            setGastoEditar={setGastoEditar}
                        />
                    ))}
                </>
            )

        }
    </div>
  )
}

export default ListadoGastos
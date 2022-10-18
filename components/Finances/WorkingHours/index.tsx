// import React, { useContext, useEffect } from "react"
// DATA STORAGE & TYPES
// import { WorkingHoursContext } from "contexts/WorkingHours"

const WorkingHours = () => {
  // const {
  //   // actualWeek, setActualWeek
  //   weekSelected,
  // } = useContext(WorkingHoursContext)

  // const calculateActualWeek = () => {
  // const currentDate = new Date()
  // const startDate = new Date(currentDate.getFullYear(), 0, 1)
  // const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000))
  // const weekNumber = Math.ceil(days / 7)
  // setActualWeek(weekNumber)
  // }

  // useEffect(() => {
  //   calculateActualWeek()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [weekSelected])

  /*
    DIVIDIR POR SEMANA => func para obtener el numero de semana que es
    CLICK EN EL DIA    => se abre el form para poner:
      - persona
      - rango horario trabajado => en base a eso se calculan las horas trabajadas
    CLICK EN ALGO YA INGRESADO  => se habilita la edicion/borrado (boton cancelar & guardar)
      - al clickear borrar      => modal de seguridad

    PAGINADOR PARA PASAR ENTRE SEMANAS
    BOTON PARA VOLVER A SEMANA ACTUAL
    FILTRO PARA SELECCIONAR SEMANA (LUN 3/10 al DOM 9/10)
  */

  return <div>WorkingHours</div>
}

export default WorkingHours

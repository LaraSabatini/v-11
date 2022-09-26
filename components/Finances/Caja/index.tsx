import React, { useContext } from "react"
// DATA STORAGE & TYPES
import { Finances } from "contexts/Finances"
// COMPONENTS & STYLING
import ProductsView from "./ProducstView"
import BoulderView from "./BoulderView"
import CajaByUser from "./CajaByUser"

const Caja = () => {
  const { cajaFilterSelected, cajaDateSelected } = useContext(Finances)
  // CAJA MP x USER
  // CAJA DIA => PRODUCTS
  // CAJA DIA => BOULDER

  // Traer todos los datos y llenar estados
  // eslint-disable-next-line no-console
  console.log(cajaFilterSelected, cajaDateSelected)

  return (
    <div>
      {cajaFilterSelected.id === 1 && <ProductsView />}
      {cajaFilterSelected.id === 2 && <BoulderView />}
      {cajaFilterSelected.id === 3 && <CajaByUser />}
      {cajaFilterSelected.id === 4 && <h1>CAJA COMPLETA</h1>}
    </div>
  )
}

export default Caja

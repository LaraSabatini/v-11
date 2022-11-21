import React, { useEffect, useContext } from "react"
import PartnersProvider from "contexts/Partners"
import { getPricesAction } from "helpers/partners"
import { GeneralContext } from "contexts/GeneralContext"
import Clients from "components/Clients"

function ClientsRoute() {
  const { setPrices, triggerPricesUpdate } = useContext(GeneralContext)

  const setPricesData = async () => {
    const pricesData = await getPricesAction()
    setPrices(pricesData)
  }

  useEffect(() => {
    setPricesData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerPricesUpdate])
  return (
    <PartnersProvider>
      <Clients />
    </PartnersProvider>
  )
}

export default ClientsRoute

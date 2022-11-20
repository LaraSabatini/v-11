import React from "react"
import PartnersProvider from "contexts/Partners"
import Clients from "components/Clients"

function ClientsRoute() {
  return (
    <PartnersProvider>
      <Clients />
    </PartnersProvider>
  )
}

export default ClientsRoute

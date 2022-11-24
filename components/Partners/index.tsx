import React, { useContext, useEffect } from "react"
import { useRouter } from "next/router"
import { PartnersContext } from "contexts/Partners"
import { getCombosAction } from "helpers/partners"
import Header from "components/UI/Header"
import Modals from "./GeneralContent/Modals"
import NoPermissionsView from "./GeneralContent/NoPermissionsView"
import HeadingContent from "./HeadingContent"
import ClientData from "./ClientData"
import CreatePartnerButton from "./GeneralContent/CreatePartnerButton"
import CreatePartnerForm from "./Forms/CreatePartner"
import Prices from "./Prices"
import Content from "./styles"

function Clients() {
  const { createModal, cleanStates, setCombos } = useContext(PartnersContext)

  const router = useRouter()

  const getPermissions = localStorage.getItem("permissions")
  const permissions = JSON.parse(getPermissions)[0].sections[0].sub_sections

  const clientsSection = permissions[0]
  const pricesSection = permissions[1]
  const routeIsClients = Object.keys(router.query)[0] === "clients"
  const routeIsPrices = Object.keys(router.query)[0] === "prices"

  const fillCombosData = async () => {
    const getData = await getCombosAction()
    setCombos(getData)
  }

  useEffect(() => {
    if (clientsSection.view) {
      fillCombosData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Modals />
      <Header />
      <Content>
        {routeIsClients && !clientsSection.view && <NoPermissionsView />}
        {((routeIsClients && clientsSection.view) ||
          (routeIsPrices && pricesSection.view)) && <HeadingContent />}

        {routeIsPrices && pricesSection.view && (
          <Prices canEdit={pricesSection.actions.edit} />
        )}

        {routeIsClients && clientsSection.view && (
          <>
            <CreatePartnerButton canCreate={clientsSection.actions.create} />
            {createModal && (
              <CreatePartnerForm cancelCreate={() => cleanStates()} />
            )}
            <ClientData permits={permissions} />
          </>
        )}
      </Content>
    </div>
  )
}

export default Clients

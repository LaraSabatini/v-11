import React, { useContext } from "react"
import { useRouter } from "next/router"
import { PartnersContext } from "contexts/Partners"
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
  const { createModal, cleanStates } = useContext(PartnersContext)

  const router = useRouter()

  const getPermissions = localStorage.getItem("permissions")
  const permissions = JSON.parse(getPermissions)[0].sections[0].sub_sections

  const clientsSection = permissions[0]
  const pricesSection = permissions[1]

  return (
    <div>
      <Modals />
      <Header />
      <Content>
        {Object.keys(router.query)[0] === "clients" && !clientsSection.view && (
          <NoPermissionsView />
        )}
        {((Object.keys(router.query)[0] === "clients" && clientsSection.view) ||
          (Object.keys(router.query)[0] === "prices" &&
            pricesSection.view)) && (
          <>
            <HeadingContent />
            <Prices canEdit={pricesSection.actions.edit} />
          </>
        )}

        {Object.keys(router.query)[0] === "clients" && clientsSection.view && (
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

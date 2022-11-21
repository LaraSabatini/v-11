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
import { Content } from "./styles"

function Clients() {
  const { createModal } = useContext(PartnersContext)

  const router = useRouter()

  const getPermissions = localStorage.getItem("permissions")
  const permissions = JSON.parse(getPermissions)[0].sections[0].sub_sections

  const canViewClients = permissions[0].view

  return (
    <div>
      <Modals />
      <Header />
      <Content>
        {Object.keys(router.query)[0] === "clients" && !canViewClients && (
          <NoPermissionsView />
        )}
        {Object.keys(router.query)[0] === "clients" && canViewClients && (
          <>
            <HeadingContent />
            <CreatePartnerButton canCreate={permissions[0].actions.create} />
            {createModal && <CreatePartnerForm />}
            <ClientData permits={permissions} />
          </>
        )}
      </Content>
    </div>
  )
}

export default Clients

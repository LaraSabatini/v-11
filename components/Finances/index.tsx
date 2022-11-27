import React from "react"
import { useRouter } from "next/router"
import PartnersProvider from "contexts/Partners"
import Header from "components/UI/Header"
import HeadingContent from "./HeadingContent"
import NoPermitsView from "./GeneralContent/NoPermissionsView"
import Till from "./Till"
import Bills from "./Bills"
import WorkingHours from "./WorkingHours"
import Earnings from "./Earnings"
import { MainContainer, Content } from "./styles"

function FinancesView() {
  const router = useRouter()

  const getPermissions = localStorage.getItem("permissions")
  const permissions = JSON.parse(getPermissions)[0].sections[3].sub_sections
  const routeIsBilling = Object.keys(router.query)[0] === "billing"

  return (
    <MainContainer>
      <PartnersProvider>
        <Header />
      </PartnersProvider>
      <Content>
        <HeadingContent />

        {((routeIsBilling && !permissions[0].view) ||
          (Object.keys(router.query)[0] === "expenses" &&
            !permissions[1].view) ||
          (Object.keys(router.query)[0] === "workingHours" &&
            !permissions[2].view) ||
          (Object.keys(router.query)[0] === "earnings" &&
            !permissions[3].view)) && <NoPermitsView />}

        {
          {
            billing: <div>{permissions[0].view && <Till />}</div>,
            expenses: <div>{permissions[1].view && <Bills />}</div>,
            workingHours: <div>{permissions[2].view && <WorkingHours />}</div>,
            earnings: <div>{permissions[3].view && <Earnings />}</div>,
          }[Object.keys(router.query)[0]]
        }
      </Content>
    </MainContainer>
  )
}

export default FinancesView

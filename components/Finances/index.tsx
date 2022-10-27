import React from "react"
import { useRouter } from "next/router"
// DATA STORAGE & TYPES
// import WorkingHoursProvider from "contexts/WorkingHours"
import generalTexts from "strings/general.json"
import financesTexts from "strings/finances.json"
// COMPONENTS & STYLING
import Header from "components/UI/Header"
import NoPermissionsView from "components/UI/NoPermitsView"

import Bills from "./Bills"
import Till from "./Till"
import Earnings from "./Earnings"
import WorkingHours from "./WorkingHours"
import TillFilters from "./Till/Filters"
import { MainContainer, Content, Title, HeadContent } from "./styles"

function FinancesView() {
  const router = useRouter()

  const getPermissions = localStorage.getItem("permissions")
  const permissions = JSON.parse(getPermissions)[0].sections[3].sub_sections

  return (
    <MainContainer>
      <Header />
      <Content>
        <HeadContent>
          <Title>
            {generalTexts.sections.finances}
            <span>
              {" "}
              /{" "}
              {router.query.billing === "true" &&
                `${financesTexts.boulderEarnings}`}
              {router.query.expenses === "true" && `${financesTexts.bills}`}
              {router.query.workingHours === "true" &&
                `${financesTexts.workingHours}`}
              {router.query.earnings === "true" && `${financesTexts.earnings}`}
            </span>
          </Title>
          {Object.keys(router.query)[0] === "billing" &&
            permissions[0].view && <TillFilters />}
        </HeadContent>
        {Object.keys(router.query)[0] === "billing" && permissions[0].view && (
          <Till />
        )}
        {Object.keys(router.query)[0] === "expenses" && permissions[1].view && (
          <Bills />
        )}
        {Object.keys(router.query)[0] === "workingHours" &&
          permissions[2].view && (
            // <WorkingHoursProvider>
            <WorkingHours />
            // </WorkingHoursProvider>
          )}
        {Object.keys(router.query)[0] === "earnings" && permissions[3].view && (
          <Earnings />
        )}

        {((Object.keys(router.query)[0] === "billing" &&
          !permissions[0].view) ||
          (Object.keys(router.query)[0] === "expenses" &&
            !permissions[1].view) ||
          (Object.keys(router.query)[0] === "workingHours" &&
            !permissions[2].view) ||
          (Object.keys(router.query)[0] === "earnings" &&
            !permissions[3].view)) && <NoPermissionsView />}
      </Content>
    </MainContainer>
  )
}

export default FinancesView

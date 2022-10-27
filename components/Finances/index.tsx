import React from "react"
import { useRouter } from "next/router"
// DATA STORAGE & TYPES
import PartnersProvider from "contexts/Partners"
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

  const routeIsBilling = Object.keys(router.query)[0] === "billing"

  return (
    <MainContainer>
      <PartnersProvider>
        <Header />
      </PartnersProvider>
      <Content>
        <HeadContent>
          <Title>
            {generalTexts.sections.finances}
            <span>
              {" / "}
              {
                {
                  billing: `${financesTexts.boulderEarnings}`,
                  expenses: `${financesTexts.bills}`,
                  workingHours: `${financesTexts.workingHours}`,
                  earnings: `${financesTexts.earnings}`,
                }[Object.keys(router.query)[0]]
              }
            </span>
          </Title>
          {routeIsBilling && permissions[0].view && <TillFilters />}
        </HeadContent>

        {((routeIsBilling && !permissions[0].view) ||
          (Object.keys(router.query)[0] === "expenses" &&
            !permissions[1].view) ||
          (Object.keys(router.query)[0] === "workingHours" &&
            !permissions[2].view) ||
          (Object.keys(router.query)[0] === "earnings" &&
            !permissions[3].view)) && <NoPermissionsView />}

        {
          {
            billing: <>{permissions[0].view && <Till />}</>,
            expenses: <>{permissions[1].view && <Bills />}</>,
            workingHours: <>{permissions[2].view && <WorkingHours />}</>,
            earnings: <>{permissions[3].view && <Earnings />}</>,
          }[Object.keys(router.query)[0]]
        }
      </Content>
    </MainContainer>
  )
}

export default FinancesView

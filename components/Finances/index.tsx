import React from "react"
import { useRouter } from "next/router"
// DATA STORAGE & TYPES
// import WorkingHoursProvider from "contexts/WorkingHours"
import generalTexts from "strings/general.json"
import financesTexts from "strings/finances.json"
// COMPONENTS & STYLING
import Header from "components/UI/Header"
import Bills from "./Bills"
import Till from "./Till"
import Earnings from "./Earnings"
import WorkingHours from "./WorkingHours"
import TillFilters from "./Till/Filters"
import { MainContainer, Content, Title, HeadContent } from "./styles"

function FinancesView() {
  const router = useRouter()

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
          {router.query.billing === "true" && <TillFilters />}
        </HeadContent>
        {router.query.billing === "true" && <Till />}
        {router.query.expenses === "true" && <Bills />}
        {router.query.workingHours === "true" && (
          // <WorkingHoursProvider>
          <WorkingHours />
          // </WorkingHoursProvider>
        )}
        {router.query.earnings === "true" && <Earnings />}
      </Content>
    </MainContainer>
  )
}

export default FinancesView

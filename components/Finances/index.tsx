import React from "react"
import { useRouter } from "next/router"
// DATA STORAGE & TYPES
import WorkingHoursProvider from "contexts/WorkingHours"
// COMPONENTS & STYLING
import Header from "components/UI/Header"
import Bills from "./Bills"
import Caja from "./Caja"
import Earnings from "./Earnings"
import WorkingHours from "./WorkingHours"
import FiltersCaja from "./Caja/Filters"
import { MainContainer, Content, Title, HeadContent } from "./styles"

const FinancesView = () => {
  const router = useRouter()

  return (
    <MainContainer>
      <Header />
      <Content>
        <HeadContent>
          <Title>
            Finanzas{" "}
            <span>
              {" "}
              / {router.query.billing === "true" && "Facturacion Boulder"}
              {router.query.expenses === "true" && "Gastos"}
              {router.query.workingHours === "true" && "Horas de trabajo"}
              {router.query.earnings === "true" && "Ingresos"}
            </span>
          </Title>
          {router.query.billing === "true" && <FiltersCaja />}
        </HeadContent>
        {router.query.billing === "true" && <Caja />}
        {router.query.expenses === "true" && <Bills />}
        {router.query.workingHours === "true" && (
          <WorkingHoursProvider>
            <WorkingHours />
          </WorkingHoursProvider>
        )}
        {router.query.earnings === "true" && <Earnings />}
      </Content>
    </MainContainer>
  )
}

export default FinancesView

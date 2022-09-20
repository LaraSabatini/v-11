import React, { useContext, useEffect, useState } from "react"
import getCombos from "services/Partners/GetCombos.service"
import {
  getPaymentByDate,
  getPartnerPayments,
} from "services/Partners/PartnerPayments.service"
import PaymentInterface from "interfaces/partners/PaymentInterface"
import { PaymentsHistory } from "contexts/PaymentsHistory"
import { PartnersContext } from "contexts/Partners"
import DataTable from "components/UI/DataTable"
import Filters from "./Filters"
import columns from "./const/content"
import CardsView from "./CardsView"
import { Section } from "../styles"
import {
  Container,
  TableContainer,
  AmountOfPayments,
  SectionsButtons,
} from "./styles"

interface RowsInterface {
  partner_id: number
  partner_name: string
  combo: number
  time_paid: number
  time_paid_unit: string | number
  clases_paid: number
  payment_method_name: string
  price_paid: number | string
  date: string
}

const PaymentsView = () => {
  const {
    setPaymentsList,
    paymentsList,
    dateSelected,
    amountOfPartnersByDay,
    setAmountOfPartnersByDay,
  } = useContext(PaymentsHistory)
  const { setCombos, timeUnits } = useContext(PartnersContext)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const [rows, setRows] = useState<{
    success: boolean
    message?: {
      icon: string
      content: string
    }
    rows: any[]
  }>()

  const fillData = async () => {
    const combosData = await getCombos()
    setCombos(combosData.data)

    const formatDate =
      dateSelected !== "" && dateSelected.replace("/", "-").replace("/", "-")

    const data =
      dateSelected === ""
        ? await getPartnerPayments(currentPage)
        : await getPaymentByDate(formatDate)
    setPaymentsList(data.data)

    setAmountOfPartnersByDay(dateSelected !== "" && data.data.length)

    const rowsCleaned: RowsInterface[] = []

    data.data.map((item: PaymentInterface) =>
      rowsCleaned.push({
        partner_id: item.partner_id,
        partner_name: `${item.partner_name} ${item.partner_last_name}`,
        combo:
          item.combo !== 0
            ? combosData.data.filter(combo => combo.id === item.combo)[0].name
            : "-",
        time_paid:
          item.time_paid === 0 && item.combo === 0 ? 1 : item.time_paid,
        time_paid_unit:
          item.time_paid_unit === 0 && item.time_paid === 0 && item.combo === 0
            ? "Dia/s"
            : timeUnits.filter(
                timeUnit => timeUnit.id === item.time_paid_unit,
              )[0]?.display_name,
        clases_paid: item.clases_paid,
        payment_method_name: item.payment_method_name,
        price_paid: `$${item.price_paid}`,
        date: item.date,
      }),
    )

    setRows({
      success: true,
      rows: rowsCleaned,
    })
  }

  useEffect(() => {
    fillData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, dateSelected])

  const goNext = () => {
    if (paymentsList.length > 0) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const [sectionSelected, setSectionSelected] = useState<{
    section: string
    id: number
  }>({
    section: "Historico",
    id: 1,
  })

  return (
    <Container>
      <Filters />
      <SectionsButtons>
        <Section
          onClick={() => {
            setSectionSelected({ section: "Historico", id: 1 })
          }}
          selected={sectionSelected.id === 1}
        >
          Tabla / Historico
        </Section>
        <Section
          onClick={() => {
            setSectionSelected({ section: "Cards", id: 2 })
          }}
          selected={sectionSelected.id === 2}
        >
          Cartas / Historico
        </Section>
      </SectionsButtons>
      <AmountOfPayments>
        Cantidad de clientes x dia ({dateSelected}): {amountOfPartnersByDay}
      </AmountOfPayments>
      {sectionSelected.id === 1 && (
        <TableContainer>
          <DataTable
            columns={columns}
            rows={rows}
            height={500}
            totalPages={1}
            onClickNext={goNext}
            onClickBack={goPrev}
            setPage={currentPage}
          />
        </TableContainer>
      )}
      {sectionSelected.id === 2 && <CardsView />}
    </Container>
  )
}

export default PaymentsView

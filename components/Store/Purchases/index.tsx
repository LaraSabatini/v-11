import React, { useContext, useState, useEffect } from "react"
// SERVICES
import { getStorePurchasesByDate } from "services/Store/storePurchases.service"
// DATA STORAGE & TYPES
import { StoreContext } from "contexts/Store"
import HistoryListInterface from "interfaces/store/HistoryList"
// COMPONENTS & STYLING
import HistoryCard from "./HistoryCard"
import { Container, Caja } from "./styles"

const Purchases = () => {
  const { productsList, dateSelected, paymentFilter } = useContext(StoreContext)
  const [historyList, setHistoryList] = useState<HistoryListInterface[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentPage, setCurrentPage] = useState<number>(1)

  const [profitsCash, setProfitsCash] = useState<number>(0)
  const [profitsMP, setProfitsMP] = useState<number>(0)

  const fillData = async () => {
    const data = await getStorePurchasesByDate(dateSelected)
    // let cash = 0
    const filterCash = data.data.filter(
      (pur: HistoryListInterface) => pur.payment_method_id === 1,
    )
    if (filterCash.length > 0) {
      let final = 0
      filterCash.map((pur: HistoryListInterface) => {
        final += pur.profit
        return 0
      })

      setProfitsCash(final)
    }

    const filterMP = data.data.filter(
      (pur: HistoryListInterface) => pur.payment_method_id === 2,
    )
    if (filterMP.length > 0) {
      let final = 0
      filterMP.map((pur: HistoryListInterface) => {
        final += pur.profit
        return 0
      })

      setProfitsMP(final)
    }

    if (paymentFilter === null) {
      setHistoryList(data.data)
    } else {
      const filterData = data.data.filter(
        (pur: HistoryListInterface) => pur.payment_method_id === paymentFilter,
      )
      setHistoryList(filterData)
    }
  }

  useEffect(() => {
    fillData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, dateSelected, paymentFilter])

  return (
    <>
      <Caja>
        <p>
          <span>Caja MP:</span>
          <b> $ {profitsMP}</b>
        </p>
        <p>
          <span>Caja Efectivo:</span>
          <b>$ {profitsCash}</b>
        </p>
      </Caja>
      <Container>
        {historyList.length > 0 &&
          productsList.length > 0 &&
          historyList.map(history => (
            <HistoryCard
              id={history.product_id}
              key={history.id}
              name={history.product_name}
              margin={
                productsList.filter(
                  product => product.id === history.product_id,
                )[0].margin
              }
              cost={
                productsList.filter(
                  product => product.id === history.product_id,
                )[0].cost
              }
              type={
                productsList.filter(
                  product => product.id === history.product_id,
                )[0].category_id
              }
              price={
                productsList.filter(
                  product => product.id === history.product_id,
                )[0].price
              }
              final_sells={history.profit}
              amount={history.amount_of_items}
              payment={history.payment_method_id}
            />
          ))}
      </Container>
    </>
  )
}

export default Purchases

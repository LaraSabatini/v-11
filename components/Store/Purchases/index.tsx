import React, { useContext, useState, useEffect } from "react"
import { getProductPurchases } from "services/Store/productPurchases.service"
import { StoreContext } from "contexts/Store"
import HistoryCard from "./HistoryCard"
import { Container } from "./styles"

const Purchases = () => {
  const { productsList } = useContext(StoreContext)
  const [historyList, setHistoryList] = useState<
    {
      id: number
      month_name: string
      month_id: number
      product_id: number
      product_name: string
      amount_of_sales: number
      profit: number
    }[]
  >([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentPage, setCurrentPage] = useState<number>(1)

  const fillData = async () => {
    const data = await getProductPurchases(currentPage)
    setHistoryList(data.data)
  }

  useEffect(() => {
    fillData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  return (
    <Container>
      {historyList.length &&
        historyList.map(history => (
          <HistoryCard
            key={history.id}
            name={
              productsList.filter(
                product => product.id === history.product_id,
              )[0].name
            }
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
            amount={history.amount_of_sales}
            // month={history.month_name}
          />
        ))}
    </Container>
  )
}

export default Purchases

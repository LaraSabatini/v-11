import React, { useContext } from "react"
// DATA STORAGE & TYPES
import { Finances } from "contexts/Finances"
import ProductsPurchasedByDateInterface from "interfaces/finances/StorePurchases"
import ProductInterface from "interfaces/store/ProductInterface"
// COMPONENTS & STYLING
import HistoryCard from "./ProductCard"
import { FinalProfit } from "../BoulderView/styles"
import { Container, CardsContainer, ProfitsContainer } from "./styles"

const ProductsView = () => {
  const { productsPurchasedByDate, productList } = useContext(Finances)

  const filterProfitsCash = productsPurchasedByDate.filter(
    (purchase: ProductsPurchasedByDateInterface) =>
      purchase.payment_method_id === 1,
  )
  const filterProfitsMP = productsPurchasedByDate.filter(
    (purchase: ProductsPurchasedByDateInterface) =>
      purchase.payment_method_id === 2,
  )

  let profitsCash = 0
  let profitsMP = 0

  filterProfitsCash.map((purchase: ProductsPurchasedByDateInterface) => {
    profitsCash += purchase.profit
    return 0
  })

  filterProfitsMP.map((purchase: ProductsPurchasedByDateInterface) => {
    profitsMP += purchase.profit
    return 0
  })

  return (
    <Container>
      <ProfitsContainer>
        <FinalProfit>
          <p>
            <span>Efectivo:</span> <b>$ {profitsCash}</b>
          </p>
          <p>
            <span>Mercado Pago:</span> <b>$ {profitsMP}</b>
          </p>
        </FinalProfit>
      </ProfitsContainer>
      <CardsContainer>
        {productsPurchasedByDate.length > 0 &&
          productsPurchasedByDate.map(
            (purchase: ProductsPurchasedByDateInterface) => (
              <HistoryCard
                key={purchase.id}
                name={purchase.product_name}
                margin={
                  productList.filter(
                    (product: ProductInterface) =>
                      product.id === purchase.product_id,
                  )[0].margin
                }
                cost={
                  productList.filter(
                    (product: ProductInterface) =>
                      product.id === purchase.product_id,
                  )[0].cost
                }
                amount={purchase.amount_of_items}
                type={
                  productList.filter(
                    (product: ProductInterface) =>
                      product.id === purchase.product_id,
                  )[0].category_id
                }
                price={
                  productList.filter(
                    (product: ProductInterface) =>
                      product.id === purchase.product_id,
                  )[0].price
                }
                final_sells={purchase.profit}
                payment={purchase.payment_method_id}
                id={purchase.product_id}
              />
            ),
          )}
      </CardsContainer>
    </Container>
  )
}

export default ProductsView

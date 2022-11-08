import React, { useContext, useEffect, useState } from "react"
// DATA STORAGE & TYPES
import { Finances } from "contexts/Finances"
import ProductsPurchasedByDateInterface from "interfaces/finances/StorePurchases"
import ProductInterface from "interfaces/store/ProductInterface"
import generalTexts from "strings/general.json"
import setProfitsForProducts from "../helpers/setProfitsForProducts"
// COMPONENTS & STYLING
import HistoryCard from "./ProductCard"
import { FinalProfit } from "../BoulderView/styles"
import { Container, CardsContainer, ProfitsContainer } from "./styles"

function ProductsView() {
  const { productsPurchasedByDate, productList } = useContext(Finances)
  const [profits, setProfits] = useState({
    cash: 0,
    digital: 0,
  })

  useEffect(() => {
    setProfits(setProfitsForProducts(productsPurchasedByDate))
  }, [productsPurchasedByDate])

  return (
    <Container>
      <ProfitsContainer>
        <FinalProfit>
          <p>
            <span>{generalTexts.payments.cash}:</span> <b>$ {profits.cash}</b>
          </p>
          <p>
            <span>{generalTexts.payments.digital}:</span>{" "}
            <b>$ {profits.digital}</b>
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
                brand_id={
                  productList.filter(
                    (product: ProductInterface) =>
                      product.id === purchase.product_id,
                  )[0].brand_id
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

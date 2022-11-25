import React from "react"
import Products from "./Products"
import Receipt from "./Receipt"
import Container from "./styles"

interface BuyPermits {
  permits: {
    create_product: boolean
    create_purchase: boolean
  }
}

function Buy({ permits }: BuyPermits) {
  // eslint-disable-next-line no-console
  console.log("permits", permits)

  return (
    <Container>
      <Products />
      <Receipt canPurchase={permits.create_purchase} />
    </Container>
  )
}

export default Buy

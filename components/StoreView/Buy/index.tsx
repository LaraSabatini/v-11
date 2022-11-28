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
  return (
    <Container>
      <Products />
      <Receipt canPurchase={permits.create_purchase} />
    </Container>
  )
}

export default Buy

import React, { useState, useContext, useEffect } from "react"
// DATA STORAGE & TYPES
import { StoreContext } from "contexts/Store"
// COMPONENTS & STYLING
import Icon from "components/UI/Assets/Icon"
import Tooltip from "components/UI/Tooltip"
import Magnesiera from "components/UI/Assets/images/Magnesiera"
import Zapas from "components/UI/Assets/images/Zapas"
import {
  ProductCard,
  ProductName,
  Description,
  ProductPrice,
  IconContainer,
  Amount,
  ComponentContainer,
  ComponentContainerZapas,
} from "./styles"

interface ProductCardInterface {
  name: string
  category_id: number
  price: number
  id: number
  cost: number
  margin: number
}

const Product = ({
  name,
  category_id,
  price,
  id,
  cost,
  margin,
}: ProductCardInterface) => {
  const {
    setPurchase,
    purchase,
    purchaseChange,
    setPurchaseChange,
    executeCleanPurchase,
  } = useContext(StoreContext)

  const [purchaseProducts, setPurchaseProducts] = useState<{
    product_id: number
    product_name: string
    product_amount: number
    final_price: number
    cost: number
    margin: number
  }>({
    product_id: 0,
    product_name: "",
    product_amount: 0,
    final_price: 0,
    cost: 0,
    margin: 0,
  })
  const [buttonAddDisabled, setButtonAddDisabled] = useState<boolean>(false)

  const removeProduct = () => {
    const checkPurchase = purchase.filter(
      (pur: {
        product_id: number
        product_name: string
        product_amount: number
        final_price: number
        cost: number
        margin: number
      }) => pur.product_id === id,
    )
    if (checkPurchase.length > 0) {
      setPurchaseProducts({
        product_id: id,
        product_name: name,
        product_amount: purchaseProducts.product_amount - 1,
        final_price: price * (purchaseProducts.product_amount - 1),
        cost,
        margin,
      })
      const index = purchase.indexOf(checkPurchase[0])
      const newPurchase = purchase
      newPurchase[index] = {
        product_id: id,
        product_name: name,
        product_amount: purchaseProducts.product_amount - 1,
        final_price: price * (purchaseProducts.product_amount - 1),
        cost,
        margin,
      }
      if (newPurchase[index].product_amount === 0) {
        const finalPurchase = purchase.filter(p => p.product_id !== id)
        setPurchase(finalPurchase)
      } else {
        setPurchase(newPurchase)
      }

      setPurchaseChange(purchaseChange + 1)
    }
  }

  const addProduct = () => {
    setPurchaseProducts({
      product_id: id,
      product_name: name,
      product_amount: purchaseProducts.product_amount + 1,
      final_price: price * (purchaseProducts.product_amount + 1),
      cost,
      margin,
    })

    const checkPurchase = purchase.filter(
      (pur: {
        product_id: number
        product_name: string
        product_amount: number
        final_price: number
        cost: number
        margin: number
      }) => pur.product_id === id,
    )
    if (checkPurchase.length === 0) {
      setPurchase([
        ...purchase,
        {
          product_id: id,
          product_name: name,
          product_amount: purchaseProducts.product_amount + 1,
          final_price: price * (purchaseProducts.product_amount + 1),
          cost,
          margin,
        },
      ])
      setPurchaseChange(purchaseChange + 1)
    } else {
      const index = purchase.indexOf(checkPurchase[0])

      const newPurchase = purchase
      newPurchase[index] = {
        product_id: id,
        product_name: name,
        product_amount: purchaseProducts.product_amount + 1,
        final_price: price * (purchaseProducts.product_amount + 1),
        cost,
        margin,
      }
      setPurchase(newPurchase)
      setPurchaseChange(purchaseChange + 1)
    }
  }

  useEffect(() => {
    if (executeCleanPurchase > 1) {
      setPurchaseProducts({
        product_id: 0,
        product_name: "",
        product_amount: 0,
        final_price: 0,
        cost: 0,
        margin: 0,
      })
      setButtonAddDisabled(false)
    }
  }, [executeCleanPurchase])

  const checkButtonDisabled = () => {
    const purHasCashPass = purchase.filter(
      (product: {
        product_id: number
        product_name: string
        product_amount: number
        final_price: number
      }) => product.product_id === 12,
    )
    const purHasMPPass = purchase.filter(
      (product: {
        product_id: number
        product_name: string
        product_amount: number
        final_price: number
      }) => product.product_id === 13,
    )
    if (purHasCashPass.length > 0 && id === 13) {
      setButtonAddDisabled(true)
    } else if (purHasMPPass.length > 0 && id === 12) {
      setButtonAddDisabled(true)
    } else {
      setButtonAddDisabled(false)
      addProduct()
    }
  }

  return (
    <ProductCard>
      {category_id === 1 && (
        <img className="zapas" src="/beer.png" alt="beer" />
      )}
      {category_id === 4 && (
        <img className="monster" src="/monster.webp" alt="beer" />
      )}
      {category_id === 5 && (
        <img className="calendar" src="/calendar.png" alt="beer" />
      )}
      {category_id === 2 && (
        <ComponentContainer>
          <Magnesiera />
        </ComponentContainer>
      )}
      {category_id === 3 && (
        <ComponentContainerZapas>
          <Zapas />
        </ComponentContainerZapas>
      )}
      {/* merch */}
      <Description>
        <ProductName>{name}</ProductName>
        <ProductPrice>$ {price}</ProductPrice>
        <IconContainer>
          <button type="button" onClick={removeProduct}>
            <Icon icon="IconLess" />
          </button>
          <Amount>{purchaseProducts.product_amount}</Amount>
          {buttonAddDisabled ? (
            <Tooltip title="Deshabilitado">
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                onClick={() => {
                  checkButtonDisabled()
                }}
              >
                <Icon icon="IconAdd" />
              </button>
            </Tooltip>
          ) : (
            <button
              type="button"
              onClick={() => {
                checkButtonDisabled()
              }}
            >
              <Icon icon="IconAdd" />
            </button>
          )}
        </IconContainer>
      </Description>
    </ProductCard>
  )
}

export default Product

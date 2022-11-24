import React, { useState, useContext, useEffect } from "react"
import ProductInterface from "interfaces/store/ProductInterface"
import PurchaseProductsInterface from "interfaces/store/PurchaseProducts"
import { StoreContext } from "contexts/Store"
import storeTexts from "strings/store.json"
import Icon from "components/UI/Assets/Icon"
import Tooltip from "components/UI/Tooltip"
import Magnesiera from "components/UI/Assets/images/Magnesiera"
import Zapas from "components/UI/Assets/images/Zapas"
import {
  Card,
  ComponentContainer,
  ComponentContainerZapas,
  Description,
  ProductName,
  ProductPrice,
  IconContainer,
  Amount,
} from "./styles"

interface ProductCardInterface {
  data: ProductInterface
}

function ProductCard({ data }: ProductCardInterface) {
  const {
    setPurchase,
    purchase,
    purchaseChange,
    setPurchaseChange,
    executeCleanPurchase,
  } = useContext(StoreContext)

  const [
    purchaseProducts,
    setPurchaseProducts,
  ] = useState<PurchaseProductsInterface>({
    product_id: 0,
    product_name: "",
    product_amount: 0,
    final_price: 0,
    cost: 0,
    margin: 0,
  })

  const [buttonAddDisabled, setButtonAddDisabled] = useState<boolean>(false)

  const typeIsDrink = data.category_id === 1

  const isShoes =
    typeIsDrink &&
    data.brand_id !== 12 &&
    data.brand_id !== 11 &&
    data.brand_id !== 14

  const addProduct = () => {
    setPurchaseProducts({
      product_id: data.id,
      product_name: data.name,
      product_amount: purchaseProducts.product_amount + 1,
      final_price: data.price * (purchaseProducts.product_amount + 1),
      cost: data.cost,
      margin: data.margin,
    })

    const checkPurchase = purchase.filter(
      (pur: PurchaseProductsInterface) => pur.product_id === data.id,
    )
    if (checkPurchase.length === 0) {
      setPurchase([
        ...purchase,
        {
          product_id: data.id,
          product_name: data.name,
          product_amount: purchaseProducts.product_amount + 1,
          final_price: data.price * (purchaseProducts.product_amount + 1),
          cost: data.cost,
          margin: data.margin,
        },
      ])
      setPurchaseChange(purchaseChange + 1)
    } else {
      const index = purchase.indexOf(checkPurchase[0])

      const newPurchase = purchase
      newPurchase[index] = {
        product_id: data.id,
        product_name: data.name,
        product_amount: purchaseProducts.product_amount + 1,
        final_price: data.price * (purchaseProducts.product_amount + 1),
        cost: data.cost,
        margin: data.margin,
      }
      setPurchase(newPurchase)
      setPurchaseChange(purchaseChange + 1)
    }
  }

  const checkButtonDisabled = () => {
    const purHasCashPass = purchase.filter(
      (product: PurchaseProductsInterface) => product.product_id === 1,
    )
    const purHasMPPass = purchase.filter(
      (product: PurchaseProductsInterface) => product.product_id === 2,
    )
    if (purHasCashPass.length > 0 && data.id === 2) {
      setButtonAddDisabled(true)
    } else if (purHasMPPass.length > 0 && data.id === 1) {
      setButtonAddDisabled(true)
    } else {
      setButtonAddDisabled(false)
      if (data.stock === 0) {
        setButtonAddDisabled(true)
      } else {
        addProduct()
      }
    }
  }

  const removeProduct = () => {
    const checkPurchase = purchase.filter(
      (pur: PurchaseProductsInterface) => pur.product_id === data.id,
    )
    if (checkPurchase.length > 0) {
      setPurchaseProducts({
        product_id: data.id,
        product_name: data.name,
        product_amount: purchaseProducts.product_amount - 1,
        final_price: data.price * (purchaseProducts.product_amount - 1),
        cost: data.cost,
        margin: data.margin,
      })
      const index = purchase.indexOf(checkPurchase[0])
      const newPurchase = purchase
      newPurchase[index] = {
        product_id: data.id,
        product_name: data.name,
        product_amount: purchaseProducts.product_amount - 1,
        final_price: data.price * (purchaseProducts.product_amount - 1),
        cost: data.cost,
        margin: data.margin,
      }
      if (newPurchase[index].product_amount === 0) {
        const finalPurchase = purchase.filter(
          (pur: PurchaseProductsInterface) => pur.product_id !== data.id,
        )
        setPurchase(finalPurchase)
      } else {
        setPurchase(newPurchase)
      }

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

  return (
    <Card stock={data.stock === 0}>
      {isShoes && <img className="zapas" src="/beer.png" alt="beer" />}
      {data.category_id === 4 && (
        <img className="monster" src="/monster.webp" alt="beer" />
      )}
      {data.category_id === 5 && (
        <img className="calendar" src="/calendar.png" alt="beer" />
      )}
      {data.category_id === 2 && (
        <ComponentContainer>
          <Magnesiera />
        </ComponentContainer>
      )}
      {data.category_id === 3 && (
        <ComponentContainerZapas>
          <Zapas />
        </ComponentContainerZapas>
      )}
      {typeIsDrink && data.brand_id === 12 && (
        <img className="coca" src="/coca.png" alt="beer" />
      )}
      {typeIsDrink && data.brand_id === 14 && (
        <img className="sprite" src="/sprite.png" alt="beer" />
      )}
      {typeIsDrink && data.brand_id === 11 && (
        <img className="powerade" src="/powerade.png" alt="beer" />
      )}
      <Description>
        <ProductName>{data.name}</ProductName>
        <ProductPrice>$ {data.price}</ProductPrice>
        <IconContainer>
          <button type="button" onClick={removeProduct}>
            <Icon icon="IconLess" />
          </button>
          <Amount>{purchaseProducts.product_amount}</Amount>
          {buttonAddDisabled ? (
            <Tooltip title={storeTexts.purchase.disabled}>
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
    </Card>
  )
}

export default ProductCard

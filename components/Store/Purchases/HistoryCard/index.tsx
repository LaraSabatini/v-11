import React from "react"
import Magnesiera from "components/UI/Assets/images/Magnesiera"
import Zapas from "components/UI/Assets/images/Zapas"
import { ComponentContainerZapas } from "../../Store/Product/styles"
import {
  Card,
  ComponentContainer,
  Description,
  HorizontalGroup,
} from "./styles"

interface HistoryCardInterface {
  name: string
  margin: number
  cost: number
  final_sells: number
  amount: number
  // month: string
  type: number
  price: number
}

const HistoryCard = ({
  name,
  margin,
  cost,
  final_sells,
  amount,
  // month,
  type,
  price,
}: HistoryCardInterface) => {
  return (
    <Card>
      {type === 1 && <img src="/beer.png" alt="beer" />}
      {type === 2 && (
        <ComponentContainer>
          <Magnesiera />
        </ComponentContainer>
      )}
      {type === 3 && (
        <ComponentContainerZapas>
          <Zapas />
        </ComponentContainerZapas>
      )}
      <Description>
        <p className="name">{name}</p>
        <p className="profits">
          Ganancias:
          <span>
            ${final_sells} <p>({margin}%)</p>
          </span>
        </p>
        <HorizontalGroup>
          <p className="cost">
            Precio:
            <span>${price}</span>
          </p>
          <p className="cost">
            Costo:
            <span>${cost}</span>
          </p>
          <p className="cost">
            Ventas:
            <span>{amount}u</span>
          </p>
        </HorizontalGroup>
      </Description>
    </Card>
  )
}

export default HistoryCard

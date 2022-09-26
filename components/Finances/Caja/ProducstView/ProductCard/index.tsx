import React from "react"
import Magnesiera from "components/UI/Assets/images/Magnesiera"
import Zapas from "components/UI/Assets/images/Zapas"
import {
  Card,
  ComponentContainer,
  Description,
  HorizontalGroup,
  ComponentContainerZapas,
} from "./styles"

interface HistoryCardInterface {
  name: string
  margin: number
  cost: number
  final_sells: number
  amount: number
  type: number
  price: number
  payment: number
  id: number
}

const HistoryCard = ({
  name,
  margin,
  cost,
  final_sells,
  amount,
  type,
  price,
  payment,
  id,
}: HistoryCardInterface) => {
  const finalProfit = final_sells - cost * amount

  return (
    <>
      {id !== 1 && id !== 2 && id !== 3 && (
        <Card>
          {type === 1 && <img className="zapas" src="/beer.png" alt="beer" />}
          {type === 4 && (
            <img className="monster" src="/monster.webp" alt="beer" />
          )}
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
            <p className="name">
              {name} {payment === 1 ? "(FT)" : "(MP)"}
            </p>
            <p className="profits">
              Ganancias:
              <span>
                ${finalProfit} <p>({margin}%)</p>
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
      )}
    </>
  )
}

export default HistoryCard

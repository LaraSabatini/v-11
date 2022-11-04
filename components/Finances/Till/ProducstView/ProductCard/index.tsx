import React from "react"
// DATA STORAGE & TYPES
import HistoryCardInterface from "interfaces/finances/HistoryCard"
import financesTexts from "strings/finances.json"
import generalTexts from "strings/general.json"
// COMPONENTS & STYLING
import Magnesiera from "components/UI/Assets/images/Magnesiera"
import Zapas from "components/UI/Assets/images/Zapas"
import cleanMargin from "utils/cleanMargin"
import cleanProfit from "../../helpers/cleanProfit"
import {
  Card,
  ComponentContainer,
  Description,
  HorizontalGroup,
  ComponentContainerZapas,
} from "./styles"

function HistoryCard({
  name,
  margin,
  cost,
  final_sells,
  amount,
  type,
  brand_id,
  price,
  payment,
  id,
}: HistoryCardInterface) {
  return (
    <div>
      {id !== 1 && id !== 2 && id !== 3 && (
        <Card>
          {type === 1 && brand_id !== 12 && brand_id !== 11 && (
            <img className="zapas" src="/beer.png" alt="beer" />
          )}
          {type === 4 && (
            <img className="monster" src="/monster.webp" alt="beer" />
          )}
          {type === 5 && (
            <img className="calendar" src="/calendar.png" alt="beer" />
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
          {type === 1 && brand_id === 12 && (
            <img className="coca" src="/coca.png" alt="beer" />
          )}
          {type === 1 && brand_id === 11 && (
            <img className="powerade" src="/powerade.png" alt="beer" />
          )}
          <Description>
            <p className="name">
              {name} {payment === 1 ? "(FT)" : "(MP)"}
            </p>
            <p className="profits">
              {financesTexts.profits}:
              <span>
                ${cleanProfit(final_sells - cost * amount)}{" "}
                <p>(${cleanMargin(`${margin}`.split("."))})</p>
              </span>
            </p>
            <HorizontalGroup>
              <p className="cost">
                {generalTexts.payments.price}:<span>${price}</span>
              </p>
              <p className="cost">
                {generalTexts.payments.cost}:<span>${cost}</span>
              </p>
              <p className="cost">
                {financesTexts.sells}:<span>{amount}u</span>
              </p>
            </HorizontalGroup>
          </Description>
        </Card>
      )}
    </div>
  )
}

export default HistoryCard

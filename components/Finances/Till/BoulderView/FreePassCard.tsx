import React from "react"
import financesTexts from "strings/finances.json"
import generalTexts from "strings/general.json"
import { Card, Title, Earnings } from "./styles"

interface FreePassCardInterface {
  earningsCash: number
  earningsDigital: number
  amountOfSells: number
  byStore: number
  byClient: number
  packFour: number
  packEight: number
  people: number
}

function FreePassCard({
  earningsCash,
  earningsDigital,
  amountOfSells,
  byStore,
  byClient,
  packFour,
  packEight,
  people,
}: FreePassCardInterface) {
  return (
    <Card>
      <Title className="pass">{financesTexts.day_pass.toUpperCase()}</Title>
      <Earnings>
        <p>
          {generalTexts.payments.cash}: <b>$ {earningsCash}</b>
        </p>
        <p>
          {generalTexts.payments.digital}: <b>$ {earningsDigital}</b>
        </p>
      </Earnings>

      <Earnings>
        <p>
          {financesTexts.sold_pases}: <b>{amountOfSells}</b>
        </p>
      </Earnings>

      <Earnings>
        <p>
          • {financesTexts.through_store}: <b>{byStore}</b>
        </p>
        <p>
          • {financesTexts.through_clients}: <b>{byClient}</b>
        </p>
      </Earnings>
      <Earnings>
        <p>
          • Pack x 4: <b>{packFour}</b>
        </p>
      </Earnings>
      <Earnings>
        <p>
          • Pack x 8: <b>{packEight}</b>
        </p>
      </Earnings>
      <Earnings>
        <p className="asistencies">
          Asistencias totales: <b>{people}</b>
        </p>
      </Earnings>
    </Card>
  )
}

export default FreePassCard

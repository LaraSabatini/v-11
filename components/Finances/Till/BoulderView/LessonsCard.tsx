import React from "react"
import financesTexts from "strings/finances.json"
import generalTexts from "strings/general.json"
import { Card, Title, Earnings } from "./styles"

interface LessonsCardInterface {
  earningsCash: number
  earningsDigital: number
  amountOfSells: number
  packs: number[]
  nonPacks: number
}

function LessonsCard({
  earningsCash,
  earningsDigital,
  amountOfSells,
  packs,
  nonPacks,
}: LessonsCardInterface) {
  return (
    <Card>
      <Title className="lessons">{financesTexts.lessons.toUpperCase()}</Title>
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
          {financesTexts.sells}: <b>{amountOfSells}</b>
        </p>
      </Earnings>

      <Earnings>
        <p>
          • Pack x 4: <b>{packs[0]}</b>
        </p>
        <p>
          • Pack x 8: <b>{packs[1]}</b>
        </p>
      </Earnings>
      <Earnings>
        <p>
          Individuales: <b>{nonPacks}</b>
        </p>
      </Earnings>
    </Card>
  )
}

export default LessonsCard
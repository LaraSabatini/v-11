import React from "react"
// DATA STORAGE & TYPES
import financesTexts from "strings/finances.json"
import generalTexts from "strings/general.json"
// COMPONENTS & STYLING
import FreePassCard from "./FreePassCard"
import LessonsCard from "./LessonsCard"
import {
  Container,
  FinalProfit,
  Card,
  CardsContainer,
  Title,
  Earnings,
} from "./styles"

interface BoulderViewInterface {
  data: any
}

function BoulderView({ data }: BoulderViewInterface) {
  return (
    <Container>
      <FinalProfit>
        <p>
          <span>{generalTexts.payments.cash}:</span> <b>$ {data.cash}</b>
        </p>
        <p>
          <span>{generalTexts.payments.digital}:</span> <b>$ {data.mp}</b>
        </p>
      </FinalProfit>
      <CardsContainer>
        <FreePassCard
          earningsCash={data.freePass.earnings.cash}
          earningsDigital={data.freePass.earnings.cash}
          amountOfSells={data.freePass.total}
          byStore={data.freePass.individual}
          byClient={data.freePass.packFour * 4 + data.freePass.packEight * 8}
          packFour={data.freePass.packFour}
          packEight={data.freePass.packEight}
          people={data.freePass.amountOfPeople}
        />
        <LessonsCard
          earningsCash={data.lessons.earnings.cash}
          earningsDigital={data.lessons.earnings.mp}
          amountOfSells={data.lessons.total}
          packFour={data.lessons.packFour}
          packEight={data.lessons.packEight}
          nonPacks={data.lessons.individual}
        />

        <Card>
          <Title className="month">{financesTexts.month.toUpperCase()}</Title>
          <Earnings>
            <p>
              {generalTexts.payments.cash}: <b>$ {data.month.earnings.cash}</b>
            </p>
            <p>
              {generalTexts.payments.digital}: <b>$ {data.month.earnings.mp}</b>
            </p>
          </Earnings>
          <Earnings>
            <p>
              {financesTexts.sells}: <b>{data.month.total}</b>
            </p>
          </Earnings>
        </Card>
        <Card>
          <Title className="combo">{financesTexts.combo.toUpperCase()}</Title>
          <Earnings>
            <p>
              {generalTexts.payments.cash}: <b>$ {data.combo.earnings.cash}</b>
            </p>
            <p>
              {generalTexts.payments.digital}: <b>$ {data.combo.earnings.mp}</b>
            </p>
          </Earnings>
          <Earnings>
            <p>
              {financesTexts.sells}: <b>{data.combo.total}</b>
            </p>
          </Earnings>
        </Card>
        <Card>
          <Title className="shoes">{financesTexts.shoes.toUpperCase()}</Title>
          <Earnings>
            <p>
              {generalTexts.payments.cash}: <b>$ {data.shoes.earnings.cash}</b>
            </p>
            <p>
              {generalTexts.payments.digital}: <b>$ {data.shoes.earnings.mp}</b>
            </p>
          </Earnings>
          <Earnings>
            <p className="asistencies">
              {financesTexts.units_lend}: <b>{data.shoes.total}</b>
            </p>
          </Earnings>
        </Card>
      </CardsContainer>
    </Container>
  )
}

export default BoulderView

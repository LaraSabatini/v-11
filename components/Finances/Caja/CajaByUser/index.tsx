/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect } from "react"
// SERVICES
import { searchByDate } from "services/Finances/DigitalPayments.service"
// DATA STORAGE & TYPES
import { Finances } from "contexts/Finances"
import { paymentUsers } from "const/fixedVariables"
import DefaultInterface from "interfaces/components/DefaultInterface"
// COMPONENTS & STYLING
import { MainContainer, CardContainer, Card, User } from "./styles"

const CajaByUser = () => {
  const {
    digitalPaymentsList,
    setDigitalPaymentsList,
    cajaDateSelected,
  } = useContext(Finances)

  const getDigitalPayments = async () => {
    const digitalPaymentByDateCall = await searchByDate(cajaDateSelected)

    setDigitalPaymentsList(digitalPaymentByDateCall.data)
  }

  useEffect(() => {
    getDigitalPayments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cajaDateSelected])

  /*
   federico
   guillermo
   joaco
   roman
   tobias
  */

  return (
    <MainContainer>
      <CardContainer>
        {paymentUsers.map((user: DefaultInterface) => (
          <Card key={user.id}>
            <User>
              {user.display_name}
              <span>
                {digitalPaymentsList.length > 0 &&
                digitalPaymentsList.filter(h => h.user_id === user.id).length >
                  0
                  ? `$ ${
                      digitalPaymentsList.filter(h => h.user_id === user.id)[0]
                        .total_profit
                    }`
                  : "$ 0"}
              </span>
            </User>
          </Card>
        ))}
      </CardContainer>
    </MainContainer>
  )
}

export default CajaByUser

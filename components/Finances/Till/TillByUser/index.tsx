/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect } from "react"
// DATA STORAGE & TYPES
import { Finances } from "contexts/Finances"
import { paymentUsers } from "const/finances"
import DefaultInterface from "interfaces/components/DefaultInterface"
import MPUserPayment from "interfaces/finances/MPUserPayments"
// COMPONENTS & STYLING
import { MainContainer, CardContainer, Card, User } from "./styles"

function TillByUser() {
  const { digitalPaymentsList } = useContext(Finances)

  return (
    <MainContainer>
      <CardContainer>
        {paymentUsers.map((user: DefaultInterface) => (
          <Card key={user.id}>
            <User>
              {user.display_name}
              <span>
                {digitalPaymentsList.length > 0 &&
                digitalPaymentsList.filter(
                  (digitalPayment: MPUserPayment) =>
                    digitalPayment.user_id === user.id,
                ).length > 0
                  ? `$ ${
                      digitalPaymentsList.filter(
                        (digitalPayment: MPUserPayment) =>
                          digitalPayment.user_id === user.id,
                      )[0].total_profit
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

export default TillByUser

import React, { useEffect, useContext, useState } from "react"
import { GeneralContext } from "contexts/GeneralContext"
import { editPricesAction } from "helpers/partners"
import PricesInterface from "interfaces/partners/PricesInterface"
import generalTexts from "strings/general.json"
import TextButton from "components/UI/TextButton"
import ScrollView from "components/UI/ScrollView"
import {
  Container,
  Form,
  Title,
  Head,
  Items,
  Item,
  ButtonContainer,
  InputContainer,
} from "./styles"

interface ActionsInterface {
  canEdit: boolean
}

function Prices({ canEdit }: ActionsInterface) {
  const { prices, setTriggerPricesUpdate, triggerPricesUpdate } = useContext(
    GeneralContext,
  )

  const [newPrices, setNewPrices] = useState<PricesInterface>(null)
  const [activeRow, setActiveRow] = useState<number>(null)

  const cancelChanges = () => {
    setActiveRow(null)
    setNewPrices(null)
  }

  const saveChanges = async () => {
    const editData = await editPricesAction(newPrices)

    if (editData.status === 200) {
      setTriggerPricesUpdate(triggerPricesUpdate + 1)
      cancelChanges()
    }
  }

  const fillInputs = () => {
    const pricesObj = prices.filter(price => price.id === activeRow)
    setNewPrices(pricesObj[0])
  }

  useEffect(() => {
    if (activeRow !== null) {
      fillInputs()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeRow])

  return (
    <Container>
      <Form>
        <Head>
          <Title>Item</Title>
          <Title>Precio Efectivo</Title>
          <Title>Precio MP</Title>
        </Head>
        <Items>
          <ScrollView height={320}>
            {prices.length &&
              prices.map((price: PricesInterface) => (
                <Item
                  key={price.id}
                  onClick={() => {
                    if (canEdit) {
                      setActiveRow(price.id)
                    } else {
                      setActiveRow(null)
                    }
                  }}
                >
                  <p className="name">{price.name}</p>
                  {activeRow !== null &&
                  activeRow === price.id &&
                  newPrices !== null ? (
                    <>
                      <InputContainer>
                        <input
                          type="number"
                          value={newPrices.price_cash || ""}
                          onChange={e =>
                            setNewPrices({
                              ...newPrices,
                              price_cash: parseInt(e.target.value, 10),
                            })
                          }
                        />
                      </InputContainer>
                      <InputContainer>
                        <input
                          type="number"
                          value={newPrices.price_mp || ""}
                          onChange={e =>
                            setNewPrices({
                              ...newPrices,
                              price_mp: parseInt(e.target.value, 10),
                            })
                          }
                        />
                      </InputContainer>
                    </>
                  ) : (
                    <>
                      <p>${price.price_cash}</p>
                      <p>${price.price_mp}</p>
                    </>
                  )}
                </Item>
              ))}
          </ScrollView>
        </Items>
      </Form>
      <ButtonContainer>
        <TextButton
          disabled={activeRow === null}
          onClick={cancelChanges}
          content={generalTexts.actions.cancel}
        />
        <TextButton
          disabled={activeRow === null}
          onClick={saveChanges}
          content={generalTexts.actions.save}
          cta
        />
      </ButtonContainer>
    </Container>
  )
}

export default Prices

import React, { useEffect, useContext, useState } from "react"
// SERVICES
import { getPrices, editPrices } from "services/Partners/Prices.service"
// DATA STORAGE & TYPES
import { PartnersContext } from "contexts/Partners"
// COMPONENTS & STYLING
import TextButton from "components/UI/TextButton"
import {
  Container,
  Form,
  Title,
  Head,
  DividerOne,
  DividerTwo,
  Items,
  Item,
  ButtonContainer,
  InputContainer,
} from "./styles"

const Prices = () => {
  const { setPrices, prices } = useContext(PartnersContext)
  const [newPrices, setNewPrices] = useState<{
    id: number
    name: string
    price_cash: number
    price_mp: number
  }>(null)

  const [activeRow, setActiveRow] = useState<number>(null)
  const [triggerListUpdate, setTriggerListUpdate] = useState<number>(1)

  const fillPrices = async () => {
    const pricesData = await getPrices()
    setPrices(pricesData.data)
  }

  useEffect(() => {
    fillPrices()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerListUpdate])

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

  const cancelChanges = () => {
    setActiveRow(null)
    setNewPrices(null)
  }

  const saveChanges = async () => {
    const editData = await editPrices(newPrices)

    if (editData.message === "price updated successfully") {
      setTriggerListUpdate(triggerListUpdate + 1)
      setActiveRow(null)
      setNewPrices(null)
    }
  }

  return (
    <Container>
      <Form>
        <Head>
          <DividerOne />
          <DividerTwo />
          <Title>Item</Title>
          <Title>Precio Efectivo</Title>
          <Title>Precio MP</Title>
        </Head>
        <Items>
          {prices.length &&
            prices.map(price => (
              <Item key={price.id} onClick={() => setActiveRow(price.id)}>
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
        </Items>
        <ButtonContainer>
          <TextButton
            disabled={activeRow === null}
            onClick={cancelChanges}
            content="cancelar"
          />
          <TextButton
            disabled={activeRow === null}
            onClick={saveChanges}
            content="guardar"
            cta
          />
        </ButtonContainer>
      </Form>
    </Container>
  )
}

export default Prices

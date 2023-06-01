import React, { useState, useEffect } from "react"
import { LessonTypesInterface } from "interfaces/lessons/Calendar"
import { getLessonTypes } from "services/Trainers/agenda.service"
import TextButton from "components/UI/TextButton"
import CreateForm from "./CreateForm"
import EditForm from "./EditForm"
import { Container, Table, Item, Section } from "./styles"

function Prices() {
  const [prices, setPrices] = useState<LessonTypesInterface[]>([])
  const [priceSelected, setPriceSelected] = useState<LessonTypesInterface>(null)

  const [modalCreate, setModalCreate] = useState<boolean>(false)
  const [modalEdit, setModalEdit] = useState<boolean>(false)
  const [updateList, setUpdateList] = useState<number>(0)

  const getLessonTypesCall = async () => {
    const req = await getLessonTypes()
    setPrices(req.data)
  }

  useEffect(() => {
    getLessonTypesCall()
  }, [updateList])

  return (
    <Section>
      {modalCreate && (
        <CreateForm
          close={() => {
            setModalCreate(false)
            setUpdateList(updateList + 1)
          }}
        />
      )}
      {modalEdit && (
        <EditForm
          lesson={priceSelected}
          close={() => {
            setModalEdit(false)
            setUpdateList(updateList + 1)
          }}
        />
      )}

      <Container>
        <Table>
          <div className="table-header">
            <div className="column-title">Clase</div>
            <div className="column-quota">Cupo</div>
            <div className="column-title">Unitario</div>
            <div className="column-title">4 Clases</div>
            <div className="column-title">8 Clases</div>
            <div className="color" />
          </div>
          <div className="table-content">
            {prices.length &&
              prices.map(price => (
                <Item
                  key={price.id}
                  onClick={() => {
                    if (
                      priceSelected?.id !== price.id ||
                      priceSelected === null
                    ) {
                      setPriceSelected(price)
                    } else {
                      setPriceSelected(null)
                    }
                  }}
                  selected={priceSelected?.id === price.id}
                >
                  <p>{price.name}</p>
                  <p className="column-quota">{price.quota}</p>
                  <p>
                    ${price.unit_price_cash} / ${price.unit_price_mp}
                  </p>
                  <p>
                    ${price.four_price_cash} / ${price.four_price_mp}
                  </p>
                  <p>
                    ${price.eight_price_cash} / ${price.eight_price_mp}
                  </p>
                  <div
                    className="color-sample"
                    style={{ backgroundColor: `${price.color}` }}
                  />
                </Item>
              ))}
          </div>
        </Table>
      </Container>
      <div className="buttons">
        {priceSelected !== null && (
          <TextButton content="Editar" onClick={() => setModalEdit(true)} />
        )}
        <TextButton
          cta
          content="Crear tipo de clase"
          onClick={() => setModalCreate(true)}
        />
      </div>
    </Section>
  )
}

export default Prices

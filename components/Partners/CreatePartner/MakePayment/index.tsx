import React, { useContext, useState, useEffect } from "react"
import getTrainers from "services/Trainers/GetTrainers.service"
import { PartnersContext } from "contexts/Partners"
import Autocomplete from "components/UI/Autocomplete"
import TextField from "components/UI/TextField"
import Checkbox from "components/UI/Checkbox"
import { HorizontalGroup, SubContainer, CheckboxContainer } from "../styles"
import { Form } from "./styles"

const MakePayment = () => {
  const {
    timeUnits,
    newPartnerData,
    setNewPartnerData,
    paidTimeUnitRef,
    paidTimeRef,
    trainertRef,
    comboRef,
    clasesRef,
    paymentRef,
    setPaidTime,
    setPaidTimeUnit,
    combos,
    paymentMethods,
    setComboSelected,
    setAmountOfClases,
    isChecked,
    setIsChecked,
  } = useContext(PartnersContext)

  const [trainers, setTrainers] = useState<
    { id: number; display_name: string }[]
  >([])

  const fillTrainersData = async () => {
    const data = await getTrainers()
    const arrayTrainers = []
    data.data.map(trainer =>
      arrayTrainers.push({
        id: trainer.id,
        display_name: `${trainer.name} ${trainer.last_name}`,
      }),
    )

    setTrainers(arrayTrainers)
  }

  useEffect(() => {
    fillTrainersData()
    //   eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Form>
      <HorizontalGroup>
        <Autocomplete
          label="Combo"
          width={180}
          options={combos}
          ref={comboRef}
          onChangeProps={(e: { id: number; display_name: string }) => {
            setComboSelected(e.id)
          }}
        />
        <TextField
          label="Precio x Combo"
          type="number"
          disabledAutocompleted
          disabled
          width={100}
          //   SETEAR PRECIO POR LISTA DE COMBOS
          // ver lista de compras => filtrar y setear precio
        />
      </HorizontalGroup>
      <HorizontalGroup>
        <SubContainer>
          <TextField
            required
            width={60}
            label="Tiempo"
            type="number"
            reference={paidTimeRef}
            onChange={e => setPaidTime(parseInt(e.target.value, 10))}
          />
          <Autocomplete
            required
            label="Unidad"
            width={115}
            options={timeUnits}
            ref={paidTimeUnitRef}
            onChangeProps={(e: { id: number; display_name: string }) => {
              setPaidTimeUnit(e)
              if (e.id !== 1) {
                setIsChecked(true)
              } else {
                setIsChecked(false)
              }
            }}
          />
        </SubContainer>
        <TextField
          required
          width={100}
          label="Clases"
          type="number"
          reference={clasesRef}
          onChange={e => setAmountOfClases(parseInt(e.target.value, 10))}
        />
      </HorizontalGroup>
      <HorizontalGroup>
        <Autocomplete
          label="Profesor"
          width={290}
          options={trainers}
          ref={trainertRef}
          onChangeProps={(e: { id: number; display_name: string }) =>
            setNewPartnerData({
              ...newPartnerData,
              trainer_id: e.id,
            })
          }
        />
      </HorizontalGroup>
      <HorizontalGroup>
        <Autocomplete
          required
          label="Metodo de pago"
          width={150}
          options={paymentMethods}
          ref={paymentRef}
          onChangeProps={(e: { id: number; display_name: string }) =>
            setNewPartnerData({
              ...newPartnerData,
              trainer_id: e.id,
            })
          }
        />
        <TextField
          label="Precio final"
          type="number"
          disabledAutocompleted
          disabled
          width={130}
          // ACA SET VALOR
        />
      </HorizontalGroup>
      <CheckboxContainer>
        <Checkbox
          checked={isChecked || newPartnerData.trainer_id !== null}
          isDisabled
          idParam="free-pass"
        />
        <p>Pase libre</p>
      </CheckboxContainer>
    </Form>
  )
}

export default MakePayment

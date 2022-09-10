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
    comboSelected,
    paidTimeUnit,
    paidTime,
    prices,
    finalPrice,
    setFinalPrice,
    amountOfClases,
    paymentMethodSelected,
    setPaymentMethodSelected,
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

  const combosAutocomplete = []
  combos.map(combo =>
    combosAutocomplete.push({
      id: combo.id,
      display_name: combo.name,
    }),
  )

  const calculatePrice = () => {
    if (paymentMethodSelected === 1) {
      let price = 0
      if (comboSelected !== null && comboSelected !== undefined) {
        const comboCash = combos.filter(combo => combo.id === comboSelected)
        price += comboCash[0].price_cash
      }
      if (
        paidTime !== null &&
        paidTime !== 0 &&
        paidTimeUnit !== undefined &&
        paidTimeUnit.id !== null
      ) {
        // si paga un dia
        if (paidTime === 1 && paidTimeUnit.id === 1) {
          price += prices[0].price_cash
        } else if (paidTime === 8 && paidTimeUnit.id === 1) {
          // si paga 8 dias
          price += prices[1].price_cash
        } else if (paidTime === 1 && paidTimeUnit.id === 2) {
          // si paga un mes
          price += prices[2].price_cash
        } else {
          // eslint-disable-next-line no-lonely-if
          if (paidTimeUnit.id === 1) {
            // si paga X dias
            price += prices[0].price_cash * paidTime
          } else {
            // si paga X meses
            price += prices[2].price_cash * paidTime
          }
        }
      }
      if (amountOfClases !== undefined) {
        if (amountOfClases === 1) {
          price += prices[3].price_cash
        } else if (amountOfClases === 4) {
          price += prices[4].price_cash
        } else if (amountOfClases === 8) {
          price += prices[5].price_cash
        } else {
          // si no son ni 1 ni 4 ni 8
          price += prices[3].price_cash * amountOfClases
        }
      }
      setFinalPrice(price)
    } else if (paymentMethodSelected === 2) {
      let price = 0
      if (comboSelected !== null && comboSelected !== undefined) {
        const comboCash = combos.filter(combo => combo.id === comboSelected)
        price += comboCash[0].price_mp
      }
      if (
        paidTime !== null &&
        paidTime !== 0 &&
        paidTimeUnit !== undefined &&
        paidTimeUnit.id !== null
      ) {
        // si paga un dia
        if (paidTime === 1 && paidTimeUnit.id === 1) {
          price += prices[0].price_mp
        } else if (paidTime === 8 && paidTimeUnit.id === 1) {
          // si paga 8 dias
          price += prices[1].price_mp
        } else if (paidTime === 1 && paidTimeUnit.id === 2) {
          // si paga un mes
          price += prices[2].price_mp
        } else {
          // eslint-disable-next-line no-lonely-if
          if (paidTimeUnit.id === 1) {
            // si paga X dias
            price += prices[0].price_mp * paidTime
          } else {
            // si paga X meses
            price += prices[2].price_mp * paidTime
          }
        }
      }
      if (amountOfClases !== undefined) {
        if (amountOfClases === 1) {
          price += prices[3].price_mp
        } else if (amountOfClases === 4) {
          price += prices[4].price_mp
        } else if (amountOfClases === 8) {
          price += prices[5].price_mp
        } else {
          // si no son ni 1 ni 4 ni 8
          price += prices[3].price_mp * amountOfClases
        }
      }
      setFinalPrice(price)
    } else {
      setFinalPrice(0)
    }
  }

  useEffect(() => {
    calculatePrice()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    paidTimeUnit,
    paidTime,
    paymentMethodSelected,
    comboSelected,
    amountOfClases,
  ])

  return (
    <Form>
      <HorizontalGroup>
        <Autocomplete
          label="Combo"
          width={180}
          options={combosAutocomplete}
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
          value={
            comboSelected !== null && comboSelected !== undefined
              ? `$${
                  combos.filter(combo => combo.id === comboSelected)[0]
                    ?.price_cash
                } /  $${
                  combos.filter(combo => combo.id === comboSelected)[0]
                    ?.price_mp
                }`
              : ""
          }
        />
      </HorizontalGroup>
      <HorizontalGroup>
        <SubContainer>
          <TextField
            width={60}
            label="Tiempo"
            type="number"
            reference={paidTimeRef}
            onChange={e => {
              setPaidTime(parseInt(e.target.value, 10))
            }}
          />
          <Autocomplete
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
          width={100}
          label="Clases"
          type="number"
          reference={clasesRef}
          onChange={e => {
            setAmountOfClases(parseInt(e.target.value, 10))
            if (parseInt(e.target.value, 10) > 0) {
              setIsChecked(true)
            } else {
              setIsChecked(false)
            }
          }}
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
            setPaymentMethodSelected(e.id)
          }
        />
        <TextField
          label="Precio final"
          type="text"
          disabledAutocompleted
          disabled
          width={130}
          value={`${finalPrice}` || ""}
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

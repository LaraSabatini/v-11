import React, { useContext, useState, useEffect } from "react"
import texts from "strings/partners.json"
import { PartnersContext } from "contexts/Partners"
// import getTrainers from "services/Trainers/GetTrainers.service"
import { getSchedule } from "services/Trainers/Schedule.service"
import createPartnerPayment from "services/Partners/CreatePartnerPayment.service"
import editPartner from "services/Partners/EditPartner.service"
import getCombos from "services/Partners/GetCombos.service"
import getPrices from "services/Partners/GetPrices.service"
import PaymentInterface from "interfaces/partners/PaymentInterface"
import searchPartner from "services/Partners/SearchPartner.service"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import SearchBar from "components/UI/SearchBar"
import ScrollView from "components/UI/ScrollView"
import ModalForm from "components/UI/ModalForm"
import ComboBoxSelect from "components/UI/ComboBoxSelect"
import Autocomplete from "components/UI/Autocomplete"
import TextField from "components/UI/TextField"
import Checkbox from "components/UI/Checkbox"
import {
  Form,
  PartnerList,
  Partner,
  HorizontalGroup,
  CheckboxContainer,
  SubContainer,
} from "./styles"

interface AddPaymentInterface {
  cancelCreate: () => void
}

const AddPayment = ({ cancelCreate }: AddPaymentInterface) => {
  const {
    comboRef,
    setComboSelected,
    comboSelected,
    combos,
    setCombos,
    paidTimeRef,
    setPaidTime,
    timeUnits,
    paidTimeUnitRef,
    setPaidTimeUnit,
    setIsChecked,
    finalPrice,
    clasesRef,
    setAmountOfClases,
    // trainertRef,
    paymentMethods,
    paymentRef,
    setPaymentMethodSelected,
    isChecked,
    paymentMethodSelected,
    paidTime,
    paidTimeUnit,
    prices,
    setPrices,
    amountOfClases,
    setFinalPrice,
    setModalSuccess,
    setModalError,
    setScheduleSelected,
    scheduleList,
    setScheduleList,
    scheduleSelected,
  } = useContext(PartnersContext)
  const [searchValue, setSearchValue] = useState<string>("")
  const [results, setResults] = useState<PartnerInterface[]>([])

  const [partnerSelected, setPartnerSelected] = useState<PartnerInterface>()
  // const [trainers, setTrainers] = useState<
  //   { id: number; display_name: string }[]
  // >([])
  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [newTrainer, setNewTrainer] = useState<{
  //   id: number
  //   name: string
  // }>()

  const searchPartnerFunction = async () => {
    if (searchValue.length > 2) {
      const data = await searchPartner(searchValue, 1)
      setResults(data.data)
    } else {
      setResults([])
    }
  }

  const combosAutocomplete = []
  combos.map(combo =>
    combosAutocomplete.push({
      id: combo.id,
      display_name: combo.name,
    }),
  )

  const fillData = async () => {
    const combosData = await getCombos()
    setCombos(combosData.data)

    // const data = await getTrainers()
    // const arrayTrainers = []
    // data.data.map(trainer =>
    //   arrayTrainers.push({
    //     id: trainer.id,
    //     display_name: `${trainer.name} ${trainer.last_name}`,
    //   }),
    // )

    // setTrainers(arrayTrainers)

    const data = await getSchedule()
    const arraySchedule = []
    data.data.map(schedule =>
      arraySchedule.push({
        id: schedule.id,
        display_name: `${schedule.day_and_hour}`,
      }),
    )

    setScheduleList(arraySchedule)

    const pricesData = await getPrices()
    setPrices(pricesData.data)
  }

  useEffect(() => {
    searchPartnerFunction()
    fillData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue])

  const today = new Date()
  const getDay = today.getDate()
  const getMonth = today.getMonth()
  const year = today.getFullYear()

  const day = getDay > 9 ? getDay : `0${getDay}`
  const month = getMonth + 1 > 9 ? getMonth + 1 : `0${getMonth + 1}`

  const addPayment = async e => {
    e.preventDefault()

    // VALIDAR INPUTS OBLIGATORIOS
    await paymentRef.current?.focus()

    if (
      paymentRef.current.attributes.getNamedItem("data-error").value === "false"
    ) {
      // si trainer !== al del perfil => put
      const paymentBody: PaymentInterface = {
        id: 0,
        partner_id: partnerSelected.id,
        partner_name: partnerSelected.name,
        partner_last_name: partnerSelected.last_name,
        combo:
          comboSelected !== null && comboSelected !== undefined
            ? comboSelected
            : 0,
        time_paid: paidTime !== null && paidTime !== 0 ? paidTime : 0,
        time_paid_unit:
          paidTimeUnit?.id !== null && paidTimeUnit !== undefined
            ? paidTimeUnit.id
            : "",
        clases_paid: amountOfClases !== undefined ? amountOfClases : 0,
        // trainer_id: newTrainer !== undefined ? newTrainer.id : 0,
        // trainer_name: newTrainer !== undefined ? newTrainer.name : "",
        payment_method_id: paymentMethodSelected,
        payment_method_name: paymentMethods.filter(
          pm => pm.id === paymentMethodSelected,
        )[0].display_name,
        price_paid: finalPrice,
        date: `${day}/${month}/${year}`,
        payment_expire_date: "",
        days_and_hours: scheduleSelected.length > 0 ? scheduleSelected : null,
      }
      const createPayment = await createPartnerPayment(paymentBody)

      if (scheduleSelected.length > 0) {
        await editPartner({
          ...partnerSelected,
          // trainer_id: newTrainer.id,
          is_student: "SI",
        })
      }

      if (createPayment.message === "partnerPayment created successfully") {
        setModalSuccess({
          status: "success",
          icon: "IconCheckModal",
          title: `${texts.create.success.title}`,
          content: "Pago actualizado",
        })
      } else {
        setModalError({
          status: "alert",
          icon: "IconExclamation",
          title: `${texts.create.error.title}`,
          content: "Ocurrio un error al crear el pago",
        })
      }
    }
  }

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
    <ModalForm
      title={
        partnerSelected !== undefined
          ? `Agregar Pago - ${partnerSelected.name} ${partnerSelected.last_name}`
          : "Agregar Pago"
      }
      cancelButtonContent="Cancelar"
      submitButtonContent="Agregar"
      submit={addPayment}
      cancelFunction={cancelCreate}
    >
      <Form>
        <SearchBar
          searchValue={searchValue}
          onChangeSearch={e => setSearchValue(e.target.value)}
          width={292}
        />
        <PartnerList>
          {results.length ? (
            <ScrollView height={80}>
              {results.map(result => (
                <Partner
                  key={result.id}
                  selected={partnerSelected?.id === result.id}
                  onClick={() => {
                    setPartnerSelected(result)
                    setResults([])
                    setSearchValue("")
                  }}
                >
                  {result.name} {result.last_name}
                </Partner>
              ))}
            </ScrollView>
          ) : (
            <></>
          )}
        </PartnerList>
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
          {/* <Autocomplete
            label="Profesor"
            width={290}
            options={trainers}
            ref={trainertRef}
            onChangeProps={(e: { id: number; display_name: string }) =>
              setNewTrainer({
                id: e.id,
                name: e.display_name,
              })
            }
          /> */}
          <ComboBoxSelect
            required={
              amountOfClases !== undefined &&
              amountOfClases !== 0 &&
              amountOfClases !== ""
            }
            onChange={e => {
              const ids = []
              e.map(data => ids.push(data.id))
              // setNewPartnerData({ ...newPartnerData, hours_and_days: ids })
              setScheduleSelected(ids)
            }}
            options={scheduleList}
            width={290}
            label="Dias y Horarios"
            optionsList="single"
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
            checked={isChecked || scheduleSelected.length}
            isDisabled
            idParam="free-pass"
          />
          <p>Pase libre</p>
        </CheckboxContainer>
      </Form>
    </ModalForm>
  )
}

export default AddPayment

import React, { useContext, useState, useEffect } from "react"
import { PartnersContext } from "contexts/Partners"
import getTrainers from "services/Trainers/GetTrainers.service"
import getCombos from "services/Partners/GetCombos.service"
import searchPartner from "services/Partners/SearchPartner.service"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import SearchBar from "components/UI/SearchBar"
import ScrollView from "components/UI/ScrollView"
import ModalForm from "components/UI/ModalForm"
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
    trainertRef,
    paymentMethods,
    paymentRef,
    setPaymentMethodSelected,
    isChecked,
  } = useContext(PartnersContext)
  const [searchValue, setSearchValue] = useState<string>("")
  const [results, setResults] = useState<PartnerInterface[]>([])

  const [partnerSelected, setPartnerSelected] = useState<{
    id: number
    name: string
  }>()
  const [trainers, setTrainers] = useState<
    { id: number; display_name: string }[]
  >([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [newTrainer, setNewTrainer] = useState<number>()

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
    searchPartnerFunction()
    fillData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue])

  const addPayment = () => {
    // crear payment
    // si trainer !== al del perfil => put
  }

  return (
    <ModalForm
      title={
        partnerSelected !== undefined
          ? `Agregar Pago - ${partnerSelected.name}`
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
                    setPartnerSelected({
                      id: result.id,
                      name: `${result.name} ${result.last_name}`,
                    })
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
          <Autocomplete
            label="Profesor"
            width={290}
            options={trainers}
            ref={trainertRef}
            onChangeProps={(e: { id: number; display_name: string }) =>
              setNewTrainer(e.id)
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
            checked={isChecked || newTrainer !== undefined}
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

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useContext, useEffect } from "react"
// SERVICES
import { searchPartner } from "services/Partners/Partner.service"
import { getPartnerPaymentsById } from "services/Partners/PartnerPayments.service"
import { getLessonsByDateAndShift } from "services/Trainers/LessonsPurchased.service"
// DATA STORAGE & TYPES
import { paymentMethods, paymentUsers } from "const/finances"
import { yesOrNoArr } from "const/fixedVariables"
import { shifts, day, month, year } from "const/time"
import { Clases } from "contexts/Clases"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import trainerTexts from "strings/trainers.json"
import generalTexts from "strings/general.json"
// COMPONENTS & STYLING
import ModalForm from "components/UI/ModalForm"
import Autocomplete from "components/UI/Autocomplete"
import SearchBar from "components/UI/SearchBar"
import TextField from "components/UI/TextField"
import InputCalendar from "components/UI/InputCalendar"
import Icon from "components/UI/Assets/Icon"
import PopOver from "components/UI/PopOver"
import ScrollView from "components/UI/ScrollView"
import {
  FormContainer,
  HorizontalGroup,
  RegisterClientContainer,
  SelectedClient,
  PopOverContainer,
  Results,
  ListItem,
  LessonsContainer,
  LessonsSubGroup,
  LessonsPurchasedList,
  DisablingDiv,
  AcceptButton,
  PriceContainer,
  Warning,
} from "./styles"

interface CreatePurchaseInterface {
  handleCreatePurchase: (arg?: any) => void
  cancelCreatePurchase: (arg?: any) => void
}

const CreatePurchaseModal = ({
  handleCreatePurchase,
  cancelCreatePurchase,
}: CreatePurchaseInterface) => {
  const {
    clientRef,
    birthDateRef,
    trainersList,
    amountOfLessonsRef,
    trainerSelectedRef,
    amountOfLessons,
    setAmountOfLessons,
    lessonRef,
    datesSelected,
    setDatesSelected,
    paymentMethodSelected,
    setPaymentMethodSelected,
    clientSelected,
    setClientSelected,
    paid,
    setPaid,
    finalPrice,
    prices,
    setFinalPrice,
    setPaymentUserSelected,
    setNewPartnerData,
    newPartnerData,
    clientIsRegistered,
    setClientIsRegistered,
    shiftRef,
    paysNowRef,
    paymentMethodRef,
    paymentUserRef,
    trainerSelected,
    setTrainerSelected,
    paymentUserSelected,
    identificationError,
  } = useContext(Clases)

  const [popOverView, setPopOverView] = useState<boolean>(false)

  const [searchValue, setSearchValue] = useState<string>("")
  const [searchResults, setSearchResults] = useState<PartnerInterface[]>([])
  const [cannotAddDate, setCannotAddDate] = useState<boolean>(false)

  const [provisionalSelection, setProvisionalSelection] = useState<{
    date: string
    shift: "AM" | "PM" | ""
  }>({
    date: "",
    shift: "",
  })

  const searchClients = async () => {
    if (searchValue.length > 3) {
      const searchCall = await searchPartner(searchValue, 1)
      setSearchResults(searchCall.data)
    } else {
      setSearchResults([])
    }
  }

  useEffect(() => {
    searchClients()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue])

  const deleteLessonFromList = (lesson: {
    id: number
    date: string
    shift: string
  }) => {
    const newArrayOfDates = datesSelected.filter(
      (lessonDate: { id: number; date: string; shift: "AM" | "PM" }) =>
        lessonDate !== lesson,
    )
    setDatesSelected(newArrayOfDates)
  }

  const checkIfDateHasSpace = async () => {
    const dateCleaned = `${provisionalSelection.date.slice(
      0,
      2,
    )}-${provisionalSelection.date.slice(
      3,
      5,
    )}-${provisionalSelection.date.slice(6, 10)}`

    const checkAvailability = await getLessonsByDateAndShift(
      dateCleaned,
      provisionalSelection.shift,
    )

    if (checkAvailability.data.length >= 10) {
      setCannotAddDate(true)
    } else {
      setCannotAddDate(false)
      setDatesSelected([
        ...datesSelected,
        {
          id: datesSelected.length + 1,
          date: provisionalSelection.date,
          shift: provisionalSelection.shift,
        },
      ])

      setProvisionalSelection({
        date: "",
        shift: "",
      })
    }
  }

  const calculatePriceWithoutDiscount = () => {
    let price: number = 0
    if (amountOfLessons === 4) {
      price =
        paymentMethodSelected.id === 1
          ? prices[4].price_cash
          : prices[4].price_mp
    } else if (amountOfLessons === 8) {
      price =
        paymentMethodSelected.id === 1
          ? prices[5].price_cash
          : prices[5].price_mp
    } else {
      price =
        paymentMethodSelected.id === 1
          ? prices[3].price_cash * amountOfLessons
          : prices[3].price_mp * amountOfLessons
    }
    setFinalPrice(price)
  }

  const calculatePrice = async () => {
    const lessonPriceForFreePass: {
      amount_of_lessons: number
      cash: number
      mp: number
    }[] = [
      {
        amount_of_lessons: 1,
        cash: prices[3].price_cash - prices[0].price_cash,
        mp: prices[3].price_mp - prices[0].price_mp,
      },
      {
        amount_of_lessons: 4,
        cash: prices[4].price_cash - prices[0].price_cash * 4,
        mp: prices[4].price_mp - prices[0].price_mp * 4,
      },
      {
        amount_of_lessons: 8,
        cash: prices[5].price_cash - prices[0].price_cash * 8,
        mp: prices[5].price_mp - prices[0].price_mp * 8,
      },
    ]

    if (clientSelected !== null && clientSelected.free_pass === 1) {
      const checkPayment = await getPartnerPaymentsById(clientSelected.id)

      const expirationDate =
        checkPayment.data[checkPayment.data.length - 1].payment_expire_date

      const expirationDay = expirationDate.slice(0, 2)
      const expirationMonth = expirationDate.slice(3, 5)
      const expirationYear = expirationDate.slice(6, 10)

      const expirationDateCleaned = new Date(
        `${expirationYear}-${expirationMonth}-${expirationDay}`,
      )
      const todayDate = new Date(`${year}-${month}-${day}`)

      const hasDiscount: boolean = expirationDateCleaned > todayDate
      let price: number = 0

      if (hasDiscount) {
        if (amountOfLessons === 4) {
          price =
            paymentMethodSelected.id === 1
              ? lessonPriceForFreePass[1].cash
              : lessonPriceForFreePass[1].mp
        } else if (amountOfLessons === 8) {
          price =
            paymentMethodSelected.id === 1
              ? lessonPriceForFreePass[2].cash
              : lessonPriceForFreePass[2].mp
        } else {
          price =
            paymentMethodSelected.id === 1
              ? lessonPriceForFreePass[0].cash * amountOfLessons
              : lessonPriceForFreePass[0].mp * amountOfLessons
        }
      } else {
        calculatePriceWithoutDiscount()
      }
      setFinalPrice(price)
    } else {
      calculatePriceWithoutDiscount()
    }
  }

  useEffect(() => {
    if (paid && paymentMethodSelected !== null) {
      calculatePrice()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethodSelected, paid])

  const selectedClient = clientIsRegistered
    ? clientSelected !== null
    : clientSelected === null
  const selectedAmountOfLessons = amountOfLessons > 0
  const selectedTrainer = trainerSelected !== null
  const selectedAmount = datesSelected.length === amountOfLessons
  const selectedPays = paid && paymentMethodSelected !== null

  let payment: boolean = false
  if (paid) {
    if (selectedPays && paymentMethodSelected.id === 2) {
      payment = paymentUserSelected !== null
    } else if (selectedPays && paymentMethodSelected.id === 1) {
      payment = true
    }
  } else {
    payment = true
  }

  const partnerDataFilled =
    newPartnerData.name !== "" &&
    newPartnerData.last_name !== "" &&
    newPartnerData.identification_number !== "" &&
    newPartnerData.membership_start_date !== ""

  const conditionsForClientRegistered =
    clientIsRegistered &&
    selectedClient &&
    selectedAmountOfLessons &&
    selectedTrainer &&
    selectedAmount &&
    paid !== null &&
    payment

  const conditionsForClientNotRegistered =
    selectedAmountOfLessons &&
    selectedTrainer &&
    selectedAmount &&
    paid !== null &&
    payment &&
    !identificationError &&
    partnerDataFilled

  const canExecute = clientIsRegistered
    ? conditionsForClientRegistered
    : conditionsForClientNotRegistered

  return (
    <ModalForm
      title={trainerTexts.createPurchase.title}
      cancelButtonContent={generalTexts.actions.cancel}
      submitButtonContent={generalTexts.actions.create}
      submit={handleCreatePurchase}
      cancelFunction={cancelCreatePurchase}
      disabledButton={!canExecute}
    >
      <FormContainer>
        {/* START - CLIENT IS REGISTERED VALIDATION */}
        <HorizontalGroup>
          <Autocomplete
            label={trainerTexts.createPurchase.registeredLabel}
            required
            width={200}
            options={yesOrNoArr}
            ref={clientRef}
            onChangeProps={(e: { id: number; display_name: string }) => {
              if (e.id === 1) {
                setClientIsRegistered(true)
              } else {
                setClientIsRegistered(false)
              }
            }}
          />
          {clientIsRegistered && (
            <div className="search">
              <SearchBar
                searchValue={searchValue}
                onChangeSearch={e => setSearchValue(e.target.value)}
                width={220}
              />
              <PopOverContainer>
                <PopOver
                  title={trainerTexts.createPurchase.search}
                  description={trainerTexts.createPurchase.searchDescription}
                  view={popOverView}
                />
              </PopOverContainer>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => setPopOverView(!popOverView)}
              >
                <Icon icon="IconHelp" />
              </div>
              <SelectedClient>
                <p>
                  {clientSelected?.name} {clientSelected?.last_name}
                </p>
                <button onClick={() => setClientSelected(null)} type="button">
                  <Icon icon="IconMenuOff" />
                </button>
              </SelectedClient>
            </div>
          )}
        </HorizontalGroup>
        <Results>
          {searchValue !== "" && (
            <>
              <p className="title">{trainerTexts.createPurchase.results}</p>
              <ScrollView height={150}>
                {searchResults.length > 0 &&
                  searchResults.map((client: PartnerInterface) => (
                    <ListItem
                      selected={client.id === clientSelected?.id}
                      key={client.id}
                      onClick={() => {
                        setClientSelected(client)
                        setSearchResults([])
                        setSearchValue("")
                      }}
                    >
                      <span>
                        • {client.name} {client.last_name}
                      </span>
                    </ListItem>
                  ))}
              </ScrollView>
            </>
          )}
        </Results>
        {/* END - CLIENT IS REGISTERED VALIDATION */}

        {/* START - REGISTER CLIENT */}
        {!clientIsRegistered && clientIsRegistered !== null && (
          <RegisterClientContainer>
            <HorizontalGroup>
              <TextField
                label={generalTexts.labels.name}
                required
                type="text"
                width={200}
                onChange={e => {
                  setNewPartnerData({ ...newPartnerData, name: e.target.value })
                }}
              />
              <TextField
                label={generalTexts.labels.lastName}
                required
                type="text"
                width={200}
                onChange={e => {
                  setNewPartnerData({
                    ...newPartnerData,
                    last_name: e.target.value,
                  })
                }}
              />
              <TextField
                label={generalTexts.labels.identificationNumber}
                required
                type="text"
                width={200}
                backError={identificationError}
                backErrorMessage="Hay un cliente registrado con este DNI"
                onChange={e => {
                  setNewPartnerData({
                    ...newPartnerData,
                    identification_number: e.target.value,
                  })
                }}
              />
            </HorizontalGroup>
            <HorizontalGroup>
              <InputCalendar
                label={generalTexts.labels.birthDate}
                reference={birthDateRef}
                width={200}
                onChange={e => {
                  setNewPartnerData({
                    ...newPartnerData,
                    birth_date: e.selectedChangeDate,
                  })
                }}
              />
              <TextField
                label={generalTexts.labels.email}
                type="email"
                width={200}
                onChange={e => {
                  setNewPartnerData({
                    ...newPartnerData,
                    email: e.target.value,
                  })
                }}
              />
              <TextField
                label={generalTexts.labels.phoneNumber}
                type="text"
                width={200}
                onChange={e => {
                  setNewPartnerData({
                    ...newPartnerData,
                    phone: e.target.value,
                  })
                }}
              />
            </HorizontalGroup>
          </RegisterClientContainer>
        )}

        {/* START - CLIENT IS REGISTERED VALIDATION */}
        {(clientSelected !== null || clientIsRegistered === false) && (
          <div className="subdiv">
            <LessonsContainer>
              <LessonsSubGroup>
                <TextField
                  label={trainerTexts.createPurchase.amountOfLessons}
                  type="number"
                  max={10}
                  width={100}
                  required
                  reference={amountOfLessonsRef}
                  onChange={e => {
                    if (e.target.value.length > 0) {
                      setAmountOfLessons(parseInt(e.target.value, 10))
                    } else {
                      setAmountOfLessons(0)
                    }
                  }}
                />
                <Autocomplete
                  width={200}
                  label={generalTexts.labels.trainer}
                  required
                  ref={trainerSelectedRef}
                  options={trainersList}
                  onChangeProps={e => setTrainerSelected(e)}
                />
              </LessonsSubGroup>

              {(amountOfLessons === 0 ||
                datesSelected.length === amountOfLessons) && <DisablingDiv />}

              <LessonsSubGroup>
                <InputCalendar
                  label={trainerTexts.createPurchase.lessonsDate}
                  minCalendarDate={`${day}/${month}/${year}`}
                  valueCalendar={provisionalSelection.date}
                  required={datesSelected.length < amountOfLessons}
                  reference={lessonRef}
                  width={150}
                  onChange={e =>
                    setProvisionalSelection({
                      ...provisionalSelection,
                      date: e.selectedChangeDate,
                      shift: provisionalSelection.shift,
                    })
                  }
                />
                <Autocomplete
                  setValue={provisionalSelection.shift}
                  width={110}
                  label={trainerTexts.createPurchase.shift}
                  required={datesSelected.length < amountOfLessons}
                  ref={shiftRef}
                  options={shifts}
                  onChangeProps={(e: {
                    id: number
                    display_name: "AM" | "PM"
                  }) =>
                    setProvisionalSelection({
                      ...provisionalSelection,
                      date: provisionalSelection.date,
                      shift: e.display_name,
                    })
                  }
                />
                <AcceptButton
                  type="button"
                  disabled={
                    provisionalSelection.date === "" ||
                    provisionalSelection.shift === ""
                  }
                  onClick={() => {
                    if (
                      provisionalSelection.date !== "" &&
                      provisionalSelection.shift !== ""
                    ) {
                      checkIfDateHasSpace()
                    }
                  }}
                >
                  <Icon icon="IconCheck" />
                </AcceptButton>
              </LessonsSubGroup>
            </LessonsContainer>
            <LessonsPurchasedList>
              <p className="title">
                {trainerTexts.createPurchase.datesSelected}
              </p>
              <ScrollView height={100}>
                <div className="dates">
                  {datesSelected.length > 0 &&
                    datesSelected.map(date => (
                      <p key={date.id}>
                        <span>• {date.date}</span> <b>{date.shift}</b>
                        <button
                          type="button"
                          onClick={() => deleteLessonFromList(date)}
                        >
                          <Icon icon="IconMenuOff" />
                        </button>
                      </p>
                    ))}
                </div>
              </ScrollView>
            </LessonsPurchasedList>
          </div>
        )}
        {cannotAddDate && (
          <Warning>{trainerTexts.createPurchase.warningMessage}</Warning>
        )}
        {amountOfLessons === 0 ||
          (datesSelected.length === amountOfLessons && (
            <LessonsSubGroup>
              <Autocomplete
                options={yesOrNoArr}
                label={trainerTexts.createPurchase.paysNow}
                required
                ref={paysNowRef}
                width={100}
                onChangeProps={(e: { id: number; display_name: string }) => {
                  if (e.id === 1) {
                    setPaid(true)
                  } else {
                    setPaid(false)
                  }
                }}
              />
              {paid && (
                <Autocomplete
                  options={paymentMethods}
                  label={trainerTexts.createPurchase.paymentMethod}
                  required
                  ref={paymentMethodRef}
                  width={100}
                  onChangeProps={(e: { id: number; display_name: string }) => {
                    setPaymentMethodSelected(e)
                    if (e.id === 1) {
                      setPaymentUserSelected(null)
                    }
                  }}
                />
              )}
              {paymentMethodSelected !== null &&
                paymentMethodSelected.id === 2 && (
                  <Autocomplete
                    options={paymentUsers}
                    label={generalTexts.payments.digital_user}
                    required
                    ref={paymentUserRef}
                    width={150}
                    onChangeProps={(e: { id: number; display_name: string }) =>
                      setPaymentUserSelected(e)
                    }
                  />
                )}
              <PriceContainer>
                <p>{trainerTexts.createPurchase.total}</p>{" "}
                <p>
                  <b>${finalPrice}</b>
                </p>
              </PriceContainer>
            </LessonsSubGroup>
          ))}
      </FormContainer>
    </ModalForm>
  )
}

export default CreatePurchaseModal

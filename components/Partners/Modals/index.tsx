import React, { useContext } from "react"
import { PartnersContext } from "contexts/Partners"
import ModalAlert from "components/UI/ModalAlert"

const Modals = () => {
  const {
    modalSuccess,
    setModalSuccess,
    modalError,
    setModalError,
    triggerListUpdate,
    setTriggerListUpdate,
    setAddPaymentModal,
    setPartnerSelected,
    setNewPartnerData,
    setPaidTime,
    setPaidTimeUnit,
    setComboSelected,
    setAmountOfClases,
    setIsChecked,
    setFinalPrice,
    setPaymentMethodSelected,
    setCreateModal,
  } = useContext(PartnersContext)

  const cleanStates = () => {
    setModalSuccess(null)
    setAddPaymentModal(false)
    setModalError(null)
    setAddPaymentModal(false)
    setPartnerSelected(null)
    setNewPartnerData({
      id: 0,
      name: "",
      last_name: "",
      identification_number: "",
      birth_date: "",
      email: "",
      membership_start_date: "",
      created_by: null,
      trainer_id: null,
      free_pass: 0,
    })
    setPaidTime(0)
    setPaidTimeUnit()
    setComboSelected()
    setAmountOfClases()
    setIsChecked(false)
    setFinalPrice(0)
    setPaymentMethodSelected(null)
    setCreateModal(false)
  }

  return (
    <>
      {modalSuccess !== null && (
        <ModalAlert
          success
          message={modalSuccess}
          closeRefresh={() => {
            setTriggerListUpdate(triggerListUpdate + 1)
            cleanStates()
          }}
        />
      )}
      {modalError !== null && (
        <ModalAlert
          success={false}
          message={modalError}
          closeModal={() => {
            cleanStates()
          }}
        />
      )}
    </>
  )
}

export default Modals

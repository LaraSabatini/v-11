import React, { useContext } from "react"
// DATA STORAGE & TYPES
import { PartnersContext } from "contexts/Partners"
// COMPONENTS & STYLING
import ModalAlert from "components/UI/ModalAlert"

const Modals = () => {
  const {
    modalSuccess,
    modalError,
    triggerListUpdate,
    setTriggerListUpdate,
    cleanStates,
  } = useContext(PartnersContext)

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

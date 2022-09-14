import React, { useContext } from "react"
import { PartnersContext } from "contexts/Partners"
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

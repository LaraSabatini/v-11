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
  } = useContext(PartnersContext)

  return (
    <>
      {modalSuccess !== null && (
        <ModalAlert
          success
          message={modalSuccess}
          closeRefresh={() => {
            setTriggerListUpdate(triggerListUpdate + 1)
            setModalSuccess(null)
          }}
        />
      )}
      {modalError !== null && (
        <ModalAlert
          success={false}
          message={modalError}
          closeRefresh={() => {
            setModalError(null)
          }}
        />
      )}
    </>
  )
}

export default Modals

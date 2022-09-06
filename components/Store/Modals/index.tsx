import React, { useContext } from "react"
import { StoreContext } from "contexts/Store"
import ModalAlert from "components/UI/ModalAlert"

const Modals = () => {
  const {
    modalSuccess,
    setModalSuccess,
    modalError,
    setModalError,
    setPurchase,
    executeCleanPurchase,
    setExecuteCleanPurchase,
    setTriggerListUpdate,
    triggerListUpdate,
  } = useContext(StoreContext)

  return (
    <>
      {modalSuccess !== null && (
        <ModalAlert
          success
          message={modalSuccess}
          closeRefresh={() => {
            setPurchase([])
            setExecuteCleanPurchase(executeCleanPurchase + 1)
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
            setPurchase([])
            setExecuteCleanPurchase(executeCleanPurchase + 1)
            setModalError(null)
          }}
        />
      )}
    </>
  )
}

export default Modals

import React, { useContext } from "react"
import { StoreContext } from "contexts/Store"
import ModalAlert from "components/UI/ModalAlert"

function Modals() {
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
    setTillPreview,
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
            setTillPreview(false)
          }}
        />
      )}
      {modalError !== null && (
        <ModalAlert
          success={false}
          message={modalError}
          closeModal={() => {
            setPurchase([])
            setExecuteCleanPurchase(executeCleanPurchase + 1)
            setModalError(null)
            setTillPreview(false)
          }}
        />
      )}
    </>
  )
}

export default Modals

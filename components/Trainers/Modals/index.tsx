import React, { useContext } from "react"
// DATA STORAGE & TYPES
import { Clases } from "contexts/Clases"
// COMPONENTS & STYLING
import ModalAlert from "components/UI/ModalAlert"

const Modals = () => {
  const { modalSuccess, modalError, cleanStates } = useContext(Clases)

  return (
    <>
      {modalSuccess !== null && (
        <ModalAlert
          success
          message={modalSuccess}
          closeRefresh={() => {
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

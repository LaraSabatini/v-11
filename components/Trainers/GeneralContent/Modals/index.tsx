import React, { useContext } from "react"
import { Lessons } from "@contexts/Lessons"
import ModalAlert from "components/UI/ModalAlert"

function Modals() {
  const { modalSuccess, modalError, cleanStates } = useContext(Lessons)

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

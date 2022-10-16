import React, { useContext } from "react"
// DATA STORAGE & TYPES
import { Lessons } from "@contexts/LessonsContext"
// COMPONENTS & STYLING
import ModalAlert from "components/UI/ModalAlert"

const Modals = () => {
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

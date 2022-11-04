import React from "react"
import ModalAlert from "components/UI/ModalAlert"
import generalTexts from "strings/general.json"

interface ModalChangesInterface {
  cancelDiscard: () => void
  discardChanges: () => void
}

function ModalChanges({
  cancelDiscard,
  discardChanges,
}: ModalChangesInterface) {
  return (
    <ModalAlert
      success={false}
      message={{
        status: `alert`,
        icon: `IconAlert`,
        title: `${generalTexts.modalTitles.discard}`,
        content: `${generalTexts.modalContent.discard}`,
      }}
      closeModal={cancelDiscard}
      closeRefresh={cancelDiscard}
      mainButtonContent={generalTexts.actions.confirm}
      secondButtonContent={generalTexts.actions.cancel}
      mainAction={discardChanges}
      isNotice
    />
  )
}

export default ModalChanges

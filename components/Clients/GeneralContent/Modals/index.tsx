import React, { useContext } from "react"
import { PartnersContext } from "contexts/Partners"
import { deletePartnerAction } from "helpers/partners"
import generalTexts from "strings/general.json"
import partnerTexts from "strings/partners.json"
import ModalAlert from "components/UI/ModalAlert"

function Modals() {
  const {
    modalSuccess,
    modalError,
    triggerListUpdate,
    setTriggerListUpdate,
    cleanStates,
    modalHasChanges,
    setModalHasChanges,
    setNewData,
    setHasChanges,
    setDetailState,
    modalErrorAddDays,
    safeModal,
    setSafeModal,
    partnerSelected,
    setModalSuccess,
    setModalError,
  } = useContext(PartnersContext)

  const cancelDiscard = () => {
    setModalHasChanges(false)
  }

  const discardChanges = () => {
    setModalHasChanges(false)
    setNewData()
    setHasChanges(false)
    setDetailState("view")
  }

  const deletePartner = async () => {
    const deletion = await deletePartnerAction(partnerSelected)

    if (deletion) {
      setModalSuccess({
        status: "success",
        icon: "IconCheckModal",
        title: `${generalTexts.modalTitles.success}`,
        content: `${partnerTexts.delete.success.content}`,
      })
    } else {
      setModalError({
        status: "alert",
        icon: "IconExclamation",
        title: `${generalTexts.modalTitles.error}`,
        content: `${partnerTexts.delete.error.content}`,
      })
    }
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
      {modalHasChanges && (
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
      )}
      {modalErrorAddDays !== null && (
        <ModalAlert
          success={false}
          message={modalErrorAddDays}
          closeModal={() => {
            cleanStates()
          }}
        />
      )}
      {safeModal && (
        <ModalAlert
          success={false}
          message={{
            status: "alert",
            icon: "IconExclamation",
            title: `${partnerTexts.deleteWarning.title}`,
            content: `${partnerTexts.deleteWarning.content}`,
          }}
          closeModal={() => setSafeModal(false)}
          closeRefresh={() => setSafeModal(false)}
          mainButtonContent={generalTexts.actions.delete}
          secondButtonContent={generalTexts.actions.cancel}
          mainAction={deletePartner}
          isNotice
        />
      )}
    </>
  )
}

export default Modals

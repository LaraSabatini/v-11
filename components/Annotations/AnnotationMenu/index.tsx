import React, { useContext } from "react"
import { AnnotationsContext } from "contexts/Annotations"
import generalTexts from "strings/general.json"
import annotationsTexts from "strings/annotations.json"
import AnnotationsInterface from "interfaces/annotations/annotationInterface"
import Menu from "./styles"

interface AnnotationMenuInterface {
  annotation: AnnotationsInterface
}

function AnnotationMenu({ annotation }: AnnotationMenuInterface) {
  const {
    setWarningModal,
    setAnnotationSelected,
    setEditModal,
    setNewAnnotation,
  } = useContext(AnnotationsContext)

  const getPermissions = localStorage.getItem("permissions")
  const permissions = JSON.parse(getPermissions)[0].sections[4].sub_sections[0]

  return (
    <Menu>
      <button
        disabled={!permissions.actions.update}
        type="button"
        onClick={() => {
          setAnnotationSelected(annotation)
          setNewAnnotation(annotation)
          setEditModal(true)
        }}
      >
        {generalTexts.actions.edit}
      </button>
      <button
        type="button"
        disabled={!permissions.actions.delete}
        onClick={() => {
          setAnnotationSelected(annotation)
          setWarningModal({
            status: `alert`,
            icon: `IconAlert`,
            title: `${annotationsTexts.modals.warnignModal.title}`,
            content: `${annotationsTexts.modals.warnignModal.content}`,
          })
        }}
      >
        {generalTexts.actions.removeRecord}
      </button>
    </Menu>
  )
}

export default AnnotationMenu

import React, { useContext } from "react"
import { AnnotationsContext } from "contexts/Annotations"
import AnnotationsInterface from "interfaces/annotations/annotationInterface"
import Menu from "./styles"

interface AnnotationMenuInterface {
  annotation: AnnotationsInterface
}

function AnnotationMenu({ annotation }: AnnotationMenuInterface) {
  const { setWarningModal, setAnnotationSelected, setEditModal } = useContext(
    AnnotationsContext,
  )
  return (
    <Menu>
      <button
        type="button"
        onClick={() => {
          setAnnotationSelected(annotation)
          setEditModal(true)
        }}
      >
        Editar
      </button>
      <button
        type="button"
        onClick={() => {
          setAnnotationSelected(annotation)
          setWarningModal({
            status: `alert`,
            icon: `IconAlert`,
            title: "Estas seguro de que deseas eliminar la tarea/nota?",
            content: "Se eliminara su registro de la base de datos.",
          })
        }}
      >
        Eliminar
      </button>
    </Menu>
  )
}

export default AnnotationMenu

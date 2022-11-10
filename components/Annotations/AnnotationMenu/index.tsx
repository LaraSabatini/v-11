import React from "react"
import { Menu } from "../../styles"

function AnnotationMenu() {
  return (
    <Menu>
      <button type="button">Editar</button>
      <button
        type="button"
        onClick={() => {
          setAnnotationSelected(id)
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

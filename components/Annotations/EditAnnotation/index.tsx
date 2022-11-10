import React, { useContext } from "react"
import ModalForm from "components/UI/ModalForm"
import { AnnotationsContext } from "contexts/Annotations"
import TextField from "components/UI/TextField"
import Autocomplete from "components/UI/Autocomplete"
import { annotationTypes } from "const/annotations"
import HorizontalContainer from "../CreateAnnotation/styles"

interface EditAnnotationInterface {
  submitAction: (arg?: any) => void
  cancelAction: () => void
  disabledButton: boolean
}

function EditAnnotation({
  submitAction,
  cancelAction,
  disabledButton,
}: EditAnnotationInterface) {
  const {
    annotationSelected,
    setNewAnnotation,
    newAnnotation,
    typeRef,
    titleRef,
    descriptionRef,
  } = useContext(AnnotationsContext)

  return (
    <ModalForm
      title={
        annotationSelected.type === "note" ? "Editar Nota" : "Editar Tarea"
      }
      cancelButtonContent="Cancelar"
      submitButtonContent="Editar"
      submit={submitAction}
      cancelFunction={cancelAction}
      disabledButton={disabledButton}
    >
      <>
        <HorizontalContainer>
          <TextField
            label="Titulo"
            required
            type="text"
            width={230}
            reference={titleRef}
            value={newAnnotation.title}
            onChange={e =>
              setNewAnnotation({ ...newAnnotation, title: e.target.value })
            }
          />
          <Autocomplete
            label="Tipo"
            required
            ref={typeRef}
            options={annotationTypes}
            width={140}
            setValue={newAnnotation.type}
            onChangeProps={e =>
              setNewAnnotation({ ...newAnnotation, type: e.display_name })
            }
          />
        </HorizontalContainer>
        <TextField
          label="Descripcion"
          max={200}
          required
          type="textarea"
          width={380}
          reference={descriptionRef}
          value={newAnnotation.description}
          onChange={e =>
            setNewAnnotation({ ...newAnnotation, description: e.target.value })
          }
        />
      </>
    </ModalForm>
  )
}

export default EditAnnotation

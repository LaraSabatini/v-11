import React, { useContext } from "react"
import { createAnnotation } from "services/Annotations/Annotations.service"
import { todosFilters } from "const/annotations"
import { day, month, year } from "const/time"
import { AnnotationsContext } from "contexts/Annotations"
import Icon from "components/UI/Assets/Icon"
import ScrollView from "components/UI/ScrollView"
import Pagination from "components/UI/Pagination"
import CreateAnnotation from "../CreateAnnotation"
import {
  CardLayout,
  CardTitle,
  CardHeader,
  Filter,
  FilterContainer,
  IconContainer,
  CardContent,
  Add,
  PaginationContainer,
} from "./styles"

interface CardInterface {
  title: string
  type: "todo" | "note"
  children: JSX.Element | JSX.Element[]
  currentPage: number
  totalPages: number
  onClickNext: () => void
  onClickBack: () => void
}

function Card({
  title,
  type,
  children,
  currentPage,
  totalPages,
  onClickNext,
  onClickBack,
}: CardInterface) {
  const {
    filterSelected,
    setFilterSelected,
    order,
    setOrder,
    setNewAnnotation,
    titleRef,
    descriptionRef,
    newAnnotation,
    setModalResponse,
    openCreateModal,
    setOpenCreateModal,
  } = useContext(AnnotationsContext)

  const getPermissions = localStorage.getItem("permissions")
  const permissions = JSON.parse(getPermissions)[0].sections[4].sub_sections[0]

  const createAnnotationFunction = async e => {
    e.preventDefault()

    await titleRef.current?.focus()
    await descriptionRef.current?.focus()
    await titleRef.current?.focus()

    if (
      titleRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      descriptionRef.current.attributes.getNamedItem("data-error").value ===
        "false"
    ) {
      const newAnnotationBody = {
        ...newAnnotation,
        creation_date: `${day}-${month}-${year}`,
        done_date: "",
        done_by: 0,
      }
      const create = await createAnnotation(newAnnotationBody)

      const success = create.message === "Annotation created successfully"

      setModalResponse({
        success,
        message: {
          status: success ? "success" : "alert",
          icon: success ? "IconCheck" : "IconExclamation",
          title: success ? "Excelente!" : "UPS!",
          content: success
            ? "La anotacion se ha creado exitosamente."
            : "Ocurrio un error al crear la anotacion, por favor intentalo de nuevo o contactate con un administrador",
        },
      })
    }
  }

  const cancelCreateAnnotation = () => {
    setOpenCreateModal(false)
    setNewAnnotation({
      id: 0,
      title: "",
      description: "",
      creation_date: "",
      type: "todo",
      done: 0,
      done_date: "",
      created_by: parseInt(localStorage.getItem("id"), 10),
      done_by: 0,
    })
  }

  return (
    <CardLayout>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {type === "todo" ? (
          <FilterContainer>
            {todosFilters.map(filter => (
              <Filter
                selected={filterSelected === filter}
                onClick={() => setFilterSelected(filter)}
              >
                {filter.display_name}
              </Filter>
            ))}
          </FilterContainer>
        ) : (
          <Filter
            onClick={() => {
              if (order === "ASC") {
                setOrder("DESC")
              } else {
                setOrder("ASC")
              }
            }}
          >
            Ordenar Fechas
            <IconContainer rotate={order}>
              <Icon icon="IconArrowOptions" />
            </IconContainer>
          </Filter>
        )}
      </CardHeader>
      <ScrollView height={450}>
        <CardContent>{children}</CardContent>
      </ScrollView>
      <Add
        disabled={!permissions.actions.create}
        onClick={() => setOpenCreateModal(true)}
      >
        <Icon icon="IconAdd" color="#fff" />
      </Add>
      {openCreateModal && (
        <CreateAnnotation
          title={type === "todo" ? "Crear Tarea" : "Crear Nota"}
          type={type}
          submitAction={createAnnotationFunction}
          cancelAction={cancelCreateAnnotation}
        />
      )}
      <PaginationContainer>
        <Pagination
          totalPages={totalPages}
          setPage={currentPage}
          onClickBack={onClickBack}
          onClickNext={onClickNext}
        />
      </PaginationContainer>
    </CardLayout>
  )
}

export default Card

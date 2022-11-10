import React, { useContext, useState } from "react"
import { todosFilters } from "const/annotations"
import { AnnotationsContext } from "contexts/Annotations"
import Icon from "components/UI/Assets/Icon"
import ScrollView from "components/UI/ScrollView"
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
} from "./styles"

interface CardInterface {
  title: string
  type: "todo" | "note"
  children: JSX.Element | JSX.Element[]
}

function Card({ title, type, children }: CardInterface) {
  const {
    filterSelected,
    setFilterSelected,
    order,
    setOrder,
    setNewAnnotation,
  } = useContext(AnnotationsContext)

  const getPermissions = localStorage.getItem("permissions")
  const permissions = JSON.parse(getPermissions)[0].sections[4].sub_sections[0]

  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false)

  const createAnnotation = () => {}
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
          submitAction={createAnnotation}
          cancelAction={cancelCreateAnnotation}
        />
      )}
    </CardLayout>
  )
}

export default Card

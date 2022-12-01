import React, { useContext } from "react"
import { todosFilters } from "const/annotations"
import { AnnotationsContext } from "contexts/Annotations"
import annotationTexts from "strings/annotations.json"
import Icon from "components/UI/Assets/Icon"
import ScrollView from "components/UI/ScrollView"
import Pagination from "components/UI/Pagination"
import {
  CardLayout,
  CardTitle,
  CardHeader,
  Filter,
  FilterContainer,
  IconContainer,
  CardContent,
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
  const { filterSelected, setFilterSelected, order, setOrder } = useContext(
    AnnotationsContext,
  )

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
            {annotationTexts.orderDates}
            <IconContainer rotate={order}>
              <Icon icon="IconArrowOptions" />
            </IconContainer>
          </Filter>
        )}
      </CardHeader>
      <ScrollView height={450}>
        <CardContent>{children}</CardContent>
      </ScrollView>
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

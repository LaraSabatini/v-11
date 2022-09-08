import theme from "@theme/index"
import React, { useEffect, useState } from "react"
import Icon from "../Assets/Icon"
import {
  NumberPage,
  PagesContainer,
  PaginationContainer,
  ArrowsContainer,
  ArrowItemContainer,
} from "./styles"

interface IPagination {
  totalPages: number
  setPage?: number
  onClickNext?: (page: number) => void
  onClickBack?: (page: number) => void
  onClickLastPage?: (page: number) => void
}

const Pagination = ({
  totalPages,
  setPage,
  onClickBack,
  onClickNext,
  onClickLastPage,
}: IPagination) => {
  const [page, setPageState] = useState<number>(1)

  useEffect(() => {
    setPageState(setPage || 1)
  }, [setPage])

  const changePage = (type: "next" | "back" | "last") => {
    switch (type) {
      case "next":
        setPageState(page + 1 <= totalPages ? page + 1 : page)
        if (onClickNext) onClickNext(page + 1 <= totalPages ? page + 1 : page)
        break
      case "back":
        setPageState(page - 1 > 0 ? page - 1 : page)
        if (onClickBack) onClickBack(page - 1 > 0 ? page - 1 : page)
        break
      case "last":
        if (onClickLastPage) {
          onClickLastPage(page)
          setPageState(totalPages)
        }
        break
      default:
        break
    }
  }

  const IconColor = (type: "next" | "back", id): string => {
    if (type === "next" && id === "ArrowNext") {
      return page + 1 <= totalPages ? theme.colors.grey : "#C8C8C8"
    }

    if (type === "back") {
      return page - 1 > 0 ? theme.colors.grey : "#C8C8C8"
    }

    return "#C8C8C8"
  }

  return (
    <PaginationContainer>
      <PagesContainer>
        <NumberPage bold>{page}</NumberPage>-
        <NumberPage onClick={() => changePage("last")}>{totalPages}</NumberPage>
      </PagesContainer>
      <ArrowsContainer>
        <ArrowItemContainer
          onClick={() => changePage("back")}
          color={IconColor("back", "ArrowBack")}
        >
          <Icon icon="IconArrowLeft" />
        </ArrowItemContainer>
        <ArrowItemContainer
          onClick={() => changePage("next")}
          color={IconColor("next", "ArrowNext")}
        >
          <Icon icon="IconArrowRight" />
        </ArrowItemContainer>
      </ArrowsContainer>
    </PaginationContainer>
  )
}

export default Pagination

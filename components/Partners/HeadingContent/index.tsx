import React, { useEffect, useContext } from "react"
import { useRouter } from "next/router"
import { PartnersContext } from "contexts/Partners"
import { searchPartnerAction } from "helpers/partners"
import generalTexts from "strings/general.json"
import setPartnerList from "../Helpers/components/filter"
import Filters from "./Filters"
import Search from "./Search"
import { HeadContent, Title } from "./styles"

function HeadingContent() {
  const {
    filterSelected,
    currentPage,
    setPartners,
    setTotalPages,
    triggerListUpdate,
    setFilterSelected,
    setPartnerSelected,
    searchValue,
    setUpdatePaymentModal,
  } = useContext(PartnersContext)

  const router = useRouter()

  const getPartnersList = async () => {
    const data = await setPartnerList(filterSelected, currentPage)
    setPartners(data.list)
    setTotalPages(data.numberOfPages)
    setPartnerSelected(null)
  }

  const searchPartnerInDB = async () => {
    setFilterSelected("all")
    setPartnerSelected(null)
    const executeSearch = await searchPartnerAction(searchValue)
    setPartners(executeSearch.data)
  }

  useEffect(() => {
    getPartnersList()
    setUpdatePaymentModal(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterSelected, currentPage, triggerListUpdate])

  return (
    <>
      <HeadContent>
        <Title>
          {generalTexts.sections.home}{" "}
          <span>
            {" "}
            /{" "}
            {router.query.prices === "true"
              ? `${generalTexts.sections.prices}`
              : `${generalTexts.sections.home}`}
          </span>
        </Title>
        {router.query.clients === "true" && <Filters />}
      </HeadContent>
      {router.query.clients === "true" && (
        <Search
          getVirginList={getPartnersList}
          searchPartnerInDB={searchPartnerInDB}
          title={generalTexts.search.title}
          description={generalTexts.search.description}
        />
      )}
    </>
  )
}

export default HeadingContent

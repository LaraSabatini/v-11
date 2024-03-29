import React from "react"
import storeTexts from "strings/store.json"
import generalTexts from "strings/general.json"
import CreateProductButton from "../GeneralContent/CreateButton"
import Filters from "./Filters"
import Search from "./Search"
import { HeadContent, Title, Divider, FiltersContainer } from "./styles"

interface HeadingContentInterface {
  section: "store" | "stock"
  canView: boolean
}

function HeadingContent({ section, canView }: HeadingContentInterface) {
  return (
    <>
      <HeadContent>
        <Title>
          {generalTexts.sections.store} /{" "}
          <span>
            {section === "store"
              ? `${generalTexts.sections.store.toLowerCase()}`
              : `${storeTexts.stock.toLowerCase()}`}
          </span>
        </Title>
        <Divider />
        <FiltersContainer>
          <CreateProductButton />

          {(section === "stock" && canView) ||
            (section === "store" && canView && <Filters />)}

          {section === "stock" && canView && <Search />}
        </FiltersContainer>
      </HeadContent>
    </>
  )
}

export default HeadingContent

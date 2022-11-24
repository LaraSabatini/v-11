import React from "react"
import storeTexts from "strings/store.json"
import generalTexts from "strings/general.json"
import Filters from "./Filters"
import Search from "./Search"
import { HeadContent, Title } from "./styles"

interface HeadingContentInterface {
  section: "store" | "stock"
  canView: boolean
}

function HeadingContent({ section, canView }: HeadingContentInterface) {
  return (
    <>
      <HeadContent>
        <Title>
          {generalTexts.sections.store}{" "}
          <span>
            {" "}
            /{" "}
            {section === "store"
              ? `${generalTexts.sections.store}`
              : `${storeTexts.stock}`}
          </span>
        </Title>
        {(section === "stock" && canView) ||
          (section === "store" && canView && <Filters />)}

        {section === "stock" && canView && <Search />}
      </HeadContent>
    </>
  )
}

export default HeadingContent

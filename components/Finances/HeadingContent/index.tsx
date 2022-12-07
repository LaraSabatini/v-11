import React from "react"
import { useRouter } from "next/router"
import generalTexts from "strings/general.json"
import financesTexts from "strings/finances.json"
import TillFilters from "./Filters/TillFilters"
import { Title, HeadContent, Divider } from "./styles"

function HeadingContent() {
  const router = useRouter()

  const getPermissions = localStorage.getItem("permissions")
  const permissions = JSON.parse(getPermissions)[0].sections[3].sub_sections
  const routeIsBilling = Object.keys(router.query)[0] === "billing"

  return (
    <>
      <HeadContent>
        <Title>
          {generalTexts.sections.finances}
          {" / "}
          <span>
            {
              {
                billing: `${financesTexts.boulderEarnings}`,
                expenses: `${financesTexts.bills}`,
                workingHours: `${financesTexts.workingHours}`,
                earnings: `${financesTexts.earnings}`,
              }[Object.keys(router.query)[0]]
            }
          </span>
        </Title>
      </HeadContent>
      <Divider />

      {routeIsBilling && permissions[0].view && <TillFilters />}
    </>
  )
}

export default HeadingContent

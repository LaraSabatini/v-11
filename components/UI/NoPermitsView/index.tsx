import React from "react"
import generalTexts from "strings/general.json"
import NoPermissionsView from "./styles"

function NoPermitsView() {
  return (
    <NoPermissionsView>
      <p>{generalTexts.permits.title}</p>
      <span>{generalTexts.permits.info}</span>
    </NoPermissionsView>
  )
}

export default NoPermitsView

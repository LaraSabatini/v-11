import React from "react"
import { useRouter } from "next/router"
import generalTexts from "strings/general.json"
import trainerTexts from "strings/trainers.json"
import Title from "./styles"

function HeadingContent() {
  const router = useRouter()

  return (
    <Title>
      <div>
        {generalTexts.sections.trainers}
        <span>
          {" "}
          /{" "}
          {router.query.students === "true"
            ? `${trainerTexts.students}`
            : `${trainerTexts.calendar}`}
        </span>
      </div>
    </Title>
  )
}

export default HeadingContent

import React, { useContext } from "react"
import { AnnotationsContext } from "contexts/Annotations"
import annotationTexts from "strings/annotations.json"
import AnnotationsInterface from "interfaces/annotations/annotationInterface"
import Card from "../Card"
import NoteItem from "./NoteItem"
import { NoInfoToShow } from "../styles"

function NotesCard() {
  const { notesPagination, setNotesPagination, notes } = useContext(
    AnnotationsContext,
  )

  const goNext = () => {
    if (notesPagination.total > notesPagination.current) {
      setNotesPagination({
        ...notesPagination,
        current: notesPagination.current + 1,
      })
    }
  }
  const goPrev = () => {
    if (notesPagination.current > 1) {
      setNotesPagination({
        ...notesPagination,
        current: notesPagination.current - 1,
      })
    }
  }

  return (
    <Card
      title={annotationTexts.notes}
      type="note"
      currentPage={notesPagination.current}
      totalPages={notesPagination.total}
      onClickNext={goNext}
      onClickBack={goPrev}
    >
      {notes.length ? (
        notes.map((note: AnnotationsInterface) => (
          <NoteItem key={note.id} annotation={note} />
        ))
      ) : (
        <NoInfoToShow>
          {annotationTexts.noNotesToShow}
          <span>{annotationTexts.noNotesInstruction}</span>
        </NoInfoToShow>
      )}
    </Card>
  )
}

export default NotesCard

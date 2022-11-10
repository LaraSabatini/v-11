import React, { useContext } from "react"
import { AnnotationsContext } from "contexts/Annotations"
import Card from "../Card"
import NoteItem from "./NoteItem"

function NotesCard() {
  const { notesPagination, setNotesPagination } = useContext(AnnotationsContext)

  const goNext = () => {
    if (notesPagination.total < notesPagination.current) {
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
      title="Notas"
      type="note"
      currentPage={notesPagination.current}
      totalPages={notesPagination.total}
      onClickNext={goNext}
      onClickBack={goPrev}
    >
      <NoteItem
        annotation={{
          id: 1,
          title: "Tarea",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam magni voluptatibus perferendis dignissimos, unde dolore!",
          creation_date: "11-20-2022",
          type: "note",
          done: 0,
          done_date: "09-11-2022",
          created_by: 1,
          done_by: 0,
        }}
      />
    </Card>
  )
}

export default NotesCard

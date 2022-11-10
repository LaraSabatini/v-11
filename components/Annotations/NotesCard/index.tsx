import React from "react"
import Card from "../Card"
import NoteItem from "./NoteItem"

function NotesCard() {
  return (
    <Card title="Notas" type="note">
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

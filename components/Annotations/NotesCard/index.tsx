import React from "react"
import Card from "../Card"
import NoteItem from "./NoteItem"

function NotesCard() {
  return (
    <Card title="Notas" type="note">
      <NoteItem
        title="Tarea"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam magni
        voluptatibus perferendis dignissimos, unde dolore!"
        date="09-11-2022"
      />
    </Card>
  )
}

export default NotesCard

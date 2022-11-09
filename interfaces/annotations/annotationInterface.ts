export default interface AnnotationsInterface {
  id: number
  title: string
  description: string
  creation_date: string
  type: "todo" | "note"
  done: 0 | 1
  done_date: string
  created_by: number
  done_by: number
}

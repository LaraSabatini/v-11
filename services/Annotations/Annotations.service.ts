import axios from "axios"
import axiosHeader from "services/axiosHeader"
import AnnotationsInterface from "interfaces/annotations/annotationInterface"
import defaultPost from "services/defaultPost"

const apiURL = `${process.env.NEXT_PUBLIC_API_HOST}/annotations`

export const getNotes = async (page: number, order: "ASC" | "DESC") => {
  const res = await axios.get(
    `${apiURL}/notes/order=${order}?page=${page}`,
    axiosHeader,
  )
  return res.data
}

export const getNotesByDate = async (page: number, date: string) => {
  const res = await axios.get(
    `${apiURL}/notes/date=${date}?page=${page}`,
    axiosHeader,
  )
  return res.data
}

export const getAllTodos = async (page: number) => {
  const res = await axios.get(`${apiURL}/todos?page=${page}`, axiosHeader)
  return res.data
}

export const getTodosByDone = async (page: number, done: 0 | 1) => {
  const res = await axios.get(
    `${apiURL}/todos/done=${done}?page=${page}`,
    axiosHeader,
  )
  return res.data
}

export const createAnnotation = async (body: AnnotationsInterface) => {
  const res = await defaultPost(apiURL, body)
  return res
}

export const deleteAnnotation = async (id: number) => {
  const res = await axios.delete(`${apiURL}/${id}`, axiosHeader)
  return res.data
}

export const editAnnotation = async (body: AnnotationsInterface) => {
  const res = await axios.put(`${apiURL}/${body.id}`, body, axiosHeader)
  return res.data
}

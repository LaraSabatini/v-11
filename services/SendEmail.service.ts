import axios from "axios"
import axiosHeader from "services/axiosHeader"

const apiURL = `${process.env.NEXT_PUBLIC_API_HOST}/sendEmail`

export const closeTillEmail = async (body: {
  recipients: string
  subject: string
  data: {
    till: {
      software: { cash: number; mp: number }
      real: { cash: number; mp: number }
    }
    earningsStore: { cash: number; mp: number }
    earningsBoulder: { cash: number; mp: number }
    user: string
    freePass: {
      individual: number
      fourPack: number
      eightPack: number
      total: number
    }
    lessons: {
      individual: number
      fourPack: number
      eightPack: number
      total: number
    }
    amountOfPeople: number
    date: string
    hour: string
    month: number
  }
}) => {
  const data = await axios
    .post(`${apiURL}/close-till`, body, axiosHeader)
    .then(response => {
      const res = response.data
      return res
    })
    .catch(err => {
      const res = err.response
      return res
    })
  return data
}

export const expireDateReminderEmail = async (body: {
  recipients: string
  subject: string
  item: string
  event: string
  expDate: string
}) => {
  const data = await axios
    .post(`${apiURL}/expire-date-reminder`, body, axiosHeader)
    .then(response => {
      const res = response.data
      return res
    })
    .catch(err => {
      const res = err.response
      return res
    })
  return data
}

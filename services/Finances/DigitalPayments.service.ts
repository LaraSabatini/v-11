import axios from "axios"

export const getAllDigitalPayments = async (page: number) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/digitalPayments?page=${page}`,
    axiosHeader,
  )
  return res.data
}

export const searchByUserAndDate = async (user_id: number, date: string) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/digitalPayments/by-user-date/user_id=${user_id}&date=${date}`,
    axiosHeader,
  )
  return res.data
}

export const searchByUser = async (user_id: number, page: number) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/digitalPayments/by-user/user_id=${user_id}&page=${page}`,
    axiosHeader,
  )
  return res.data
}

export const searchByMonth = async (month_id: number, page: number) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/digitalPayments/by-month/month_id=${month_id}&page=${page}`,
    axiosHeader,
  )
  return res.data
}

export const searchByDate = async (date: string, page: number) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/digitalPayments/by-date/date=${date}&page=${page}`,
    axiosHeader,
  )
  return res.data
}

export const createDigitalPayment = async (body: {
  id: number
  user_id: number
  user_name: string
  date: string
  month: string
  month_id: number
  total_profit: number
}) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }

  const data = await axios
    .post("https://v-11-backend.vercel.app/digitalPayments", body, axiosHeader)
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

export const updateDigitalPayment = async (body: {
  id: number
  user_id: number
  user_name: string
  date: string
  month: string
  month_id: number
  total_profit: number
}) => {
  const res = await axios.put(
    `https://v-11-backend.vercel.app/digitalPayments/${body.id}`,
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
  return res.data
}
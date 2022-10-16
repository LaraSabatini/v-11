import axios from "axios"
import PaymentInterface from "interfaces/partners/PaymentInterface"

export const getPartnerPayments = async (page: number) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/partnersPayment?page=${page}`,
    axiosHeader,
  )
  return res.data
}

export const getPartnerPaymentsById = async (id: number) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/partnersPayment/payment_by_partner_id/${id}`,
    axiosHeader,
  )
  return res.data
}

export const getClasesPaid = async () => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/partnersPayment/clases/0`,
    axiosHeader,
  )
  return res.data
}

export const createPartnerPayment = async (body: PaymentInterface) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }

  const data = await axios
    .post("https://v-11-backend.vercel.app/partnersPayment", body, axiosHeader)
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

export const editPartnerPayment = async (body: PaymentInterface) => {
  const res = await axios.put(
    `https://v-11-backend.vercel.app/partnersPayment/${body.id}`,
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
  return res.data
}

export const getPaymentByPartner = async (partner: string, page: number) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/partnersPayment/${partner}?page=${page}`,

    axiosHeader,
  )
  return res.data
}

export const getPaymentByDate = async (date: string) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/partnersPayment/date/${date}`,

    axiosHeader,
  )
  return res.data
}

export const getEarningsByDate = async (date: string) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/partnersPayment/cards/${date}`,

    axiosHeader,
  )
  return res.data
}

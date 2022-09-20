import axios from "axios"

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

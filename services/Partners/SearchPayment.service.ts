import axios from "axios"

const getPaymentByPartner = async (partner: string, page: number) => {
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

export default getPaymentByPartner

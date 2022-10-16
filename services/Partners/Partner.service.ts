import axios from "axios"
import PartnerInterface from "interfaces/partners/PartnerInterface"

export const createPartner = async (body: PartnerInterface) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }

  const data = await axios
    .post("https://v-11-backend.vercel.app/partners", body, axiosHeader)
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

export const deletePartner = async (id: number) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.delete(
    `https://v-11-backend.vercel.app/partners/${id}`,
    axiosHeader,
  )
  return res.data
}

export const editPartner = async (body: PartnerInterface) => {
  const res = await axios.put(
    `https://v-11-backend.vercel.app/partners/${body.id}`,
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
  return res.data
}

export const getPartners = async (page: number) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/partners?page=${page}`,
    axiosHeader,
  )
  return res.data
}

export const searchPartner = async (search: string, page: number) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/partners/${search}?page=${page}`,
    axiosHeader,
  )
  return res.data
}

export const searchPartnerById = async (id: number) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/partners/by-id/${id}`,
    axiosHeader,
  )
  return res.data
}

export const getStudents = async (page: number) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/partners/students/SI?page=${page}`,
    axiosHeader,
  )
  return res.data
}

export const getFreePassPartners = async (page: number) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/partners/free-pass/1?page=${page}`,
    axiosHeader,
  )
  return res.data
}

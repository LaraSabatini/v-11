import axios from "axios"

export const createPartner = async (body: {
  id: number
  name: string
  last_name: string
  identification_number: string
  birth_date: string
  email: string
  phone: string
  subs: number
  membership_start_date: string
  created_by: number
  free_pass: number
  is_student: string
}) => {
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

export const editPartner = async (body: {
  id: number
  name: string
  last_name: string
  identification_number: string
  birth_date: string
  email: string
  membership_start_date: string
  created_by: number
  is_student: string
  free_pass: number
}) => {
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

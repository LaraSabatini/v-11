import React, { useEffect, useContext } from "react"
import { useRouter } from "next/router"
import { GeneralContext } from "contexts/GeneralContext"
import { getPricesAction } from "helpers/partners"
import Login from "components/Login"
import useStorage from "hooks/useStorage"

function Home() {
  const { getItem } = useStorage()
  const logged = getItem("isLoggedIn")

  const { setPrices, triggerPricesUpdate } = useContext(GeneralContext)

  const router = useRouter()

  if (logged === "true") {
    router.replace("/home?clients=true")
  }

  const setPricesData = async () => {
    const pricesData = await getPricesAction()
    setPrices(pricesData)
  }

  useEffect(() => {
    setPricesData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerPricesUpdate])

  return <div>{!logged && <Login />}</div>
}

export default Home

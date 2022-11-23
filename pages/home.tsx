import React, { useState, useEffect, useContext } from "react"
import { useRouter } from "next/router"
import { GeneralContext } from "contexts/GeneralContext"
import { getPricesAction } from "helpers/partners"
import Clients from "components/Partners"
import PartnersProvider from "contexts/Partners"

function Home() {
  const router = useRouter()
  const { setPrices, triggerPricesUpdate } = useContext(GeneralContext)

  const [isLoggedIn, setIsLoggedIn] = useState<any>()

  useEffect(() => {
    const user = localStorage.getItem("user")
    setIsLoggedIn(user)

    if (user === null) {
      router.replace("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])

  const setPricesData = async () => {
    const pricesData = await getPricesAction()
    setPrices(pricesData)
  }

  useEffect(() => {
    setPricesData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerPricesUpdate])

  return (
    <div>
      {isLoggedIn !== null && (
        <PartnersProvider>
          <Clients />
        </PartnersProvider>
      )}
    </div>
  )
}

export default Home

import React, { useState, useEffect, useContext } from "react"
import TrainersView from "components/Trainers"
import LessonsProvider from "@contexts/Lessons"
import { GeneralContext } from "contexts/GeneralContext"
import { getPrices } from "services/Partners/Prices.service"
import { useRouter } from "next/router"

function Trainers() {
  const router = useRouter()

  const [isLoggedIn, setIsLoggedIn] = useState<any>()
  const { setPrices, triggerPricesUpdate } = useContext(GeneralContext)

  useEffect(() => {
    const user = localStorage.getItem("user")
    setIsLoggedIn(user)

    if (user === null) {
      router.replace("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])

  const setPricesData = async () => {
    const pricesData = await getPrices()
    setPrices(pricesData.data)
  }

  useEffect(() => {
    setPricesData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerPricesUpdate])

  return (
    <div>
      {isLoggedIn !== null && (
        <LessonsProvider>
          <TrainersView />
        </LessonsProvider>
      )}
    </div>
  )
}

export default Trainers

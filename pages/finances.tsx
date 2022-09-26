import React, { useState, useEffect } from "react"
import FinancesView from "components/Finances"
import FinancesProvider from "contexts/Finances"
import { useRouter } from "next/router"

function Finances() {
  const router = useRouter()

  const [isLoggedIn, setIsLoggedIn] = useState<any>()

  useEffect(() => {
    const user = localStorage.getItem("user")
    setIsLoggedIn(user)

    if (user === null) {
      router.replace("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])

  return (
    <>
      <style jsx global>{`
        body {
          margin: 0px;
          padding: 0px;
        }
      `}</style>
      {isLoggedIn !== null && (
        <FinancesProvider>
          <FinancesView />
        </FinancesProvider>
      )}
    </>
  )
}

export default Finances

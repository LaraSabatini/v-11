import React, { useState, useEffect } from "react"
// import FinancesView from "components/Finances"
import FinancesView from "components/FinancesView"
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
    <div>
      {isLoggedIn !== null && (
        <FinancesProvider>
          <FinancesView />
        </FinancesProvider>
      )}
    </div>
  )
}

export default Finances

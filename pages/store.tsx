import React, { useState, useEffect } from "react"
// import StoreView from "components/Store"
import StoreView from "components/StoreView"
import StoreProvider from "contexts/Store"
import { useRouter } from "next/router"

function Store() {
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
        <StoreProvider>
          {/* <StoreView /> */}
          <StoreView />
        </StoreProvider>
      )}
    </div>
  )
}

export default Store
